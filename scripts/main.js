document.addEventListener("DOMContentLoaded", () => {
  initAppLoader();
  initNavigation();
  initReveal();
  initHeartRain();
  initMusicPlayer();
  initPhotoAlbum();
  initVideoAlbum();
  initDetailsMuseum();
  initStoryTimeline();
  initLoveLetters();
});

const songs = [
  {
    title: "Flores Amarillas para Yenni",
    artist: "Yenni & Lener",
    src: "audios/Flores Amarillas para Yenni.mp3",
    cover: "img/RAMOGIRASOL.png",
    message: "Esta cancion me recuerda a ti porque tiene esa luz amarilla que siento cada vez que pienso en tu sonrisa."
  },
  {
    title: "Cancion para Yenni",
    artist: "Lener para Yenni",
    src: "audios/Canción para Yenni.mp3",
    cover: "img/Amor1.jpeg",
    message: "La guardo como una carta cantada: una forma suave de decirte que eres mi lugar favorito."
  },
  {
    title: "Floricienta",
    artist: "Nuestro detalle amarillo",
    src: "audios/Floricienta.mp3",
    cover: "img/Amor2.jpeg",
    message: "Suena a flores, a ternura y a esos pequenos detalles que hacen que nuestro mundo sea mas bonito."
  },
  {
    title: "Amarte por mil años mas",
    artist: "Promesa Y&L",
    src: "audios/AMARTE POR MIL AÑOS MAS.mp3",
    cover: "img/Picnic1.jpeg",
    message: "La siento como una promesa suave: elegirnos con paciencia, ternura y ganas de seguir construyendo."
  },
  {
    title: "Te voy a amar",
    artist: "Axel",
    src: "audios/Te voy a amar-Axel (LETRA).mp3",
    cover: "img/CENANDO1.jpeg",
    message: "Una cancion para recordarte que mi amor por ti no depende de un solo dia bonito."
  },
  {
    title: "Mi persona favorita",
    artist: "Rio Roma",
    src: "audios/Río Roma - Mi Persona Favorita (Lyric Video).mp3",
    cover: "img/Amor3.jpeg",
    message: "Porque entre tantas personas, tu sigues siendo mi lugar favorito para volver."
  },
  {
    title: "Tu me cambiaste la vida",
    artist: "Rio Roma",
    src: "audios/Río Roma - Tú me cambiaste la vida (Letra).mp3",
    cover: "img/Amor4.jpeg",
    message: "Esta queda para todo lo que llego contigo y empezo a sentirse mas claro, mas dulce y mas nuestro."
  },
  {
    title: "Solo para ti",
    artist: "Camila",
    src: "audios/Sólo Para Ti - Camila  Letra.mp3",
    cover: "img/Ropa1.jpeg",
    message: "Una cancion que se siente como carta: hecha para ti, para tu corazon y para lo que despiertas en mi."
  },
  {
    title: "No hay nadie mas",
    artist: "Sebastian Yatra",
    src: "audios/Sebastián Yatra - No hay nadie más  LETRA.mp3",
    cover: "img/Ropa2.jpeg",
    message: "Para esos momentos donde solo quiero que recuerdes que te miro de una forma muy especial."
  },
  {
    title: "Darte un beso",
    artist: "Prince Royce",
    src: "audios/Prince Royce - Darte un Beso.mp3",
    cover: "img/Picnic2.jpeg",
    message: "Tiene esa alegria romantica que me recuerda a tus sonrisas y a las ganas de verte feliz."
  },
  {
    title: "Ojos Marrones",
    artist: "Lasso",
    src: "audios/Ojos Marrones - Lasso (Lyrics Version).mp3",
    cover: "img/Ropa3.jpeg",
    message: "La guardo como una forma bonita de decir que hay detalles tuyos que se me quedan en el alma."
  },
  {
    title: "Te encontre",
    artist: "El Vega",
    src: "audios/El Vega - Te encontre (Letra).mp3",
    cover: "img/WhatsApp Image 2026-09-16 at 12.13.41 AM (2).jpeg",
    message: "Porque encontrarte se siente como una de esas coincidencias que terminan cambiandolo todo."
  },
  {
    title: "Te encontre",
    artist: "Duo identico",
    src: "audios/dúo idéntico - te encontré  letra.mp3",
    cover: "img/WhatsApp Image 2026-09-16 at 12.13.42 AM (3).jpeg",
    message: "Otra version de la misma idea bonita: que llegar a ti fue una suerte que quiero cuidar."
  },
  {
    title: "Pensando en ti",
    artist: "Lua",
    src: "audios/LÚA - Pensando en ti [Letra].mp3",
    cover: "img/WhatsApp Image 2026-09-16 at 12.13.43 AM (1).jpeg",
    message: "Para esos ratitos donde apareces en mi mente sin avisar y todo se vuelve mas tierno."
  },
  {
    title: "Me gustas",
    artist: "JISA",
    src: "audios/JISA - Me Gustas (Letra).mp3",
    cover: "img/WhatsApp Image 2026-09-16 at 12.13.44 AM.jpeg",
    message: "Simple y directo: me gustas, me encantas y me haces sentir cosas bonitas."
  },
  {
    title: "Que bonito es querer",
    artist: "Ulices Chaidez y Sus Plebes",
    src: "audios/Que Bonito Es Querer - (Lyric Video) - Letras -  Ulices Chaidez y Sus Plebes - DEL Records 2018.mp3",
    cover: "img/RAMOROSASYTULIPANES.png",
    message: "Una cancion para celebrar esa forma tranquila y sincera de querer bonito."
  }
];

