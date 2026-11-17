import express from 'express';
import fs from 'fs';
import os from 'os';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Onde os dados de runtime sao gravados. O filesystem do Render e
// descartavel, entao o padrao fica em /tmp. Basta apontar DATA_DIR
// para um disco persistente (/mnt/data) para nao perder as escritas.
const DATA_DIR = process.env.DATA_DIR || path.join(os.tmpdir(), 'devcard-vibecode');
const DATA_FILE = path.join(DATA_DIR, 'data.json');

// Semente versionada no repo, usada na primeira execucao.
const SEED_FILE = path.join(__dirname, 'data.json');

function loadData() {
  try {
    if (fs.existsSync(DATA_FILE)) {
      return JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
    }
    if (fs.existsSync(SEED_FILE)) {
      const seed = JSON.parse(fs.readFileSync(SEED_FILE, 'utf-8'));
      return { curtidas: seed.curtidas || 0, mensagens: seed.mensagens || [] };
    }
  } catch { /* ignore */ }
  return { curtidas: 0, mensagens: [] };
}

function saveData(data) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

const perfil = {
  nome: 'DevLab Fundamentos',
  turma: 'Etapa 0',
  area: 'Desenvolvimento Full Stack',
  objetivo: 'Conectar frontend e backend com APIs REST',
};

const habilidades = [
  'Criar endpoints REST com Express',
  'Consumir APIs com fetch no React',
  'Configurar proxy no Vite',
  'Tratar erros e estados de carregamento',
];

const frases = [
  'A persistência é o caminho do êxito.',
  'Código limpo é a base de um bom projeto.',
  'Pequenos passos geram grandes resultados.',
  'Debugar é arte, paciência é a pincelada.',
  'Aprender a programar é aprender a pensar.',
  'O futuro pertence àqueles que aprendem hoje.',
  'Todo grande sistema começou com uma linha de código.',
  'Erros são apenas dados em trânsito.',
];

function fraseAleatoria() {
  return frases[Math.floor(Math.random() * frases.length)];
}

app.get('/api', (_req, res) => {
  res.json({ message: 'Backend conectado com sucesso!' });
});

app.get('/api/perfil', (_req, res) => {
  res.json(perfil);
});

app.get('/api/habilidades', (_req, res) => {
  res.json(habilidades);
});

app.get('/api/frase', (_req, res) => {
  res.json({ frase: fraseAleatoria() });
});

app.get('/api/curtidas', (_req, res) => {
  const data = loadData();
  res.json({ curtidas: data.curtidas });
});

app.post('/api/curtidas', (_req, res) => {
  const data = loadData();
  data.curtidas += 1;
  saveData(data);
  res.json({ curtidas: data.curtidas });
});

app.post('/api/contato', (req, res) => {
  const { nome, email, mensagem } = req.body;

  if (!nome || !email || !mensagem) {
    return res.status(400).json({ erro: 'Nome, email e mensagem são obrigatórios.' });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ erro: 'Email inválido.' });
  }

  const data = loadData();
  const entry = {
    id: Date.now(),
    nome,
    email,
    mensagem,
    data: new Date().toISOString(),
  };
  data.mensagens.push(entry);
  saveData(data);

  res.status(201).json({ sucesso: true, mensagem: 'Mensagem recebida!', entry });
});

// ── Frontend compilado ──
// O Vite gera em frontend/dist. Servimos essa pasta na mesma origem do
// backend, assim o frontend pode chamar /api com caminho relativo.
const DIST_DIR = path.join(__dirname, '..', 'frontend', 'dist');

if (fs.existsSync(DIST_DIR)) {
  app.use(express.static(DIST_DIR));
} else {
  console.warn(`[aviso] ${DIST_DIR} nao existe. Rode "npm run build" no frontend.`);
}

// Rotas /api nao encontradas continuam devolvendo 404 em JSON.
app.use('/api', (_req, res) => {
  res.status(404).json({ erro: 'Rota de API nao encontrada.' });
});

// Fallback de SPA: qualquer outra rota GET devolve o index.html.
app.use((req, res, next) => {
  if (req.method !== 'GET' && req.method !== 'HEAD') return next();
  if (!fs.existsSync(path.join(DIST_DIR, 'index.html'))) return next();
  res.sendFile(path.join(DIST_DIR, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
  console.log(`Dados em ${DATA_DIR}`);
});
