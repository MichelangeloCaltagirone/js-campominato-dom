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