const memories = [
  {
    image: "img/Amor1.jpeg",
    title: "Donde empieza mi sonrisa",
    date: "Recuerdo Y&L",
    place: "Nuestro mundo",
    category: "nosotros",
    size: "feature",
    tilt: "-1.4deg",
    message: "Uno de esos momentos que quisiera volver a vivir una y otra vez, porque estas tu y todo se siente mas bonito."
  },
  {
    image: "img/Amor2.jpeg",
    title: "Mi lugar favorito",
    date: "Siempre tu",
    place: "A tu lado",
    category: "nosotros",
    size: "tall",
    tilt: "1.2deg",
    message: "Mi lugar favorito siempre sera a tu lado, incluso en los dias simples."
  },
  {
    image: "img/Picnic1.jpeg",
    title: "Picnic bonito",
    date: "Salida especial",
    place: "Un dia para guardar",
    category: "salidas",
    size: "tall",
    tilt: "-0.8deg",
    message: "Hay recuerdos que tienen olor a aire libre, risa tranquila y ganas de quedarse un poquito mas."
  },
  {
    image: "img/CENANDO1.jpeg",
    title: "Cena para recordar",
    date: "Momento especial",
    place: "Nuestra mesa",
    category: "especiales",
    size: "wide",
    tilt: "0.7deg",
    message: "Tu haces especial hasta el dia mas simple, incluso una cena se vuelve recuerdo cuando estas conmigo."
  },
  {
    image: "img/Amor3.jpeg",
    title: "Mirarte y quedarme",
    date: "Recuerdo nuestro",
    place: "Yenni & Lener",
    category: "nosotros",
    size: "normal",
    tilt: "1.6deg",
    message: "Esta foto se siente como una pausa: mirarte, sonreir y agradecer que existes."
  },
  {
    image: "img/Amor4.jpeg",
    title: "Lo bonito de nosotros",
    date: "Y ♥ L",
    place: "Nuestro pequeno mundo",
    category: "nosotros",
    size: "normal",
    tilt: "-1deg",
    message: "Recuerdos que quiero guardar para siempre, porque hablan de ti, de mi y de lo que estamos construyendo."
  },
  {
    image: "img/Picnic2.jpeg",
    title: "Dia tranquilo",
    date: "Picnic",
    place: "Una salida nuestra",
    category: "salidas",
    size: "wide",
    tilt: "0.8deg",
    message: "A veces la felicidad se parece a un dia sencillo, una foto bonita y tu cerca de mi."
  },
  {
    image: "img/Picnic3.jpeg",
    title: "Volveria ahi",
    date: "Salida bonita",
    place: "Con Yenni",
    category: "salidas",
    size: "normal",
    tilt: "-1.5deg",
    message: "Me gustan estos recuerdos porque tienen esa calma que solo aparece cuando estoy contigo."
  },
  {
    image: "img/Ropa1.jpeg",
    title: "Mi Yenni bonita",
    date: "Para admirarte",
    place: "Yenni",
    category: "yenni",
    size: "tall",
    tilt: "1deg",
    message: "Hay fotos que solo confirman lo que ya se: eres preciosa de una forma que me da ternura."
  },
  {
    image: "img/Ropa2.jpeg",
    title: "Tu luz",
    date: "Yenni",
    place: "Mi persona favorita",
    category: "yenni",
    size: "normal",
    tilt: "-0.8deg",
    message: "Tienes una luz que no necesita hacer ruido para quedarse en mi corazon."
  },
  {
    image: "img/Ropa3.jpeg",
    title: "Mi nina bonita",
    date: "Yenni",
    place: "Mi amor",
    category: "yenni",
    size: "normal",
    tilt: "1.4deg",
    message: "Una foto mas para recordarme que tengo la suerte de amar a alguien tan especial."
  },
  {
    image: "img/WhatsApp Image 2026-09-16 at 12.13.41 AM (2).jpeg",
    title: "Pequenos instantes",
    date: "Recuerdo guardado",
    place: "Nuestro album",
    category: "especiales",
    size: "normal",
    tilt: "-1.1deg",
    message: "Los pequenos instantes tambien merecen quedarse, porque juntos cuentan nuestra historia."
  },
  {
    image: "img/WhatsApp Image 2026-09-16 at 12.13.42 AM (3).jpeg",
    title: "Algo de nosotros",
    date: "Y ♥ L",
    place: "Recuerdos",
    category: "especiales",
    size: "normal",
    tilt: "1.1deg",
    message: "Cada imagen guarda una parte de lo que a veces no alcanzo a decirte con palabras."
  },
  {
    image: "img/WhatsApp Image 2026-09-16 at 12.13.43 AM (1).jpeg",
    title: "Para volver a mirar",
    date: "Siempre",
    place: "Nuestro mundo",
    category: "especiales",
    size: "tall",
    tilt: "-0.6deg",
    message: "Me gusta saber que podemos volver a estos momentos cuando queramos sentirnos cerquita."
  },
  {
    image: "img/WhatsApp Image 2026-09-16 at 12.13.44 AM.jpeg",
    title: "Un recuerdo mas",
    date: "Con amor",
    place: "Yenni & Lener",
    category: "especiales",
    size: "normal",
    tilt: "0.9deg",
    message: "Todo esto es una forma de decirte que lo nuestro merece guardarse con cuidado."
  }
];

const memoryFilters = [
  { id: "todos", label: "Todos" },
  { id: "nosotros", label: "Nosotros" },
  { id: "yenni", label: "Yenni" },
  { id: "salidas", label: "Salidas" },
  { id: "especiales", label: "Momentos especiales" }
];

const albumNotes = [
  "Mi lugar favorito siempre sera a tu lado.",
  "Recuerdos que quiero guardar para siempre.",
  "Tu haces especial hasta el dia mas simple.",
  "Y ♥ L"
];

const videos = [
  {
    src: "img/Amor1.mp4",
    poster: "img/Amor1.jpeg",
    title: "Un recuerdo que se mueve",
    date: "Y&L en video",
    category: "Nosotros",
    featured: true,
    message: "Hay momentos que una foto no alcanza a guardar. Este video queda como una pequena ventana a lo bonito que vivimos."
  },
  {
    src: "img/Amor2.mp4",
    poster: "img/Amor2.jpeg",
    title: "Mirarte otra vez",
    date: "Recuerdo nuestro",
    category: "Nosotros",
    message: "Me gusta poder volver a estos segundos y sentir que estas cerquita otra vez."
  },
  {
    src: "img/Amor3.mp4",
    poster: "img/Amor3.jpeg",
    title: "Instante bonito",
    date: "Momento especial",
    category: "Momentos especiales",
    message: "Un pedacito de nosotros que quiero guardar con calma, como quien guarda una cancion favorita."
  },
  {
    src: "img/Amor4.mp4",
    poster: "img/Amor4.jpeg",
    title: "Yenni & Lener",
    date: "Nuestro mundo",
    category: "Nosotros",
    message: "Estos recuerdos se sienten pequenos, pero para mi tienen todo el valor del mundo."
  },
  {
    src: "img/Amor5.mp4",
    poster: "img/Picnic2.jpeg",
    title: "Dia para recordar",
    date: "Salida bonita",
    category: "Salidas",
    message: "Me encanta cuando los dias simples terminan convirtiendose en recuerdos que no quiero soltar."
  },
  {
    src: "img/Amor6.mp4",
    poster: "img/CENANDO1.jpeg",
    title: "Lo nuestro en movimiento",
    date: "Con amor",
    category: "Momentos especiales",
    message: "Un video mas para este pequeno album, porque nuestra historia tambien merece verse en movimiento."
  }
];

