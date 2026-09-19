/* =========================================================
   ARCHIVO MAESTRO DE JAVASCRIPT
   Aquí controlamos toda la interactividad de la página.
========================================================= */

/* ---------------------------------------------------------
   1. MENÚ MÓVIL
   Despliega el menú lateral en pantallas pequeñas.
--------------------------------------------------------- */
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');

if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Cierra el menú al hacer clic en cualquier enlace
    document.querySelectorAll('.nav-links a').forEach(enlace => {
        enlace.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });
}

/* ---------------------------------------------------------
   2. ANIMACIONES AL HACER SCROLL (REVEAL)
   Hace que los elementos aparezcan suavemente al bajar.
--------------------------------------------------------- */
const elementosReveal = document.querySelectorAll('.reveal');
const observador = new IntersectionObserver((entradas) => {
    entradas.forEach(entrada => {
        if (entrada.isIntersecting) {
            entrada.target.classList.add('active'); 
        }
    });
}, { threshold: 0.1 });

elementosReveal.forEach(elemento => {
    observador.observe(elemento);
});

/* ---------------------------------------------------------
   3. MODO OSCURO (DARK MODE)
   Cambia los colores globales y guarda la preferencia.
--------------------------------------------------------- */
const themeToggle = document.getElementById('theme-toggle');
const sunIcon = document.getElementById('sun-icon');
const moonIcon = document.getElementById('moon-icon');
const body = document.body;

if (localStorage.getItem('theme') === 'dark') {
    body.classList.add('dark-mode');
    if(sunIcon && moonIcon) {
        sunIcon.classList.remove('hidden');
        moonIcon.classList.add('hidden');
    }
}

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
             
        if (body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');
            sunIcon.classList.remove('hidden');
            moonIcon.classList.add('hidden');
        } else {
            localStorage.setItem('theme', 'light');
            sunIcon.classList.add('hidden'); 
            moonIcon.classList.remove('hidden');
        }
    });
}

/* ---------------------------------------------------------
   4. LÓGICA DEL DIARIO INTERACTIVO (Solo para journal.html)
   Maneja las páginas de la libreta con tus reflexiones.
--------------------------------------------------------- */
const libroDiario = document.getElementById('libro-diario');

