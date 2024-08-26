// Scaletta
/**
 * Recupero Elementi dal DOM
 * Setto variabili note
 * Creo Funzioni Utili
 * Genero griglia in pagina dinamicamente con js
 * Aggiungo eventi legati alla griglia
 */


// Prep

// Recupero elementi dal DOM

const grid = document.getElementById('grid');
const playBtn = document.querySelector('button');
const difficultyField = document.querySelector('select');
const form = document.querySelector('form');

// Variabili note

let rows;
let cols;
let totCells;


// Eventi dinamici

// Al submit del form, genero una griglia 10 x 10 di nodi div, contententi i numeri in ordine da 1 a 100
form.addEventListener('submit', function(event) {
    event.preventDefault();                              // prevengo il refresh della pagina

    const difficulty = difficultyField.value;            // recupero il valore della select, contenente la difficoltà impostata dall'utente

    switch (difficulty) {                                // controllo il valore della difficoltà selezionata, per impostare il numero di righe e colonne          
        case 'hard':
            rows = 7;
            cols = 7;            
            break;
        case 'medium':
            rows = 9;
            cols = 9;
            break;
        default:                                        // il valore 'easy' di difficoltà diventa il default del gioco
            rows = 10;
            cols = 10;
            break;
    }

    totCells = rows * cols;                                         // Solo ora che ho decretato la difficoltà con cui il giocatore vuole cimentarsi, posso calcolare il tot delle celle della griglia

    grid.innerHTML = '';

    for (let i = 0; i < totCells; i++) {                            // giro per quante 'celle' voglio nella griglia

        const cell = createCell(i + 1, difficulty);                 // invoco la funzione per generare le celle di nodi che voglio. Il primo Parametro è la variabile di controllo del for in cui è inserita la funzione, aumentato di 1 per stamapre i numeri da 1 a 100, il secondo invece è la difficoltà del gioco
                                             
        cell.addEventListener('click', function() {                 // ad ogni cella creata aggiungo un event listener, che reagirà al click
            console.log(this.innerText, ': è il contenuto della cella che hai cliccato'); // stampa in console del contenuto testuale del nodo cliccato, grazie a this
            this.classList.toggle('clicked');                       // sempre al click sulla cella, aggiungo la classe clicked, per cambiarne il colore di background in pagina
        });
        grid.appendChild(cell);                                     // aggiungo alla griglia in pagina il nodo appena creato
    }
})
