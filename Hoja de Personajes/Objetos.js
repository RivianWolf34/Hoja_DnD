// ==========================================
// BASE DE DATOS DE OBJETOS E INVENTARIO
// ==========================================

const weaponDatabase = {
    "Bastón": { type: "simple", damage: "1d6", damageType: "contundente", properties: ["Versátil (1d8)"] },
    "Daga": { type: "simple", damage: "1d4", damageType: "perforante", properties: ["Sutil", "Ligera", "Arrojadiza"] },
    "Gran garrote": { type: "simple", damage: "1d8", damageType: "contundente", properties: ["Dos manos"] },
    "Hacha de mano": { type: "simple", damage: "1d6", damageType: "cortante", properties: ["Ligera", "Arrojadiza"] },
    "Hoz": { type: "simple", damage: "1d4", damageType: "cortante", properties: ["Ligera"] },
    "Jabalina": { type: "simple", damage: "1d6", damageType: "perforante", properties: ["Arrojadiza"] },
    "Lanza": { type: "simple", damage: "1d6", damageType: "perforante", properties: ["Arrojadiza", "Versátil (1d8)"] },
    "Martillo ligero": { type: "simple", damage: "1d4", damageType: "contundente", properties: ["Ligera", "Arrojadiza"] },
    "Maza": { type: "simple", damage: "1d6", damageType: "contundente", properties: [] },
    "Arco corto": { type: "simple", damage: "1d6", damageType: "perforante", properties: ["A distancia", "Dos manos"], ammoType: "Flechas" },
    "Ballesta ligera": { type: "simple", damage: "1d8", damageType: "perforante", properties: ["A distancia", "Dos manos", "Recarga"], ammoType: "Virotes" },
    "Dardo": { type: "simple", damage: "1d4", damageType: "perforante", properties: ["A distancia", "Sutil", "Arrojadiza"] },
    "Honda": { type: "simple", damage: "1d4", damageType: "contundente", properties: ["A distancia"], ammoType: "Rocas" },
    "Alabarda": { type: "martial", damage: "1d10", damageType: "cortante", properties: ["Pesada", "Alcance", "Dos manos"] },
    "Cimitarra": { type: "martial", damage: "1d6", damageType: "cortante", properties: ["Sutil", "Ligera"] },
    "Espada corta": { type: "martial", damage: "1d6", damageType: "perforante", properties: ["Sutil", "Ligera"] },
    "Espada larga": { type: "martial", damage: "1d8", damageType: "cortante", properties: ["Versátil (1d10)"] },
    "Espadón": { type: "martial", damage: "2d6", damageType: "cortante", properties: ["Pesada", "Dos manos"] },
    "Estoque": { type: "martial", damage: "1d8", damageType: "perforante", properties: ["Sutil"] },
    "Guja": { type: "martial", damage: "1d10", damageType: "cortante", properties: ["Pesada", "Alcance", "Dos manos"] },
    "Hacha de batalla": { type: "martial", damage: "1d8", damageType: "cortante", properties: ["Versátil (1d10)"] },
    "Hacha enana": { type: "martial", damage: "1d12", damageType: "cortante", properties: ["Pesada", "Dos manos"] },
    "Lanza de caballería": { type: "martial", damage: "1d12", damageType: "perforante", properties: ["Alcance", "Especial"] },
    "Látigo": { type: "martial", damage: "1d4", damageType: "cortante", properties: ["Sutil", "Alcance"] },
    "Lucero del alba": { type: "martial", damage: "1d8", damageType: "perforante", properties: [] },
    "Martillo de guerra": { type: "martial", damage: "1d8", damageType: "contundente", properties: ["Versátil (1d10)"] },
    "Mayal": { type: "martial", damage: "1d8", damageType: "contundente", properties: [] },
    "Pica": { type: "martial", damage: "1d10", damageType: "perforante", properties: ["Pesada", "Alcance", "Dos manos"] },
    "Tridente": { type: "martial", damage: "1d6", damageType: "perforante", properties: ["Arrojadiza", "Versátil (1d8)"] },
    "Arco largo": { type: "martial", damage: "1d8", damageType: "perforante", properties: ["A distancia", "Pesada", "Dos manos"], ammoType: "Flechas" },
    "Ballesta de mano": { type: "martial", damage: "1d6", damageType: "perforante", properties: ["A distancia", "Ligera", "Recarga"], ammoType: "Virotes" },
    "Ballesta pesada": { type: "martial", damage: "1d10", damageType: "perforante", properties: ["A distancia", "Pesada", "Dos manos", "Recarga"], ammoType: "Virotes" },
    "Cerbatana": { type: "martial", damage: "1", damageType: "perforante", properties: ["A distancia", "Recarga"], ammoType: "Agujas" },
    "Red": { type: "martial", damage: "0", damageType: "contundente", properties: ["Especial", "Arrojadiza"] }
};

