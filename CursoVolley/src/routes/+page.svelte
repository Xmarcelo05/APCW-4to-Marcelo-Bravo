<script lang="ts">
  // Se añade la propiedad 'caption' para las descripciones de las fotos
  const itemsBase = [
    { type: 'image', src: "/Imagen1.webp", caption: "18/09/2021: Torneo Beach Vóley - 2do lugar - sub 16" },
    { type: 'image', src: '/Imagen2.webp', caption: "" },
    { type: 'image', src: '/Imagen3.webp', caption: "18/09/2021: Torneo Beach Vóley - 2do lugar - sub 16" },
    { type: 'image', src: '/Imagen4.webp', caption: "29/08/2024" },
    { type: 'image', src: "/Imagen5.webp", caption: "09/03/2022" },
    { type: 'image', src: '/Imagen6.webp', caption: "04/03/2024: 2do lugar - menores mujeres. 3er lugar - juvenil mujeres. 3er lugar - prejuvenil varones" },
    { type: 'image', src: '/Imagen7.webp', caption: "01/08/2021: Final de Campeonato - prejuvenil sub 15" },
    { type: 'image', src: '/Imagen8.webp', caption: "09/03/2025: Campeonato Nacional - 1er lugar U-17 Damas" },
    { type: 'image', src: "/Imagen9.webp", caption: "09/03/2025: Campeonato Nacional - 1er lugar U-13 Varones" },
    { type: 'image', src: '/Imagen10.webp', caption: "01/08/2021: Final de Campeonato - prejuvenil sub 15" },
    { type: 'image', src: '/Imagen11.webp', caption: "12/08/2024: 2da Edición Campeonato de legovolley" },
  ];

  const carouselItems = [...itemsBase, ...itemsBase, ...itemsBase];
  const whatsappLink = "https://wa.me/593998281613";
</script>

<nav class="navbar">
  <div class="logo-container">
    <div class="logo-circle">
      <img src="/Logo.webp" alt="Manta Logo" class="logo-img" />
    </div>
    <span class="brand-name">Academia Gl@di@dores</span>
  </div>
  
  <div class="cta-container">
    <a href={whatsappLink} target="_blank" class="btn-whatsapp">
      <span>¡ Inscríbete !</span>
      <img src="/WhatsApp.webp" alt="WA" class="btn-icon" />
    </a>
  </div>
</nav>

