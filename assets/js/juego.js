/*
2C = two clubs
2D = two of diamons
2H = two of hearts
2S = two of spades
*/

let deck = [];

const tipos = ['C', 'D', 'H', 'S'];
const especiales = ['A', 'J', 'Q', 'K'];
let puntosJugador = 0,
    puntosComputadora = 0;

// Referencias HTML
const btnPedir = document.querySelector('#btnPedir');
const puntosSmall = document.querySelectorAll('small');
const divCartasJugador = document.querySelector('#jugador-cartas');
const divCartasComputadora = document.querySelector('#computadora-cartas');


// esta funcion crea una nueva baraja
const crearDeck = () => {
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
    // console.log(deck);
    deck = _.shuffle(deck);
    console.log(deck);
    return
}

crearDeck();
// esta funcion me permite pedir una carta

const pedirCarta = () => {

    if (deck.length === 0) {
        throw 'No hay cartas en el deck';
    }
    const carta = deck.pop();
    // console.log(carta);
    // console.log(deck);
    return carta;
}

// pedirCarta();

const valorCarta = (carta) => {
    const valor = carta.substring(0, carta.length - 1);
    return (isNaN(valor)) ?
        (valor === 'A') ? 11 : 10 :
        valor * 1;
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
        turnoComputadora(puntosJugador);
    } else if (puntosJugador === 21) {
        console.warn('21, genial');
        btnPedir.disabled = true;
        turnoComputadora(puntosJugador);

    }

})