const ammoDatabase = {
    "Flechas": { desc: "Munición estándar para arcos. Se consume al atacar." },
    "Virotes": { desc: "Munición pesada para ballestas. Se consume al atacar." },
    "Rocas": { desc: "Munición contundente para hondas. Se consume al atacar." },
    "Agujas": { desc: "Munición ligera para cerbatanas. Se consume al atacar." }
};

const armorDatabase = {
    "Acolchada (Ligera)": { type: "light", ac: 11, stealthDisadvantage: true, desc: "CA 11 + Des | Desv. Sigilo" },
    "Cuero (Ligera)": { type: "light", ac: 11, stealthDisadvantage: false, desc: "CA 11 + Des" },
    "Cuero tachonado (Ligera)": { type: "light", ac: 12, stealthDisadvantage: false, desc: "CA 12 + Des" },
    "Pieles (Media)": { type: "medium", ac: 12, stealthDisadvantage: false, desc: "CA 12 + Des (máx +2)" },
    "Camisa de mallas (Media)": { type: "medium", ac: 13, stealthDisadvantage: false, desc: "CA 13 + Des (máx +2)" },
    "Cota de escamas (Media)": { type: "medium", ac: 14, stealthDisadvantage: true, desc: "CA 14 + Des (máx +2) | Desv. Sigilo" },
    "Coraza (Media)": { type: "medium", ac: 14, stealthDisadvantage: false, desc: "CA 14 + Des (máx +2)" },
    "Medio placas (Media)": { type: "medium", ac: 15, stealthDisadvantage: true, desc: "CA 15 + Des (máx +2) | Desv. Sigilo" },
    "Cota de anillas (Pesada)": { type: "heavy", ac: 14, stealthDisadvantage: true, desc: "CA 14 fijo | Desv. Sigilo" },
    "Cota de malla (Pesada)": { type: "heavy", ac: 16, stealthDisadvantage: true, desc: "CA 16 fijo | Desv. Sigilo" },
    "Cota de bandas (Pesada)": { type: "heavy", ac: 17, stealthDisadvantage: true, desc: "CA 17 fijo | Desv. Sigilo" },
    "Placas (Pesada)": { type: "heavy", ac: 18, stealthDisadvantage: true, desc: "CA 18 fijo | Desv. Sigilo" },
    "Escudo": { type: "shield", ac: 2, stealthDisadvantage: false, desc: "+2 CA adicional" }
};

const kitDatabase = {
    "Kit de Artesano": { type: "kit", isKit: true, desc: "Repara equipamiento dañado, tasa objetos de valor, crea compartimentos ocultos y altera la apariencia física (disfraces, tintes, maquillaje)." },
    "Herramientas de Ladrón": { type: "kit", isKit: true, desc: "Forzar cerraduras, sabotear trampas mecánicas y falsificar documentos oficiales, firmas, sellos reales o mapas del tesoro." },
    "Kit Herborista": { type: "kit", isKit: true, desc: "Identifica plantas u hongos, recolecta ingredientes mágicos y fabrica Pociones de Curación y antitoxinas." },
    "Kit Envenenador": { type: "kit", isKit: true, desc: "Extrae veneno de monstruos caídos, refina sustancias letales y aplica veneno de forma segura en armas o flechas para ganar daño extra." }
};

const healingPotionDatabase = {
    "Poción de Curación": { dc: 10, desc: "Ingrediente: Concentrado Herbal. Requiere Kit Herborista. Cura 2d4+2 HP.", healDice: "2d4", healBonus: 2, ingredientName: "Concentrado Herbal" },
    "Poción de Curación Mayor": { dc: 14, desc: "Ingrediente: Concentrado Aceitoso. Requiere Kit Herborista. Cura 4d4+4 HP.", healDice: "4d4", healBonus: 4, ingredientName: "Concentrado Aceitoso" },
    "Poción de Curación Superior": { dc: 18, desc: "Ingrediente: Concentrado Vital. Requiere Kit Herborista. Cura 8d4+8 HP.", healDice: "8d4", healBonus: 8, ingredientName: "Concentrado Vital" }
};

