
export const rolesByPlayerNum = [ "lupo", "lupo", "contadino", "contadino", "contadino", "guardia", "veggente", "donnaccia", "lupo", "contadino" ]

export const rolesByTurn = [ "lupo", "guardia", "donnaccia", "veggente"]

export const rules = [
  {
    name: "lupo",
    clan: "lupo",
    description: "Ogni notte i lupi si svegliano e decidono una persona da uccidere."
  },
  {
    name: "contadino",
    clan: "umano",
    description: "Un normale umano, senza poteri speciali."
  },
  {
    name: "guardia",
    clan: "umano",
    description: "Ogni notte scegli una persona da proteggere (anche se stesso), che non morirà se bersagliata dai lupi."
  },
  {
    name: "veggente",
    clan: "umano",
    description: "Ogni notte scegli una persona ed il narratore ti dirà se è umano oppure no."
  },
  {
    name: "donnaccia",
    clan: "umano",
    description: "Ogni notte scegli una persona da intrattenere e vai a casa sua. Morirai se quella persona è un lupo, oppure se viene scelta dai lupi, ma non se i lupi scelgono te."
  }
]

export const winCondition =  [
  {
    clan: "lupo",
    description: "I lupi vincono se, al termine di una mattina, sono di più degli umani."
  },
  {
    clan: "umano",
    description: "Gli umani vincono se tutti i lupi muoiono."
  }
]