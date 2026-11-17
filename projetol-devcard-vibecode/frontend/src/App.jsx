import { useEffect, useState, useCallback } from "react";
import "./App.css";
import MiniProjects from "./MiniProjects";

function App() {
  const [tema, setTema] = useState(() => localStorage.getItem("tema") || "light");
  const [perfil, setPerfil] = useState(null);
  const [habilidades, setHabilidades] = useState([]);
  const [frase, setFrase] = useState("");
  const [curtidas, setCurtidas] = useState(0);
  const [popCount, setPopCount] = useState(false);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");
  const [navOpen, setNavOpen] = useState(false);

  const [formNome, setFormNome] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formMensagem, setFormMensagem] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [enviado, setEnviado] = useState(false);
  const [erroForm, setErroForm] = useState("");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", tema);
    localStorage.setItem("tema", tema);
  }, [tema]);

  const toggleTema = () => {
    setTema((t) => (t === "dark" ? "light" : "dark"));
  };

  useEffect(() => {
    let cancelled = false;
    async function carregarDados() {
      try {
        setCarregando(true);
        setErro("");
        const [resP, resH, resF, resC] = await Promise.all([
          fetch("/api/perfil"),
          fetch("/api/habilidades"),
          fetch("/api/frase"),
          fetch("/api/curtidas"),
        ]);
        if (cancelled) return;
        setPerfil(await resP.json());
        setHabilidades(await resH.json());
        setFrase((await resF.json()).frase);
        setCurtidas((await resC.json()).curtidas);
      } catch {
        if (!cancelled) setErro("Nao foi possivel conectar com a API.");
      } finally {
        if (!cancelled) setCarregando(false);
      }
    }
    carregarDados();
    return () => { cancelled = true; };
  }, []);

  const gerarFrase = useCallback(async () => {
    try {
      const res = await fetch("/api/frase");
      const data = await res.json();
      setFrase(data.frase);
    } catch {
      setErro("Erro ao buscar frase.");
    }
  }, []);

  const curtir = useCallback(async () => {
    try {
      const res = await fetch("/api/curtidas", { method: "POST" });
      const data = await res.json();
      setCurtidas(data.curtidas);
      setPopCount(true);
      setTimeout(() => setPopCount(false), 400);
    } catch {
      setErro("Erro ao registrar curtida.");
    }
  }, []);

  const enviarContato = async (e) => {
    e.preventDefault();
    setErroForm("");
    if (!formNome || !formEmail || !formMensagem) {
      setErroForm("Preencha todos os campos.");
      return;
    }
    try {
      setEnviando(true);
      const res = await fetch("/api/contato", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome: formNome, email: formEmail, mensagem: formMensagem }),
      });
      const data = await res.json();
      if (!res.ok) {
        setErroForm(data.erro || "Erro ao enviar.");
        return;
      }
      setEnviado(true);
      setFormNome("");
      setFormEmail("");
      setFormMensagem("");
    } catch {
      setErroForm("Erro de conexao.");
    } finally {
      setEnviando(false);
    }
  };

  const skillIcons = ["\u2699", "\u{1F4BB}", "\u26A1", "\u{1F527}"];
  const skillTags = [
    ["REST", "Express", "Endpoints"],
    ["React", "Fetch", "Estado"],
    ["Vite", "Proxy", "Dev"],
    ["Erros", "Carregamento", "API"],
  ];

  const asciiArt = `\u2554\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2557
\u2551  \u2593\u2593\u2593\u2593\u2593\u2593  DEVLAB SYSTEM  \u2593\u2593\u2593\u2593\u2593\u2593  \u2551
\u2551  \u2591 v2.0 \u2591 FULLSTACK    \u2591 \u2591\u2591\u2591\u2591\u2591  \u2551
\u255a\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u255d`;

  return (
    <>
      {/* ── NAVBAR ── */}
      <nav className="navbar">
        <div className="container">
          <a href="#hero" className="nav-logo">
            <span className="nav-logo-icon">DL</span>
            DevLab
          </a>

          <ul className={`nav-links${navOpen ? " open" : ""}`}>
            <li><a href="#sobre" onClick={() => setNavOpen(false)}>Sobre</a></li>
            <li><a href="#habilidades" onClick={() => setNavOpen(false)}>Habilidades</a></li>
            <li><a href="#mini-projetos" onClick={() => setNavOpen(false)}>Mini Projetos</a></li>
            <li><a href="#engajamento" onClick={() => setNavOpen(false)}>Engajamento</a></li>
            <li><a href="#frases" onClick={() => setNavOpen(false)}>Frases</a></li>
            <li><a href="#contato" onClick={() => setNavOpen(false)}>Contato</a></li>
          </ul>

          <div className="nav-right">
            <button className="theme-toggle" onClick={toggleTema} title="Alternar tema">
              {tema === "dark" ? "\u2600" : "\u263E"}
            </button>
            <a href="#contato" className="nav-cta">Fale comigo</a>
            <button
              className="nav-mobile-toggle"
              onClick={() => setNavOpen(!navOpen)}
              aria-label="Menu"
            >
              {navOpen ? "\u2715" : "\u2630"}
            </button>
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="hero" id="hero">
        <div className="hero-glow hero-glow--1" />
        <div className="hero-glow hero-glow--2" />
        <div className="hero-glow hero-glow--3" />

        <div className="particles-bg">
          {Array.from({ length: 12 }, (_, i) => (
            <div
              key={i}
              className="particle-dot"
              style={{
                left: `${(i * 31 + 7) % 100}%`,
                bottom: "0%",
                animationDuration: `${6 + (i * 5) % 10}s`,
                animationDelay: `${(i * 1.7) % 5}s`,
              }}
            />
          ))}
        </div>

        <div className="container">
          <div className="hero-badge">
            <span className="hero-badge-dot" />
            {perfil ? "SISTEMA ONLINE" : "CARREGANDO..."}
          </div>

          <pre className="hero-ascii">{asciiArt}</pre>

          <h1 className="hero-title">
            {perfil
              ? <>{perfil.nome.split(" ").slice(0, 2).join(" ")} <span className="hero-title-accent">{perfil.nome.split(" ").slice(2).join(" ") || "Lab"}</span></>
              : "Inicializando modulos..."}
          </h1>

          <p className="hero-subtitle hero-cursor">
            {perfil
              ? perfil.objetivo
              : "Conectando aos servidores..."}
          </p>

          <div className="hero-actions">
            <a href="#contato" className="btn-primary">
              Iniciar conversa &rarr;
            </a>
            <a href="#habilidades" className="btn-secondary">
              Ver habilidades
            </a>
          </div>

          <div className="hero-stats">
            <div>
              <div className="hero-stat-value">{String(curtidas).padStart(4, "0")}</div>
              <div className="hero-stat-label">Curtidas</div>
            </div>
            <div>
              <div className="hero-stat-value">{habilidades.length}</div>
              <div className="hero-stat-label">Habilidades</div>
            </div>
            <div>
              <div className="hero-stat-value">4</div>
              <div className="hero-stat-label">Endpoints</div>
            </div>
            <div>
              <div className="hero-stat-value">2</div>
              <div className="hero-stat-label">Temas</div>
            </div>
          </div>
        </div>
      </section>

      {carregando ? (
        <div className="loading-section">
          <div className="loading-spinner" />
          <span className="loading-label">Carregando dados do sistema...</span>
        </div>
      ) : (
        <>
          {/* ── SOBRE ── */}
          <section className="about" id="sobre">
            <div className="container">
              <div className="about-grid">
                <div className="about-visual">
                  <div className="about-card">
                    <div className="about-card-label">Perfil do sistema</div>
                    <h3>{perfil?.nome}</h3>
                    <p>{perfil?.objetivo}</p>
                    <ul className="about-info-list">
                      <li className="about-info-item">
                        <span className="about-info-icon">{"\u{1F3EB}"}</span>
                        <span>Turma: {perfil?.turma}</span>
                      </li>
                      <li className="about-info-item">
                        <span className="about-info-icon">{"\u{1F4CA}"}</span>
                        <span>Area: {perfil?.area}</span>
                      </li>
                      <li className="about-info-item">
                        <span className="about-info-icon">{"\u{1F680}"}</span>
                        <span>Stack: React + Express</span>
                      </li>
                      <li className="about-info-item">
                        <span className="about-info-icon">{"\u{1F5A5}"}</span>
                        <span>Frontend + Backend</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="about-content">
                  <p className="section-label">// Sobre o projeto</p>
                  <h2 className="section-title">
                    Conectando frontend e backend com APIs REST
                  </h2>
                  <p className="section-desc" style={{ marginBottom: 24 }}>
                    O DevLab e um projeto de ensino que demonstra a integracao completa
                    entre um frontend React moderno e um backend Express, comunicando
                    via endpoints REST. Cada componente e uma aula pratica de
                    desenvolvimento full stack.
                  </p>
                  <p className="section-desc">
                    Este sistema conta com persistencia de dados, sistema de temas,
                    formulrios com validacao, e uma estetica que mistura terminais
                    antigos com interfaces futuristas.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* ── HABILIDADES ── */}
          <section id="habilidades">
            <div className="container">
              <div className="section-header">
                <p className="section-label">// Competencias</p>
                <h2 className="section-title">Habilidades da Etapa</h2>
                <p className="section-desc">
                  Cada habilidade representa uma competencia tecnica desenvolvida
                  durante a etapa de fundamentos do curso.
                </p>
              </div>

              <div className="skills-grid">
                {habilidades.map((h, i) => (
                  <div key={i} className="skill-card">
                    <div className="hud-corners" />
                    <div className="skill-card-header">
                      <div className="skill-card-icon">{skillIcons[i] || "\u25B8"}</div>
                      <span className="skill-card-title">Habilidade {String(i + 1).padStart(2, "0")}</span>
                    </div>
                    <p className="skill-card-desc">{h}</p>
                    <div className="skill-tags">
                      {(skillTags[i] || []).map((tag) => (
                        <span key={tag} className="skill-tag">{tag}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── MINI PROJETOS ── */}
          <MiniProjects />

          {/* ── ENGAJAMENTO ── */}
          <section className="engagement" id="engajamento">
            <div className="container">
              <div className="section-header" style={{ textAlign: "center" }}>
                <p className="section-label">// Metricas</p>
                <h2 className="section-title">Engajamento da Comunidade</h2>
                <p className="section-desc" style={{ margin: "0 auto" }}>
                  Cada curtida registra-se no backend e persiste entre sessoes.
                  O contador e atualizado em tempo real.
                </p>
              </div>

              <div className="engagement-card">
                <div className="hud-corners" />
                <p className="section-label">Total de curtidas</p>
                <div className={`engagement-count${popCount ? " pop" : ""}`}>
                  {String(curtidas).padStart(4, "0")}
                </div>
                <p className="engagement-label">
                  pessoas curtiram este projeto
                </p>
                <button className="btn-like" onClick={curtir}>
                  {"\u2764"} Curtir projeto
                </button>
                <div className="engagement-terminal">
                  <span>status:</span> persistido em data.json | <span>metodo:</span> POST /api/curtidas | <span>codec:</span> 201 Created
                </div>
              </div>
            </div>
          </section>

          {/* ── FRASES ── */}
          <section id="frases">
            <div className="container">
              <div className="section-header">
                <p className="section-label">// Inspiracao</p>
                <h2 className="section-title">Frases do Sistema</h2>
                <p className="section-desc">
                  Mensagens geradas aleatoriamente pela API para inspirar
                  seu dia de desenvolvimento.
                </p>
              </div>

              <div className="quote-card">
                <div className="hud-corners" />
                <div className="quote-icon">{"\u201C"}</div>
                <p className="quote-text">{frase}</p>
                <button className="btn-refresh" onClick={gerarFrase}>
                  {"\u21BB"} Gerar nova frase
                </button>
              </div>
            </div>
          </section>

          {/* ── CONTATO ── */}
          <section className="contact" id="contato">
            <div className="container">
              <div className="contact-grid">
                <div>
                  <p className="section-label">// Contato</p>
                  <h2 className="section-title">Vamos conversar</h2>
                  <p className="section-desc" style={{ marginBottom: 40 }}>
                    Envie uma mensagem diretamente pelo sistema. Todos os dados
                    sao persistidos no backend.
                  </p>

                  <div className="contact-info">
                    <div className="contact-info-item">
                      <div className="contact-info-icon">{"\u{1F4E7}"}</div>
                      <div>
                        <div className="contact-info-label">Email</div>
                        <div className="contact-info-value">devlab@sistema.local</div>
                      </div>
                    </div>
                    <div className="contact-info-item">
                      <div className="contact-info-icon">{"\u{1F4CD}"}</div>
                      <div>
                        <div className="contact-info-label">Localizacao</div>
                        <div className="contact-info-value">DevLab Fundamentos</div>
                      </div>
                    </div>
                    <div className="contact-info-item">
                      <div className="contact-info-icon">{"\u{1F527}"}</div>
                      <div>
                        <div className="contact-info-label">Stack</div>
                        <div className="contact-info-value">React 19 + Express 5</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="contact-form-card">
                  {enviado ? (
                    <div className="form-success">
                      <div className="form-success-icon">{"\u2705"}</div>
                      <div className="form-success-title">Mensagem enviada!</div>
                      <p className="form-success-desc">
                        Sua mensagem foi registrada com sucesso no sistema.
                      </p>
                      <button className="btn-refresh" onClick={() => setEnviado(false)}>
                        {"\u21BB"} Enviar outra
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={enviarContato}>
                      <div className="form-row">
                        <div className="form-group">
                          <label className="form-label" htmlFor="nome">Nome</label>
                          <input
                            className="form-input"
                            id="nome"
                            type="text"
                            placeholder="Seu nome completo"
                            value={formNome}
                            onChange={(e) => setFormNome(e.target.value)}
                          />
                        </div>
                        <div className="form-group">
                          <label className="form-label" htmlFor="email">Email</label>
                          <input
                            className="form-input"
                            id="email"
                            type="email"
                            placeholder="seu@email.com"
                            value={formEmail}
                            onChange={(e) => setFormEmail(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="form-group">
                        <label className="form-label" htmlFor="mensagem">Mensagem</label>
                        <textarea
                          className="form-textarea"
                          id="mensagem"
                          placeholder="Escreva sua mensagem aqui..."
                          value={formMensagem}
                          onChange={(e) => setFormMensagem(e.target.value)}
                        />
                      </div>
                      {erroForm && <div className="form-error">{erroForm}</div>}
                      <button className="btn-submit" type="submit" disabled={enviando}>
                        {enviando ? "Enviando..." : "Enviar mensagem"}
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* ── FOOTER ── */}
          <footer className="footer">
            <div className="container">
              <span className="footer-text">
                &copy; {new Date().getFullYear()} DevLab Fundamentos. Sistema construido com React + Express.
              </span>
              <ul className="footer-links">
                <li><a href="#hero">Inicio</a></li>
                <li><a href="#sobre">Sobre</a></li>
                <li><a href="#contato">Contato</a></li>
              </ul>
            </div>
          </footer>
        </>
      )}

      {erro && <div className="global-error">{erro}</div>}
    </>
  );
}

export default App;
