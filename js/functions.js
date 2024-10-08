// createCell

// Funzione per generare un nodo, in questo caso un div
/**
 * 
 * @param {content} any
 * Parametro che sarà inserito come contenuto del nodo
 * @param {difficulty} string
 * parametro che mediante una stringa fornisce la difficoltà selezionata, utile per ridimensionare la griglia propriamente
 * @returns div class='cell', + eventuali classi aggiuntive
 */

function createCell(content, difficulty) {
    const cell = document.createElement('div');       // Creo l'elemento, in questo caso sarà sempre un div, perche è scritto in hardcode, e non come parametro
    cell.className = 'cell';                          // Setto la classe a 'cell', dato che non ne aveva
    switch (difficulty) {                             // il parametro difficulty indica la difficoltà con cui vuole giocare l'utente, maggiore è minore saranno le celle
        case 'hard':                                  // aggiungo classe per controllo dimensioni
            cell.classList.add('hardDif');           
            break;    
        case 'medium':
            cell.classList.add('medDif');             // aggiungo classe per controllo dimensioni
    }
    cell.append(content);                             // 'inserisco' il parametro passato alla funzione nell'elemento
    return cell;                                      // ritorno il nodo creato a chi mi invoca
};


// randomNumbers

// funzione che genera un numero finito di numeri casuali, inserendoli in un array(rappresenteranno le bombe per questo programma)

function randomNumbers(max, totNums) {
    const numbers = [];
    while (numbers.length < totNums) {
        const number = Math.floor(Math.random() * max) + 1;
        if (!numbers.includes(number)) numbers.push(number);
    }
    return numbers;
}



// endGame

// funzione che controlla se la partatita è terminata per sconfitta o vittoria 

function endGame (score, hasWon = false) {

    const result = hasWon ? 'vinto' : ' perso';                        // preparo parte del messaggio

    alert(`Hai ${result}! Hai totalizzato un punteggio di: ${score}`); // monto il messaggio

    isGameOver = true;                                                 // setto variabile per impedire ancora interazioni con la griglia se la partita è terminata
    showCells(bombs);
}

// showCells 

// funzione che a fine gioco mostrerà il contenuto di tutte le celle

function showCells(bombs) {
    const cells = document.querySelectorAll('.cell');     // prendo tutte le cell
    for (let i = 0; i < cells.length; i++) {              // per ognuna...
        const cell = cells[i];                            // assegno valore a cell con la variabile del For
        cell.classList.add('clicked');                    // aggiungo la classe clicked
        const cellNumb = i + 1;                           // setto il valore uguale al valore contenuto mostrato in pagina

        if(bombs.includes(cellNumb)) {                    // controllo se è una bomba e gli affido relativa classe
            cell.innerText = '';
            cell.classList.add('bomb');
    }}    
};