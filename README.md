# LupusInFabula

Website to play the popular italian party game (also known as Mafia).

## Panoramica

È costruito in Angular con TypeScript ed è molto semplice, pensato per dare un supporto al narratore. Tutte le informazioni sono salvate nel localStorage del browser, permettendo così di gestire tutto a frontend tramite JavaScript. Attualmente è gestito un numero di giocatori da 8 a 11.

Inizialmente i vari partecipanti si passano il telefono, inseriscono il proprio nome e ricevono il ruolo, con una breve descrizione di cosa fa.

Quindi, il narratore conduce il gioco come al solito: di notte fa svegliare i vari ruoli a turno ed inserisce il loro bersaglio, recuperando subito eventuali informazioni necessarie (es. viene mostrato a schermo se il bersaglio del veggente è umano o no).
Alla fine della notte, il programma calcola in automatico le vittime e le comunica.
Di giorno permette di inserire i vari voti ottenuti da ogni giocatore. Se non si riesce a risolvere uno spareggio, è possibile estrarre una vittima a caso .

Se in qualunque fase si sbaglia ad inserire, prima della conferma finale è possibile aggiornare la pagina per annullarla e ripeterla dall'inizio.
Se al termine di un giorno o una notte si verificano le condizioni di fine gioco, va automaticamente alla maschera finale.

È possibile in qualunque momento consultare l'elenco dei giocatori, il loro ruolo ed il loro stato (vivo/morto), nonché passare a controllare le regole.
Se per qualunque motivo si esce per errore dalla partita, il tasto "Continua" della home permette di riprendere da dove si era lasciato.

## Possibili sviluppi
- Aggiungere lingua inglese e possibilità di cambiare lingua
- Aggiungere modalità chiara/scura
- Aggiungere più ruoli, aumentando il numero massimo permesso di giocatori