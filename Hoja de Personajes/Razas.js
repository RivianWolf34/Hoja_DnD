// ==========================================
// BASE DE DATOS DE RAZAS Y ATRIBUTOS
// ==========================================

const raceDatabase = {
    "Humano": { bonuses: {str: 1, dex: 1, con: 1, int: 1, wis: 1, cha: 1}, speed: 30, languages: "Común, +1 a tu elección.", traits: "Versatilidad Humana: +1 a todas tus puntuaciones de característica.", resistances: "Ninguna.", attacks: [] },
    "Humano (Variante)": { bonuses: {str: 1, dex: 1, con: 0, int: 0, wis: 0, cha: 0}, speed: 30, languages: "Común y un idioma extra.", traits: "+1 a dos características a elección, una dote adicional y competencia en una habilidad.", resistances: "Ninguna.", attacks: [], extraFeats: 1 },
    "Elfo": { bonuses: {str: 0, dex: 2, con: 0, int: 0, wis: 0, cha: 0}, speed: 30, languages: "Común, Élfico.", traits: "Linaje Feérico (Ventaja vs Encantamiento), Trance (4h equivalen a 8h de descanso), Visión en la Oscuridad (60 pies), Competencia en Percepción.", resistances: "Inmunidad mágica a dormir.", attacks: [] },
    "Enano": { bonuses: {str: 0, dex: 0, con: 2, int: 0, wis: 0, cha: 0}, speed: 25, languages: "Común, Enano.", traits: "Resiliencia Enana (Ventaja contra veneno), Afinidad con la Piedra, Entrenamiento marcial, Visión en la Oscuridad (60 pies).", resistances: "Resistencia al daño por Veneno.", attacks: [] },
    "Mediano": { bonuses: {str: 0, dex: 2, con: 0, int: 0, wis: 0, cha: 0}, speed: 25, languages: "Común, Mediano.", traits: "Suertudo (Repetir 1s en d20), Valiente (Ventaja contra asustado), Agilidad Mediana (puedes moverte a través de criaturas grandes).", resistances: "Ventaja vs Asustado.", attacks: [] },
    "Dracónido": { bonuses: {str: 2, dex: 0, con: 0, int: 0, wis: 0, cha: 1}, speed: 30, languages: "Común, Dracónico.", traits: "Ancestros Dracónicos (Linaje elemental de dragón).", resistances: "Resistencia al elemento de tu ancestro dracónico.", attacks: [{name: "Arma de Aliento (Área)", type: "save", saveStat: "con", damage: "2d6", damageType: "Elemental"}] },
    "Gnomo": { bonuses: {str: 0, dex: 0, con: 0, int: 2, wis: 0, cha: 0}, speed: 25, languages: "Común, Gnómico.", traits: "Astucia Gnómica (Ventaja en tiradas de salvación de Inteligencia, Sabiduría y Carisma contra magia), Visión en la Oscuridad (60 pies).", resistances: "Ventaja contra magia (Int/Sab/Car).", attacks: [] },
    "Semielfo": { bonuses: {str: 0, dex: 0, con: 0, int: 0, wis: 0, cha: 2}, speed: 30, languages: "Común, Élfico, +1 extra a elección.", traits: "Linaje Feérico, Versatilidad en Habilidades (+2 competencias a elección). +1 a dos atributos extras.", resistances: "Ventaja vs Encantamiento.", attacks: [] },
    "Semiorco": { bonuses: {str: 2, dex: 0, con: 1, int: 0, wis: 0, cha: 0}, speed: 30, languages: "Común, Orco.", traits: "Amenazador (Competencia en Intimidación), Aguante Incansable (Al caer a 0 HP puedes volver a 1 HP una vez por descanso), Ataques Salvajes.", resistances: "Ninguna.", attacks: [] },
    "Tiflin": { bonuses: {str: 0, dex: 0, con: 0, int: 1, wis: 0, cha: 2}, speed: 30, languages: "Común, Infernal.", traits: "Legado Infernal (Taumaturgia, Reprensión Infernal a niv 3 y Oscuridad a niv 5), Visión en la Oscuridad (60 pies).", resistances: "Resistencia al daño por Fuego.", attacks: [] }
};

const draconicAncestries = {
    "Azul": { type: "Eléctrico", area: "Línea 5x30 pies", saveStat: "con" },
    "Blanco": { type: "Frío", area: "Cono 15 pies", saveStat: "con" },
    "Bronce": { type: "Eléctrico", area: "Línea 5x30 pies", saveStat: "con" },
    "Cobre": { type: "Ácido", area: "Línea 5x30 pies", saveStat: "con" },
    "Latón": { type: "Fuego", area: "Línea 5x30 pies", saveStat: "con" },
    "Negro": { type: "Ácido", area: "Línea 5x30 pies", saveStat: "con" },
    "Oro": { type: "Fuego", area: "Cono 15 pies", saveStat: "con" },
    "Plata": { type: "Frío", area: "Cono 15 pies", saveStat: "con" },
    "Rojo": { type: "Fuego", area: "Cono 15 pies", saveStat: "con" },
    "Verde": { type: "Veneno", area: "Cono 15 pies", saveStat: "con" }
};
