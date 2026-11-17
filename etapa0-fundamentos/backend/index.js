import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

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
];

function fraseAleatoria() {
  const index = Math.floor(Math.random() * frases.length);
  return frases[index];
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

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
