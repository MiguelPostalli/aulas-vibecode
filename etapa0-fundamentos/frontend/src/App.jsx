import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [curtidas, setCurtidas] = useState(0);
  const [perfil, setPerfil] = useState(null);
  const [habilidades, setHabilidades] = useState([]);
  const [frase, setFrase] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState("");

  async function carregarDados() {
    try {
      setCarregando(true);
      setErro("");

      const respostaPerfil = await fetch(`/api/perfil`);
      const respostaHabilidades = await fetch(`/api/habilidades`);
      const respostaFrase = await fetch(`/api/frase`);

      const dadosPerfil = await respostaPerfil.json();
      const dadosHabilidades = await respostaHabilidades.json();
      const dadosFrase = await respostaFrase.json();

      setPerfil(dadosPerfil);
      setHabilidades(dadosHabilidades);
      setFrase(dadosFrase.frase);
    } catch (error) {
      setErro("Nao foi possivel conectar com a API. Verifique se o back-end esta rodando.");
    } finally {
      setCarregando(false);
    }
  }

  async function gerarNovaFrase() {
    try {
      setErro("");

      const resposta = await fetch(`/api/frase`);
      const dados = await resposta.json();

      setFrase(dados.frase);
    } catch (error) {
      setErro("Erro ao buscar nova frase.");
    }
  }

  useEffect(() => {
    carregarDados();
  }, []);

  return (
    <main className="pagina">
      <section className="card">
        <p className="etiqueta">DevLab Fundamentos</p>

        <h1>{perfil ? perfil.nome : "Carregando perfil..."}</h1>

        {perfil && (
          <>
            <p className="descricao">
              <strong>Turma:</strong> {perfil.turma}
            </p>

            <p className="descricao">
              <strong>Area:</strong> {perfil.area}
            </p>

            <p className="descricao">
              <strong>Objetivo:</strong> {perfil.objetivo}
            </p>
          </>
        )}

        <div className="contador">
          <span>Curtidas no projeto:</span>
          <strong>{curtidas}</strong>
        </div>

        <button onClick={() => setCurtidas(curtidas + 1)}>
          Curtir projeto
        </button>

        <div className="bloco">
          <h2>Frase da API</h2>

          {carregando ? (
            <p className="descricao">Buscando dados...</p>
          ) : (
            <p className="frase">{frase}</p>
          )}

          <button className="botao-secundario" onClick={gerarNovaFrase}>
            Gerar nova frase
          </button>
        </div>

        <div className="bloco">
          <h2>Habilidades da etapa</h2>

          <ul>
            {habilidades.map((habilidade, index) => (
              <li key={index}>{habilidade}</li>
            ))}
          </ul>
        </div>

        {erro && <p className="erro">{erro}</p>}
      </section>
    </main>
  );
}

export default App;