const materialDatabase = {
    "Concentrado Herbal": { desc: "Extracto líquido verdoso obtenido al machacar plantas comunes de la superficie." },
    "Concentrado Aceitoso": { desc: "Aceite denso y purificado. Ingrediente para Poción Mayor.", craftable: true, craftDc: 10, craftIngredient: "Concentrado Herbal" },
    "Concentrado Vital": { desc: "Fluido espeso mágico extraído de monstruos o lugares inestables feéricos." }
};

const poisonDatabase = {
    "Veneno Básico": { dc: 10, desc: "Ingrediente: Toxina Botánica. Salvación CON DC 10 o sufre +1d4 daño Veneno (sin daño si salva).", damageDice: "1d4", toxinName: "Toxina Botánica" },
    "Veneno Intermedio": { dc: 14, desc: "Ingrediente: Toxina Bestial. Salvación CON DC 14 o sufre +3d6 daño Veneno (mitad si salva).", damageDice: "3d6", toxinName: "Toxina Bestial" },
    "Veneno Avanzado": { dc: 18, desc: "Ingrediente: Toxina Planar (o 3x Veneno Básico). Salvación CON DC 18 o sufre +5d6 daño Veneno y Envenenado 1 min (mitad y sin estado si salva).", damageDice: "5d6", toxinName: "Toxina Planar" }
};

const dndItems = [
    { label: "Armas Simples", items: ["Bastón", "Daga", "Gran garrote", "Hacha de mano", "Hoz", "Jabalina", "Lanza", "Martillo ligero", "Maza", "Arco corto", "Ballesta ligera", "Dardo", "Honda"] },
    { label: "Armas Marciales", items: ["Alabarda", "Cimitarra", "Espada corta", "Espada larga", "Espadón", "Estoque", "Guja", "Hacha de batalla", "Hacha enana", "Lanza de caballería", "Látigo", "Lucero del alba", "Martillo de guerra", "Mayal", "Pica", "Tridente", "Arco largo", "Ballesta de mano", "Ballesta pesada", "Cerbatana", "Red"] },
    { label: "Armaduras y Escudos", items: ["Acolchada (Ligera)", "Cuero (Ligera)", "Cuero tachonado (Ligera)", "Pieles (Media)", "Camisa de mallas (Media)", "Cota de escamas (Media)", "Coraza (Media)", "Medio placas (Media)", "Cota de anillas (Pesada)", "Cota de malla (Pesada)", "Cota de bandas (Pesada)", "Placas (Pesada)", "Escudo"] },
    { label: "Municiones", items: ["Flechas", "Virotes", "Rocas", "Agujas"] },
    { label: "Pociones y Venenos", items: ["Poción de Curación", "Poción de Curación Mayor", "Poción de Curación Superior", "Agua bendita", "Antídoto", "Veneno Básico", "Veneno Intermedio", "Veneno Avanzado"] },
    { label: "Materiales y Toxinas", items: ["Toxina Botánica", "Toxina Bestial", "Toxina Planar", "Concentrado Herbal", "Concentrado Aceitoso", "Concentrado Vital"] },
    { label: "Herramientas y Kits", items: ["Kit Artesano", "Herramientas de Ladrón", "Kit Herborista", "Kit Envenenador"] },
    { label: "Instrumentos Musicales", items: ["Laúd", "Lira", "Flauta", "Flauta de pan", "Tambor", "Gaita", "Cuerno (Bocina)", "Dulcémele (Dulcimer)", "Chirimía (Caramillo / Shawm)", "Viola (Viol)"] },
    { label: "Focos Mágicos", items: ["Foco arcano", "Foco druídico", "Símbolo sagrado"] },
    { label: "Equipo de Aventurero", items: ["Abrojos", "Antorcha", "Cuerda de cáñamo (15m)", "Frasco", "Linterna sorda", "Mochila", "Raciones (1 día)", "Saco de dormir", "Yesquero"] }
];