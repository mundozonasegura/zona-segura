
const mensajes = {
  "carta1.png": "Recuerda mantener el suelo libre de objetos para evitar tropiezos.",
  "carta2.png": "Nunca dejes medicamentos al alcance de los niños.",
  "carta3.png": "Asegúrate de tener señalizadas las salidas de emergencia.",
  "carta4.png": "Evita sobrecargar los enchufes eléctricos.",
  "carta5.png": "Guarda los productos de limpieza en lugares seguros.",
  "carta6.png": "Cierra bien las tapas de los envases tóxicos.",
  "carta7.png": "Usa siempre el equipo de protección personal necesario.",
  "carta8.png": "Al cocinar, mantén siempre la atención en la estufa."
};

let imagenes = Object.keys(mensajes);
const sonidoPar = new Audio("audio/par-encontrado.mp3");
const sonidoVictoria = new Audio("audio/victoria.mp3");
let cartas = [];
let tablero, mensajeReflexion, contadorPares, botonReiniciar;
let primeraCarta, segundaCarta;
let paresEncontrados = 0;

function inicializarJuego() {
  cartas = [...imagenes, ...imagenes].sort(() => 0.5 - Math.random());
  tablero.innerHTML = "";
  
  paresEncontrados = 0;
  actualizarContador();
  cartas.forEach((imgNombre) => {
    const carta = document.createElement('div');
    carta.classList.add('carta');
    carta.dataset.img = imgNombre;
    carta.addEventListener('click', voltearCarta);
    carta.innerHTML = `<img src="img/${imgNombre}" alt="carta">`;
    tablero.appendChild(carta);
  });
}

function voltearCarta(e) {
  const carta = e.currentTarget;
  if (carta === primeraCarta || carta.querySelector('img').style.display === "block") return;
  carta.querySelector('img').style.display = "block";

  if (!primeraCarta) {
    primeraCarta = carta;
    return;
  }

  segundaCarta = carta;
  comprobarPareja();
}

function comprobarPareja() {
  if (primeraCarta.dataset.img === segundaCarta.dataset.img) {
    mostrarReflexion(primeraCarta.dataset.img);
    paresEncontrados++;
    actualizarContador();
    sonidoPar.play();
    if (paresEncontrados === imagenes.length) {
      setTimeout(() => {
        sonidoVictoria.play();
        
      }, 500);
    }
    resetSeleccion();
  } else {
    setTimeout(() => {
      primeraCarta.querySelector('img').style.display = "none";
      segundaCarta.querySelector('img').style.display = "none";
      resetSeleccion();
    }, 1000);
  }
}

function mostrarReflexion(imagen) {
  
}

function actualizarContador() {
  contadorPares.textContent = `Pares encontrados: ${paresEncontrados}`;
}

function resetSeleccion() {
  primeraCarta = null;
  segundaCarta = null;
}

document.addEventListener("DOMContentLoaded", () => {
  tablero = document.getElementById('tablero');
  mensajeReflexion = document.getElementById('mensaje-reflexion');
  contadorPares = document.getElementById('contador-pares');
  botonReiniciar = document.getElementById('reiniciar-juego');
  botonReiniciar.addEventListener('click', inicializarJuego);
  inicializarJuego();
});


function lanzarConfeti() {
  const duration = 2 * 1000;
  const end = Date.now() + duration;
  const colors = ['#bb0000', '#ffffff', '#00bb00', '#0000bb'];

  (function frame() {
    confetti({
      particleCount: 5,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors: colors
    });
    confetti({
      particleCount: 5,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors: colors
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();
}