if (libroDiario) {
    // Tus apuntes y reflexiones distribuidos por páginas dobles (Izquierda / Derecha)
    const paginasDiario = [
        {
            izq: { 
                fecha: "Introducción", 
                tag: "#Bitácora", 
                titulo: "El Jardín de los Pensamientos", 
                text: "Este es un espacio reservado para la calma. Aquí recopilo fragmentos de mis ideas, reflexiones, agradecimientos, disciplina, código, diseño y lecciones de vida. Toma asiento, ajusta la luz de la lámpara y lee a tu propio ritmo." 
            },
            der: { 
                fecha: "16, Septiembre, 2026", 
                tag: "#Reflexion", 
                titulo: "La injusticia y el esfuerzo", 
                text: "Este dia fue poco productivo, a pesar de todo lo disfrute bastante, mucho mas que otros. Estoy consciente de que no hice todo lo que debia, no trabaje en mis proyectos personales y eso me conviertio en una persona irresponsable con su proposito." 
            }
        },
        {
            izq: {
                fecha: "16. Septiembre, 2026", 
                tag: "#REFLEXION",
                titulo: "(Continuación)",
                text: "Al final del dia estuve reflexionando sobre un pensamiento recurrente en mi mente: \"Lo injusta que puede ser la vida con las personas que se esfuerzan.\" Yo personalmente me he sentido (por momentos) que la vida no me trata de manera justa viendo lo que me esfuerzo..."
            },
            der: {
                fecha: "16. Septiembre, 2026", 
                tag: "#REFLEXION",
                titulo: "(Continuación)",
                text: "Que hay personas que se esfuerzan mucho menos y viven mejor, eso a veces pesa, y mas cuando vives con la responsabilidad moral de ser el futuro sustento de tus padres, cuando quieres ser mejor que ayer y lograr cosas muy grandes en la vida, cuando eres ambicioso y trabajas pero no logras ver esos resultados deseados."
            }
        },
        {
            izq: {
                fecha: "16. Septiembre, 2026", 
                tag: "#REFLEXION",
                titulo: "(Continuación)",
                text: "Y bro... mire hacia atras, del otro lado de la historia hay alguien la pasa mucho peor que tu y que yo, personas que caminan kilometros diariamente para vender y ganar algo para sustentarse, personas que se esfuerzan duramente para lograr algo y que al llegar a su hogar caen derrotados ante la cruda realidad en la que viven. Capaz se sientan a llorar..."
            },
            der: {
                fecha: "16. Septiembre, 2026", 
                tag: "#REFLEXION",
                titulo: "(Continuación)",
                text: "Personas que desean un trabajo que no logran obtener... Y yo aqui quejandome, teniendo una vida que ellos desearian, a veces desaprovechando las oportunidades y procrastinando. Son el tipo de vida que ellos desearian y agradecerian tener en vez de vivir estresados por su presente tormentoso y una vida tan dura."
            }
        },
        {
            izq: {
                fecha: "16. Septiembre, 2026", 
                tag: "#REFLEXION",
                titulo: "(Continuación)",
                text: "Yo genuinamente me compadezco de ellos y pido perdon a Dios y a esas personas, porque yo a veces me quejo y olvido agradecer una vida en la que no carezco de nada esencial, frustrandome por algo tan estupido como \"los que la tienen facil\" y olvidandome de esos que realmente tienen una vida dificil."
            },
            der: {
                fecha: "16. Septiembre, 2026", 
                tag: "#REFLEXION",
                titulo: "(Continuación)",
                text: "Hoy escribo esta reflexion desde el corazon, el corazon de alguien que falla constantemente, alguien que sabe que puede dar mas y no lo hace. Pido a Dios que le de fuerzas a ustedes los que se esfuerzan y no se rinden, por los que se esfuerzan a pesar de no ver los resultados, espero que los sue os que hay en su mente no mueran por nada del mundo"
            }
        }
    ];

    let indiceActual = 0;

    // Función para renderizar el contenido en el DOM
    window.actualizarPaginas = function() {
        const pagina = paginasDiario[indiceActual];
        
        document.getElementById('contenido-izq').innerHTML = `<div class="meta-hoja"><span class="fecha">${pagina.izq.fecha}</span><span class="tag">${pagina.izq.tag}</span></div><h3>${pagina.izq.titulo}</h3><p>${pagina.izq.text}</p>`;
        document.getElementById('num-izq').innerText = (indiceActual * 2) + 1;

        document.getElementById('contenido-der').innerHTML = `<div class="meta-hoja"><span class="fecha">${pagina.der.fecha}</span><span class="tag">${pagina.der.tag}</span></div><h3>${pagina.der.titulo}</h3><p>${pagina.der.text}</p>`;
        document.getElementById('num-der').innerText = (indiceActual * 2) + 2;

        document.getElementById('btn-anterior').style.visibility = indiceActual === 0 ? 'hidden' : 'visible';
        document.getElementById('btn-siguiente').style.visibility = indiceActual === paginasDiario.length - 1 ? 'hidden' : 'visible';
        document.getElementById('indicador-paginas').innerText = `Pliego ${indiceActual + 1} de ${paginasDiario.length}`;
    };

    // Función que simula el movimiento al pasar de página
    window.cambiarPagina = function(direccion) {
        libroDiario.classList.add('hojeando');
        setTimeout(() => {
            indiceActual += direccion;
            window.actualizarPaginas();
            libroDiario.classList.remove('hojeando');
        }, 250);
    };

    // Control de la Lámpara ambiental
    const btnLampara = document.getElementById('btn-lampara');
    if (btnLampara) {
        btnLampara.addEventListener('click', () => {
            document.body.classList.toggle('luz-apagada');
        });
    }

    // Inicialización del diario
    window.actualizarPaginas();
}