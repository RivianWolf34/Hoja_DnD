// ==========================================
// BASE DE DATOS DE CLASES Y OPCIONES
// ==========================================

const classDatabase = {
    "Bárbaro": { 
        hitDice: "1d12", hitDiceSides: 12, avgHp: 7, 
        saves: { str: true, con: true }, 
        features: "Furia (2/día): Daño extra cuerpo a cuerpo y resistencia a contundente/cortante/perforante.\nDefensa sin armadura: CA = 10 + Des + Con (si no usas armadura)." 
    },
    "Bardo": { 
        hitDice: "1d8", hitDiceSides: 8, avgHp: 5, 
        saves: { dex: true, cha: true }, 
        features: "Lanzamiento de Conjuros (Carisma).\nInspiración Bárdica (d6): Concede dados adicionales a aliados.\nVersatilidad de Jack de todos los oficios." 
    },
    "Brujo": { 
        hitDice: "1d8", hitDiceSides: 8, avgHp: 5, 
        saves: { wis: true, cha: true }, 
        features: "Magia de Pacto (Ranuras que se recargan en descanso corto).\nInvocaciones Místicas (Poderes arcanos personalizables)." 
    },
    "Clérigo": { 
        hitDice: "1d8", hitDiceSides: 8, avgHp: 5, 
        saves: { wis: true, cha: true }, 
        features: "Lanzamiento de Conjuros Divinos (Sabiduría).\nDominio Divino (Canalizar Divinidad: Destruir muertos vivientes o curación)." 
    },
    "Druida": { 
        hitDice: "1d8", hitDiceSides: 8, avgHp: 5, 
        saves: { int: true, wis: true }, 
        features: "Lanzamiento de Conjuros de la Naturaleza (Sabiduría).\nForma Salvaje (Transformación en bestias)." 
    },
    "Explorador": { 
        hitDice: "1d10", hitDiceSides: 10, avgHp: 6, 
        saves: { str: true, dex: true }, 
        features: "Enemigo Predilecto y Explorador Natural.\nEstilo de combate.\nLanzamiento de conjuros a partir de nivel 2." 
    },
    "Guerrero": { 
        hitDice: "1d10", hitDiceSides: 10, avgHp: 6, 
        saves: { str: true, con: true }, 
        features: "Estilo de Combate (Duelo, Defensivo, etc.).\nNuevas Energías (Recuperas 1d10 + nivel en HP por descanso corto).\nAcción Adicional." 
    },
    "Hechicero": { 
        hitDice: "1d6", hitDiceSides: 6, avgHp: 4, 
        saves: { con: true, cha: true }, 
        features: "Magia Innata (Carisma).\nPuntos de Hechicería y metamagia (Duplicar o distanciar hechizos)." 
    },
    "Mago": { 
        hitDice: "1d6", hitDiceSides: 6, avgHp: 4, 
        saves: { int: true, wis: true }, 
        features: "Lanzamiento de Conjuros Arcanos (Inteligencia).\nRecuperación Arcana (Recuperar espacios de conjuro en descanso corto).\nLibro de conjuros." 
    },
    "Monje": { 
        hitDice: "1d8", hitDiceSides: 8, avgHp: 5, 
        saves: { str: true, dex: true }, 
        features: "Artes Marciales (Ataques con desarmado usando Destreza y d4 de daño).\nDefensa sin Armadura (CA = 10 + Des + Sab).\nKi (Puntos de energía)." 
    },
    "Paladín": { 
        hitDice: "1d10", hitDiceSides: 10, avgHp: 6, 
        saves: { wis: true, cha: true }, 
        features: "Sentido Divino y Lay on Hands (Imposición de manos curativas).\nEstilo de Combate.\nSmite Divino (Gastas espacios para daño radiante extra)." 
    },
    "Pícaro": { 
        hitDice: "1d8", hitDiceSides: 8, avgHp: 5, 
        saves: { dex: true, int: true }, 
        features: "Ataque Furtivo (Daño masivo adicional al atacar con ventaja).\nExperiencia en Habilidades.\nAcción Astuta (Esquivar o Correr como acción bonus)." 
    }
};

const classSkillOptions = {
    "Guerrero": { count: 2, skills: ["acrobatics", "animalHandling", "athletics", "history", "insight", "intimidation", "perception", "survival"] },
    "Mago": { count: 2, skills: ["arcana", "history", "insight", "investigation", "medicine", "religion"] },
    "Pícaro": { count: 4, skills: ["acrobatics", "athletics", "deception", "insight", "intimidation", "investigation", "perception", "performance", "persuasion", "sleightOfHand", "stealth"] },
    "Clérigo": { count: 2, skills: ["history", "insight", "medicine", "persuasion", "religion"] },
    "Bardo": { count: 3, skills: "ANY" },
    "Druida": { count: 2, skills: ["animalHandling", "arcana", "insight", "medicine", "nature", "perception", "religion", "survival"] },
    "Explorador": { count: 3, skills: ["animalHandling", "athletics", "insight", "investigation", "nature", "perception", "stealth", "survival"] },
    "Paladín": { count: 2, skills: ["athletics", "insight", "intimidation", "medicine", "persuasion", "religion"] },
    "Monje": { count: 2, skills: ["acrobatics", "athletics", "history", "insight", "religion", "stealth"] },
    "Hechicero": { count: 2, skills: ["arcana", "deception", "insight", "persuasion", "religion"] },
    "Brujo": { count: 2, skills: ["arcana", "deception", "history", "intimidation", "investigation", "nature", "religion"] },
    "Bárbaro": { count: 2, skills: ["animalHandling", "athletics", "intimidation", "nature", "perception", "survival"] }
};