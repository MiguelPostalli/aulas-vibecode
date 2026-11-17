import { useEffect, useState } from "react";
import "./App.css";

function MiniProjects() {
  const [activeIndex, setActiveIndex] = useState(0);

  const projects = [
    {
      id: 1,
      name: "STREAMING FIGHT",
      description: "Plataforma de streaming de lutas gravadas e ao vivo com um jeito inovador de acompanhar e sentir a energia da luta por quaisquer plataformas.",
      image: "/mini-projetos/miguel-postalli/img/sobre-apeperia.png",
      github: "https://github.com/MiguelPostalli/MiguelPostalli",
      demo: "#streaming-fight",
      tech: ["HTML", "CSS", "JavaScript"],
      heroTitle: "STREAMING FIGHT",
      heroText: "A STREAMING FIGHT é uma plataforma de streaming de lutas gravadas e ao vivo com um jeito inovador de acompanhar e sentir a energia da luta por quaisquer plataformas, seja mobile, computador, web e etc.",
      features: [
        { icon: "\u{1F4FA}", label: "60+ Canais de Luta" },
        { icon: "\u{1F3AC}", label: "Filmes e Documentários" },
        { icon: "\u{1F4F1}", label: "Multiplataforma" },
      ],
      plans: [
        { name: "Básico", price: "R$ 19,90", items: ["Com Propagandas", "15+ Canais", "1 Usuário"] },
        { name: "Intermediário", price: "R$ 49,90", items: ["Sem Propagandas", "30+ Canais", "3 Usuários"] },
        { name: "Diamante", price: "R$ 79,90", items: ["Sem Propagandas", "Canais Completos", "6 Usuários"] },
      ],
    },
    {
      id: 2,
      name: "FILMEFLIX",
      description: "Catálogo de Filmes com busca, filtros por gênero e ordenação por avaliação. Exibição dos melhores filmes com sinopses e trailers.",
      image: null,
      github: "https://github.com/MiguelPostalli/Catalogo-de-filmes",
      demo: "https://miguelpostalli.github.io/Catalogo-de-filmes/",
      tech: ["HTML", "CSS", "JavaScript"],
      heroTitle: "FILMEFLIX",
      heroText: "FILMEFLIX é o seu catálogo de filmes inteligente. Busque seus títulos favoritos, filtre por gênero (Ação, Comédia) e ordene por mais recentes ou maior avaliação, tudo em uma interface simples e rápida.",
      features: [
        { icon: "\u{1F50D}", label: "Busca de Filmes" },
        { icon: "\u{1F3AC}", label: "Ação e Comédia" },
        { icon: "\u2B50", label: "Avaliações" },
      ],
      plans: [
        { name: "Gêneros", price: "Ação", items: ["Filmes de ação", "Ordenar por recência", "Avaliações"] },
        { name: "Comédia", price: "Diversão", items: ["Filmes de comédia", "Busca rápida", "Catálogo variado"] },
        { name: "Destaques", price: "Top 10", items: ["Mais avaliados", "Mais recentes", "Minha lista"] },
      ],
    },
    {
      id: 3,
      name: "Lista de Compras",
      description: "Aplicativo de lista de compras com autenticação de usuário e persistência de dados em nuvem via Supabase.",
      image: "/mini-projetos/lista-compras-2026/img/icon.png",
      github: "https://github.com/MiguelPostalli/Lista-de-compras-2026",
      demo: "https://lista-de-compras-2026-lilac.vercel.app/login.html",
      tech: ["HTML", "CSS", "JavaScript", "Supabase"],
      heroTitle: "Lista de Compras",
      heroText: "Aplicativo de lista de compras completo com login/cadastro de usuário e persistência dos dados em nuvem via Supabase. Organize suas compras em qualquer dispositivo.",
      features: [
        { icon: "\u{1F511}", label: "Login e Cadastro" },
        { icon: "\u2601\uFE0F", label: "Dados em Nuvem" },
        { icon: "\u{1F4CB}", label: "Lista de Compras" },
      ],
      plans: [
        { name: "Gratuito", price: "R$ 0", items: ["Login e cadastro", "Lista de compras", "Sincronização na nuvem"] },
        { name: "Básico", price: "R$ 9,90", items: ["Tudo do gratuito", "Listas ilimitadas", "Suporte por email"] },
        { name: "Pro", price: "R$ 19,90", items: ["Tudo do básico", "Modo offline", "Prioridade no suporte"] },
      ],
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % projects.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [projects.length]);

  const active = projects[activeIndex];

  return (
    <section className="mini-projects" id="mini-projetos">
      <div className="container">
        <div className="section-header">
          <p className="section-label">// Mini Projetos</p>
          <h2 className="section-title">Projetos em Destaque</h2>
          <p className="section-desc">
            Confira alguns dos mini projetos desenvolvidos durante o curso.
          </p>
        </div>

        <div className="projects-grid">
          {projects.map((project) => (
            <div key={project.id} className="project-card">
              <div className="hud-corners" />
              <div className="project-card-image">
                {project.image ? (
                  <img src={project.image} alt={project.name} />
                ) : (
                  <div className="project-card-placeholder">
                    <span>{project.name.charAt(0)}</span>
                  </div>
                )}
              </div>
              <div className="project-card-content">
                <h3 className="project-card-title">{project.name}</h3>
                <p className="project-card-desc">{project.description}</p>
                <div className="project-card-tech">
                  {project.tech.map((tech) => (
                    <span key={tech} className="project-tech-tag">{tech}</span>
                  ))}
                </div>
                <div className="project-card-actions">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary"
                  >
                    GitHub
                  </a>
                  <a href={project.demo} className="btn-secondary">
                    Ver Projeto
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Carousel Detail Section */}
      <div className="streaming-fight-section" id="streaming-fight">
        <div className="container">
          <div className="carousel-dots">
            {projects.map((project, i) => (
              <button
                key={project.id}
                className={`carousel-dot${i === activeIndex ? " active" : ""}`}
                onClick={() => setActiveIndex(i)}
                aria-label={project.name}
              />
            ))}
          </div>

          <div className="streaming-fight-content carousel-fade" key={active.id}>
            <div className="streaming-fight-info">
              <h3>{active.heroTitle}</h3>
              <p>{active.heroText}</p>
              <div className="streaming-fight-features">
                {active.features.map((f) => (
                  <div className="feature-item" key={f.label}>
                    <span className="feature-icon">{f.icon}</span>
                    <span>{f.label}</span>
                  </div>
                ))}
              </div>
              <div className="streaming-fight-plans">
                <h4>Planos Disponíveis</h4>
                <div className="plans-grid">
                  {active.plans.map((plan) => (
                    <div className="plan-card" key={plan.name}>
                      <h5>{plan.name}</h5>
                      <p className="plan-price">{plan.price}</p>
                      <ul>
                        {plan.items.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
              <div className="streaming-fight-actions">
                <a
                  href={active.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                >
                  Ver no GitHub
                </a>
                <a href={active.demo} className="btn-secondary">
                  Ver Demo
                </a>
              </div>
            </div>
            <div className="streaming-fight-image">
              {active.image ? (
                <img src={active.image} alt={active.heroTitle} />
              ) : (
                <div className="streaming-fight-image-placeholder">
                  <span>{active.name.charAt(0)}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default MiniProjects;