const details = [
  {
    title: "Flores Universo Y&L",
    description: "Un pequeno universo dorado de flores, cartas y luz creado solo para Yenni.",
    date: "Publicado",
    image: "img/RAMOGIRASOL.png",
    category: "Experiencias",
    type: "Experiencia publicada",
    published: true,
    url: "./Vistas/flores-universo-yl/index.html",
    featured: true
  },
  {
    title: "Nuestro Corazon en Codigo",
    description: "Romance, medicina, juegos, cartas y recuerdos en una experiencia especial.",
    date: "Publicado",
    image: "img/CORAZON Y&L.png",
    category: "Juegos",
    type: "Experiencia publicada",
    published: true,
    url: "./Vistas/corazon-codigo/index.html"
  },
  {
    title: "Aniversario",
    description: "Una vista especial para guardar fechas, fotos, musica y palabras importantes.",
    date: "Publicado",
    image: "img/RAMOROSASYTULIPANES.png",
    category: "Aniversarios",
    type: "Experiencia publicada",
    published: true,
    url: "./Vistas/aniversario/index.html"
  },
  {
    title: "Mas proyectos proximamente 💌",
    description: "Todavia quedan muchas sorpresas, recuerdos y pequenos mundos por crear para ti.",
    date: "Proximamente",
    image: "img/flowers.png",
    category: "Experiencias",
    type: "Sorpresas en camino",
    published: false,
    url: null,
    featured: true
  }
];

const detailFilters = [];

function initAppLoader() {
  const loader = document.getElementById("appLoader");
  const progress = document.getElementById("loaderProgress");
  const percent = document.getElementById("loaderPercent");
  if (!loader) {
    document.body.classList.remove("app-loading");
    return;
  }

  const startedAt = performance.now();
  const minimumTime = 900;
  const criticalTasks = [
    waitForImage("img/Amor1.jpeg"),
    document.fonts ? document.fonts.ready.catch(() => {}) : Promise.resolve()
  ];

  setLoaderProgress(18);

  Promise.allSettled(criticalTasks.map((task, index) => (
    task.then(() => setLoaderProgress(index === 0 ? 68 : 84))
  ))).then(() => {
    const elapsed = performance.now() - startedAt;
    const remaining = Math.max(minimumTime - elapsed, 0);
    window.setTimeout(() => {
      setLoaderProgress(100);
      window.setTimeout(() => {
        loader.classList.add("is-done");
        document.body.classList.remove("app-loading");
        loader.addEventListener("transitionend", () => loader.remove(), { once: true });
      }, 240);
    }, remaining);
  });

  function setLoaderProgress(value) {
    const rounded = Math.max(0, Math.min(100, Math.round(value)));
    if (progress) progress.style.width = `${rounded}%`;
    if (percent) percent.textContent = `${rounded}%`;
  }
}

function waitForImage(src) {
  return new Promise((resolve) => {
    const image = new Image();
    image.decoding = "async";
    image.onload = () => {
      if (image.decode) {
        image.decode().then(resolve).catch(resolve);
        return;
      }
      resolve();
    };
    image.onerror = resolve;
    image.src = src;
  });
}

const storyTimeline = [
  {
    date: "Fecha por completar",
    title: "Como empezo nuestra historia",
    description: "Aqui comienza ese primer capitulo que todavia quiero escribir con calma: como nos acercamos, como empezamos a hablar y como algo sencillo empezo a sentirse especial.",
    image: "img/Amor1.jpeg",
    quote: "Algunas historias empiezan suavecito, pero se quedan para siempre.",
    highlight: true
  },
  {
    date: "Primeras conversaciones",
    title: "Cuando hablar contigo se volvio mi parte favorita",
    description: "Un espacio para guardar esas primeras conversaciones, risas y detalles que hicieron que pensarte se volviera natural.",
    image: "img/Amor2.jpeg",
    quote: "Contigo, incluso los momentos simples se sienten especiales.",
    highlight: false
  },
  {
    date: "Primer recuerdo especial",
    title: "Un momento que se quedo conmigo",
    description: "Hay recuerdos que no necesitan una fecha exacta para ser importantes. Basta mirar atras y saber que ese dia algo bonito se quedo en el corazon.",
    image: "img/Amor3.jpeg",
    quote: "Entre tantos dias, algunos se volvieron inolvidables.",
    highlight: false
  },
  {
    date: "Picnic",
    title: "Nuestro picnic bonito",
    description: "Un recuerdo tranquilo, lleno de calma y ternura, de esos que dan ganas de volver a vivir una y otra vez.",
    image: "img/Picnic1.jpeg",
    quote: "Mi lugar favorito siempre sera a tu lado.",
    highlight: true
  },
  {
    date: "Salida especial",
    title: "Dias que se sienten como fotografia",
    description: "Salidas, paseos y pequenos planes que fueron llenando nuestro album de momentos que quiero guardar para siempre.",
    image: "img/Picnic2.jpeg",
    quote: "Y todavia nos faltan muchos recuerdos por crear.",
    highlight: false
  },
  {
    date: "Cena para recordar",
    title: "Nuestra mesa, nuestras risas",
    description: "Una cena puede parecer simple, pero contigo hasta lo cotidiano se convierte en algo que quiero volver a mirar con amor.",
    image: "img/CENANDO1.jpeg",
    quote: "Tu haces especial hasta el dia mas simple.",
    highlight: false
  },
  {
    date: "Recuerdos favoritos",
    title: "Fotos que hablan de nosotros",
    description: "Cada imagen guarda una parte de lo que a veces no alcanzo a decirte: ternura, admiracion, alegria y ganas de seguir cuidando lo nuestro.",
    image: "img/Amor4.jpeg",
    quote: "Recuerdos que quiero guardar para siempre.",
    highlight: true
  },
  {
    date: "Hoy",
    title: "Nuestra historia todavia se esta escribiendo",
    description: "Este es el presente: un lugar donde seguimos sumando canciones, fotos, detalles y formas nuevas de decirnos amor.",
    image: "img/WhatsApp Image 2026-09-16 at 12.13.44 AM.jpeg",
    quote: "Nuestra historia todavia se esta escribiendo.",
    highlight: false
  }
];

