/*
2C = two clubs
2D = two of diamons
2H = two of hearts
2S = two of spades
*/


(() => {
    'use strict'


    let deck = [];

    const tipos = ['C', 'D', 'H', 'S'],
        especiales = ['A', 'J', 'Q', 'K'];

    let puntosJugadores = [];

    // Referencias HTML
    const btnPedir = document.querySelector('#btnPedir'),
        btnDetener = document.querySelector('#btnDetener'),
        btnNuevo = document.querySelector('#btnNuevo');

    const puntosSmall = document.querySelectorAll('small'),
        divCartasJugador = document.querySelector('#jugador-cartas'),
        divCartasComputadora = document.querySelector('#computadora-cartas');

    // Esta Funcion inicia el juego
    const inicializarJuego = (numJugadores = 2) => {
        deck = crearDeck();
        for (let i = 0; i < numJugadores; i++) {
            puntosJugadores.push(0);
        }
        console.log({ puntosJugadores })
    }

    // esta funcion crea una nueva baraja
    const crearDeck = () => {
        deck = [];
        for (let i = 2; i <= 10; i++) {
            for (let tipo of tipos) {
                deck.push(i + tipo);
            }
        }
        for (let tipo of tipos) {
            for (let esp of especiales) {
                deck.push(esp + tipo)
            }
        }
        return deck = _.shuffle(deck);
    }

    // esta funcion me permite pedir una carta

    const pedirCarta = () => {

        if (deck.length === 0) {
            throw 'No hay cartas en el deck';
        }
        return deck.pop();
    }

    const valorCarta = (carta) => {
        const valor = carta.substring(0, carta.length - 1);
        return (isNaN(valor)) ?
            (valor === 'A') ? 11 : 10 :
            valor * 1;
    }

    const acumularPuntos = () => {

    }

    // turno de la computador
    const turnoComputadora = (puntosMinimos) => {
        do {
            const carta = pedirCarta();
            puntosComputadora = puntosComputadora + valorCarta(carta);
            puntosSmall[1].innerHTML = puntosComputadora;

            // <img class="carta" src="./assets/cartas/2C.png">


            const crearCartasJugador = document.createElement('img');
            crearCartasJugador.src = './assets/cartas/' + carta + '.png';
            crearCartasJugador.classList.add('carta');
            divCartasComputadora.append(crearCartasJugador);

            if (puntosMinimos > 21) {

                break;
            }

        } while ((puntosComputadora < puntosMinimos) && (puntosMinimos <= 21))

        setTimeout(() => {
            if (puntosComputadora === puntosMinimos) {
                alert('Nadie Gana');
            } else if (puntosMinimos > 21) {
                alert('Computadora Gana')
            } else if (puntosComputadora > 21) {
                alert('GANASTE')
            } else {
                alert('Computadora Gana');
            }
        }, 70);
    }


    // Eventos

    btnPedir.addEventListener('click', () => {
        const carta = pedirCarta();
        puntosJugador = puntosJugador + valorCarta(carta);
        puntosSmall[0].innerHTML = puntosJugador;

        // <img class="carta" src="./assets/cartas/2C.png">


        const crearCartasJugador = document.createElement('img');
        crearCartasJugador.src = './assets/cartas/' + carta + '.png';
        crearCartasJugador.classList.add('carta');
        divCartasJugador.append(crearCartasJugador);

        if (puntosJugador > 21) {
            console.warn('Lo siento, mucho perdiste');
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora(puntosJugador);
        } else if (puntosJugador === 21) {
            console.warn('21, genial');
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora(puntosJugador);

        }
    });

    btnDetener.addEventListener('click', () => {
        btnDetener.disabled = true;
        btnPedir.disabled = true;
        turnoComputadora(puntosJugador);
    });

    btnNuevo.addEventListener('click', () => {
        inicializarJuego();
        // deck = [];
        // deck = crearDeck();
        puntosJugador = 0;
        puntosComputadora = 0;
        puntosSmall[0].innerHTML = 0;
        puntosSmall[1].innerHTML = 0;

        divCartasComputadora.innerHTML = '';
        divCartasJugador.innerHTML = '';
        btnDetener.disabled = false;
        btnPedir.disabled = false;

    })

})();