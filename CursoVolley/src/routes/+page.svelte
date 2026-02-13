<script lang="ts">
  import Icon from '@iconify/svelte';
  import { onMount } from 'svelte';
  import { fade, fly } from 'svelte/transition';
  
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

  // Aumentamos a 10 repeticiones para cubrir resoluciones ultra-anchas o zoom-out agresivo
  const carouselItems = Array(10).fill(itemsBase).flat();
  
  // Mensaje personalizado para WhatsApp
  const mensajeWA = encodeURIComponent("Hola, quisiera saber más detalles de su curso");
  const whatsappLink = `https://wa.me/593998281613?text=${mensajeWA}`;
  
  // Variables para animación de conteo
  let numeroJovenes = 0;
  let numeroAnios = 0;
  let numeroCompromiso = 0;
  let seccionVisible = false;
  
  // Variables para control de videos
  let videoPlaying1 = false;
  let videoPlaying2 = false;
  
  function toggleVideo(videoNumber: number) {
    if (videoNumber === 1) {
      const video = document.getElementById('video1') as HTMLVideoElement;
      if (video.paused) {
        video.play();
        videoPlaying1 = true;
      } else {
        video.pause();
        videoPlaying1 = false;
      }
    } else {
      const video = document.getElementById('video2') as HTMLVideoElement;
      if (video.paused) {
        video.play();
        videoPlaying2 = true;
      } else {
        video.pause();
        videoPlaying2 = false;
      }
    }
  }

  // Función para animar conteo
  function animarConteo(inicio: number, fin: number, duracion: number, callback: (valor: number) => void) {
    const incremento = (fin - inicio) / (duracion / 16);
    let actual = inicio;
    const intervalo = setInterval(() => {
      actual += incremento;
      if ((incremento > 0 && actual >= fin) || (incremento < 0 && actual <= fin)) {
        actual = fin;
        clearInterval(intervalo);
      }
      callback(Math.floor(actual));
    }, 16);
  }

  onMount(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !seccionVisible) {
          seccionVisible = true;
          animarConteo(0, 500, 2000, (val) => numeroJovenes = val);
          animarConteo(0, 10, 1500, (val) => numeroAnios = val);
          animarConteo(0, 100, 2500, (val) => numeroCompromiso = val);
        }
      });
    }, { threshold: 0.3 });

    const seccionLogros = document.querySelector('.achievements-section');
    if (seccionLogros) observer.observe(seccionLogros);

    return () => observer.disconnect();
  });
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
        <div class="section-header-videos">
          <h2 class="section-title-videos">Vive la Experiencia</h2>
          <p class="section-subtitle-videos">Descubre cómo entrenamos y competimos</p>
        </div>
        
        <div class="video-grid">
            <div class="video-card group">
                <span class="video-label">Entrenamientos</span>
                <div class="video-wrapper">
                    <video id="video1" src="/Video1.mp4" poster="/Imagen10.webp" loop muted playsinline>
                        <track kind="captions" />
                        Tu navegador no soporta videos.
                    </video>
                    <button 
                        class="video-overlay {videoPlaying1 ? 'playing' : ''}" 
                        on:click={() => toggleVideo(1)}
                        aria-label={videoPlaying1 ? 'Pausar video' : 'Reproducir video'}
                    >
                        <div class="overlay-content">
                            <Icon 
                                icon={videoPlaying1 ? "solar:pause-circle-bold-duotone" : "solar:play-circle-bold-duotone"} 
                                width={videoPlaying1 ? "60" : "80"}
                                height={videoPlaying1 ? "60" : "80"}
                            />
                            {#if !videoPlaying1}
                                <span class="play-text">Ver entrenamiento</span>
                            {/if}
                        </div>
                    </button>
                </div>
            </div>

            <div class="video-card group">
                <span class="video-label">Torneos</span>
                <div class="video-wrapper">
                    <video id="video2" src="/Video2.mp4" poster="/Imagen3.webp" loop muted playsinline>
                        <track kind="captions" />
                        Tu navegador no soporta videos.
                    </video>
                    <button 
                        class="video-overlay {videoPlaying2 ? 'playing' : ''}" 
                        on:click={() => toggleVideo(2)}
                        aria-label={videoPlaying2 ? 'Pausar video' : 'Reproducir video'}
                    >
                        <div class="overlay-content">
                            <Icon 
                                icon={videoPlaying2 ? "solar:pause-circle-bold-duotone" : "solar:play-circle-bold-duotone"} 
                                width={videoPlaying2 ? "60" : "80"}
                                height={videoPlaying2 ? "60" : "80"}
                            />
                            {#if !videoPlaying2}
                                <span class="play-text">Ver competencia</span>
                            {/if}
                        </div>
                    </button>
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
        {#if seccionVisible}
          <div class="stat-card" in:fly={{ y: 50, duration: 800, delay: 0 }}>
            <div class="stat-icon">
              <Icon icon="solar:users-group-two-rounded-bold-duotone" width="56" height="56" />
            </div>
            <h3 class="stat-number">+{numeroJovenes}</h3>
            <p>Jóvenes Formados</p>
          </div>
          
          <div class="stat-card" in:fly={{ y: 50, duration: 800, delay: 200 }}>
            <div class="stat-icon">
              <Icon icon="solar:calendar-bold-duotone" width="56" height="56" />
            </div>
            <h3 class="stat-number">{numeroAnios} Años</h3>
            <p>Creando Disciplina</p>
          </div>
          
          <div class="stat-card" in:fly={{ y: 50, duration: 800, delay: 400 }}>
            <div class="stat-icon">
              <Icon icon="solar:hand-shake-bold-duotone" width="56" height="56" />
            </div>
            <h3 class="stat-number">{numeroCompromiso}%</h3>
            <p>Compromiso</p>
          </div>
        {/if}
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
                - Nivel Básico: German Tomala<br>
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
  <section class="sponsors-section">
  <div class="container-center">
    <h2 class="sponsors-title">Nuestros Patrocinadores</h2>
    
    <div class="sponsors-flex">
      <div class="sponsor-card">
        <span class="sponsor-name">Trofeos los Ídolos</span>
      </div>

      <a href="https://www.instagram.com/bordadex.ec" target="_blank" rel="noopener noreferrer" class="sponsor-card">
        <span class="sponsor-name">@todopersonalizalo</span>
      </a>

      <a href="https://www.instagram.com/todopersonalizalo" target="_blank" rel="noopener noreferrer" class="sponsor-card">
        <span class="sponsor-name">@bordadex.ec</span>
      </a>
    </div>

  </div>
</section>

  <footer id="contacto" class="footer">
    <!-- Separador Wave SVG -->
    <div class="wave-separator">
      <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
        <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" fill="currentColor"></path>
        <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" fill="currentColor"></path>
        <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" fill="currentColor"></path>
      </svg>
    </div>
    
    <div class="footer-container">
      <div class="footer-grid">
        <div class="footer-info">
          <h3>Contacto</h3>
          <p>
            <Icon icon="solar:map-point-bold-duotone" width="20" height="20" class="inline-icon" />
            Playa El Murciélago, Manta
          </p>
          <p>
            <Icon icon="solar:map-point-bold-duotone" width="20" height="20" class="inline-icon" />
            Cancha Punto AS.
          </p>
          <p>
            <Icon icon="solar:user-bold-duotone" width="20" height="20" class="inline-icon" />
            Lic. Julio Pineda
          </p>
          <div class="phone-section">
            <p>
              <Icon icon="solar:phone-bold-duotone" width="20" height="20" class="inline-icon" />
              <a href="tel:+593998281613" class="phone-link">+593 0998281613</a>
            </p>
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer" class="btn-whatsapp-footer" aria-label="Contactar al Lic. Julio Pineda por WhatsApp">
              <Icon icon="logos:whatsapp-icon" width="18" height="18" />
              Escríbenos
            </a>
          </div>
        </div>
        
        <div class="footer-hours">
          <h3>Horarios de Atención</h3>
          <p>
            <Icon icon="solar:calendar-bold-duotone" width="20" height="20" class="inline-icon" />
            Lunes a Viernes: 8:00 - 18:00
          </p>
          <p>
            <Icon icon="solar:calendar-bold-duotone" width="20" height="20" class="inline-icon" />
            Sábados y Domingos: 09:00 - 15:00
          </p>
        </div>
        
        <div class="footer-social">
          <h3>Síguenos</h3>
          <div class="social-links">
            <a href="https://www.instagram.com/gladiadores_academiaa/" target="_blank" class="social-link">
              <img src="/Instagram.webp" alt="Instagram" class="instagram-icon" />
            </a>
            <a href="https://www.facebook.com/people/Academia-Gladiadores/61572458251613/" target="_blank" class="social-link">
              <img src="/LogoFace.webp" alt="Facebook" class="facebook-icon" />
            </a>
          </div>
        </div>
        
        <div class="footer-brand">
          <div class="footer-logo">
            <img src="/Logo.webp" alt="Logo Academia" />
          </div>
          <p class="brand-text">Academia Gl@di@dores</p>
          <p class="brand-subtitle">Formando Campeones</p>
        </div>
      </div>
      
      <div class="footer-bottom">
        <p>&copy; 2026 Academia Gl@di@dores del Voleibol</p>
      </div>
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
  .video-section { 
    max-width: 1200px; 
    margin: 0 auto 80px auto; 
    position: relative; 
    z-index: 2;
    padding: 60px 20px;
    background: linear-gradient(135deg, #f8fafc 0%, #e0f2fe 100%);
    border-radius: 30px;
  }
  
  .section-header-videos {
    text-align: center;
    margin-bottom: 50px;
  }
  
  .section-title-videos {
    font-size: 2.8rem;
    color: var(--dark-blue);
    margin: 0 0 15px 0;
    font-family: "Candal", sans-serif;
    text-transform: uppercase;
    letter-spacing: 1px;
  }
  
  .section-subtitle-videos {
    font-size: 1.2rem;
    color: #64748b;
    font-weight: 500;
    margin: 0;
  }
  
  .video-grid { 
    display: grid; 
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); 
    gap: 40px;
  }
  
  .video-card {
    position: relative;
    border-radius: 24px;
    overflow: hidden;
    box-shadow: 
      0 20px 60px rgba(0, 0, 0, 0.15),
      0 0 0 1px rgba(255, 255, 255, 0.1);
    transition: all 0.4s ease;
    background: white;
  }
  
  .video-card:hover {
    transform: translateY(-8px);
    box-shadow: 
      0 30px 80px rgba(0, 74, 173, 0.25),
      0 0 0 2px var(--accent-yellow);
  }
  
  .video-label {
    position: absolute;
    top: 20px;
    left: 20px;
    z-index: 10;
    background: rgba(0, 0, 0, 0.7);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    color: white;
    padding: 8px 20px;
    border-radius: 50px;
    font-weight: 700;
    font-size: 0.9rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    border: 2px solid var(--accent-yellow);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
  }
  
  .video-wrapper {
    position: relative;
    width: 100%;
    aspect-ratio: 1 / 1;
    overflow: hidden;
  }
  
  .video-wrapper video {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
  
  .video-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0, 31, 63, 0.3);
    backdrop-filter: blur(0px);
    -webkit-backdrop-filter: blur(0px);
    cursor: pointer;
    border: none;
    transition: all 0.4s ease;
    z-index: 5;
  }
  
  .video-card:hover .video-overlay {
    background: rgba(0, 31, 63, 0.6);
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
  }
  
  .video-overlay.playing {
    background: transparent;
    opacity: 0;
  }
  
  .video-overlay.playing:hover {
    opacity: 1;
    background: rgba(0, 0, 0, 0.3);
  }
  
  .overlay-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: white;
    filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.5));
    transition: all 0.3s ease;
  }
  
  .video-card:hover .overlay-content {
    transform: scale(1.08);
    color: var(--accent-yellow);
  }
  
  .play-text {
    display: block;
    color: white;
    font-weight: 700;
    font-size: 1rem;
    margin-top: 15px;
    opacity: 0;
    transform: translateY(10px);
    transition: all 0.3s ease;
    text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.8);
  }
  
  .video-card:hover .play-text {
    opacity: 1;
    transform: translateY(0);
  }

  /* LOGROS Y ENTRENADORES */
  .achievements-section {
    background: linear-gradient(135deg, #182b57 0%, #004aad 100%);
    width: 100%; 
    padding-top: 60px;
    padding-bottom: 100px;
    border-top: 0px solid #e2e8f0;
    position: relative;
    overflow: hidden;
    text-align: center;
  }
  
  .achievements-section::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: 
      radial-gradient(circle at 20% 50%, rgba(255, 214, 10, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 80% 80%, rgba(0, 168, 232, 0.1) 0%, transparent 50%);
    pointer-events: none;
  }
  
  .container-center {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto; 
    padding: 0 20px; 
    box-sizing: border-box;
  }

  .sport-title-wrapper.center { justify-content: center; margin-bottom: 50px; }
  .section-title { 
    font-size: 2.5rem; 
    color: white; 
    margin: 0; 
    font-family: "Candal", sans-serif;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  }

  .stats-grid {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 40px;
    width: 100%;
    margin-bottom: 60px; /* Espacio antes de los entrenadores */
  }

  .stat-card {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    padding: 40px 20px; 
    border-radius: 24px;
    border: 2px solid rgba(255, 255, 255, 0.2);
    box-shadow: 
      0 8px 32px rgba(0, 0, 0, 0.2),
      inset 0 1px 0 rgba(255, 255, 255, 0.3);
    border-top: 6px solid var(--accent-yellow);
    
    flex: 1 1 280px;
    max-width: 350px;
    min-width: 250px;
    text-align: center;
    transition: all 0.4s ease;
    position: relative;
    overflow: hidden;
  }
  
  .stat-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, transparent 100%);
    opacity: 0;
    transition: opacity 0.4s ease;
  }
  
  .stat-card:hover {
    transform: translateY(-10px) scale(1.02);
    border-color: rgba(255, 214, 10, 0.5);
    box-shadow: 
      0 20px 60px rgba(255, 214, 10, 0.3),
      inset 0 1px 0 rgba(255, 255, 255, 0.4);
  }
  
  .stat-card:hover::before {
    opacity: 1;
  }
  
  .stat-icon { 
    font-size: 3.5rem; 
    margin-bottom: 20px; 
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--accent-yellow);
    filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3));
    transition: transform 0.4s ease;
  }
  
  .stat-card:hover .stat-icon {
    transform: scale(1.1) rotate(5deg);
  }
  
  .stat-number { 
    font-size: 3.5rem; 
    font-weight: 900; 
    color: white; 
    margin: 0; 
    line-height: 1;
    text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.4);
    background: linear-gradient(135deg, #ffffff 0%, var(--accent-yellow) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  
  .stat-card p { 
    color: rgba(255, 255, 255, 0.9); 
    font-weight: 600; 
    margin-top: 15px; 
    font-size: 1.1rem;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
  }

  /* --- NUEVOS ESTILOS: TARJETA DE ENTRENADORES --- */
  .trainers-box {
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border-radius: 20px;
    border: 2px solid rgba(255, 255, 255, 0.3);
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
    display: flex;
    overflow: hidden;
    max-width: 1100px;
    height: 400px;
    margin: 0 auto;
    flex-direction: row;
    position: relative;
    z-index: 1;
  }

  .trainer-img-container {
    flex: 1;
    min-width: 300px;
    border-right: 2px solid rgba(255, 255, 255, 0.2);
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
    background: rgba(255, 255, 255, 0.05);
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
    text-align: left;
  }
  .trainer-quote {
    font-weight: 900;
    color: var(--primary-blue);
    font-style: italic;
    font-size: 1.2rem;
    text-align: left;
  }


  /* CARRUSEL */
  .carousel-section { 
      position: relative; background-color: var(--dark-blue); padding: 80px 0;
      clip-path: polygon(0 1.5%, 100% 0, 100% 100%, 0% 100%);
      margin-top: -25px; 
      padding-top: 110px; 
      z-index: 5;
      width: 100vw;
      left: 50%;
      right: 50%;
      margin-left: -50vw;
      margin-right: -50vw;
      overflow: hidden;
  }

  .sponsors-section {
    background-color: #f8fafc;
    margin-top: 40px;
    padding: 50px 0; /* Un poco más de respiro arriba y abajo */
    text-align: center;
    border-bottom: 2px solid #e2e8f0;
  }

  .sponsors-title {
    font-size: 1.8rem;
    font-family: "Candal", sans-serif;
    color: var(--dark-blue); /* Asumo que tienes esta variable, si no usa #1e3a8a */
    margin-bottom: 30px;
  }

  /* Nuevo contenedor Flexbox */
  .sponsors-flex {
    display: flex;
    flex-wrap: wrap; /* Para que bajen a la siguiente línea en celulares */
    justify-content: center;
    gap: 40px; /* Separación entre tarjetas */
    max-width: 900px;
    margin: 0 auto;
    padding: 0 20px;
  }

  /* Estilo de cada tarjeta de patrocinador */
  .sponsor-card {
    font-size: 10px;
    background-color: #ffffff;
    border: 1px solid #e2e8f0;
    border-radius: 10px;
    padding: 10px 30px;
    text-decoration: none;
    color: #475569;
    font-weight: 600;
    font-size: 1.1rem;
    box-shadow: 0 2px 4px rgba(0,0,0,0.05);
    transition: all 0.3s ease; /* Suaviza la animación */
  }

  /* Efecto al pasar el mouse (Hover) */
  .sponsor-card:hover {
    transform: translateY(-5px); /* Se levanta un poquito */
    box-shadow: 0 8px 15px rgba(0,0,0,0.1);
    border-color: #fbbf24; /* Color amarillo de tu web */
    color: var(--dark-blue); 
  }
  .section-border-top {
      position: absolute; top: 0; left: 0; width: 100%; height: 10px;
      background: var(--accent-yellow); top: 10px; 
  }
  
  .carousel-content { overflow: hidden; }
  .section-header { text-align: center; margin-bottom: 60px; color: white; }
  .section-header h2 { font-size: 2.5rem; font-family: "Candal", sans-serif; } 
  .underline-yellow { width: 100px; height: 6px; background: var(--accent-yellow); margin: 20px auto; border-radius: 10px; }

  .carousel-track { 
    display: flex; 
    gap: 30px; 
    width: max-content; 
    animation: scroll-infinito 60s linear infinite; 
    will-change: transform;
  }
  .carousel-card { 
    width: 300px; 
    height: 300px; 
    flex-shrink: 0; 
    border-radius: 12px; 
    overflow: hidden; 
    border: 4px solid white; 
    box-shadow: 0 5px 15px rgba(0,0,0,0.3);
    position: relative;
  }
  .carousel-card img { width: 100%; height: 100%; object-fit: cover; display: block; }
  
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
    z-index: 2;
  }
  .carousel-caption p {
    margin: 0;
    font-size: 0.9rem;
    font-weight: 600;
    text-shadow: 1px 1px 2px black;
  }

  @keyframes scroll-infinito { 
    0% { transform: translateX(0); } 
    100% { transform: translateX(calc(-10% - 3px)); } 
  }

  /* Media query específica para el carrusel en móviles */
  @media (max-width: 768px) {
    .section-border-top {
      display: none;
    }
    .carousel-section {
      padding: 120px 0 60px 0;
      clip-path: polygon(0 40px, 100% 0, 100% 100%, 0% 100%);
      margin-top: -100px;
      width: 100vw;
      left: 50%;
      right: 50%;
      margin-left: -50vw;
      margin-right: -50vw;
    }
    .section-header {
      margin-bottom: 30px;
    }
    .section-header h2 {
      font-size: 1.9rem;
      line-height: 1.3;
      padding: 0 20px;
    }
    .carousel-card {
      width: 240px;
      height: 240px;
    }
    @keyframes scroll-infinito { 
      0% { transform: translateX(0); } 
      100% { transform: translateX(calc(-10% - 3px)); } 
    }
  }

  /* FOOTER */
  .footer { 
    background-color: var(--dark-blue); 
    color: #cbd5e1; 
    position: relative;
  }
  
  .wave-separator {
    position: relative;
    width: 100%;
    overflow: hidden;
    line-height: 0;
    transform: rotate(180deg);
    margin-bottom: -1px;
  }
  
  .wave-separator svg {
    position: relative;
    display: block;
    width: calc(100% + 1.3px);
    height: 80px;
    color: var(--dark-blue);
  }
  
  .footer-container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 40px 5% 0px;
  }
  
  .footer-grid { 
    display: grid; 
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); 
    gap: 50px; 
    margin-bottom: 40px;
  }
  
  .footer h3 { 
    color: var(--accent-yellow); 
    margin-bottom: 25px; 
    font-weight: 900; 
    font-size: 1.4rem;
    font-family: "Candal", sans-serif;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
  
  .footer p { 
    margin-bottom: 15px; 
    line-height: 1.8;
    display: flex;
    align-items: center;
    gap: 10px;
  }
  
  :global(.footer .inline-icon) {
    color: var(--accent-yellow);
    flex-shrink: 0;
  }
  
  .phone-section {
    display: flex;
    flex-direction: column;
    gap: 15px;
    margin-top: 20px;
  }
  
  .phone-link {
    color: #cbd5e1;
    text-decoration: none;
    transition: color 0.3s ease;
    font-weight: 600;
  }
  
  .phone-link:hover {
    color: var(--accent-yellow);
  }
  
  .btn-whatsapp-footer {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: linear-gradient(135deg, #25d366 0%, #128c7e 100%);
    color: white;
    padding: 10px 20px;
    border-radius: 50px;
    text-decoration: none;
    font-weight: 700;
    font-size: 0.95rem;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(37, 211, 102, 0.3);
    width: fit-content;
  }
  
  .btn-whatsapp-footer:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(37, 211, 102, 0.5);
    background: linear-gradient(135deg, #128c7e 0%, #25d366 100%);
  }
  
  .social-links {
    display: flex;
    gap: 15px;
    align-items: center;
  }
  
  .social-link { 
    display: inline-block; 
    transition: transform 0.4s ease, filter 0.3s ease;
    filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3));
  }
  
  .social-link:hover { 
    transform: scale(1.15) rotate(3deg);
    filter: drop-shadow(0 6px 12px rgba(255, 214, 10, 0.4));
  }
  
  .instagram-icon { 
    width: 100px; 
    height: auto; 
    display: block;
  }

  .facebook-icon { 
    width: 50px; 
    height: auto; 
    display: block;
  }
  
  .footer-brand {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 15px;
  }
  
  .footer-logo {
    width: 120px;
    height: 120px;
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border-radius: 50%;
    border: 3px solid var(--accent-yellow);
    padding: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.4s ease;
  }
  
  .footer-logo:hover {
    transform: scale(1.05) rotate(5deg);
    border-color: white;
    box-shadow: 0 0 30px rgba(255, 214, 10, 0.5);
  }
  
  .footer-logo img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  
  .brand-text {
    font-family: "Candal", sans-serif;
    font-size: 1.3rem;
    color: white;
    margin: 0;
    font-weight: 700;
  }
  
  .brand-subtitle {
    font-size: 0.95rem;
    color: var(--accent-yellow);
    font-weight: 600;
    font-style: italic;
    margin: 0;
  }
  
  .footer-bottom { 
    margin-top: 60px; 
    padding-top: 30px; 
    border-top: 2px solid rgba(255, 214, 10, 0.2); 
    text-align: center; 
    font-size: 0.9rem; 
    opacity: 0.8;
  }

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
        /* CRÍTICO: Altura automática para que quepa todo el texto nuevo */
        height: auto; 
    }
    .trainer-img-container {
        border-right: none;
        border-bottom: 2px solid rgba(255, 255, 255, 0.2);
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
    
    /* Footer responsive */
    .footer-grid {
      grid-template-columns: 1fr;
      gap: 40px;
    }
    
    .footer-brand {
      order: -1;
    }
    
    .phone-section {
      align-items: flex-start;
    }
    
    /* Video responsive */
    .video-section {
      padding: 40px 15px;
      border-radius: 20px;
    }
    
    .section-title-videos {
      font-size: 2rem;
    }
    
    .video-grid {
      grid-template-columns: 1fr;
      gap: 30px;
    }
    
    .video-label {
      font-size: 0.8rem;
      padding: 6px 16px;
      top: 15px;
      left: 15px;
    }
  }
</style>