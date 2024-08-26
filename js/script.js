// Scaletta
/**
 * Recupero Elementi dal DOM
 * Setto variabili note
 * Creo Funzioni Utili
 * Genero griglia in pagina dinamicamente con js
 * Aggiungo eventi legati alla griglia
 */

/*
DESCRIZIONE DEL GIOCO
Il computer deve generare 16 numeri casuali nello stesso range della difficltà prescelta: le bombe. Attenzione: nella stessa cella può essere posizionata al massimo una bomba, perciò nell'array delle bombe non potranno esserci due numeri uguali
In seguito l'utente clicca su una cella: se il numero è presente nella lista dei numeri generati abbiamo calpestato una bomba. La cella si colora di rosso e la partita termina. Altrimenti, la cella cliccata si colora di azzurro e l'utente può continuare  a cliccare sulle altre celle.
LA partita termina quando il giocatore clicca su una bomba o quando raggiunge il numero massimo possibile di numeri consentiti (ovvero quando ha rivelato tutte le celle che non sono bombe).
Al termine della partita, il software deve comunicare il punteggio, cioè il numero di volte che l'utente ha cliccato su una cella che non era una bomba

# MILESTONE 1
Prepariamo "Qualcosa" per tenere il punteggio dell'utente.
Quando l'utente clicca su una cella, incrementiamo il punteggio.
Se riusciamo, facciamo anche in modo da non poter più cliccare sulla stessa cella

# MILESTONE 2
Facciamo in modo di generare 16 numeri casuali (tutti diversi) compresi tra 1 e il massimo di caselle disponibili.
Generiamoli e stampiamo in console per essere certi che siano corretti

# MILESTONE 3
Quando l'utente clicca su una cella, verifichiamo se ha calpestato una bomba, controllando se il numero di cella è presente nell'array di bombe.
Se si, la cella diventa rossa (raccogliamo il punteggio e scriviamo in console che la patita termina) altrimenti diventa azzurra e dobbiamo incrementare il punteggio.

# MILESTONE 4
Quando l'utente clicca su una cella, e questa non è una bomba, dobbiamo controllare se il punteggio incrementato ha raggiunto il punteggio massimo, perchè in quel caso la partita termina. Raccogliamo quindi il punteggio e scriviamo un messaggio appropriato.

# MILESTONE 5
Quando la partita termina dobbiamo capire se è terminata perchè è stata cliccata una bomba o seperchè l'utente ha raggiunto il punteggio massimo(ossia ha vinto). Dobbiamo poi in ogni caso stampare lin pagina il punteggio raggiunto ed il messaggio adeguato in caso di vittoria o sconfitta.

# BONUS
Aggiungere una select accanto al bottone di generazione, che fornisca una scelta tra tre diversi livelli di difficoltà (come le istruzioni di ieri se non già fatto)

# SUPERBONUS
Colorare tutte le celle bomba quando la partita finisce

Consigli del giorno
approcciate l'esercizio con serenità, e cercate di divertirvi!
Cercate di commentare e usare i console.log il più possibile
Fatevi sempre delle domande: sto ripetendo del codice? Questa funzione fa troppe cose? Il nome ha senso rispetto a quello che fa?
Buon divertimento e a domani!
*/

// Prep

// Recupero elementi dal DOM

const grid = document.getElementById('grid');
const playBtn = document.querySelector('button');
const difficultyField = document.querySelector('select');
const form = document.querySelector('form');
const scoreElements = document.getElementById('score');

// Variabili note

let rows;
let cols;
let totCells;
let score = 0;
let bombs = [];
const totNums = 16;
let isGameOver = false;



// Eventi dinamici

// Al submit del form, genero una griglia 10 x 10 di nodi div, contententi i numeri in ordine da 1 a 100
form.addEventListener('submit', function(event) {
    event.preventDefault();                              // prevengo il refresh della pagina
    score = 0;                                           // ri-inizializzo il punteggio a zero, per pulirlo dai valori di partite precedenti
    isGameOver = false;                                  // risetto la variabile di fine partita, per eliminare il valore della partita precedente
    scoreElements.innerText = '';                        // pulisco tutta la griglia, per permettere a quella uova di essere generata correttamente
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
    const maxScore = totCells - totNums;
    console.log(maxScore, 'è il punteggio massimo');
    let bombs = [];                                                 // pulisco l'array di bombe del'eventuale partita precedente
    bombs = randomNumbers(totCells, totNums);                                // genero un nuovo array di bombe
    console.log(bombs,totCells);
    grid.innerHTML = '';

    for (let i = 0; i < totCells; i++) {                            // giro per quante 'celle' voglio nella griglia

        const cell = createCell(i + 1, difficulty);                 // invoco la funzione per generare le celle di nodi che voglio. Il primo Parametro è la variabile di controllo del for in cui è inserita la funzione, aumentato di 1 per stamapre i numeri da 1 a 100, il secondo invece è la difficoltà del gioco
                                             
        cell.addEventListener('click', function() {                 // ad ogni cella creata aggiungo un event listener, che reagirà al click
            console.log(this.innerText, ': è il contenuto della cella che hai cliccato'); // stampa in console del contenuto testuale del nodo cliccato, grazie a this
            if (isGameOver) return;
            if (this.classList.contains('clicked')) return;         // controllo che non abbia già la classe 'clicked', e se si interrompo la funzione
            this.classList.add('clicked');                          // sempre al click sulla cella, aggiungo la classe clicked, per cambiarne il colore di background in pagina
            if (bombs.includes(parseInt(this.innerText))) {         // controllo che ciò che è stato cliccato è una bomba
                this.classList.add('bomb');                         // nel caso sia una bomba, gli aggiungo la medesima classe
                endGame(score);
            } else scoreElements.innerText = ++score;               // aumento il punteggio del giocatore al click della cella
                                                                    
            if (score == maxScore) {                                // controllo che il giocatore abbia raggiunto o meno il massimo punteggio
                endGame(score, true);
            }                   
        });

        grid.appendChild(cell);                                     // aggiungo alla griglia in pagina il nodo appena creato
    }
})