<main>
  <header class="hero">
    <img src="/Fondo5.webp" alt="Fondo Vóley" class="hero-bg"/>
    <div class="hero-overlay"></div>
    
    <div class="hero-content">
      <h1 id="titulo1">Volley de Playa y Sala</h1>
      <h2 id="titulo2">CURSOS VACACIONALES</h2>
      <p>Más que atletas, formamos personas con disciplina, pasión y compromiso.</p>
      <a href="#contacto" class="btn-yellow">Más información</a>
    </div>
    <div class="hero-border"></div>
  </header>

  <section class="content-wrapper">
    
    <div class="deco-stripe stripe-top-right"></div>

    <div class="features-grid">
      <div class="feature-card compact">
        <div class="image-box-compact">
          <img src="/Imagen11.webp" alt="Formación" />
        </div>
        <div class="text-box-compact">
          <span class="badge blue">Formación</span>
          <h3>Disciplina y Orden</h3>
          <p>Fomentamos el respeto y la constancia como base para ser personas de bien dentro y fuera de la cancha.</p>
        </div>
      </div>

      <div class="feature-card compact">
        <div class="image-box-compact1">
          <img src="/Imagen5.webp" alt="Equipo" />
        </div>
        <div class="text-box-compact">
          <span class="badge yellow">Valores</span>
          <h3>Trabajo en Equipo</h3>
          <p>Aprendemos que el compañerismo, la lealtad y el esfuerzo compartido son la clave del éxito.</p>
        </div>
      </div>
    </div>

    <div class="video-section">
        <div class="video-grid">
            <div class="video-column">
                <div class="sport-title-wrapper">
                  <div class="title-bar-left"></div>
                  <h2 class="section-title-small">Entrenamientos</h2>
                  <div class="title-bar-right"></div>
                </div>
                <div class="video-container">
                    <video src="/Video1.mp4" controls poster="/Imagen10.webp">
                        Tu navegador no soporta videos.
                    </video>
                </div>
            </div>

            <div class="video-column">
                <div class="sport-title-wrapper">
                  <div class="title-bar-left"></div>
                  <h2 class="section-title-small">Torneos</h2>
                  <div class="title-bar-right"></div>
                </div>
                <div class="video-container">
                    <video src="/Video2.mp4" controls poster="/Imagen3.webp">
                        Tu navegador no soporta videos.
                    </video>
                </div>
            </div>
        </div>
    </div>
    
  </section>

  <div class="achievements-section">
    <div class="container-center">
      <div class="sport-title-wrapper center">
         <h2 class="section-title">Nuestros Logros</h2>
      </div>
      
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-icon">👥</div>
          <h3 class="stat-number">+500</h3>
          <p>Jóvenes Formados</p>
        </div>
        <div class="stat-card">
          <div class="stat-icon">📅</div>
          <h3 class="stat-number">10 Años</h3>
          <p>Creando Disciplina</p>
        </div>
        <div class="stat-card">
          <div class="stat-icon">🤝</div> <h3 class="stat-number">100%</h3>
          <p>Compromiso</p>
        </div>
      </div>

      <div class="trainers-box">
        <div class="trainer-img-container">
            <img src="/Imagen12.webp" alt="Entrenadores" /> 
        </div>
        <div class="trainer-info">
            <h3>Nuestro Equipo de Formadores</h3>
            <p>
                Contamos con profesionales dedicados no solo a la enseñanza técnica del voleibol, 
                sino a la formación integral del carácter. Guiamos a cada alumno con paciencia, 
                ejemplo y exigencia para sacar su mejor versión.
            </p>
            <span class="trainer-quote">Entrenadores:</span>
            <p>
                - Nivel Básico: Prof. German Tomala<br>
                - Nivel Intermedio: Snaider Zambrano<br>
                - Nivel Avanzado: Bryan Cordero
            </p>
            <span class="trainer-quote">Coordinador General:</span>
            <p>- Lic. Julio Pineda</p>
        </div>
      </div>

    </div>
  </div>

  <section class="carousel-section">
    <div class="section-border-top"></div>
    <div class="carousel-content">
      <div class="section-header">
        <h2>Galería de Momentos</h2>
        <div class="underline-yellow"></div>
      </div>
      <div class="carousel-track">
        {#each carouselItems as item}
          <div class="carousel-card">
            <img src={item.src} alt="Momento del curso" />
            <div class="carousel-caption">
                <p>{item.caption}</p>
            </div>
          </div>
        {/each}
      </div>
    </div>
  </section>

  <footer id="contacto" class="footer">
    <div class="footer-grid">
      <div class="footer-info">
        <h3>Contacto</h3>
        <p>📍 Playa El Murciélago, Manta <br>📍Cancha Punto AS.</p>
        <p>👤 Lic. Julio Pineda</p>
        <p>📞 +593 0998281613</p>
      </div>
      <div class="footer-hours">
        <h3>Horarios de Atención</h3>
        <p>Lunes a Viernes: 8:00 - 18:00</p>
        <p>Sábados y Domingos 09:00 - 15:00</p>
      </div>
      <div class="footer-social">
        <h3>Síguenos</h3>
        <a href="https://www.instagram.com/gladiadores_academiaa/" target="_blank" class="ig-link">
            <img src="/Instagram.webp" alt="Instagram" class="ig-icon" />
        </a>
      </div>
    </div>
    <div class="footer-bottom">
      <p>&copy; 2026 Academia Gl@di@dores del Voleibol</p>
    </div>
  </footer>
</main>

<style>
  /* --- FUENTES E IMPORTACIONES --- */
  @import url('https://fonts.googleapis.com/css2?family=Candal&family=Inter:wght@300;400;700;900&family=Amaranth:ital@0;1&family=Carter+One&display=swap');

  :global(body) {
    margin: 0; padding: 0;
    overflow-x: hidden;
    width: 100%;
    font-family: 'Inter', sans-serif;
    background-color: #f8fafc;
    color: #1e293b;
    scroll-behavior: smooth;
  }

  :root {
    --primary-blue: #004aad;
    --dark-blue: #182b57;
    --accent-yellow: #FFD60A;
    --accent-cyan: #00a8e8;
  }

  /* --- NAVBAR --- */
  .navbar {
    position: fixed; top: 0; width: 100%; height: 80px;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
    border-bottom: 4px solid var(--accent-yellow); 
    display: flex; justify-content: space-between; align-items: center;
    padding: 0 5%; z-index: 1000; box-sizing: border-box;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.05);
  }
  .logo-container { display: flex; align-items: center; gap: 12px; }
  .logo-circle { width: 55px; display: flex; }
  .logo-img { width: 100%; height: auto; }
  .brand-name { 
    color: var(--primary-blue); padding-left: 5px;
    font-family: "Candal", sans-serif; font-size: 1.5rem; letter-spacing: 0.5px;
    display: none; 
  }
  @media (min-width: 768px) { .brand-name { display: block; } }

  .btn-whatsapp {
    background-color: #25b53e; color: white; padding: 10px 24px; 
    text-decoration: none; border-radius: 50px; font-weight: 700; font-size: 1rem;
    transition: all 0.3s ease; box-shadow: 0 4px 10px rgba(37, 211, 102, 0.3);
    display: flex; align-items: center; gap: 12px; 
  }
  .btn-whatsapp:hover { background-color: #20b85c; transform: translateY(-2px); }
  .btn-icon { width: 24px; height: 24px; object-fit: contain;}

  /* --- HERO --- */
  .hero {
    position: relative; min-height: 75vh; 
    display: flex; flex-direction: column; justify-content: center; align-items: center;
    overflow: hidden; color: white; 
    clip-path: polygon(0 0, 100% 0, 100% 90%, 0% 100%);
    margin-bottom: 20px;
  }
  .hero-bg { position: absolute; top: 80px; left: 0; width: 100%; height: 100%; object-fit: cover; z-index: 1; }
  .hero-overlay {
    position: absolute; top: 0; left: 0; width: 100%; height: 100%;
    background: linear-gradient(to bottom, rgba(0, 74, 173, 0.4), rgba(24, 43, 87, 0.8)); z-index: 2;
  }
  .hero-content {
    position: relative; z-index: 10; text-align: center;
    max-width: 900px; padding: 20px; margin-top: 60px;
  }
  .hero-border {
      position: absolute; bottom: 0; left: 0; width: 100%; height: 10px;
      background: var(--accent-yellow); z-index: 3;
      transform: translateY(-5px); 
  }

  #titulo1 {
    font-family:"Carter One", system-ui; font-size: clamp(2.5rem, 5vw, 4rem); color: white;
    text-transform: uppercase; text-shadow: 3px 3px 0px var(--primary-blue);
    letter-spacing: 1px; line-height: 1.1; margin-bottom: 10px;
  }
  #titulo2 {
    font-family: "Candal", sans-serif; font-size: clamp(2rem, 4vw, 3rem);
    color: var(--accent-yellow); margin: 0 0 25px 0;
    text-shadow: 2px 2px 4px rgba(0,0,0,0.8); font-weight: 700;
  }
  .hero p { font-size: 1.2rem; font-weight: 400; margin-bottom: 40px; opacity: 0.95; }
  
  .btn-yellow {
    cursor: pointer; display: inline-block;
    background-color: var(--accent-yellow); color: var(--dark-blue);
    padding: 15px 40px; border-radius: 5px; 
    text-decoration: none; font-weight: 900; text-transform: uppercase;
    /* BORDE DE DISEÑO EN BOTÓN */
    border: 2px solid var(--dark-blue);
    box-shadow: 5px 5px 0px var(--primary-blue); 
    transition: all 0.2s ease; transform: skew(-10deg); 
  }
  .btn-yellow:hover { transform: skew(-10deg) translate(2px, 2px); box-shadow: 2px 2px 0px var(--primary-blue); }

  /* --- CONTENT WRAP --- */
  .content-wrapper { 
    position: relative; padding: 40px 5%; background-color: #ffffff; z-index: 4;
    overflow: hidden; 
  }

  .deco-stripe {
      position: absolute;
      background: repeating-linear-gradient(45deg, rgba(0, 74, 173, 0.05), rgba(0, 74, 173, 0.05) 10px, transparent 10px, transparent 20px);
      z-index: 0;
  }
  .stripe-top-right { top: -50px; right: -100px; width: 400px; height: 400px; transform: rotate(15deg); }
  .stripe-middle-left {
      top: 40%; left: -150px; width: 300px; height: 600px;
      background: repeating-linear-gradient(-45deg, rgba(255, 214, 10, 0.1), rgba(255, 214, 10, 0.1) 20px, transparent 20px, transparent 60px);
      transform: rotate(-10deg);
  }

  /* FEATURES */
  .features-grid {
    display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 40px; max-width: 1100px; margin: 0 auto 80px auto; position: relative; z-index: 2;
  }
  .feature-card.compact {
    background: white; border-radius: 10px; overflow: hidden;
    /* CAMBIO: Borde más diseñado y sombra sólida */
    border: 3px solid var(--dark-blue);
    box-shadow: 8px 8px 0px var(--accent-yellow);
    transition: transform 0.3s ease; display: flex; flex-direction: column;
    aspect-ratio: 1 / 1; 
  }
  .feature-card.compact:hover { transform: translateY(-5px); box-shadow: 10px 10px 0px var(--primary-blue); }
  
  .image-box-compact {width: 100%;height: 200px;display: block; flex: 1; overflow: hidden; border-bottom: 3px solid var(--dark-blue); }
  .image-box-compact1 {width: 100%;height: 200px;display: block; flex: 1; overflow: hidden; border-bottom: 3px solid var(--dark-blue); }
  .image-box-compact img {object-position: top; width: 100%; height: 100%;display: block; object-fit: cover; transition: transform 0.5s; }
  .image-box-compact1 img {object-position: center; width: 100%; height: 100%;display: block; object-fit: cover; transition: transform 0.5s; }
  .feature-card.compact:hover .image-box-compact img { transform: scale(1.05); }
  .text-box-compact { padding: 25px; text-align: center; }
  .text-box-compact h3 { margin: 15px 0 10px; font-size: 1.5rem; color: var(--dark-blue); font-weight: 800; }
  .badge { padding: 6px 16px; border-radius: 4px; font-size: 0.8rem; font-weight: 800; text-transform: uppercase; display: inline-block; transform: skew(-10deg); border: 1px solid currentColor;}
  .badge.blue { background: #e0f2fe; color: var(--primary-blue); }
  .badge.yellow { background: #fffbeb; color: #b45309; }

  /* VIDEOS */
  .video-section { max-width: 1100px; margin: 0 auto 60px auto; position: relative; z-index: 2; }
  .video-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 40px; }
  .video-column { display: flex; flex-direction: column; align-items: center; }
  
  .sport-title-wrapper { display: flex; align-items: center; gap: 15px; margin-bottom: 25px; }
  .title-bar-left, .title-bar-right { width: 40px; height: 4px; background-color: var(--accent-yellow); transform: skew(-20deg); border: 1px solid var(--dark-blue); }
  .section-title-small { font-size: 2rem; color: var(--dark-blue); margin: 0; font-family: "Candal", sans-serif; text-transform: uppercase; letter-spacing: 1px; }

  .video-container {
      border-radius: 10px; overflow: hidden;
      /* CAMBIO: Borde más diseñado */
      border: 3px solid var(--dark-blue);
      box-shadow: 8px 8px 0px var(--accent-yellow); 
      background: #000; aspect-ratio: 1 / 1; width: 100%; 
  }
  .video-container video { width: 100%; height: 100%; display: block; object-fit: cover; }

  /* LOGROS Y ENTRENADORES */
  .achievements-section {
    background-color: #f0f9ff; 
    width: 100%; 
    padding-top: 40px;
    padding-bottom: 100px;
    border-top: 0px solid #e2e8f0;
  }
  
  .container-center {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto; 
    padding: 0 20px; 
    box-sizing: border-box;
  }

  .sport-title-wrapper.center { justify-content: center; margin-bottom: 50px; }
  .section-title { font-size: 2.5rem; color: var(--dark-blue); margin: 0; font-family: "Candal", sans-serif; }

  .stats-grid {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 40px;
    width: 100%;
    margin-bottom: 60px; /* Espacio antes de los entrenadores */
  }

  .stat-card {
    background: white; 
    padding: 40px 20px; 
    border-radius: 20px;
    /* CAMBIO: Borde más diseñado */
    border: 3px solid var(--dark-blue);
    box-shadow: 8px 8px 0px rgba(0,0,0,0.1); 
    border-top: 8px solid var(--accent-yellow); /* Borde superior más grueso */
    
    flex: 1 1 280px;
    max-width: 350px;
    min-width: 250px;
    text-align: center;
  }
  
  .stat-icon { font-size: 3.5rem; margin-bottom: 15px; display: block; margin: 0 auto 15px; }
  .stat-number { font-size: 3rem; font-weight: 900; color: var(--primary-blue); margin: 0; line-height: 1; }
  .stat-card p { color: #64748b; font-weight: 700; margin-top: 10px; font-size: 1.1rem; }

  /* --- NUEVOS ESTILOS: TARJETA DE ENTRENADORES --- */
  .trainers-box {
    background-color: white;
    border-radius: 20px;
    border: 3px solid var(--dark-blue);
    box-shadow: 10px 10px 0px var(--primary-blue);
    display: flex;
    overflow: hidden;
    max-width: 1100px;
    height: 400px;
    margin: 0 auto;
    flex-direction: row;
  }

  .trainer-img-container {
    flex: 1;
    min-width: 300px;
    border-right: 3px solid var(--dark-blue);
  }
  .trainer-img-container img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  .trainer-info {
    flex: 1.5;
    padding: 40px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-image: radial-gradient(#e0f2fe 1px, transparent 1px);
    background-size: 20px 20px;
  }

  .trainer-info h3 {
    font-family: "Candal", sans-serif;
    color: var(--dark-blue);
    font-size: 1.8rem;
    margin-top: 0;
    margin-bottom: 15px;
  }
  .trainer-info p {
    font-size: 1.1rem;
    line-height: 1.6;
    color: #334155;
    margin-bottom: 20px;
  }
  .trainer-quote {
    font-weight: 900;
    color: var(--primary-blue);
    font-style: italic;
    font-size: 1.2rem;
  }


  /* CARRUSEL */
  .carousel-section { 
      position: relative; background-color: var(--dark-blue); padding: 80px 0;
      clip-path: polygon(0 10%, 100% 0, 100% 100%, 0% 100%);
      margin-top: -50px; 
      padding-top: 100px; 
      z-index: 5; 
  }
  .section-border-top {
      position: absolute; top: 0; left: 0; width: 100%; height: 10px;
      background: var(--accent-yellow); top: 10px; 
  }
  
  .carousel-content { overflow: hidden; }
  .section-header { text-align: center; margin-bottom: 60px; color: white; }
  .section-header h2 { font-size: 2.5rem; font-family: "Candal", sans-serif; } 
  .underline-yellow { width: 100px; height: 6px; background: var(--accent-yellow); margin: 20px auto; border-radius: 10px; }

  .carousel-track { display: flex; gap: 30px; width: max-content; animation: scroll-infinito 60s linear infinite; }
  .carousel-card { 
    width: 300px; height: 300px; flex-shrink: 0; 
    border-radius: 10px; overflow: hidden; 
    border: 4px solid white; 
    box-shadow: 0 5px 15px rgba(0,0,0,0.3);
    position: relative; /* Para posicionar el texto encima */
  }
  .carousel-card img { width: 100%; height: 100%; object-fit: cover; display: block; }
  
  /* NUEVO: Descripción sobre la imagen del carrusel */
  .carousel-caption {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    background: linear-gradient(to top, rgba(0,0,0,0.9), transparent);
    color: white;
    padding: 20px 10px 10px;
    box-sizing: border-box;
    text-align: center;
  }
  .carousel-caption p {
    margin: 0;
    font-size: 0.9rem;
    font-weight: 600;
    text-shadow: 1px 1px 2px black;
  }

  @keyframes scroll-infinito { 0% { transform: translateX(0); } 100% { transform: translateX(calc(-33.33% - 15px)); } }

  /* FOOTER */
  .footer { background-color: var(--dark-blue); color: #cbd5e1; padding: 60px 5% 30px; border-top: 1px solid rgba(255,255,255,0.1); }
  .footer-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 50px; max-width: 1200px; margin: 0 auto; }
  .footer h3 { color: var(--accent-yellow); margin-bottom: 25px; font-weight: 700; font-size: 1.3rem; }
  .footer p { margin-bottom: 15px; line-height: 1.6; }
  
  .ig-link { display: inline-block; transition: transform 0.3s ease; }
  .ig-link:hover { transform: scale(1.1); }
  .ig-icon { width: 100px; height: auto; display: block; }
  .footer-bottom { margin-top: 60px; padding-top: 20px; border-top: 1px solid rgba(255,255,255,0.05); text-align: center; font-size: 0.9rem; opacity: 0.6; }

  /* AJUSTES CELULAR */
  @media (max-width: 600px) {
    .features-grid {
      grid-template-columns: 1fr;
      gap: 20px;
    }

    .feature-card.compact {
      aspect-ratio: auto;
      height: auto;
    }

    .image-box-compact, .image-box-compact1 {
      height: 200px;
    }

    /* Ajuste para la nueva caja de entrenadores en celular */
    .trainers-box {
        flex-direction: column;
    }
    .trainer-img-container {
        border-right: none;
        border-bottom: 3px solid var(--dark-blue);
        height: 250px;
    }
    .trainer-info {
        padding: 25px;
        text-align: center;
    }

    /* --- LOGROS MÁS PEQUEÑOS EN CELULAR --- */
    .stats-grid {
      display: flex;
      flex-direction: column; 
      align-items: center;    
      gap: 20px;              
    }

    .stat-card {
      flex: 0 1 auto;
      width: 80%;             
      max-width: 280px;       
      padding: 20px 15px;     
    }

    .stat-icon {
      font-size: 2.5rem;      
      margin-bottom: 10px;
    }

    .stat-number {
      font-size: 2rem;        
    }

    .stat-card p {
      font-size: 0.9rem;      
    }
  }
</style>