const loveLetters = [
  {
    id: "cansada",
    title: "Cuando estes cansada",
    icon: "🌙",
    tone: "rose",
    preview: "Para recordarte que tambien mereces descansar.",
    message: "Mi amor, si estas cansada, no quiero que sientas que tienes que poder con todo al mismo tiempo. Respira un poquito. Estoy orgulloso de cada esfuerzo que haces, incluso de esos que nadie ve. Descansa sin culpa, porque tu corazon tambien merece calma.",
    signature: "Lener ♥"
  },
  {
    id: "dudes",
    title: "Cuando dudes de ti",
    icon: "✨",
    tone: "gold",
    preview: "Para esos dias en los que olvides lo capaz que eres.",
    message: "Yenni, cuando dudes de ti, quiero que recuerdes algo: yo he visto tu esfuerzo, tu inteligencia y esa forma tan bonita que tienes de seguir aunque algo cueste. No eres menos por tener miedo o dudas. Eres humana, valiente y capaz de llegar muy lejos.",
    signature: "Lener ♥"
  },
  {
    id: "extranhes",
    title: "Cuando me extranes",
    icon: "💌",
    tone: "pink",
    preview: "Para sentirme cerquita aunque no este a tu lado.",
    message: "Si me extranas, lee esto como si te estuviera abrazando suavecito. Yo tambien te llevo conmigo, en canciones, en detalles pequenos y en esas ganas de contarte todo. La distancia de un momento no cambia lo mucho que te amo.",
    signature: "Lener ♥"
  },
  {
    id: "mal-dia",
    title: "Cuando tengas un mal dia",
    icon: "🌷",
    tone: "peach",
    preview: "Para cubrirte el corazon con ternura.",
    message: "Amor, si hoy fue dificil, no tienes que fingir que todo esta bien. Ven aqui, aunque sea en palabras. Quiero que sepas que un mal dia no define tu vida ni tu valor. Manana puede sentirse mas ligero, y yo voy a seguir queriendote igual de bonito.",
    signature: "Lener ♥"
  },
  {
    id: "miedo",
    title: "Cuando tengas miedo",
    icon: "🫶",
    tone: "violet",
    preview: "Para que recuerdes que no estas sola.",
    message: "Mi Yenni, tener miedo no te hace debil. A veces solo significa que algo importa. Quiero caminar contigo tambien en esos momentos, sin apurarte, sin exigirte. Toma mi amor como una lucecita: pequena, constante y siempre cerca de ti.",
    signature: "Lener ♥"
  },
  {
    id: "cuanto-te-amo",
    title: "Cuando necesites recordar cuanto te amo",
    icon: "❤️",
    tone: "red",
    preview: "Para volver a leer lo enorme que eres para mi.",
    message: "Te amo en los dias buenos y en los dificiles. Te amo cuando sonries, cuando estas seria, cuando sueñas, cuando luchas y cuando solo necesitas silencio. Te amo por quien eres, por tu luz, por tu ternura y por todo lo que despiertas en mi.",
    signature: "Lener ♥"
  },
  {
    id: "doctora",
    title: "Para mi futura doctora",
    icon: "🩺",
    tone: "mint",
    preview: "Para celebrar tu esfuerzo y todo lo que admiro de ti.",
    message: "Mi futura doctora, admiro muchisimo la forma en que sigues adelante. Se que no siempre es facil, pero tu esfuerzo habla de la mujer fuerte y hermosa que eres. Yo creo en ti, en tus sueños y en todo lo bonito que vas a lograr.",
    signature: "Lener ♥"
  },
  {
    id: "esposa",
    title: "Para mi futura esposa",
    icon: "💍",
    tone: "special",
    preview: "Una carta especial para el futuro que sueño contigo.",
    message: "Mi futura esposa, me gusta imaginar un futuro donde sigamos eligiendonos con paciencia, respeto y amor. No hablo de perfeccion, hablo de hogar: de cuidarnos, reirnos, aprender y construir una vida donde tu sonrisa siga siendo mi lugar favorito.",
    signature: "Lener ♥"
  },
  {
    id: "logro",
    title: "Cuando logres algo importante",
    icon: "🌻",
    tone: "sun",
    preview: "Para celebrar tus victorias grandes y pequenas.",
    message: "Cuando logres algo importante, quiero que pauses un segundo y mires todo lo que hiciste para llegar ahi. Yo voy a estar feliz por ti, orgulloso de ti y con ganas de recordarte que cada paso tuyo merece celebrarse.",
    signature: "Lener ♥"
  },
  {
    id: "cualquier-dia",
    title: "Para leer cualquier dia",
    icon: "💖",
    tone: "cream",
    preview: "Porque no necesito una razon especial para amarte.",
    message: "Solo queria dejarte una carta para cualquier dia: te amo, Yenni. Gracias por existir, por tu forma de ser y por hacer que mi mundo tenga mas ternura. Ojala esta pagina te abrace un poquito cada vez que vuelvas a ella.",
    signature: "Lener ♥"
  }
];

