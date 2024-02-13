
export const rolesByPlayerNum = [ "lupo", "lupo", "contadino", "contadino", "contadino", "guardia", "veggente", "donnaccia", "lupo", "contadino" ]


export const rules = [
  {
    name: "lupo",
    clan: "lupi",
    description: "Ogni notte i lupi si svegliano e decidono una persona da uccidere."
  },
  {
    name: "contadino",
    clan: "umani",
    description: "Un normale umano, senza poteri speciali."
  },
  {
    name: "guardia",
    clan: "umani",
    description: "Ogni notte scegli una persona da proteggere (anche se stesso), che non morirà se bersagliata dai lupi."
  },
  {
    name: "veggente",
    clan: "umani",
    description: "Ogni notte scegli una persona ed il narratore ti dirà se è umano oppure no."
  },
  {
    name: "donnaccia",
    clan: "umani",
    description: "Ogni notte scegli una persona da intrattenere e vai a casa sua. Morirai se quella persona è un lupo, oppure se viene scelta dai lupi, ma non se i lupi scelgono te."
  }
]

export const winCondition =  [
  {
    clan: "lupi",
    description: "I lupi vincono se, al termine di una mattina, sono di più degli umani."
  },
  {
    clan: "umani",
    description: "Gli umani vincono se tutti i lupi muoiono."
  }
]