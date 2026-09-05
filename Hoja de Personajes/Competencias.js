// ==========================================
// BASE DE DATOS DE HABILIDADES, TRASFONDOS Y COMPETENCIAS
// ==========================================

const skillList = [
    { id: 'acrobatics', name: 'Acrobacias', stat: 'dex' },
    { id: 'animalHandling', name: 'Trato con Animales', stat: 'wis' },
    { id: 'arcana', name: 'Arcana', stat: 'int' },
    { id: 'athletics', name: 'Atletismo', stat: 'str' },
    { id: 'deception', name: 'Engaño', stat: 'cha' },
    { id: 'history', name: 'Historia', stat: 'int' },
    { id: 'insight', name: 'Perspicacia', stat: 'wis' },
    { id: 'intimidation', name: 'Intimidación', stat: 'cha' },
    { id: 'investigation', name: 'Investigación', stat: 'int' },
    { id: 'medicine', name: 'Medicina', stat: 'wis' },
    { id: 'nature', name: 'Naturaleza', stat: 'int' },
    { id: 'perception', name: 'Percepción', stat: 'wis' },
    { id: 'performance', name: 'Interpretación', stat: 'cha' },
    { id: 'persuasion', name: 'Persuasión', stat: 'cha' },
    { id: 'religion', name: 'Religión', stat: 'int' },
    { id: 'sleightOfHand', name: 'Juego de Manos', stat: 'dex' },
    { id: 'stealth', name: 'Sigilo', stat: 'dex' },
    { id: 'survival', name: 'Supervivencia', stat: 'wis' }
];

const backgroundDatabase = {
    "Acólito": { 
        skills: ["insight", "religion"], 
        desc: "Has pasado tu vida al servicio de un templo dedicado a un dios específico o a un panteón de dioses." 
    },
    "Criminal / Espía": { 
        skills: ["deception", "stealth"], 
        desc: "Eres un criminal experimentado con un historial de quebrantar la ley." 
    },
    "Héroe del Pueblo": { 
        skills: ["animalHandling", "survival"], 
        desc: "Procedes de una clase social humilde, pero estás destinado a mucho más." 
    },
    "Sabio": { 
        skills: ["arcana", "history"], 
        desc: "Pasaste años estudiando el saber y los misterios del multiverso." 
    },
    "Soldado": { 
        skills: ["athletics", "intimidation"], 
        desc: "La guerra ha sido tu vida desde que tienes memoria." 
    }
};

const statNamesTranslated = {
    str: "Fuerza",
    dex: "Destreza",
    con: "Constitución",
    int: "Inteligencia",
    wis: "Sabiduría",
    cha: "Carisma"
};