function initNavigation() {
  const header = document.getElementById("siteHeader");
  const toggle = document.getElementById("navToggle");
  const nav = document.getElementById("mainNav");
  let scrollFrame = 0;

  const updateHeader = () => {
    header.classList.toggle("is-scrolled", window.scrollY > 18);
  };

  const requestHeaderUpdate = () => {
    if (scrollFrame) return;
    scrollFrame = requestAnimationFrame(() => {
      scrollFrame = 0;
      updateHeader();
    });
  };

  toggle.addEventListener("click", () => {
    const isOpen = header.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  nav.addEventListener("click", (event) => {
    if (!event.target.closest("a")) return;
    header.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
  });

  updateHeader();
  window.addEventListener("scroll", requestHeaderUpdate, { passive: true });
}

function initReveal() {
  const elements = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) {
    elements.forEach((element) => element.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.18 });

  elements.forEach((element) => observer.observe(element));
}

function initHeartRain() {
  const canvas = document.getElementById("heartRain");
  const ctx = canvas.getContext("2d");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let width = 0;
  let height = 0;
  let hearts = [];
  let frameId = 0;
  let resizeFrame = 0;
  let isRunning = false;

  const resize = () => {
    width = window.innerWidth;
    height = window.innerHeight;
    const ratio = Math.min(window.devicePixelRatio || 1, width < 720 ? 1.25 : 1.5);
    canvas.width = Math.floor(width * ratio);
    canvas.height = Math.floor(height * ratio);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    createHearts();
  };

  const createHearts = () => {
    const count = reduceMotion ? 10 : width < 720 ? 22 : 44;
    hearts = Array.from({ length: count }, () => makeHeart(width, height, true));
  };

  const drawHeart = (heart) => {
    ctx.save();
    ctx.translate(heart.x, heart.y);
    ctx.rotate(heart.rotation);
    ctx.globalAlpha = heart.alpha;
    ctx.filter = heart.blur ? `blur(${heart.blur}px)` : "none";
    ctx.fillStyle = heart.color;
    ctx.font = `${heart.size}px Georgia, serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("♥", 0, 0);
    ctx.restore();
  };

  const animate = () => {
    if (!isRunning) return;
    ctx.clearRect(0, 0, width, height);
    hearts.forEach((heart, index) => {
      heart.y += heart.speed;
      heart.x += Math.sin((heart.y + heart.phase) * 0.012) * heart.drift;
      heart.rotation += heart.spin;

      if (heart.y > height + 28) {
        hearts[index] = makeHeart(width, height, false);
      } else {
        drawHeart(heart);
      }
    });
    frameId = requestAnimationFrame(animate);
  };

  const start = () => {
    if (isRunning || document.hidden) return;
    isRunning = true;
    frameId = requestAnimationFrame(animate);
  };

  const stop = () => {
    isRunning = false;
    cancelAnimationFrame(frameId);
    frameId = 0;
  };

  const requestResize = () => {
    if (resizeFrame) return;
    resizeFrame = requestAnimationFrame(() => {
      resizeFrame = 0;
      resize();
      if (reduceMotion) {
        ctx.clearRect(0, 0, width, height);
        hearts.forEach(drawHeart);
      }
    });
  };

  resize();
  window.addEventListener("resize", requestResize, { passive: true });
  if (reduceMotion) {
    hearts.forEach(drawHeart);
  } else {
    start();
  }

  document.addEventListener("visibilitychange", () => {
    if (reduceMotion) return;
    if (document.hidden) {
      stop();
    } else {
      start();
    }
  });
}

function makeHeart(width, height, anywhere) {
  const far = Math.random() < 0.52;
  return {
    x: Math.random() * width,
    y: anywhere ? Math.random() * height : -20 - Math.random() * height * 0.22,
    size: far ? 7 + Math.random() * 5 : 10 + Math.random() * 7,
    speed: far ? 0.08 + Math.random() * 0.15 : 0.14 + Math.random() * 0.22,
    drift: far ? 0.08 + Math.random() * 0.12 : 0.12 + Math.random() * 0.18,
    spin: (Math.random() - 0.5) * 0.002,
    rotation: (Math.random() - 0.5) * 0.8,
    phase: Math.random() * 800,
    blur: far ? Math.random() * 1.4 : Math.random() * 0.4,
    alpha: far ? 0.05 + Math.random() * 0.05 : 0.08 + Math.random() * 0.07,
    color: Math.random() > 0.5 ? "#ffd7df" : "#ffe8a3"
  };
}

function initMusicPlayer() {
  const album = document.getElementById("musicAlbum");
  const audio = document.getElementById("ylAudio");
  const cover = document.getElementById("songCover");
  const title = document.getElementById("songTitle");
  const artist = document.getElementById("songArtist");
  const message = document.getElementById("songMessage");
  const playButton = document.getElementById("playSong");
  const previousButton = document.getElementById("prevSong");
  const nextButton = document.getElementById("nextSong");
  const progress = document.getElementById("songProgress");
  const currentTime = document.getElementById("currentTime");
  const duration = document.getElementById("songDuration");
  const volume = document.getElementById("songVolume");
  const shuffleButton = document.getElementById("shuffleSong");
  const repeatButton = document.getElementById("repeatSong");
  const playingState = document.getElementById("playingState");
  const songList = document.getElementById("songList");

  if (!album || !audio || !songs.length) return;

  let activeIndex = 0;
  let isShuffle = false;
  let repeatAlbum = true;

  audio.volume = Number(volume.value);
  renderSongList();
  loadSong(0, false);
  loadDurations();

  playButton.addEventListener("click", togglePlay);
  previousButton.addEventListener("click", () => changeSong(activeIndex - 1, true));
  nextButton.addEventListener("click", () => playNext(true));

  progress.addEventListener("input", () => {
    if (!Number.isFinite(audio.duration)) return;
    audio.currentTime = (Number(progress.value) / 100) * audio.duration;
  });

  volume.addEventListener("input", () => {
    audio.volume = Number(volume.value);
  });

  shuffleButton.addEventListener("click", () => {
    isShuffle = !isShuffle;
    shuffleButton.classList.toggle("is-active", isShuffle);
    shuffleButton.setAttribute("aria-pressed", String(isShuffle));
  });

  repeatButton.addEventListener("click", () => {
    repeatAlbum = !repeatAlbum;
    repeatButton.classList.toggle("is-active", repeatAlbum);
    repeatButton.setAttribute("aria-pressed", String(repeatAlbum));
    repeatButton.textContent = repeatAlbum ? "Repetir album" : "Detener al final";
  });

  audio.addEventListener("play", () => {
    album.classList.add("is-playing");
    playButton.textContent = "\u275a\u275a";
    playButton.setAttribute("aria-label", "Pausar cancion");
    playingState.textContent = "Reproduciendo";
  });

  audio.addEventListener("pause", () => {
    album.classList.remove("is-playing");
    playButton.textContent = "\u25b6";
    playButton.setAttribute("aria-label", "Reproducir cancion");
    playingState.textContent = audio.currentTime > 0 ? "Pausado" : "Listo para reproducir";
  });

  audio.addEventListener("loadedmetadata", updateProgress);
  audio.addEventListener("timeupdate", updateProgress);
  audio.addEventListener("ended", () => {
    if (activeIndex === songs.length - 1 && !repeatAlbum && !isShuffle) {
      audio.pause();
      audio.currentTime = 0;
      updateProgress();
      return;
    }
    playNext(true);
  });

  function renderSongList() {
    songList.innerHTML = "";
    songs.forEach((song, index) => {
      const item = document.createElement("button");
      item.className = "song-item";
      item.type = "button";
      item.dataset.index = String(index);
      item.innerHTML = `
        <span class="song-number">${String(index + 1).padStart(2, "0")}</span>
        <span class="song-thumb"><img src="${song.cover}" alt="" loading="lazy" decoding="async" /></span>
        <span class="song-meta">
          <strong>${song.title}</strong>
          <span>${song.artist}</span>
        </span>
        <span class="song-duration" data-duration="${index}">--:--</span>
      `;
      item.addEventListener("click", () => changeSong(index, true));
      songList.append(item);
    });
  }

  function loadSong(index, shouldPlay) {
    activeIndex = normalizeIndex(index);
    const song = songs[activeIndex];
    audio.src = song.src;
    cover.src = song.cover;
    cover.alt = `Portada de ${song.title}`;
    title.textContent = song.title;
    artist.textContent = song.artist;
    message.textContent = song.message;
    progress.value = "0";
    currentTime.textContent = "0:00";
    duration.textContent = "0:00";
    updateActiveSong();
    if (shouldPlay) playCurrent();
  }

  function changeSong(index, shouldPlay) {
    loadSong(index, shouldPlay);
  }

  function togglePlay() {
    if (audio.paused) {
      playCurrent();
    } else {
      audio.pause();
    }
  }

  function playCurrent() {
    audio.play().catch(() => {
      playingState.textContent = "Toca reproducir otra vez";
    });
  }

  function playNext(shouldPlay) {
    if (isShuffle && songs.length > 1) {
      let nextIndex = activeIndex;
      while (nextIndex === activeIndex) {
        nextIndex = Math.floor(Math.random() * songs.length);
      }
      changeSong(nextIndex, shouldPlay);
      return;
    }
    changeSong(activeIndex + 1, shouldPlay);
  }

  function updateProgress() {
    const total = Number.isFinite(audio.duration) ? audio.duration : 0;
    const current = Number.isFinite(audio.currentTime) ? audio.currentTime : 0;
    progress.value = total ? String((current / total) * 100) : "0";
    currentTime.textContent = formatTime(current);
    duration.textContent = total ? formatTime(total) : "0:00";
  }

  function updateActiveSong() {
    songList.querySelectorAll(".song-item").forEach((item) => {
      item.classList.toggle("is-active", Number(item.dataset.index) === activeIndex);
    });
  }

  function loadDurations() {
    let index = 0;
    const loadNext = () => {
      if (index >= songs.length) return;
      const song = songs[index];
      const probe = new Audio();
      probe.preload = "metadata";
      probe.src = song.src;
      probe.addEventListener("loadedmetadata", () => {
        const label = songList.querySelector(`[data-duration="${index}"]`);
        if (label) label.textContent = formatTime(probe.duration);
        probe.removeAttribute("src");
        probe.load();
        index += 1;
        scheduleIdle(loadNext);
      }, { once: true });
      probe.addEventListener("error", () => {
        index += 1;
        scheduleIdle(loadNext);
      }, { once: true });
    };
    scheduleIdle(loadNext);
  }
}

function scheduleIdle(callback) {
  if ("requestIdleCallback" in window) {
    window.requestIdleCallback(callback, { timeout: 1200 });
    return;
  }
  window.setTimeout(callback, 120);
}

function normalizeIndex(index) {
  if (index < 0) return songs.length - 1;
  if (index >= songs.length) return 0;
  return index;
}

function formatTime(seconds) {
  if (!Number.isFinite(seconds)) return "0:00";
  const minutes = Math.floor(seconds / 60);
  const rest = Math.floor(seconds % 60);
  return `${minutes}:${String(rest).padStart(2, "0")}`;
}

function initPhotoAlbum() {
  const album = document.getElementById("photoAlbum");
  const filters = document.getElementById("galleryFilters");
  const modal = document.getElementById("galleryModal");
  const modalImage = document.getElementById("galleryImage");
  const modalTitle = document.getElementById("galleryTitle");
  const modalDate = document.getElementById("galleryDate");
  const modalPlace = document.getElementById("galleryPlace");
  const modalMessage = document.getElementById("galleryMessage");
  const closeButton = document.getElementById("galleryClose");
  const previousButton = document.getElementById("galleryPrev");
  const nextButton = document.getElementById("galleryNext");

  if (!album || !filters || !modal || !memories.length) return;

  let activeFilter = "todos";
  let visibleMemories = [...memories];
  let activeIndex = 0;

  renderFilters();
  renderAlbum();

  closeButton.addEventListener("click", closeModal);
  previousButton.addEventListener("click", () => showMemory(activeIndex - 1));
  nextButton.addEventListener("click", () => showMemory(activeIndex + 1));
  modal.addEventListener("click", (event) => {
    if (event.target === modal) closeModal();
  });

  document.addEventListener("keydown", (event) => {
    if (modal.hidden) return;
    if (event.key === "Escape") closeModal();
    if (event.key === "ArrowLeft") showMemory(activeIndex - 1);
    if (event.key === "ArrowRight") showMemory(activeIndex + 1);
  });

  function renderFilters() {
    filters.innerHTML = "";
    memoryFilters.forEach((filter) => {
      const button = document.createElement("button");
      button.type = "button";
      button.textContent = filter.label;
      button.className = filter.id === activeFilter ? "is-active" : "";
      button.setAttribute("aria-pressed", String(filter.id === activeFilter));
      button.addEventListener("click", () => {
        activeFilter = filter.id;
        renderFilters();
        renderAlbum();
      });
      filters.append(button);
    });
  }

  function renderAlbum() {
    visibleMemories = activeFilter === "todos"
      ? [...memories]
      : memories.filter((memory) => memory.category === activeFilter);

    album.innerHTML = "";
    visibleMemories.forEach((memory, index) => {
      if (index > 0 && index % 5 === 0) {
        album.append(createAlbumNote(index));
      }

      const button = document.createElement("button");
      button.type = "button";
      button.className = `photo-memory photo-memory--${memory.size || "normal"} reveal`;
      button.style.setProperty("--tilt", memory.tilt || "0deg");
      button.innerHTML = `
        <span class="photo-frame">
          <img src="${memory.image}" alt="${memory.title}" loading="lazy" decoding="async" />
        </span>
        <span class="photo-caption">
          <small>${memory.date} · ${memory.place}</small>
          <strong>${memory.title}</strong>
          <em>${memory.message}</em>
        </span>
      `;
      button.addEventListener("click", () => openModal(index));
      album.append(button);
    });
    refreshReveal(album.querySelectorAll(".reveal"));
  }

  function createAlbumNote(index) {
    const note = document.createElement("div");
    note.className = "album-note reveal";
    note.textContent = albumNotes[(index / 5 - 1) % albumNotes.length];
    return note;
  }

  function openModal(index) {
    modal.hidden = false;
    document.body.classList.add("modal-open");
    showMemory(index);
    closeButton.focus();
  }

  function closeModal() {
    modal.hidden = true;
    document.body.classList.remove("modal-open");
  }

  function showMemory(index) {
    activeIndex = normalizeMemoryIndex(index);
    const memory = visibleMemories[activeIndex];
    modalImage.src = memory.image;
    modalImage.alt = memory.title;
    modalTitle.textContent = memory.title;
    modalDate.textContent = memory.date;
    modalPlace.textContent = memory.place;
    modalMessage.textContent = memory.message;
  }

  function normalizeMemoryIndex(index) {
    if (index < 0) return visibleMemories.length - 1;
    if (index >= visibleMemories.length) return 0;
    return index;
  }
}

function refreshReveal(elements) {
  if (!("IntersectionObserver" in window)) {
    elements.forEach((element) => element.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.14 });

  elements.forEach((element) => observer.observe(element));
}

function initVideoAlbum() {
  const cinema = document.getElementById("videoCinema");
  const modal = document.getElementById("videoModal");
  const player = document.getElementById("modalVideo");
  const title = document.getElementById("videoTitle");
  const date = document.getElementById("videoDate");
  const category = document.getElementById("videoCategory");
  const message = document.getElementById("videoMessage");
  const closeButton = document.getElementById("videoClose");
  const previousButton = document.getElementById("videoPrev");
  const nextButton = document.getElementById("videoNext");

  if (!cinema || !modal || !player || !videos.length) return;

  let activeIndex = 0;

  renderVideos();
  loadVideoDurations();

  closeButton.addEventListener("click", closeVideo);
  previousButton.addEventListener("click", () => showVideo(activeIndex - 1, true));
  nextButton.addEventListener("click", () => showVideo(activeIndex + 1, true));
  modal.addEventListener("click", (event) => {
    if (event.target === modal) closeVideo();
  });

  document.addEventListener("keydown", (event) => {
    if (modal.hidden) return;
    if (event.key === "Escape") closeVideo();
    if (event.key === "ArrowLeft") showVideo(activeIndex - 1, true);
    if (event.key === "ArrowRight") showVideo(activeIndex + 1, true);
  });

  function renderVideos() {
    cinema.innerHTML = "";
    videos.forEach((video, index) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = `cinema-card ${video.featured ? "cinema-card--featured" : ""} reveal`;
      button.innerHTML = `
        <span class="cinema-poster">
          <img src="${video.poster}" alt="${video.title}" loading="lazy" decoding="async" />
          <span class="cinema-play" aria-hidden="true">▶</span>
          <span class="cinema-duration" data-video-duration="${index}">--:--</span>
        </span>
        <span class="cinema-copy">
          <small>${video.date} · ${video.category}</small>
          <strong>${video.title}</strong>
          <em>${video.message}</em>
        </span>
      `;
      button.addEventListener("click", () => openVideo(index));
      cinema.append(button);
    });
    refreshReveal(cinema.querySelectorAll(".reveal"));
  }

  function openVideo(index) {
    modal.hidden = false;
    document.body.classList.add("modal-open");
    showVideo(index, false);
    closeButton.focus();
  }

  function closeVideo() {
    player.pause();
    player.removeAttribute("src");
    player.load();
    modal.hidden = true;
    document.body.classList.remove("modal-open");
  }

  function showVideo(index, shouldPlay) {
    activeIndex = normalizeVideoIndex(index);
    const video = videos[activeIndex];
    player.pause();
    player.src = video.src;
    player.poster = video.poster;
    player.load();
    title.textContent = video.title;
    date.textContent = video.date;
    category.textContent = video.category;
    message.textContent = video.message;
    if (shouldPlay) {
      player.play().catch(() => {});
    }
  }

  function normalizeVideoIndex(index) {
    if (index < 0) return videos.length - 1;
    if (index >= videos.length) return 0;
    return index;
  }

  function loadVideoDurations() {
    let index = 0;
    const loadNext = () => {
      if (index >= videos.length) return;
      const video = videos[index];
      const probe = document.createElement("video");
      probe.preload = "metadata";
      probe.src = video.src;
      probe.addEventListener("loadedmetadata", () => {
        const label = cinema.querySelector(`[data-video-duration="${index}"]`);
        if (label) label.textContent = formatTime(probe.duration);
        probe.removeAttribute("src");
        probe.load();
        index += 1;
        scheduleIdle(loadNext);
      }, { once: true });
      probe.addEventListener("error", () => {
        index += 1;
        scheduleIdle(loadNext);
      }, { once: true });
    };
    scheduleIdle(loadNext);
  }
}

function initDetailsMuseum() {
  const filters = document.getElementById("detailsFilters");
  const museum = document.getElementById("detailsMuseum");
  if (!filters || !museum || !details.length) return;

  let activeFilter = "todos";

  if (detailFilters.length) {
    filters.hidden = false;
    renderDetailFilters();
  } else {
    filters.hidden = true;
  }
  renderDetails();

  function renderDetailFilters() {
    filters.innerHTML = "";
    detailFilters.forEach((filter) => {
      const button = document.createElement("button");
      button.type = "button";
      button.textContent = filter.label;
      button.className = filter.id === activeFilter ? "is-active" : "";
      button.setAttribute("aria-pressed", String(filter.id === activeFilter));
      button.addEventListener("click", () => {
        activeFilter = filter.id;
        renderDetailFilters();
        renderDetails();
      });
      filters.append(button);
    });
  }

  function renderDetails() {
    const visibleDetails = activeFilter === "todos"
      ? details
      : details.filter((detail) => detail.category === activeFilter);

    museum.innerHTML = "";
    visibleDetails.forEach((detail) => {
      const card = document.createElement("article");
      card.className = `museum-card ${detail.featured ? "museum-card--featured" : ""} ${detail.published ? "is-published" : "is-development"} reveal`;
      card.innerHTML = `
        <div class="museum-image">
          <img src="${detail.image}" alt="${detail.title}" loading="lazy" decoding="async" />
          <span>${detail.published ? "Publicado" : "En desarrollo"}</span>
        </div>
        <div class="museum-copy">
          <small>${detail.date} · ${detail.category}</small>
          <h3>${detail.title}</h3>
          <p>${detail.description}</p>
          <div class="museum-footer">
            <em>${detail.type}</em>
            ${detail.published && detail.url
              ? `<a href="${detail.url}">Volver a verlo ♥</a>`
              : `<button type="button" disabled>Proximamente 💌</button>`}
          </div>
        </div>
      `;
      museum.append(card);
    });
    refreshReveal(museum.querySelectorAll(".reveal"));
  }
}

function initStoryTimeline() {
  const timeline = document.getElementById("storyTimeline");
  if (!timeline || !storyTimeline.length) return;

  const separators = [
    "Y todavia nos faltan muchos recuerdos por crear.",
    "Entre tantos dias, algunos se volvieron inolvidables.",
    "Contigo, incluso los momentos simples se sienten especiales."
  ];

  timeline.innerHTML = "";

  storyTimeline.forEach((event, index) => {
    if (index > 0 && index % 2 === 0) {
      const separator = document.createElement("div");
      separator.className = "story-separator reveal";
      separator.innerHTML = `<span>${separators[(index / 2 - 1) % separators.length]}</span>`;
      timeline.append(separator);
    }

    const card = document.createElement("article");
    card.className = `story-event ${event.highlight ? "story-event--highlight" : ""} reveal`;
    card.innerHTML = `
      <div class="story-pin" aria-hidden="true"><span></span></div>
      <figure class="story-photo">
        <img src="${event.image}" alt="${event.title}" loading="lazy" decoding="async" />
      </figure>
      <div class="story-copy">
        <time>${event.date}</time>
        <h3>${event.title}</h3>
        <p>${event.description}</p>
        <blockquote>${event.quote}</blockquote>
      </div>
    `;
    timeline.append(card);
  });

  const finalCard = document.createElement("article");
  finalCard.className = "story-ending reveal";
  finalCard.innerHTML = `
    <span>Y & L</span>
    <h3>Y esto apenas comienza...</h3>
    <p>Continuara &hearts;</p>
  `;
  timeline.append(finalCard);

  refreshReveal(timeline.querySelectorAll(".reveal"));
}

function initLoveLetters() {
  const box = document.getElementById("lettersBox");
  const modal = document.getElementById("letterModal");
  const closeButton = document.getElementById("letterClose");
  const icon = document.getElementById("letterModalIcon");
  const title = document.getElementById("letterModalTitle");
  const message = document.getElementById("letterModalMessage");
  const signature = document.getElementById("letterModalSignature");
  if (!box || !modal || !loveLetters.length) return;

  const storageKey = "yl-opened-letters";
  let openedLetters = readOpenedLetters();

  renderLetters();

  closeButton.addEventListener("click", closeLetter);
  modal.addEventListener("click", (event) => {
    if (event.target === modal) closeLetter();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !modal.hidden) closeLetter();
  });

  function renderLetters() {
    box.innerHTML = "";
    loveLetters.forEach((letter, index) => {
      const isOpened = openedLetters.includes(letter.id);
      const button = document.createElement("button");
      button.type = "button";
      button.className = `letter-envelope letter-envelope--${letter.tone} ${letter.id === "esposa" ? "letter-envelope--special" : ""} ${isOpened ? "is-read" : ""} reveal`;
      button.style.setProperty("--letter-delay", `${index * 45}ms`);
      button.setAttribute("aria-label", `Abrir carta: ${letter.title}`);
      button.innerHTML = `
        <span class="envelope-status">${isOpened ? "Leida ♥" : "Abrir"}</span>
        <span class="envelope-icon" aria-hidden="true">${letter.icon}</span>
        <span class="envelope-flap" aria-hidden="true"></span>
        <span class="envelope-paper" aria-hidden="true"></span>
        <span class="envelope-copy">
          <strong>${letter.title}</strong>
          <small>${letter.preview}</small>
        </span>
      `;
      button.addEventListener("click", () => openLetter(letter, button));
      box.append(button);
    });
    refreshReveal(box.querySelectorAll(".reveal"));
  }

  function openLetter(letter, button) {
    button.classList.add("is-opening");
    window.setTimeout(() => {
      button.classList.remove("is-opening");
      openedLetters = Array.from(new Set([...openedLetters, letter.id]));
      saveOpenedLetters(openedLetters);
      button.classList.add("is-read");
      const status = button.querySelector(".envelope-status");
      if (status) status.textContent = "Leida ♥";

      icon.textContent = letter.icon;
      title.textContent = letter.title;
      message.textContent = letter.message;
      signature.textContent = letter.signature;
      modal.hidden = false;
      document.body.classList.add("modal-open");
      closeButton.focus();
    }, 360);
  }

  function closeLetter() {
    modal.hidden = true;
    document.body.classList.remove("modal-open");
  }

  function readOpenedLetters() {
    try {
      const parsed = JSON.parse(localStorage.getItem(storageKey) || "[]");
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }

  function saveOpenedLetters(ids) {
    try {
      localStorage.setItem(storageKey, JSON.stringify(ids));
    } catch {
      // The letters still work if private browsing blocks storage.
    }
  }
}
