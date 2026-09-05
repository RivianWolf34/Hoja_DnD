const { useState, useEffect, useMemo } = React;

// SVG Icons definitions
const ShieldIcon = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>);
const HeartIcon = ({ className, size = 24 }) => (<svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>);
const ZapIcon = ({ className, size = 24 }) => (<svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>);
const BookOpenIcon = ({ className, size = 24 }) => (<svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>);
const SwordIcon = ({ className, size = 24 }) => (<svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="14.5 17.5 3 6 3 3 6 3 17.5 14.5"/><line x1="13" x2="19" y1="19" y2="13"/><line x1="16" x2="20" y1="16" y2="20"/><line x1="19" x2="21" y1="21" y2="19"/></svg>);
const BiohazardIcon = ({ className, size = 24 }) => (<svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"/><path d="M12 12v.01"/><path d="M11.99 15.5a3.5 3.5 0 1 0-3.03-5.26"/><path d="M12.01 15.5a3.5 3.5 0 1 1 3.03-5.26"/><path d="M12 12V8.5"/></svg>);
const CrosshairIcon = ({ className, size = 24 }) => (<svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"/><line x1="22" x2="18" y1="12" y2="12"/><line x1="6" x2="2" y1="12" y2="12"/><line x1="12" x2="12" y1="6" y2="2"/><line x1="12" x2="12" y1="22" y2="18"/></svg>);
const BackpackIcon = ({ className, size = 24 }) => (<svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M4 10v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V10M9 6V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M4 10h16M8 14h8"/></svg>);

const CharacterSheet = () => {
    const [activeTab, setActiveTab] = useState('sheet');
   
    const [info, setInfo] = useState({
        name: '', 
        classLevel: 'Guerrero', 
        level: 1, 
        background: '', 
        playerName: '', 
        race: 'Humano', 
        draconicAncestry: 'Rojo', 
        alignment: 'Neutral', 
        xp: 0, 
        classSkills: [], 
        bgSkills: []
    });

    const [abilities, setAbilities] = useState({
        str: 15, dex: 14, con: 13, int: 10, wis: 12, cha: 8
    });

    const [proficiencies, setProficiencies] = useState({
        saves: { str: true, dex: false, con: true, int: false, wis: false, cha: false },
        skills: {
            acrobatics: false, animalHandling: false, arcana: false, athletics: false,
            deception: false, history: false, insight: false, intimidation: false,
            investigation: false, medicine: false, nature: false, perception: false,
            performance: false, persuasion: false, religion: false, sleightOfHand: false,
            stealth: false, survival: false
        }
    });

    const toggleProficiency = (type, id) => {
        setProficiencies(prev => ({
            ...prev,
            [type]: {
                ...prev[type],
                [id]: !prev[type][id]
            }
        }));
    };

    const toggleDeathSave = (type, index) => {
        const newArray = [...combat.deathSaves[type]];
        newArray[index] = !newArray[index];
        setCombat({ ...combat, deathSaves: { ...combat.deathSaves, [type]: newArray } });
    };

    const [combat, setCombat] = useState({
        acBonus: 0, speed: 30, hpMax: 12, hpCurrent: 12, hpTemp: 0, hitDice: '1d10',
        deathSaves: { successes: [false, false, false], failures: [false, false, false] }
    });







// --- FUNCIÓN PARA GUARDAR (EXPORTAR) EL PERSONAJE ---
    const saveCharacterData = () => {
        const characterData = {
            version: "1.0",
            info,
            abilities,
            proficiencies,
            combat,
            customInventory,
            knownSpells,
            spellSlots,
            activeConditions,
            texts,
            inventory,
            selectedFeats,
            currency
        };
        
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(characterData, null, 2));
        const downloadAnchor = document.createElement('a');
        downloadAnchor.setAttribute("href", dataStr);
        downloadAnchor.setAttribute("download", `${(info.name || 'personaje').toLowerCase().replace(/\s+/g, '_')}_dnd.json`);
        document.body.appendChild(downloadAnchor);
        downloadAnchor.click();
        downloadAnchor.remove();

        setRollNotification({
            title: "¡Personaje Guardado!",
            details: `Se ha descargado el archivo de "${info.name || 'tu personaje'}" con éxito.`,
            total: '💾',
            type: 'crit'
        });
    };

    // --- FUNCIÓN PARA CARGAR (IMPORTAR) EL PERSONAJE ---
    const loadCharacterData = (e) => {
        const fileReader = new FileReader();
        if (e.target.files && e.target.files[0]) {
            fileReader.readAsText(e.target.files[0], "UTF-8");
            fileReader.onload = (event) => {
                try {
                    const parsedData = JSON.parse(event.target.result);
                    
                    if (parsedData.info) setInfo(parsedData.info);
                    if (parsedData.abilities) setAbilities(parsedData.abilities);
                    if (parsedData.proficiencies) setProficiencies(parsedData.proficiencies);
                    if (parsedData.combat) setCombat(parsedData.combat);
                    if (parsedData.customInventory) setCustomInventory(parsedData.customInventory);
                    if (parsedData.knownSpells) setKnownSpells(parsedData.knownSpells);
                    if (parsedData.spellSlots) setSpellSlots(parsedData.spellSlots);
                    if (parsedData.activeConditions) setActiveConditions(parsedData.activeConditions);
                    if (parsedData.texts) setTexts(parsedData.texts);
                    if (parsedData.inventory) setInventory(parsedData.inventory);
                    if (parsedData.selectedFeats) setSelectedFeats(parsedData.selectedFeats);
                    if (parsedData.currency) setCurrency(parsedData.currency);
                    
                    setRollNotification({
                        title: "¡Personaje Cargado!",
                        details: `Los datos de "${parsedData.info?.name || 'Personaje'}" se han cargado correctamente.`,
                        total: '📂',
                        type: 'crit'
                    });
                } catch (error) {
                    alert("Error al leer el archivo JSON. Asegúrate de que sea una hoja de personaje válida.");
                }
            };
        }
        // Limpia el input para permitir cargar el mismo archivo dos veces seguidas si es necesario
        e.target.value = null;
    };



// Función para reiniciar todos los espacios de magia
const resetSpellSlots = () => {
    // Genera una matriz completamente nueva y limpia
    setSpellSlots([4, 3, 3, 3, 3, 2, 2, 1, 1].map(max => Array(max).fill(false)));
};







// --- ESTADO PARA OBJETOS PERSONALIZADOS (En Script.js) ---
const [customInventory, setCustomInventory] = useState([]);

const addCustomItem = () => {
    const newItem = {
        id: Date.now(),
        name: "Nuevo Objeto Mágico",
        category: "Objeto Maravilloso",
        quantity: 1,
        attuned: false,
        equipped: false,
        description: "...",
        weapon: { 
            hasAttack: false, 
            attackBonus: 0, 
            damageDice: "1d8", 
            stat: "str",
            elementalType: "Ninguno",
            elementalDice: "" 
        },
        armorBonus: 0,
        resistanceType: "Ninguna"
    };
    setCustomInventory([...customInventory, newItem]);
};

const updateCustomItemField = (id, field, value) => {
    setCustomInventory(customInventory.map(item => item.id === id ? { ...item, [field]: value } : item));
};

const updateCustomWeaponField = (id, field, value) => {
    setCustomInventory(customInventory.map(item => {
        if (item.id === id) {
            return { ...item, weapon: { ...item.weapon, [field]: value } };
        }
        return item;
    }));
};

const adjustCustomQuantity = (id, delta) => {
    setCustomInventory(customInventory.map(item => {
        if (item.id === id) {
            const newQty = Math.max(0, (item.quantity || 1) + delta);
            return { ...item, quantity: newQty };
        }
        return item;
    }));
};

const removeCustomItem = (id) => {
    setCustomInventory(customInventory.filter(item => item.id !== id));
};















    
// Estado para guardar los hechizos seleccionados en el Grimorio
const [knownSpells, setKnownSpells] = useState([]);

    const [spellSlots, setSpellSlots] = useState({
        1: Array(4).fill(false),
        2: Array(3).fill(false),
        3: Array(3).fill(false),
        4: Array(3).fill(false),
        5: Array(3).fill(false),
        6: Array(2).fill(false),
        7: Array(2).fill(false),
        8: Array(1).fill(false),
        9: Array(1).fill(false)
    });
    
    const toggleSpellSlot = (level, index) => {
        setSpellSlots(prev => {
            const newLevelSlots = [...prev[level]];
            newLevelSlots[index] = !newLevelSlots[index];
            return { ...prev, [level]: newLevelSlots };
        });
    };

    const [hpModalOpen, setHpModalOpen] = useState(false);
    const [hpLog, setHpLog] = useState(["Nivel 1 configurado."]);

    const [classModalOpen, setClassModalOpen] = useState(false);
    const [tempSelectedClass, setTempSelectedClass] = useState('Guerrero');
    const [tempSelectedSkills, setTempSelectedSkills] = useState([]);

    const confirmClassSelection = () => {
        setProficiencies(prev => {
            const newSkills = { ...prev.skills };
            (info.classSkills || []).forEach(k => { newSkills[k] = false; });
            tempSelectedSkills.forEach(k => { newSkills[k] = true; });
            return { ...prev, skills: newSkills };
        });
        setInfo(prev => ({ ...prev, classLevel: tempSelectedClass, classSkills: tempSelectedSkills }));
        setClassModalOpen(false);
    };

    const [bgModalOpen, setBgModalOpen] = useState(false);
    const [tempSelectedBg, setTempSelectedBg] = useState('Acólito');
    const [bgWildcardSkills, setBgWildcardSkills] = useState([]);

    const openBgModal = () => {
        const currentBg = info.background || 'Acólito';
        const validBg = backgroundDatabase[currentBg] ? currentBg : 'Acólito';
        setTempSelectedBg(validBg);
        
        if (validBg === info.background && info.bgSkills) {
            const defaultSkills = backgroundDatabase[validBg].skills;
            const wildcards = info.bgSkills.filter(s => !defaultSkills.includes(s));
            setBgWildcardSkills(wildcards);
        } else {
            setBgWildcardSkills([]);
        }
        setBgModalOpen(true);
    };

    const confirmBackground = () => {
        const bgData = backgroundDatabase[tempSelectedBg];
        const defaultSkills = bgData.skills;
        const externallyLocked = defaultSkills.filter(s => proficiencies.skills[s] && !(info.bgSkills || []).includes(s));
        
        setProficiencies(prev => {
            const newSkills = { ...prev.skills };
            (info.bgSkills || []).forEach(k => { newSkills[k] = false; });
            
            const finalBgSkills = [];
            defaultSkills.forEach(s => {
                if (!externallyLocked.includes(s)) {
                    newSkills[s] = true;
                    finalBgSkills.push(s);
                }
            });
            
            bgWildcardSkills.forEach(s => {
                newSkills[s] = true;
                finalBgSkills.push(s);
            });
            
            setInfo(i => ({ ...i, background: tempSelectedBg, bgSkills: finalBgSkills }));
            return { ...prev, skills: newSkills };
        });
        setBgModalOpen(false);
    };

    const [activeConditions, setActiveConditions] = useState([]);
    const [texts, setTexts] = useState({
        attacks: '', features: '',
        profAndLang: '',
        equipment: '', personality: '', ideals: '', bonds: '', flaws: ''
    });

    // INVENTARIO INICIAL CON MUNICIONES
    const [inventory, setInventory] = useState([]);

    const handleQuantityChange = (id, delta) => {
        setInventory(prevInv => prevInv.map(item => {
            if (item.id === id) {
                const currentQty = typeof item.quantity === 'number' ? item.quantity : 1;
                const newQty = Math.max(0, currentQty + delta);
                return { ...item, quantity: newQty };
            }
            return item;
        }));
    };
    
    const [diceModalOpen, setDiceModalOpen] = useState(false);
    const [diceCounts, setDiceCounts] = useState({ 4: 0, 6: 0, 8: 0, 10: 0, 12: 0, 20: 0, 100: 0 });
    const [diceMod, setDiceMod] = useState(0);
    const [diceResult, setDiceResult] = useState(null);
    const [rollNotification, setRollNotification] = useState(null);
    const [equipFlow, setEquipFlow] = useState(null);
    const [applyPoisonModal, setApplyPoisonModal] = useState(null);

    const [selectedFeats, setSelectedFeats] = useState([]);
    const [currency, setCurrency] = useState({ cp: 0, sp: 0, gp: 0 });

    const handleAddCoins = (amount, type) => {
        setCurrency(prev => {
            let totalCp = prev.gp * 100 + prev.sp * 10 + prev.cp;
            let change = amount;
            
            if (type === 'gp') change = amount * 100;
            if (type === 'sp') change = amount * 10;
            
            totalCp = Math.max(0, totalCp + change);
            
            return {
                gp: Math.floor(totalCp / 100),
                sp: Math.floor((totalCp % 100) / 10),
                cp: totalCp % 10
            };
        });
    };

    const currentClassData = classDatabase[info.classLevel] || classDatabase["Guerrero"];

    useEffect(() => {
        setCombat(prev => ({ ...prev, hitDice: `${info.level}d${currentClassData.hitDiceSides}` }));
        setProficiencies(prev => ({
            ...prev,
            saves: {
                str: !!currentClassData.saves.str,
                dex: !!currentClassData.saves.dex,
                con: !!currentClassData.saves.con,
                int: !!currentClassData.saves.int,
                wis: !!currentClassData.saves.wis,
                cha: !!currentClassData.saves.cha
            }
        }));
        setTexts(prev => ({ ...prev, features: currentClassData.features }));
    }, [info.classLevel, info.level]);

   // Clonamos la raza para no sobreescribir la base de datos original
    let currentRace = JSON.parse(JSON.stringify(raceDatabase[info.race] || raceDatabase["Humano"]));

    // Si eres Dracónido, inyectamos la lógica del linaje
    if (info.race === "Dracónido" && typeof draconicAncestries !== 'undefined') {
        const ancestry = draconicAncestries[info.draconicAncestry || 'Rojo'];
        if (ancestry) {
            currentRace.resistances = `Resistencia al daño por ${ancestry.type}.`;
            currentRace.attacks = [{
                name: `Aliento ${ancestry.type.charAt(0).toUpperCase() + ancestry.type.slice(1)} (${ancestry.area})`, 
                type: "save", 
                saveStat: ancestry.saveStat, 
                damage: "2d6", 
                damageType: ancestry.type
            }];
        }
    }

    const allowedFeats = useMemo(() => {
        let count = 0;
        const lvl = Number(info.level);
        if (lvl >= 4) count++;
        if (lvl >= 8) count++;
        if (lvl >= 12) count++;
        if (lvl >= 16) count++;
        if (lvl >= 19) count++;
        if (info.classLevel === 'Guerrero') {
            if (lvl >= 6) count++;
            if (lvl >= 14) count++;
        } else if (info.classLevel === 'Pícaro') {
            if (lvl >= 10) count++;
        }
        if (currentRace.extraFeats) count += currentRace.extraFeats;
        return count;
    }, [info.level, info.classLevel, info.race]);

    useEffect(() => {
        setCombat(prev => ({ ...prev, speed: currentRace.speed }));
    }, [info.race]);

    const effectiveAbilities = {
        str: Number(abilities.str) + currentRace.bonuses.str,
        dex: Number(abilities.dex) + currentRace.bonuses.dex,
        con: Number(abilities.con) + currentRace.bonuses.con,
        int: Number(abilities.int) + currentRace.bonuses.int,
        wis: Number(abilities.wis) + currentRace.bonuses.wis,
        cha: Number(abilities.cha) + currentRace.bonuses.cha,
    };

    const calcMod = (score) => Math.floor((score - 10) / 2);
    const formatMod = (mod) => (mod >= 0 ? `+${mod}` : mod);
    const profBonus = Math.ceil(info.level / 4) + 1;

    const mods = {
        str: calcMod(effectiveAbilities.str), dex: calcMod(effectiveAbilities.dex), con: calcMod(effectiveAbilities.con),
        int: calcMod(effectiveAbilities.int), wis: calcMod(effectiveAbilities.wis), cha: calcMod(effectiveAbilities.cha)
    };

    const conditionsList = [
        "Cegado", "Hechizado", "Ensordecido", "Asustado", "Apresado", "Incapacitado", 
        "Invisible", "Paralizado", "Petrificado", "Envenenado", "Derribado", 
        "Retenido", "Aturdido", "Inconsciente", "Agotamiento"
    ];
    const toggleCondition = (cond) => {
        setActiveConditions(prev => prev.includes(cond) ? prev.filter(c => c !== cond) : [...prev, cond]);
    };

    const removeInventoryItem = (id) => setInventory(inventory.filter(item => item.id !== id));

    const removeWeaponPoison = (id) => {
        setInventory(prevInv => prevInv.map(inv => inv.id === id ? { ...inv, poisoned: false, poisonName: null, poisonDamage: null } : inv));
    };

    const rollPoisonDamage = (weaponId, weaponName, baseDamageStr) => {
        const parts = baseDamageStr.split('d');
        const count = parseInt(parts[0]) || 1;
        const sides = parseInt(parts[1]) || 6;
        
        let rolls = [];
        let totalDice = 0;
        for(let i=0; i<count; i++){
            const r = Math.floor(Math.random() * sides) + 1;
            rolls.push(r);
            totalDice += r;
        }

        setRollNotification({
            title: `Daño de Veneno: ${weaponName}`,
            details: `Dados de Veneno (${count}d${sides}): [${rolls.join(', ')}] (Carga consumida)`,
            total: totalDice,
            type: 'damage'
        });

        removeWeaponPoison(weaponId);
    };

    const checkKitProficiency = (kitName) => {
        const text = (texts.profAndLang || "").toLowerCase();
        
        // Flexibilizar la búsqueda para tolerar el "de" intermedio del menú desplegable
        let isProficientInText = false;
        if (kitName === "Kit Envenenador") {
            isProficientInText = text.includes("kit envenenador") || text.includes("kit de envenenador");
        } else if (kitName === "Kit Herborista") {
            isProficientInText = text.includes("kit herborista") || text.includes("kit de herborista");
        } else {
            isProficientInText = text.includes(kitName.toLowerCase());
        }

        if (isProficientInText) return true;
        
        if (kitName === "Kit Herborista") {
            if (info.classLevel === "Druida" || info.background === "Ermitaño") return true;
        }
        if (kitName === "Kit Envenenador") {
            if (info.classLevel === "Pícaro" && info.level >= 3) return true;
        }
        return false;
    };

    const craftAlchemy = (id, name, dc, requiredIngredient, useBasicPotions = false) => {
        const hasKit = inventory.some(i => i.name === "Kit Herborista" && (typeof i.quantity === 'number' ? i.quantity : 1) > 0);
        if (!hasKit) {
            setRollNotification({
                title: `Crafteo Fallido`,
                details: `Necesitas un "Kit Herborista" activo (cantidad > 0) en tu mochila.`,
                total: '🚫',
                type: 'fail'
            });
            return;
        }

        const flaskItem = inventory.find(i => i.name === "Frasco" && (typeof i.quantity === 'number' ? i.quantity : 1) > 0);
        if (!flaskItem) {
            setRollNotification({
                title: `Crafteo Fallido`,
                details: `Necesitas al menos un "Frasco" con cantidad > 0 en tu mochila.`,
                total: '🚫',
                type: 'fail'
            });
            return;
        }

        let ingredientItem = null;
        let basicPotionItem = null;

        if (useBasicPotions) {
            basicPotionItem = inventory.find(i => i.name === "Poción de Curación" && (typeof i.quantity === 'number' ? i.quantity : 1) >= 3);
            if (!basicPotionItem) {
                setRollNotification({
                    title: `Crafteo Fallido`,
                    details: `Necesitas al menos 3 unidades de "Poción de Curación" en tu mochila.`,
                    total: '🚫',
                    type: 'fail'
                });
                return;
            }
        } else {
            ingredientItem = inventory.find(i => i.name === requiredIngredient && (typeof i.quantity === 'number' ? i.quantity : 1) > 0);
            if (!ingredientItem) {
                setRollNotification({
                    title: `Crafteo Fallido`,
                    details: `Necesitas al menos 1 unidad de "${requiredIngredient}" en tu mochila.`,
                    total: '🚫',
                    type: 'fail'
                });
                return;
            }
        }

        const targetSkillId = "medicine"; 
        const skillInfo = skillList.find(s => s.id === targetSkillId);
        const hasKitProf = checkKitProficiency("Kit Herborista");
        const baseMod = mods[skillInfo.stat];
        
        const skillIsProficient = proficiencies.skills[targetSkillId];
        // Sumamos Mod Base + Bono de Habilidad (si aplica) + Bono de Kit (si aplica)
        const skillMod = baseMod + (skillIsProficient ? profBonus : 0) + (hasKitProf ? profBonus : 0);
        
        const d20 = Math.floor(Math.random() * 20) + 1;
        const total = d20 + skillMod;
        const success = total >= dc;
        
        handleQuantityChange(flaskItem.id, -1);
        
        if (useBasicPotions) {
            handleQuantityChange(basicPotionItem.id, -3);
        } else {
            handleQuantityChange(ingredientItem.id, -1);
        }
        
        if (success) {
            handleQuantityChange(id, 1);
        }
        
        setRollNotification({
            title: `Alquimia: ${name} ${useBasicPotions ? '(con 3x Básicas)' : ''}`,
            details: `Dado [${d20}] + ${skillInfo.name}(${formatMod(baseMod + (skillIsProficient ? profBonus : 0))})${hasKitProf ? ` + Kit(+${profBonus})` : ''} vs DC ${dc} ${success ? '(¡Éxito! Materiales consumidos)' : '(Fallo. Materiales perdidos)'}`,
            total: total,
            type: success ? (d20 === 20 ? 'crit' : 'normal') : 'fail'
        });
    };

    const useHealingPotion = (id, name, healDice, healBonus) => {
        const item = inventory.find(i => i.id === id);
        if (!item || (typeof item.quantity === 'number' && item.quantity <= 0)) return;

        const parts = healDice.split('d');
        const count = parseInt(parts[0]);
        const sides = parseInt(parts[1]);
        let rolls = [];
        let totalDice = 0;
        for(let i=0; i<count; i++) {
            const r = Math.floor(Math.random() * sides) + 1;
            rolls.push(r);
            totalDice += r;
        }
        const totalHeal = totalDice + healBonus;

        setCombat(prev => ({ ...prev, hpCurrent: Math.min(prev.hpMax, Number(prev.hpCurrent) + totalHeal) }));
        handleQuantityChange(id, -1);

        setRollNotification({
            title: `Poción usada: ${name}`,
            details: `Curación (${healDice}+${healBonus}): [${rolls.join(', ')}] + ${healBonus} (Frasco no devuelto)`,
            total: `+${totalHeal} HP`,
            type: 'crit'
        });
    };

    const craftPoison = (id, name, dc, useBasicPoisons = false) => {
        const hasPoisonKitInInv = inventory.some(i => i.name === "Kit Envenenador" && (typeof i.quantity === 'number' ? i.quantity : 1) > 0);
        if (!hasPoisonKitInInv) {
            setRollNotification({
                title: `Crafteo Fallido`,
                details: `No puedes craftear venenos. Necesitas un "Kit Envenenador" activo (cantidad > 0) en tu mochila.`,
                total: '🚫',
                type: 'fail'
            });
            return;
        }

        const flaskItem = inventory.find(i => i.name === "Frasco" && (typeof i.quantity === 'number' ? i.quantity : 1) > 0);
        if (!flaskItem) {
            setRollNotification({
                title: `Crafteo Fallido`,
                details: `No puedes craftear venenos. Necesitas al menos un "Frasco" con cantidad > 0 en tu mochila.`,
                total: '🚫',
                type: 'fail'
            });
            return;
        }

        const pData = poisonDatabase[name];
        const requiredToxinName = pData ? pData.toxinName : null;
        let toxinItem = null;
        if (requiredToxinName && !useBasicPoisons) {
            toxinItem = inventory.find(i => i.name === requiredToxinName && (typeof i.quantity === 'number' ? i.quantity : 1) > 0);
            if (!toxinItem) {
                setRollNotification({
                    title: `Crafteo Fallido`,
                    details: `No puedes craftear este veneno. Necesitas al menos 1 unidad de "${requiredToxinName}" en tu mochila.`,
                    total: '🚫',
                    type: 'fail'
                });
                return;
            }
        }

        let basicPoisonItem = null;
        if (useBasicPoisons) {
            basicPoisonItem = inventory.find(i => i.name === "Veneno Básico" && (typeof i.quantity === 'number' ? i.quantity : 1) >= 3);
            if (!basicPoisonItem) {
                setRollNotification({
                    title: `Crafteo Fallido`,
                    details: `No puedes craftear este veneno. Necesitas al menos 3 unidades de "Veneno Básico" en tu mochila.`,
                    total: '🚫',
                    type: 'fail'
                });
                return;
            }
        }

        const targetSkillId = name.includes("Básico") ? "nature" : "investigation";
        const skillInfo = skillList.find(s => s.id === targetSkillId);
        const hasKitProf = checkKitProficiency("Kit Envenenador");
        const baseMod = mods[skillInfo.stat];
        
        const skillIsProficient = proficiencies.skills[targetSkillId];
        // Sumamos Mod Base + Bono de Habilidad (si aplica) + Bono de Kit (si aplica)
        const skillMod = baseMod + (skillIsProficient ? profBonus : 0) + (hasKitProf ? profBonus : 0);
        
        const d20 = Math.floor(Math.random() * 20) + 1;
        const total = d20 + skillMod;
        const success = total >= dc;
        
        handleQuantityChange(flaskItem.id, -1);
        if (toxinItem) {
            handleQuantityChange(toxinItem.id, -1);
        }
        if (useBasicPoisons && basicPoisonItem) {
            handleQuantityChange(basicPoisonItem.id, -3);
        }

        if (success) {
            handleQuantityChange(id, 1);
        }
        
        setRollNotification({
            title: `Crafteo: ${name} ${useBasicPoisons ? '(con 3x Veneno Básico)' : ''}`,
            details: `Dado [${d20}] + ${skillInfo.name}(${formatMod(baseMod + (skillIsProficient ? profBonus : 0))})${hasKitProf ? ` + Kit(+${profBonus})` : ''} vs DC ${dc} ${success ? '(¡Éxito! Frasco y ' + (useBasicPoisons ? '3x Veneno Básico' : requiredToxinName) + ' usados)' : '(Fallo. Materiales perdidos)'}`,
            total: total,
            type: success ? (d20 === 20 ? 'crit' : 'normal') : 'fail'
        });
    };

    const checkAndProceedWithHands = (item, neededHands) => {
        let currentHands = 0;
        let handItems = [];
        inventory.forEach(i => {
            if (i.equipped && i.id !== item.id) {
                const iW = weaponDatabase[i.name];
                const iA = armorDatabase[i.name];
                if (iW || (iA && iA.type === "shield")) {
                    const isTwoH = iW && iW.properties && iW.properties.some(p => typeof p === 'string' && p.includes("Dos manos"));
                    const h = (i.grip === 2 || isTwoH) ? 2 : 1;
                    currentHands += h;
                    handItems.push({ ...i, handsItUses: h });
                }
            }
        });

        if (currentHands + neededHands <= 2) {
            setInventory(inventory.map(i => i.id === item.id ? { ...i, equipped: true, grip: neededHands } : i));
            setEquipFlow(null);
        } else {
            const handsToFree = (currentHands + neededHands) - 2;
            setEquipFlow({ item, step: 'replace', type: 'hands', neededHands, handsToFree, conflicts: handItems, selectedReplacements: [] });
        }
    };

    const toggleEquip = (id) => {
        const item = inventory.find(i => i.id === id);
        if (!item) return;

        if (kitDatabase[item.name] || ammoDatabase[item.name] || item.name === "Frasco" || poisonDatabase[item.name] || item.name.includes("Toxina")) return;

        if (item.equipped) {
            setInventory(inventory.map(i => i.id === id ? { ...i, equipped: false, grip: 1 } : i));
            return;
        }

        const wData = weaponDatabase[item.name];
        const aData = armorDatabase[item.name];
        
        let isArmor = aData && aData.type !== "shield";
        let isShield = aData && aData.type === "shield";
        let isTwoHanded = wData && wData.properties && wData.properties.some(p => typeof p === 'string' && p.includes("Dos manos"));
        let isVersatile = wData && wData.properties && wData.properties.some(p => typeof p === 'string' && p.includes("Versátil"));

        if (isArmor) {
            const equippedArmor = inventory.find(i => i.equipped && armorDatabase[i.name] && armorDatabase[i.name].type !== "shield");
            if (equippedArmor) setEquipFlow({ item, step: 'replace', type: 'armor', conflicts: [equippedArmor], selectedReplacements: [] });
            else setInventory(inventory.map(i => i.id === id ? { ...i, equipped: true } : i));
            return;
        }

        if (isVersatile) {
            setEquipFlow({ item, step: 'grip', type: 'hands' });
        } else {
            const neededHands = isTwoHanded ? 2 : (wData || isShield ? 1 : 0);
            if (neededHands > 0) checkAndProceedWithHands(item, neededHands);
            else setInventory(inventory.map(i => i.id === id ? { ...i, equipped: true } : i));
        }
    };

    const processGripSelection = (gripChoice) => checkAndProceedWithHands(equipFlow.item, gripChoice);

    const toggleReplacementSelection = (id) => {
        setEquipFlow(prev => {
            const isSelected = prev.selectedReplacements.includes(id);
            const newReplacements = isSelected ? prev.selectedReplacements.filter(i => i !== id) : [...prev.selectedReplacements, id];
            return { ...prev, selectedReplacements: newReplacements };
        });
    };

    const confirmReplacements = () => {
        setInventory(prevInv => prevInv.map(i => {
            if (equipFlow.selectedReplacements.includes(i.id)) return { ...i, equipped: false, grip: 1 };
            if (i.id === equipFlow.item.id) return { ...i, equipped: true, grip: equipFlow.type === 'hands' ? equipFlow.neededHands : 1 };
            return i;
        }));
        setEquipFlow(null);
    };

    const handleToggleGrip = (id) => {
        const item = inventory.find(i => i.id === id);
        if (!item) return;

        const targetGrip = item.grip === 2 ? 1 : 2;
        if (targetGrip === 1) {
            setInventory(inventory.map(i => i.id === id ? { ...i, grip: 1 } : i));
        } else {
            let currentHandsOtherItems = 0;
            let handItems = [];
            inventory.forEach(i => {
                if (i.equipped && i.id !== item.id) {
                    const iW = weaponDatabase[i.name];
                    const iA = armorDatabase[i.name];
                    if (iW || (iA && iA.type === "shield")) {
                        const isTwoH = iW && iW.properties && iW.properties.some(p => typeof p === 'string' && p.includes("Dos manos"));
                        const h = (i.grip === 2 || isTwoH) ? 2 : 1;
                        currentHandsOtherItems += h;
                        handItems.push({ ...i, handsItUses: h });
                    }
                }
            });

            if (currentHandsOtherItems + 2 <= 2) {
                setInventory(inventory.map(i => i.id === id ? { ...i, grip: 2 } : i));
            } else {
                const handsToFree = (currentHandsOtherItems + 2) - 2;
                setEquipFlow({ item, step: 'replace', type: 'hands', neededHands: 2, handsToFree, conflicts: handItems, selectedReplacements: [] });
            }
        }
    };

    const rollDice = () => {
        let rollsDetail = [];
        let total = 0;
        
        [4, 6, 8, 10, 12, 20, 100].forEach(sides => {
            const count = Number(diceCounts[sides] || 0);
            if (count > 0) {
                let currentRolls = [];
                for (let i = 0; i < count; i++) {
                    const r = Math.floor(Math.random() * sides) + 1;
                    currentRolls.push(r);
                    total += r;
                }
                rollsDetail.push(`${count}d${sides}: [${currentRolls.join(', ')}]`);
            }
        });

        const finalTotal = total + Number(diceMod);
        setDiceResult({ 
            details: rollsDetail.length > 0 ? rollsDetail.join(' | ') : 'Sin dados', 
            total: finalTotal, 
            mod: Number(diceMod) 
        });
    };

    const rollWeaponAttack = (weaponName, toHitValue, statId = null, ammoConsumed = null) => {
        let d20_1 = Math.floor(Math.random() * 20) + 1;
        let d20_2 = Math.floor(Math.random() * 20) + 1;
        let finalD20 = d20_1;
        
        const hasArmorPenalty = isArmorPenalized && (statId === 'str' || statId === 'dex');
        let detailText = `Dado (d20): [${finalD20}] ${toHitValue >= 0 ? '+' : ''}${toHitValue} (Mod)`;
        if (ammoConsumed) detailText += ` | [-1 ${ammoConsumed}]`;

        if (hasArmorPenalty) {
            finalD20 = Math.min(d20_1, d20_2);
            detailText = `Dado (d20): [${d20_1}, ${d20_2}] -> ${finalD20} (Desv. Armadura) ${toHitValue >= 0 ? '+' : ''}${toHitValue}`;
            if (ammoConsumed) detailText += ` | [-1 ${ammoConsumed}]`;
        }

        const total = finalD20 + toHitValue;
        setRollNotification({
            title: `Tirada de Ataque: ${weaponName}`,
            details: detailText,
            total: total,
            type: finalD20 === 20 ? 'crit' : finalD20 === 1 ? 'fail' : 'normal'
        });
    };

    const rollWeaponDamage = (weaponName, baseDamageStr, statMod) => {
        const parts = baseDamageStr.split('d');
        const count = parseInt(parts[0]) || 1;
        const sides = parseInt(parts[1]) || 6;
        
        let rolls = [];
        let totalDice = 0;
        for(let i=0; i<count; i++){
            const r = Math.floor(Math.random() * sides) + 1;
            rolls.push(r);
            totalDice += r;
        }

        const finalDamage = totalDice + statMod;
        setRollNotification({
            title: `Tirada de Daño: ${weaponName}`,
            details: `Dados (${count}d${sides}): [${rolls.join(', ')}] ${statMod !== 0 ? (statMod > 0 ? '+'+statMod : '') : ''}`,
            total: Math.max(1, finalDamage),
            type: 'damage'
        });
    };

    const rollAbilityCheck = (checkName, modValue, statId = null) => {
        let d20_1 = Math.floor(Math.random() * 20) + 1;
        let d20_2 = Math.floor(Math.random() * 20) + 1;
        let finalD20 = d20_1;
        
        const isStealthPenalty = checkName.includes('Sigilo') && stealthDisadvantage;
        const hasArmorPenalty = isArmorPenalized && (statId === 'str' || statId === 'dex');
        
        let detailText = `Dado (d20): [${finalD20}] ${modValue >= 0 ? '+' : ''}${modValue} (Mod)`;

        if (hasArmorPenalty || isStealthPenalty) {
            finalD20 = Math.min(d20_1, d20_2);
            const reason = hasArmorPenalty ? 'Desventaja Armadura' : 'Desventaja Sigilo';
            detailText = `Dado (d20): [${d20_1}, ${d20_2}] -> ${finalD20} (${reason}) ${modValue >= 0 ? '+' : ''}${modValue}`;
        }

        const total = finalD20 + modValue;
        setRollNotification({
            title: `Tirada: ${checkName}`,
            details: detailText,
            total: total,
            type: finalD20 === 20 ? 'crit' : finalD20 === 1 ? 'fail' : 'normal'
        });
    };

    const handleLevelChange = (newLevel) => {
        const lvl = Math.max(1, Math.min(20, Number(newLevel)));
        if (lvl === info.level) return;
        setHpModalOpen({ targetLevel: lvl });
    };

    const confirmLevelUp = (mode) => {
        const targetLvl = hpModalOpen.targetLevel;
        const diff = targetLvl - info.level;
        if (diff === 0) { setHpModalOpen(false); return; }

        let hpGained = 0;
        let logEntry = `Nivel ${targetLvl} alcanzado. `;

        if (diff > 0) {
            for (let i = 0; i < diff; i++) {
                if (mode === 'avg') {
                    const baseAvg = currentClassData.avgHp || Math.floor(currentClassData.hitDiceSides / 2) + 1;
                    const subTotal = baseAvg + mods.con;
                    hpGained += Math.max(1, subTotal);
                    logEntry += `Promedio (${baseAvg}) + Con (${formatMod(mods.con)}) = +${Math.max(1, subTotal)} HP. `;
                } else if (mode === 'roll') {
                    const roll = Math.floor(Math.random() * currentClassData.hitDiceSides) + 1;
                    const subTotal = roll + mods.con;
                    hpGained += Math.max(1, subTotal);
                    logEntry += `Tirada dado [${roll}] + Con (${formatMod(mods.con)}) = +${Math.max(1, subTotal)} HP. `;
                }
            }
        } else {
            hpGained = diff * (Math.floor(currentClassData.hitDiceSides / 2) + 1 + mods.con);
            logEntry += `Ajuste de nivel por descenso.`;
        }

        setInfo(prev => ({ ...prev, level: targetLvl }));
        setCombat(prev => ({
            ...prev,
            hpMax: Math.max(1, Number(prev.hpMax) + hpGained),
            hpCurrent: Math.max(1, Math.min(Number(prev.hpMax) + hpGained, Number(prev.hpCurrent) + (diff > 0 ? hpGained : 0)))
        }));
        setHpLog(prev => [logEntry, ...prev]);
        setHpModalOpen(false);
    };

    const handleInfoChange = (e) => setInfo({ ...info, [e.target.name]: e.target.value });
    const handleAbilityChange = (stat, value) => setAbilities({ ...abilities, [stat]: Number(value) });
    const handleCombatChange = (e) => setCombat({ ...combat, [e.target.name]: e.target.value });
    const handleTextChange = (e) => setTexts({ ...texts, [e.target.name]: e.target.value });
    const adjustHP = (amount) => setCombat({ ...combat, hpCurrent: Math.max(0, Math.min(combat.hpMax, Number(combat.hpCurrent) + amount)) });

    const classArmorProficiencies = {
        "Bárbaro": ["Ligeras", "Medias", "Escudos"],
        "Bardo": ["Ligeras"],
        "Brujo": ["Ligeras"],
        "Clérigo": ["Ligeras", "Medias", "Escudos"],
        "Druida": ["Ligeras", "Medias", "Escudos (No metal)"],
        "Explorador": ["Ligeras", "Medias", "Escudos"],
        "Guerrero": ["Ligeras", "Medias", "Pesadas", "Escudos"],
        "Hechicero": [],
        "Mago": [],
        "Monje": [],
        "Paladín": ["Ligeras", "Medias", "Pesadas", "Escudos"],
        "Pícaro": ["Ligeras"]
    };

    let stealthDisadvantage = false;
    let baseAC = 10;
    let dexModForAC = mods.dex;
    let hasShield = false;
    let hasArmor = false;
    let isArmorPenalized = false;

    const checkArmorProf = (armorName, armorType) => {
        const classProf = classArmorProficiencies[info.classLevel] || [];
        const typeMap = { "light": "Ligeras", "medium": "Medias", "heavy": "Pesadas", "shield": "Escudos" };
        const mappedType = typeMap[armorType];
        
        if (classProf.includes(mappedType)) return true;
        if (classProf.some(p => p.includes("Escudos") && mappedType === "Escudos")) return true;

        const text = (texts.profAndLang || "").toLowerCase();
        if (text.includes("todas las armaduras")) return true;
        if (mappedType && text.includes(mappedType.toLowerCase())) return true;
        
        return false;
    };

    inventory.forEach(item => {
        if (item.equipped && armorDatabase[item.name]) {
            const armor = armorDatabase[item.name];
            if (armor.stealthDisadvantage) stealthDisadvantage = true;
            
            if (!checkArmorProf(item.name, armor.type)) {
                isArmorPenalized = true;
            }

            if (armor.type === "shield") hasShield = true;
            else {
                hasArmor = true;
                if (armor.type === "light") { baseAC = armor.ac; dexModForAC = mods.dex; }
                else if (armor.type === "medium") { baseAC = armor.ac; dexModForAC = Math.min(2, mods.dex); }
                else if (armor.type === "heavy") { baseAC = armor.ac; dexModForAC = 0; }
            }
        }
    });

    
    

if (!hasArmor) {
        if (info.classLevel === "Bárbaro") dexModForAC = mods.dex + mods.con;
        else if (info.classLevel === "Monje") dexModForAC = mods.dex + mods.wis;
    }

    // 🛡️ NUEVO: Suma automáticamente el bono de CA de los objetos custom equipados
    const customArmorBonusTotal = customInventory
        .filter(item => item.equipped)
        .reduce((sum, item) => sum + (Number(item.armorBonus) || 0), 0);

    const computedAC = baseAC + dexModForAC + (hasShield ? 2 : 0) + Number(combat.acBonus || 0) + customArmorBonusTotal;





    const classWeaponProficiencies = {
        "Bárbaro": { simple: true, martial: true, specific: [] },
        "Bardo": { simple: true, martial: false, specific: ["espada corta", "espada larga", "estoque", "ballesta de mano"] },
        "Brujo": { simple: true, martial: false, specific: [] },
        "Clérigo": { simple: true, martial: false, specific: [] },
        "Druida": { simple: false, martial: false, specific: ["bastón", "daga", "dardo", "hacha de mano", "hoz", "lanza", "maza", "cimitarra", "honda"] },
        "Explorador": { simple: true, martial: true, specific: [] },
        "Guerrero": { simple: true, martial: true, specific: [] },
        "Hechicero": { simple: false, martial: false, specific: ["daga", "dardo", "honda", "bastón", "ballesta ligera"] },
        "Mago": { simple: false, martial: false, specific: ["daga", "dardo", "honda", "bastón", "ballesta ligera"] },
        "Monje": { simple: true, martial: false, specific: ["espada corta"] },
        "Paladín": { simple: true, martial: true, specific: [] },
        "Pícaro": { simple: true, martial: false, specific: ["espada corta", "espada larga", "estoque", "ballesta de mano"] }
    };

    const raceWeaponProficiencies = {
        "Elfo": ["espada larga", "espada corta", "arco corto", "arco largo"],
        "Enano": ["hacha de batalla", "hacha de mano", "martillo ligero", "martillo de guerra"]
    };

    const isProficientWeapon = (weaponName, weaponType) => {
        const wNameLower = weaponName.toLowerCase();
        
        const classProf = classWeaponProficiencies[info.classLevel];
        if (classProf) {
            if (weaponType === 'simple' && classProf.simple) return true;
            if (weaponType === 'martial' && classProf.martial) return true;
            if (classProf.specific.some(w => wNameLower.includes(w))) return true;
        }

        const raceProf = raceWeaponProficiencies[info.race];
        if (raceProf && raceProf.some(w => wNameLower.includes(w))) return true;

        const text = (texts.profAndLang || "").toLowerCase();
        
        // Evitar que "Todas las Armas Simples" se confunda con competencia global en todas las armas
        if (/todas las armas(?!\s+(simples?|sencillas?|marciales?))/i.test(text) || /armas:?\s*todas/i.test(text)) return true;
        
        if (weaponType === 'simple' && /armas?\s+(simples?|sencillas?)/i.test(text)) return true;
        if (weaponType === 'martial' && /armas?\s+marciales?/i.test(text)) return true;
        
        const nameRegex = new RegExp(`\\b${wNameLower}\\b`, 'i');
        if (nameRegex.test(text)) return true;

        return false;
    };

    const computedAttacks = inventory.filter(i => i.equipped && weaponDatabase[i.name]).map(item => {
        const weapon = weaponDatabase[item.name];
        let statName = "Fuerza";
        let statMod = mods.str; 
        let statId = "str";
        
        const isRanged = weapon.properties && weapon.properties.some(p => typeof p === 'string' && p.includes("A distancia"));
        const isFinesse = weapon.properties && weapon.properties.some(p => typeof p === 'string' && p.includes("Sutil"));

        if (isRanged) { statName = "Destreza"; statMod = mods.dex; statId = "dex"; }
        else if (isFinesse) { if (mods.dex > mods.str) { statName = "Destreza"; statMod = mods.dex; statId = "dex"; } }

        const isProf = isProficientWeapon(item.name, weapon.type);
        const toHitNum = statMod + (isProf ? profBonus : 0);
        const damageSign = statMod >= 0 ? '+' : '';
        const breakdown = `Mod.${statName}(${formatMod(statMod)}) ${isProf ? `+ Comp(+${profBonus})` : '(Sin Competencia)'} = ${formatMod(toHitNum)}`;

        let versatileDamageDice = null;
        if (weapon.properties) {
            const versatileProp = weapon.properties.find(p => typeof p === 'string' && p.includes("Versátil"));
            if (versatileProp) { const match = versatileProp.match(/\((1d\d+)\)/); if (match) versatileDamageDice = match[1]; }
        }
        
        let finalBaseDamageDice = weapon.damage;
        let finalWeaponName = item.name;
        const canBeThrown = weapon.properties && weapon.properties.some(p => typeof p === 'string' && p.includes("Arrojadiza")) && item.grip === 1;

        if (versatileDamageDice && item.grip === 2) {
            finalBaseDamageDice = versatileDamageDice;
            finalWeaponName = `${item.name} (2 Manos)`;
        }

        // NUEVO: Verificación de Munición
        const ammoType = weapon.ammoType;
        let ammoCount = 0;
        let hasAmmo = true;
        let ammoItemId = null;

        if (ammoType) {
            const ammoItem = inventory.find(i => i.name === ammoType);
            ammoCount = ammoItem ? (ammoItem.quantity || 0) : 0;
            hasAmmo = ammoCount > 0;
            ammoItemId = ammoItem ? ammoItem.id : null;
        }

        return { 
            id: item.id,
            name: finalWeaponName, toHitNum, toHit: formatMod(toHitNum), damage: `${finalBaseDamageDice}${statMod !== 0 ? damageSign + statMod : ''}`, 
            statMod, baseDamageDice: finalBaseDamageDice, breakdown, isThrown: canBeThrown, isTwoHandedGrip: item.grip === 2,
            statId,
            poisoned: item.poisoned,
            poisonName: item.poisonName,
            poisonDamage: item.poisonDamage,
            ammoType,
            ammoCount,
            hasAmmo,
            ammoItemId
        };
    });

    const racialAttacksUI = currentRace.attacks.map((atk, i) => {
        const dc = 8 + profBonus + mods[atk.saveStat];
        return (
            <div key={`race-atk-${i}`} className="flex flex-col bg-orange-50 p-2.5 border border-orange-300 rounded-lg shadow-sm text-xs gap-1.5">
                <div className="flex justify-between items-center font-bold">
                    <span className="text-orange-900 text-sm flex items-center gap-1"><BiohazardIcon size={14} /> {atk.name}</span>
                    <span className="text-orange-700 font-extrabold">Salvación DC {dc}</span>
                </div>
                <div className="text-[10px] text-orange-600 italic">8 + Comp(+{profBonus}) + Mod.{statNamesTranslated[atk.saveStat]}({formatMod(mods[atk.saveStat])})</div>
                <div className="flex gap-1 mt-1 pt-1.5 border-t border-orange-200">
                     <button onClick={() => setRollNotification({title:`${atk.name}`, details: `Salvación de ${statNamesTranslated[atk.saveStat].toUpperCase()} vs DC ${dc}`, total: dc, type: 'normal'})} 
                           className="flex-1 bg-orange-700 hover:bg-orange-600 text-white font-bold py-1.5 px-2 rounded transition shadow-md border-b-2 border-orange-950 active:border-b-0 active:translate-y-[2px]">
                        💨 Salvar (DC {dc})
                     </button>
                     <button onClick={() => rollWeaponDamage(atk.name, atk.damage, 0)} 
                           className="flex-1 bg-red-800 hover:bg-red-700 text-white font-bold py-1.5 px-2 rounded transition shadow-md border-b-2 border-red-950 active:border-b-0 active:translate-y-[2px]">
                        💥 Daño ({atk.damage} {atk.damageType})
                     </button>
                </div>
            </div>
        );
    });

    const autoProficienciesList = useMemo(() => {
        let profs = [];
        
        const armor = classArmorProficiencies[info.classLevel];
        if (armor && armor.length > 0) {
            profs.push({ label: `Armaduras: ${armor.join(', ')}`, source: 'Clase' });
        }
        
        const cWep = classWeaponProficiencies[info.classLevel];
        if (cWep) {
            if (cWep.simple && cWep.martial) profs.push({ label: 'Armas Simples y Marciales', source: 'Clase' });
            else {
                if (cWep.simple) profs.push({ label: 'Armas Simples', source: 'Clase' });
                if (cWep.martial) profs.push({ label: 'Armas Marciales', source: 'Clase' });
                if (cWep.specific && cWep.specific.length > 0) {
                    profs.push({ label: cWep.specific.map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(', '), source: 'Clase' });
                }
            }
        }

        const rWep = raceWeaponProficiencies[info.race];
        if (rWep && rWep.length > 0) {
            profs.push({ label: rWep.map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(', '), source: 'Raza' });
        }
        
        if (currentRace.languages) {
            profs.push({ label: currentRace.languages, source: 'Raza' });
        }

        if (info.classLevel === "Monje" || info.race === "Enano" || info.race === "Gnomo" || ["Charlatán", "Animador", "Artesano Gremial", "Héroe del Pueblo"].includes(info.background)) {
            profs.push({ label: "Kit de Artesano", source: 'Trasfondo/Raza/Clase' });
        }
        if (info.classLevel === "Pícaro" || ["Criminal", "Sabio"].includes(info.background)) {
            profs.push({ label: "Herramientas de Ladrón", source: 'Clase/Trasfondo' });
        }
        if (info.classLevel === "Druida" || info.background === "Ermitaño") {
            profs.push({ label: "Kit Herborista", source: 'Clase/Trasfondo' });
        }
        if (info.classLevel === "Pícaro" && info.level >= 3) {
            profs.push({ label: "Kit Envenenador", source: 'Clase (Niv 3+)' });
        }

        return profs;
    }, [info.classLevel, info.race, currentRace.languages, info.background, info.level]);





// Detecta resistencias activas de objetos personalizados equipados
    const activeCustomResistances = customInventory
        .filter(item => item.equipped && item.resistanceType && item.resistanceType !== "Ninguna")
        .map(item => ({ name: item.name, resistance: item.resistanceType }));








    return (
        <div className="min-h-screen bg-neutral-200 p-2 sm:p-6 font-sans text-neutral-900">
            <div className="w-[98%] max-w-[1600px] mx-auto bg-white p-4 sm:p-8 rounded-lg shadow-xl border-2 border-neutral-300 relative">
                
                {/* --- BOTONES DE ACCIÓN RÁPIDA (GUARDAR, CARGAR Y TIRAR DADOS) --- */}
<div className="flex flex-wrap justify-end items-center gap-2 mb-6 w-full">
    
    {/* ✨ BOTÓN PARA IR AL MODO DM (Redirige a dm.html) */}
                <button 
                    onClick={() => window.location.href = 'DM.html'} 
                    className="absolute top-4 left-4 bg-purple-900 hover:bg-purple-800 text-white font-bold px-4 py-2 rounded-lg shadow-md flex items-center gap-2 transition z-20"
                    title="Ir a la pantalla del Dungeon Master"
                >
                    🐉 Modo DM
                </button>

    
    <button 
        onClick={saveCharacterData} 
        className="bg-neutral-800 hover:bg-neutral-700 text-white font-bold px-3 py-2 rounded-lg shadow-md flex items-center gap-1.5 transition text-xs"
        title="Guardar personaje en archivo"
    >
        💾 Guardar
    </button>
    
    <label 
        className="bg-neutral-800 hover:bg-neutral-700 text-white font-bold px-3 py-2 rounded-lg shadow-md flex items-center gap-1.5 transition text-xs cursor-pointer"
        title="Cargar personaje desde archivo"
    >
        📂 Cargar
        <input 
            type="file" 
            accept=".json" 
            onChange={loadCharacterData} 
            className="hidden" 
        />
    </label>

    <button 
        onClick={() => setDiceModalOpen(true)} 
        className="bg-red-800 hover:bg-red-700 text-white font-bold px-4 py-2 rounded-lg shadow-md flex items-center gap-2 transition"
    >
        <ZapIcon size={18} /> Tirar Dados
    </button>
</div>

                {/* Modales (Clase, Trasfondo, HP, Dados, Aplicar Veneno, Equipar) Omitidos por brevedad pero incluidos en código */}
                {classModalOpen && (
                    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[100] p-4">
                        <div className="bg-white rounded-xl p-6 max-w-xl w-full shadow-2xl border-2 border-red-800 flex flex-col max-h-[90vh]">
                            <h3 className="text-lg font-black text-red-900 mb-4 flex items-center gap-2"><SwordIcon size={24}/> Selección de Clase y Habilidades</h3>

                            <div className="mb-4 shrink-0">
                                <label className="text-xs font-bold text-neutral-600 uppercase block mb-1">Elige tu Clase</label>
                                <select value={tempSelectedClass} onChange={(e) => { setTempSelectedClass(e.target.value); setTempSelectedSkills([]); }} className="w-full border-2 border-neutral-300 rounded-lg p-2.5 font-black text-red-800 focus:border-red-600 focus:outline-none shadow-sm cursor-pointer">
                                    {Object.keys(classDatabase).map(cls => <option key={cls} value={cls}>{cls}</option>)}
                                </select>
                            </div>

                            <div className="mb-4 flex-1 overflow-y-auto pr-2">
                                <div className="flex justify-between items-end mb-2 sticky top-0 bg-white py-2 border-b-2 border-neutral-200 z-10">
                                    <label className="text-xs font-bold text-neutral-600 uppercase">Habilidades (Bono de Competencia)</label>
                                    <span className={`text-sm font-black px-2 py-0.5 rounded ${tempSelectedSkills.length === (classSkillOptions[tempSelectedClass] || {count: 2}).count ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                        {tempSelectedSkills.length} / {(classSkillOptions[tempSelectedClass] || {count: 2}).count}
                                    </span>
                                </div>
                                
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                                    {(() => {
                                        const opt = classSkillOptions[tempSelectedClass] || { count: 2, skills: [] };
                                        const availableSkills = opt.skills === "ANY" ? skillList.map(s => s.id) : opt.skills;
                                        
                                        return availableSkills.map(skillId => {
                                            const skillInfo = skillList.find(s => s.id === skillId);
                                            if (!skillInfo) return null;
                                            const isSelected = tempSelectedSkills.includes(skillId);
                                            const isDisabled = !isSelected && tempSelectedSkills.length >= opt.count;
                                            
                                            return (
                                                <button 
                                                    key={skillId}
                                                    onClick={() => {
                                                        if (isSelected) setTempSelectedSkills(tempSelectedSkills.filter(s => s !== skillId));
                                                        else if (!isDisabled) setTempSelectedSkills([...tempSelectedSkills, skillId]);
                                                    }}
                                                    disabled={isDisabled}
                                                    className={`p-2.5 border-2 rounded-lg text-left text-sm transition-all flex justify-between items-center ${isSelected ? 'border-red-600 bg-red-50 text-red-900 font-bold shadow-sm' : isDisabled ? 'border-neutral-200 bg-neutral-100 text-neutral-400 cursor-not-allowed' : 'border-neutral-300 bg-white text-neutral-700 hover:border-red-400 hover:shadow-sm'}`}
                                                >
                                                    <span>{skillInfo.name}</span>
                                                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${isSelected ? 'bg-red-200 text-red-800' : isDisabled ? 'bg-neutral-200 text-neutral-500' : 'bg-neutral-200 text-neutral-600'}`}>{statNamesTranslated[skillInfo.stat].substring(0,3).toUpperCase()}</span>
                                                </button>
                                            );
                                        });
                                    })()}
                                </div>
                            </div>

                            <div className="flex gap-3 shrink-0 pt-2 border-t-2 border-neutral-100">
                                <button 
                                    onClick={confirmClassSelection} 
                                    disabled={tempSelectedSkills.length !== (classSkillOptions[tempSelectedClass] || {count: 2}).count}
                                    className="flex-1 bg-red-800 disabled:bg-neutral-300 disabled:text-neutral-500 disabled:border-neutral-400 text-white font-bold py-2.5 rounded-lg shadow-md border-b-4 border-red-950 disabled:shadow-none active:border-b-0 active:translate-y-[2px] transition-all"
                                >
                                    Confirmar Selección
                                </button>
                                <button onClick={() => setClassModalOpen(false)} className="bg-neutral-300 hover:bg-neutral-400 text-neutral-800 font-bold px-6 py-2.5 rounded-lg shadow-md border-b-4 border-neutral-400 active:border-b-0 active:translate-y-[2px] transition-all">Cancelar</button>
                            </div>
                        </div>
                    </div>
                )}

                {bgModalOpen && (
                    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[100] p-4">
                        <div className="bg-white rounded-xl p-6 max-w-xl w-full shadow-2xl border-2 border-red-800 flex flex-col max-h-[90vh]">
                            <h3 className="text-lg font-black text-red-900 mb-4 flex items-center gap-2"><BookOpenIcon size={24}/> Selección de Trasfondo</h3>

                            <div className="mb-4 shrink-0">
                                <label className="text-xs font-bold text-neutral-600 uppercase block mb-1">Elige tu Trasfondo</label>
                                <select value={tempSelectedBg} onChange={(e) => { 
                                    const newBg = e.target.value;
                                    setTempSelectedBg(newBg); 
                                    if (newBg === info.background && info.bgSkills) {
                                        const defaultSkills = backgroundDatabase[newBg].skills;
                                        setBgWildcardSkills(info.bgSkills.filter(s => !defaultSkills.includes(s)));
                                    } else {
                                        setBgWildcardSkills([]); 
                                    }
                                }} className="w-full border-2 border-neutral-300 rounded-lg p-2.5 font-black text-red-800 focus:border-red-600 focus:outline-none shadow-sm cursor-pointer">
                                    {Object.keys(backgroundDatabase).map(bg => <option key={bg} value={bg}>{bg}</option>)}
                                </select>
                            </div>

                            <div className="mb-4 text-sm text-neutral-600 bg-neutral-50 p-3 rounded-lg border border-neutral-200">
                                {backgroundDatabase[tempSelectedBg].desc}
                            </div>

                            <div className="mb-4 flex-1 overflow-y-auto pr-2">
                                {(() => {
                                    const bgData = backgroundDatabase[tempSelectedBg];
                                    const defaultSkills = bgData.skills;
                                    const externallyLocked = defaultSkills.filter(s => proficiencies.skills[s] && !(info.bgSkills || []).includes(s));
                                    const wildcardsAllowed = externallyLocked.length;

                                    return (
                                        <>
                                            <div className="mb-4">
                                                <label className="text-xs font-bold text-neutral-600 uppercase block mb-2">Habilidades del Trasfondo</label>
                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                                    {defaultSkills.map(skillId => {
                                                        const skillInfo = skillList.find(s => s.id === skillId);
                                                        const isLocked = externallyLocked.includes(skillId);
                                                        return (
                                                            <div key={skillId} className={`p-2.5 border-2 rounded-lg text-left text-sm flex justify-between items-center ${isLocked ? 'border-red-300 bg-red-50 text-red-800' : 'border-green-600 bg-green-50 text-green-900 font-bold shadow-sm'}`}>
                                                                <span className={isLocked ? 'line-through opacity-60' : ''}>{skillInfo.name}</span>
                                                                {isLocked ? (
                                                                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-red-200 text-red-800 uppercase" title="Tienes esta habilidad por medio de tu raza o clase">BLOQUEADA</span>
                                                                ) : (
                                                                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-green-200 text-green-800 uppercase">Garantizada</span>
                                                                )}
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            </div>

                                            {wildcardsAllowed > 0 && (
                                                <div>
                                                    <div className="flex justify-between items-end mb-2 sticky top-0 bg-white py-2 border-b-2 border-neutral-200 z-10">
                                                        <label className="text-xs font-bold text-neutral-600 uppercase">Habilidades Comodín a elegir</label>
                                                        <span className={`text-sm font-black px-2 py-0.5 rounded ${bgWildcardSkills.length === wildcardsAllowed ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                                            {bgWildcardSkills.length} / {wildcardsAllowed}
                                                        </span>
                                                    </div>
                                                    <p className="text-[11px] text-neutral-500 mb-2 leading-relaxed">Debido a que tu personaje <b>ya posee</b> algunas de las habilidades de este trasfondo por otra fuente (como tu clase), tienes derecho a elegir <b>{wildcardsAllowed}</b> habilidad(es) completamente libre(s) para compensar.</p>
                                                    
                                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                                                        {skillList.map(skillInfo => {
                                                            const skillId = skillInfo.id;
                                                            if (defaultSkills.includes(skillId)) return null;
                                                            
                                                            const isExternallyOwned = proficiencies.skills[skillId] && !(info.bgSkills || []).includes(skillId) && !bgWildcardSkills.includes(skillId);
                                                            const isSelected = bgWildcardSkills.includes(skillId);
                                                            const isDisabled = isExternallyOwned || (!isSelected && bgWildcardSkills.length >= wildcardsAllowed);

                                                            return (
                                                                <button 
                                                                    key={skillId}
                                                                    onClick={() => {
                                                                        if (isSelected) setBgWildcardSkills(bgWildcardSkills.filter(s => s !== skillId));
                                                                        else if (!isDisabled) setBgWildcardSkills([...bgWildcardSkills, skillId]);
                                                                    }}
                                                                    disabled={isDisabled}
                                                                    className={`p-2.5 border-2 rounded-lg text-left text-sm transition-all flex justify-between items-center ${isSelected ? 'border-red-600 bg-red-50 text-red-900 font-bold shadow-sm' : isDisabled ? 'border-neutral-200 bg-neutral-100 text-neutral-400 cursor-not-allowed' : 'border-neutral-300 bg-white text-neutral-700 hover:border-red-400 hover:shadow-sm'}`}
                                                                >
                                                                    <span>{skillInfo.name}</span>
                                                                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${isSelected ? 'bg-red-200 text-red-800' : isDisabled ? 'bg-neutral-200 text-neutral-500' : 'bg-neutral-200 text-neutral-600'}`}>
                                                                        {isExternallyOwned ? 'Ya la tienes' : statNamesTranslated[skillInfo.stat].substring(0,3).toUpperCase()}
                                                                    </span>
                                                                </button>
                                                            );
                                                        })}
                                                    </div>
                                                </div>
                                            )}
                                        </>
                                    );
                                })()}
                            </div>

                            <div className="flex gap-3 shrink-0 pt-2 border-t-2 border-neutral-100">
                                <button 
                                    onClick={confirmBackground} 
                                    disabled={(() => {
                                        const bgData = backgroundDatabase[tempSelectedBg];
                                        const externallyLocked = bgData.skills.filter(s => proficiencies.skills[s] && !(info.bgSkills || []).includes(s));
                                        return bgWildcardSkills.length !== externallyLocked.length;
                                    })()}
                                    className="flex-1 bg-red-800 disabled:bg-neutral-300 disabled:text-neutral-500 disabled:border-neutral-400 text-white font-bold py-2.5 rounded-lg shadow-md border-b-4 border-red-950 disabled:shadow-none active:border-b-0 active:translate-y-[2px] transition-all"
                                >
                                    Confirmar Trasfondo
                                </button>
                                <button onClick={() => setBgModalOpen(false)} className="bg-neutral-300 hover:bg-neutral-400 text-neutral-800 font-bold px-6 py-2.5 rounded-lg shadow-md border-b-4 border-neutral-400 active:border-b-0 active:translate-y-[2px] transition-all">Cancelar</button>
                            </div>
                        </div>
                    </div>
                )}

                {rollNotification && (
                    <div className="fixed bottom-6 right-6 bg-neutral-900 text-white rounded-xl p-4 shadow-2xl border-2 border-red-600 z-[100] max-w-xs">
                        <div className="flex justify-between items-start mb-1">
                            <span className="text-xs font-bold text-red-400 uppercase">{rollNotification.title}</span>
                            <button onClick={() => setRollNotification(null)} className="text-neutral-400 hover:text-white font-bold">&times;</button>
                        </div>
                        <div className="text-xs text-neutral-300 mb-2 whitespace-pre-line">{rollNotification.details}</div>
                        <div className="flex items-center justify-between bg-neutral-800 p-2 rounded">
                            <span className="text-xs font-semibold">Resultado:</span>
                            <span className={`text-2xl font-black ${rollNotification.type === 'crit' ? 'text-yellow-400' : rollNotification.type === 'fail' ? 'text-red-500' : 'text-green-400'}`}>
                                {rollNotification.total}
                            </span>
                        </div>
                    </div>
                )}

                {hpModalOpen && (
                    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[100] p-4">
                        <div className="bg-white rounded-xl p-6 max-w-md w-full shadow-2xl border-2 border-red-800">
                            <h3 className="text-lg font-black text-red-900 mb-2 flex items-center gap-2">❤️ Subida de Nivel a Nivel {hpModalOpen.targetLevel}</h3>
                            <p className="text-xs text-neutral-600 mb-4">¿Cómo deseas calcular el incremento de tus Puntos de Golpe Máximos para este nuevo nivel? (Se sumará automáticamente tu modificador de Constitución: <strong className="text-black">{formatMod(mods.con)}</strong>).</p>
                            
                            <div className="flex flex-col gap-3 mb-6">
                                <button onClick={() => confirmLevelUp('avg')} className="bg-neutral-800 hover:bg-neutral-700 text-white p-3 rounded-lg text-left shadow transition flex justify-between items-center">
                                    <div>
                                        <div className="font-bold text-sm">Usar Promedio Fijo + Constitución</div>
                                        <div className="text-[11px] text-neutral-400">Promedio ({currentClassData.avgHp || Math.floor(currentClassData.hitDiceSides/2)+1}) + Con ({formatMod(mods.con)})</div>
                                    </div>
                                    <span className="bg-neutral-700 px-2 py-1 rounded text-xs font-mono font-bold">Estándar</span>
                                </button>
                                <button onClick={() => confirmLevelUp('roll')} className="bg-red-800 hover:bg-red-700 text-white p-3 rounded-lg text-left shadow transition flex justify-between items-center">
                                    <div>
                                        <div className="font-bold text-sm">Lanzar Dado de Golpe ({currentClassData.hitDice}) + Constitución</div>
                                        <div className="text-[11px] text-red-200">Tira el dado al azar y suma tu modificador de Con</div>
                                    </div>
                                    <span className="bg-red-900 px-2 py-1 rounded text-xs font-mono font-bold">🎲 Al Azar</span>
                                </button>
                            </div>
                            <button onClick={() => setHpModalOpen(false)} className="w-full bg-neutral-300 hover:bg-neutral-400 text-neutral-800 font-bold py-2 rounded">Cancelar</button>
                        </div>
                    </div>
                )}

                {diceModalOpen && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100] p-4">
                        <div className="bg-white rounded-lg p-6 max-w-sm w-full shadow-2xl">
                            <h3 className="text-lg font-bold text-red-800 mb-4 flex items-center gap-2"><ZapIcon size={20} /> Lanzar Dados manual</h3>
                            
                            <div className="mb-2 text-[10px] text-neutral-500 font-bold uppercase">Cantidad por tipo de dado</div>
                            <div className="grid grid-cols-3 gap-x-2 gap-y-3 mb-4">
                                {[4, 6, 8, 10, 12, 20, 100].map(sides => (
                                    <div key={`dice-${sides}`} className="flex items-center gap-1.5 bg-neutral-50 p-1.5 rounded border border-neutral-200 shadow-sm">
                                        <label className="text-xs font-black text-neutral-600 w-6 text-right">d{sides}</label>
                                        <input 
                                            type="number" 
                                            min="0" 
                                            max="99" 
                                            value={diceCounts[sides] === 0 ? '' : diceCounts[sides]} 
                                            onChange={(e) => {
                                                const val = e.target.value === '' ? 0 : Math.max(0, parseInt(e.target.value) || 0);
                                                setDiceCounts({...diceCounts, [sides]: val});
                                            }} 
                                            placeholder="0" 
                                            className="w-10 border rounded p-1 text-center font-bold focus:border-red-500 focus:outline-none" 
                                        />
                                    </div>
                                ))}
                            </div>
                            <div className="mb-4">
                                <label className="text-xs font-bold text-neutral-600 block mb-1">Modificador extra (Opcional)</label>
                                <input type="number" value={diceMod} onChange={(e) => setDiceMod(e.target.value)} className="w-full border rounded p-1.5 text-center font-bold" />
                            </div>
                            {diceResult && (
                                <div className="bg-red-50 border border-red-200 rounded p-3 mb-4 text-center">
                                    <div className="text-xs text-neutral-500 font-semibold mb-1 break-words">{diceResult.details}</div>
                                    {diceResult.mod !== 0 && <div className="text-xs text-red-700 font-bold mt-1">Modificador aplicado: {diceResult.mod > 0 ? `+${diceResult.mod}` : diceResult.mod}</div>}
                                    <div className="text-3xl font-extrabold text-red-800 mt-1">{diceResult.total}</div>
                                </div>
                            )}
                            <div className="flex gap-2">
                                <button onClick={rollDice} className="flex-1 bg-red-800 hover:bg-red-700 text-white font-bold py-2 rounded shadow-md border-b-4 border-red-900 active:border-b-0 active:translate-y-[2px]">¡Tirar Dados!</button>
                                <button onClick={() => setDiceModalOpen(false)} className="bg-neutral-300 hover:bg-neutral-400 text-neutral-800 font-bold px-4 py-2 rounded shadow-md border-b-4 border-neutral-400 active:border-b-0 active:translate-y-[2px]">Cerrar</button>
                            </div>
                        </div>
                    </div>
                )}

                {applyPoisonModal && (
                    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[100] p-4">
                        <div className="bg-white rounded-xl p-6 max-w-md w-full shadow-2xl border-2 border-red-800 flex flex-col">
                            <h3 className="text-lg font-black text-red-900 mb-2 flex items-center gap-2">🩸 Aplicar {applyPoisonModal.poisonName}</h3>
                            <p className="text-xs text-neutral-600 mb-4">Selecciona un arma <strong>equipada</strong> que realice daño <strong>cortante</strong> o <strong>perforante</strong> para aplicarle una carga de este veneno (consumirá 1 unidad del inventario).</p>
                            
                            <div className="flex flex-col gap-2 mb-4 max-h-60 overflow-y-auto">
                                {inventory.filter(i => i.equipped && weaponDatabase[i.name]).length > 0 ? (
                                    inventory.filter(i => i.equipped && weaponDatabase[i.name]).map(item => {
                                        const wData = weaponDatabase[item.name];
                                        const isValidType = wData.damageType === "cortante" || wData.damageType === "perforante";
                                        return (
                                            <div key={item.id} onClick={() => {
                                                if (isValidType) {
                                                    const currentPoison = inventory.find(i => i.id === applyPoisonModal.poisonItem.id);
                                                    if (!currentPoison || (currentPoison.quantity || 0) <= 0) {
                                                        setRollNotification({
                                                            title: `Aplicación Fallida`,
                                                            details: `No te quedan cargas de este veneno (cantidad 0).`,
                                                            total: '🚫',
                                                            type: 'fail'
                                                        });
                                                        setApplyPoisonModal(null);
                                                        return;
                                                    }
                                                    handleQuantityChange(applyPoisonModal.poisonItem.id, -1);
                                                    setInventory(prevInv => prevInv.map(inv => inv.id === item.id ? { ...inv, poisoned: true, poisonName: applyPoisonModal.poisonName, poisonDamage: applyPoisonModal.poisonDamage } : inv));
                                                    setRollNotification({
                                                        title: `Veneno Aplicado: ${applyPoisonModal.poisonName}`,
                                                        details: `Se ha aplicado ${applyPoisonModal.poisonName} a tu arma ${item.name}. Daño extra (${applyPoisonModal.poisonDamage} veneno) listo para combate. (1 carga consumida)`,
                                                        total: '🧪',
                                                        type: 'crit'
                                                    });
                                                    setApplyPoisonModal(null);
                                                }
                                            }} className={`p-3 border-2 rounded-lg flex flex-col transition ${isValidType ? 'cursor-pointer border-neutral-300 hover:border-red-600 bg-white hover:bg-red-50' : 'opacity-50 cursor-not-allowed border-neutral-200 bg-neutral-100'}`}>
                                                <div className="flex justify-between items-center font-bold text-sm">
                                                    <span>{item.name}</span>
                                                    <span className={`text-[10px] px-2 py-0.5 rounded uppercase ${isValidType ? 'bg-red-100 text-red-800' : 'bg-neutral-200 text-neutral-600'}`}>{wData.damageType}</span>
                                                </div>
                                                <div className="text-xs text-neutral-500 mt-1">Daño base: {wData.damage} {wData.damageType} {!isValidType && ' (❌ No compatible: Solo cortante/perforante)'}</div>
                                            </div>
                                        );
                                    })
                                ) : (
                                    <div className="text-sm text-neutral-500 text-center py-6 italic">No tienes armas equipadas actualmente. Equipa un arma cortante o perforante primero.</div>
                                )}
                            </div>

                            <button onClick={() => setApplyPoisonModal(null)} className="w-full bg-neutral-300 hover:bg-neutral-400 text-neutral-800 font-bold py-2 rounded-lg transition">Cancelar</button>
                        </div>
                    </div>
                )}

                {equipFlow && (
                    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[100] p-4">
                        <div className="bg-white rounded-lg p-6 max-w-sm w-full shadow-2xl border-2 border-neutral-400">
                            <h3 className="text-lg font-bold text-red-800 mb-4 flex items-center gap-2"><SwordIcon size={20} /> Equipar Objeto</h3>
                            
                            {equipFlow.step === 'grip' && (
                                <div>
                                    <p className="text-sm font-semibold text-neutral-700 mb-3">El arma <strong className="text-black">{equipFlow.item.name}</strong> es Versátil. ¿Cómo quieres empuñarla?</p>
                                    <div className="flex gap-2">
                                        <button onClick={() => processGripSelection(1)} className="flex-1 bg-neutral-800 hover:bg-neutral-700 text-white font-bold py-2 rounded">A 1 Mano</button>
                                        <button onClick={() => processGripSelection(2)} className="flex-1 bg-neutral-800 hover:bg-neutral-700 text-white font-bold py-2 rounded">A 2 Manos</button>
                                    </div>
                                </div>
                            )}

                            {equipFlow.step === 'replace' && (
                                <div>
                                    <p className="text-sm font-semibold text-neutral-700 mb-2">No tienes suficiente espacio libre.</p>
                                    <p className="text-xs text-neutral-500 mb-4">Selecciona qué objeto(s) deseas guardar para equipar <strong className="text-black">{equipFlow.item.name}</strong>.</p>
                                    <div className="flex flex-col gap-2 mb-4">
                                        {equipFlow.conflicts.map(c => {
                                            const isSelected = equipFlow.selectedReplacements.includes(c.id);
                                            return (
                                                <div key={c.id} onClick={() => toggleReplacementSelection(c.id)}
                                                    className={`p-2 border-2 rounded cursor-pointer flex justify-between items-center ${isSelected ? 'border-red-600 bg-red-50' : 'border-neutral-300 bg-white hover:bg-neutral-50'}`}>
                                                    <span className={`font-bold text-sm ${isSelected ? 'text-red-800' : 'text-neutral-700'}`}>{c.name}</span>
                                                    <span className="text-xs font-bold text-neutral-500 bg-neutral-200 px-2 py-0.5 rounded">{equipFlow.type === 'hands' ? `Usa ${c.handsItUses} mano(s)` : 'Armadura'}</span>
                                                </div>
                                            );
                                        })}
                                    </div>
                                    
                                    {equipFlow.type === 'hands' && (
                                        <div className="text-xs text-center font-bold text-neutral-600 mb-4 bg-neutral-100 p-2 rounded">
                                            Manos a liberar: <span className="text-red-700 text-sm">
                                            {(() => { let freed = 0; equipFlow.conflicts.forEach(c => { if (equipFlow.selectedReplacements.includes(c.id)) freed += c.handsItUses; }); return freed; })()}
                                            </span> / {equipFlow.handsToFree}
                                        </div>
                                    )}

                                    <div className="flex gap-2">
                                        <button onClick={confirmReplacements} 
                                            disabled={equipFlow.type === 'hands' ? (() => { let freed = 0; equipFlow.conflicts.forEach(c => { if (equipFlow.selectedReplacements.includes(c.id)) freed += c.handsItUses; }); return freed < equipFlow.handsToFree; })() : equipFlow.selectedReplacements.length === 0} 
                                            className="flex-1 bg-red-800 disabled:bg-neutral-300 disabled:cursor-not-allowed text-white font-bold py-2 rounded shadow-md border-b-4 border-red-900 active:border-b-0 active:translate-y-[2px]">Confirmar</button>
                                        <button onClick={() => setEquipFlow(null)} className="bg-neutral-300 hover:bg-neutral-400 text-neutral-800 font-bold px-4 py-2 rounded shadow-md border-b-4 border-neutral-400 active:border-b-0 active:translate-y-[2px]">Cancelar</button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 border-b-4 border-red-800 pb-4 mb-6">
                    <div className="lg:col-span-1 border-2 border-neutral-300 p-3 rounded-lg flex flex-col justify-end">
                        <input type="text" name="name" value={info.name} onChange={handleInfoChange} className="w-full text-2xl font-bold border-b-2 border-neutral-400 focus:outline-none focus:border-red-600 bg-transparent" placeholder="Nombre del Personaje" />
                        <label className="text-xs font-bold text-neutral-500 uppercase mt-1">Nombre del Personaje</label>
                    </div>
                    
                    <div className="lg:col-span-2 grid grid-cols-2 sm:grid-cols-3 gap-2 border-2 border-neutral-300 p-3 rounded-lg bg-neutral-50">
                        <div>
                            <button type="button" onClick={() => { setTempSelectedClass(info.classLevel); setTempSelectedSkills(info.classSkills || []); setClassModalOpen(true); }} className="w-full text-left font-semibold border-b border-neutral-300 bg-transparent focus:outline-none text-red-800 font-bold pb-1 flex justify-between items-center transition hover:border-red-600 group">
                                <span>{info.classLevel}</span><span className="text-[10px] bg-red-100 text-red-800 px-1.5 py-0.5 rounded shadow-sm border border-red-200 group-hover:bg-red-800 group-hover:text-white transition">⚙️ Configurar</span>
                            </button>
                            <label className="text-xs text-neutral-500 block mt-1">Clase y Competencias</label>
                        </div>
                        <div>
                            <select name="level" value={info.level} onChange={(e) => handleLevelChange(e.target.value)} className="w-full font-semibold border-b bg-transparent focus:outline-none text-red-800 font-bold">
                                {[...Array(20)].map((_, i) => (
                                    <option key={i + 1} value={i + 1}>{i + 1}</option>
                                ))}
                            </select>
                            <label className="text-xs text-neutral-500 block">Nivel (Auto HP)</label>
                        </div>
                        
                        <div>
                            <button type="button" onClick={openBgModal} className="w-full text-left font-semibold border-b border-neutral-300 bg-transparent focus:outline-none text-red-800 font-bold pb-1 flex justify-between items-center transition hover:border-red-600 group">
                                <span>{info.background || 'Seleccionar...'}</span><span className="text-[10px] bg-red-100 text-red-800 px-1.5 py-0.5 rounded shadow-sm border border-red-200 group-hover:bg-red-800 group-hover:text-white transition">⚙️ Configurar</span>
                            </button>
                            <label className="text-xs text-neutral-500 block mt-1">Trasfondo</label>
                        </div>
                        
                        <div>
                            <div>
        </div>
        <div className="flex gap-1">
            <select name="race" value={info.race} onChange={handleInfoChange} className="w-full font-semibold border-b bg-transparent focus:outline-none text-red-800 font-bold">
                {Object.keys(raceDatabase).map(r => <option key={r} value={r}>{r}</option>)}
            </select>
            {/* Solo se muestra si la raza elegida es Dracónido */}
            {info.race === 'Dracónido' && (
                <select name="draconicAncestry" value={info.draconicAncestry} onChange={handleInfoChange} className="w-full font-semibold border-b bg-transparent focus:outline-none text-red-800 font-bold text-xs" title="Linaje Dracónico">
                    {Object.keys(draconicAncestries).map(anc => <option key={anc} value={anc}>{anc}</option>)}
                </select>
            )}
        </div>
        <label className="text-xs text-neutral-500 block">Raza {info.race === 'Dracónido' ? '& Linaje' : '(Aplica stats)'}</label>
    </div>
                        
                        <div>
                            <select name="alignment" value={info.alignment} onChange={handleInfoChange} className="w-full font-semibold border-b bg-transparent focus:outline-none">
                                <option value="Legal Bueno">Legal Bueno</option> <option value="Neutral Bueno">Neutral Bueno</option> <option value="Caótico Bueno">Caótico Bueno</option>
                                <option value="Neutral">Neutral</option> <option value="Caótico Malo">Caótico Malo</option>
                            </select>
                            <label className="text-xs text-neutral-500 block">Alineamiento</label>
                        </div>
                        <div><input type="number" name="xp" value={info.xp} onChange={handleInfoChange} className="w-full font-semibold border-b bg-transparent focus:outline-none" /><label className="text-xs text-neutral-500 block">Experiencia</label></div>
                    </div>
                </div>

                <div className="flex gap-2 mb-6 border-b-2 border-neutral-300 pb-1">
                    <button onClick={() => setActiveTab('sheet')} className={`px-4 py-2 font-bold rounded-t-lg transition flex items-center gap-2 ${activeTab === 'sheet' ? 'bg-red-800 text-white' : 'bg-neutral-200 text-neutral-600 hover:bg-neutral-300'}`}>
                        <ShieldIcon size={16} /> Hoja Principal
                    </button>
                    <button onClick={() => setActiveTab('inventory')} className={`px-4 py-2 font-bold rounded-t-lg transition flex items-center gap-2 ${activeTab === 'inventory' ? 'bg-red-800 text-white' : 'bg-neutral-200 text-neutral-600 hover:bg-neutral-300'}`}>
                        <BackpackIcon size={16} /> Inventario y Equipo
                    </button>
                    <button onClick={() => setActiveTab('feats')} className={`px-4 py-2 font-bold rounded-t-lg transition flex items-center gap-2 ${activeTab === 'feats' ? 'bg-red-800 text-white' : 'bg-neutral-200 text-neutral-600 hover:bg-neutral-300'}`}>
                        <ZapIcon size={16} /> Dotes y Rasgos
                        {allowedFeats > selectedFeats.length && <span className="bg-yellow-400 text-yellow-900 text-[10px] px-1.5 py-0.5 rounded-full font-black animate-pulse">!</span>}
                    </button>
                    <button onClick={() => setActiveTab('spells')} className={`flex-1 py-3 text-sm font-black transition border-b-4 ${activeTab === 'spells' ? 'border-purple-600 text-purple-900 bg-purple-50' : 'border-transparent text-neutral-500 hover:text-neutral-800 hover:bg-neutral-100'}`}>
                                        GRIMORIO
    </button>
                </div>

                {/*  RENDERIZADO DE LA PESTAÑA Main TAB */}
                {activeTab === 'sheet' && (
                    <MainTab 
                        abilities={abilities}
                        effectiveAbilities={effectiveAbilities}
                        mods={mods}
                        profBonus={profBonus}
                        proficiencies={proficiencies}
                        toggleProficiency={toggleProficiency}
                        combat={combat}
                        handleCombatChange={handleCombatChange}
                        adjustHP={adjustHP}
                        toggleDeathSave={toggleDeathSave}
                        activeConditions={activeConditions}
                        toggleCondition={toggleCondition}
                        spellSlots={spellSlots}
                        toggleSpellSlot={toggleSpellSlot}
                        computedAC={computedAC}
                        stealthDisadvantage={stealthDisadvantage}
                        isArmorPenalized={isArmorPenalized}
                        computedAttacks={computedAttacks}
                        racialAttacksUI={racialAttacksUI}
                        texts={texts}
                        handleTextChange={handleTextChange}
                        rollAbilityCheck={rollAbilityCheck}
                        rollWeaponAttack={rollWeaponAttack}
                        rollWeaponDamage={rollWeaponDamage}
                        rollPoisonDamage={rollPoisonDamage}
                        removeWeaponPoison={removeWeaponPoison}
                        handleQuantityChange={handleQuantityChange}
                        handleAbilityChange={handleAbilityChange}
                        info={info}
                        formatMod={formatMod}
                        currentRace={currentRace}
                        conditionsList={conditionsList}
                        activeCustomResistances={activeCustomResistances} // <-- Nueva prop para mostrar en pantalla principal
                    />
                )}
                {/* --- RENDERIZADO DE LA PESTAÑA DE INVENTARIO --- */}
                {activeTab === 'inventory' && (
                    <InventoryTab 
                        inventory={inventory}
                        setInventory={setInventory}
                        currency={currency}
                        handleAddCoins={handleAddCoins}
                        autoProficienciesList={autoProficienciesList}
                        texts={texts}
                        handleTextChange={handleTextChange}
                        setTexts={setTexts}
                        craftPoison={craftPoison}
                        craftAlchemy={craftAlchemy}
                        useHealingPotion={useHealingPotion}
                        setApplyPoisonModal={setApplyPoisonModal}
                        setRollNotification={setRollNotification}
                        handleQuantityChange={handleQuantityChange}
                        toggleEquip={toggleEquip}
                        removeInventoryItem={removeInventoryItem}
                        handleToggleGrip={handleToggleGrip}
                        customInventory={customInventory}
                        addCustomItem={addCustomItem}
                        updateCustomItemField={updateCustomItemField}
                        updateCustomWeaponField={updateCustomWeaponField}
                        adjustCustomQuantity={adjustCustomQuantity}
                        removeCustomItem={removeCustomItem}
                        mods={mods}
                        formatMod={formatMod}
                    />
                )}

                {/* --- RENDERIZADO DE LA PESTAÑA DOTES Y RASGOS --- */}
                {activeTab === 'feats' && (
                    <FeatsTab 
                        info={info} 
                        currentRace={currentRace} 
                        texts={texts} 
                        handleTextChange={handleTextChange} 
                        selectedFeats={selectedFeats} 
                        setSelectedFeats={setSelectedFeats} 
                        allowedFeats={allowedFeats}
                    />
                )}

                {/* --- RENDERIZADO DE LA PESTAÑA DEL GRIMORIO --- */}
                {activeTab === 'spells' && (
                    <SpellsTab 
                        knownSpells={knownSpells} 
                        setKnownSpells={setKnownSpells}
                        info={info}
                        spellSlots={spellSlots}       // <-- Tu estado de espacios de magia
                        toggleSpellSlot={toggleSpellSlot} // <-- Tu función para actualizar los espacios
                        resetSpellSlots={resetSpellSlots}
                        mods={mods}               // <-- Nuevo: Modificadores de atributos
                        profBonus={profBonus}     // <-- Nuevo: Bono de competencia por nivel
                        formatMod={formatMod}     // <-- Nuevo: Formateador de signos (+/-)
                        setRollNotification={setRollNotification} // <-- Nuevo: Sistema de alertas de tirada
                    />
                )}
            </div>
        </div>
    );
};

ReactDOM.render(<CharacterSheet />, document.getElementById('root'));
