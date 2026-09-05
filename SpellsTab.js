// ==========================================
// IMPORTACIONES Y CONFIGURACIÓN INICIAL
// ==========================================
const { useState, useEffect } = React;

// --- ICONOS LOCALES ---
const BookIcon = ({ className, size = 24 }) => (<svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg>);
const SparklesIcon = ({ className, size = 24 }) => (<svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>);
const ZapIcon = ({ className, size = 24 }) => (<svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>);

// --- LÓGICA DE PROGRESIÓN DE MONEDAS ---
const MAX_SPELL_SLOTS = [4, 3, 3, 3, 3, 2, 2, 1, 1];

const getAvailableSlots = (characterClass, characterLevel) => {
    const level = parseInt(characterLevel) || 1;
    const lowerClass = (characterClass || "").toLowerCase();
    
    const isFullCaster = ["mago", "hechicero", "clérigo", "clerigo", "druida", "bardo", "wizard", "sorcerer", "cleric", "druid", "bard"].some(c => lowerClass.includes(c));
    const isHalfCaster = ["paladín", "paladin", "explorador", "ranger"].some(c => lowerClass.includes(c));
    const isWarlock = ["brujo", "warlock"].some(c => lowerClass.includes(c));

    if (isFullCaster) {
        const prog = {
            1: [2,0,0,0,0,0,0,0,0], 2: [3,0,0,0,0,0,0,0,0], 3: [4,2,0,0,0,0,0,0,0], 4: [4,3,0,0,0,0,0,0,0],
            5: [4,3,2,0,0,0,0,0,0], 6: [4,3,3,0,0,0,0,0,0], 7: [4,3,3,1,0,0,0,0,0], 8: [4,3,3,2,0,0,0,0,0],
            9: [4,3,3,3,1,0,0,0,0], 10: [4,3,3,3,2,0,0,0,0], 11: [4,3,3,3,2,1,0,0,0], 12: [4,3,3,3,2,1,0,0,0],
            13: [4,3,3,3,2,1,1,0,0], 14: [4,3,3,3,2,1,1,0,0], 15: [4,3,3,3,2,1,1,1,0], 16: [4,3,3,3,2,1,1,1,0],
            17: [4,3,3,3,2,1,1,1,1], 18: [4,3,3,3,3,1,1,1,1], 19: [4,3,3,3,3,2,1,1,1], 20: [4,3,3,3,3,2,2,1,1]
        };
        return prog[level] || MAX_SPELL_SLOTS;
    }

    if (isHalfCaster) {
        const prog = {
            1: [0,0,0,0,0,0,0,0,0], 2: [2,0,0,0,0,0,0,0,0], 3: [3,0,0,0,0,0,0,0,0], 4: [3,0,0,0,0,0,0,0,0],
            5: [4,2,0,0,0,0,0,0,0], 6: [4,2,0,0,0,0,0,0,0], 7: [4,3,0,0,0,0,0,0,0], 8: [4,3,0,0,0,0,0,0,0],
            9: [4,3,2,0,0,0,0,0,0], 10: [4,3,2,0,0,0,0,0,0], 11: [4,3,3,0,0,0,0,0,0], 12: [4,3,3,0,0,0,0,0,0],
            13: [4,3,3,1,0,0,0,0,0], 14: [4,3,3,1,0,0,0,0,0], 15: [4,3,3,2,0,0,0,0,0], 16: [4,3,3,2,0,0,0,0,0],
            17: [4,3,3,3,1,0,0,0,0], 18: [4,3,3,3,1,0,0,0,0], 19: [4,3,3,3,2,0,0,0,0], 20: [4,3,3,3,2,0,0,0,0]
        };
        return prog[level] || MAX_SPELL_SLOTS.map(() => 0);
    }

    if (isWarlock) {
        const prog = {
            1: [1,0,0,0,0,0,0,0,0], 2: [2,0,0,0,0,0,0,0,0], 3: [0,2,0,0,0,0,0,0,0], 4: [0,2,0,0,0,0,0,0,0],
            5: [0,0,2,0,0,0,0,0,0], 6: [0,0,2,0,0,0,0,0,0], 7: [0,0,0,2,0,0,0,0,0], 8: [0,0,0,2,0,0,0,0,0],
            9: [0,0,0,0,2,0,0,0,0], 10: [0,0,0,0,2,0,0,0,0]
        };
        if (level >= 11 && level <= 16) return [0,0,0,0,3,0,0,0,0];
        if (level >= 17) return [0,0,0,0,4,0,0,0,0];
        return prog[level] || MAX_SPELL_SLOTS.map(() => 0);
    }

    return MAX_SPELL_SLOTS.map(() => 0);
};

const SpellsTab = ({ knownSpells, setKnownSpells, info, spellSlots, toggleSpellSlot, resetSpellSlots, mods, profBonus, formatMod, setRollNotification }) => {
    
    // --- ESTADOS LOCALES ---
    const [spellSearch, setSpellSearch] = useState('');
    const [isSpellDropdownOpen, setIsSpellDropdownOpen] = useState(false);

    // --- ESTADO PARA HABILIDADES PERSONALIZADAS ---
    const [customAbilities, setCustomAbilities] = useState([]);

    useEffect(() => {
        const closeDropdown = (e) => { 
            if (!e.target.closest('.spell-dropdown-container')) setIsSpellDropdownOpen(false); 
        };
        document.addEventListener('click', closeDropdown);
        return () => document.removeEventListener('click', closeDropdown);
    }, []);

    const handleAddSpell = (spell) => {
        if (!knownSpells.some(s => s.name === spell.name)) {
            setKnownSpells([...knownSpells, spell]);
            setIsSpellDropdownOpen(false);
            setSpellSearch('');
        }
    };

    const removeSpell = (spellName) => {
        setKnownSpells(knownSpells.filter(s => s.name !== spellName));
    };

    const formatClasses = (classString) => {
        if (!classString) return "";
        return classString.replace(/Artificer,?\s*/gi, '').trim();
    };

    // --- FUNCIONES PARA HABILIDADES PERSONALIZADAS ---
    const addCustomAbility = () => {
        const newAbility = {
            id: Date.now(),
            title: "Nueva Habilidad",
            description: "Describe aquí los efectos de tu habilidad...",
            uses: Array(10).fill(false),
            selectedStat: "none",
            diceCounts: { 4: 0, 6: 0, 8: 0, 10: 0, 12: 0, 20: 0, 100: 0 }
        };
        setCustomAbilities([...customAbilities, newAbility]);
    };

    const updateAbilityField = (id, field, value) => {
        setCustomAbilities(customAbilities.map(ab => ab.id === id ? { ...ab, [field]: value } : ab));
    };

    const toggleAbilityUse = (abilityId, index) => {
        setCustomAbilities(customAbilities.map(ab => {
            if (ab.id === abilityId) {
                const newUses = [...ab.uses];
                newUses[index] = !newUses[index];
                return { ...ab, uses: newUses };
            }
            return ab;
        }));
    };

    const updateAbilityDice = (abilityId, sides, qty) => {
        setCustomAbilities(customAbilities.map(ab => {
            if (ab.id === abilityId) {
                return {
                    ...ab,
                    diceCounts: { ...ab.diceCounts, [sides]: Math.max(0, parseInt(qty) || 0) }
                };
            }
            return ab;
        }));
    };

    const rollAbilityDice = (ab) => {
        let rollsDetail = [];
        let total = 0;
        
        [4, 6, 8, 10, 12, 20, 100].forEach(sides => {
            const count = Number(ab.diceCounts[sides] || 0);
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

        let statMod = 0;
        let statLabel = "";
        if (ab.selectedStat !== "none" && mods) {
            statMod = mods[ab.selectedStat] || 0;
            const statNames = { str: 'Fuerza', dex: 'Destreza', con: 'Constitución', int: 'Inteligencia', wis: 'Sabiduría', cha: 'Carisma' };
            statLabel = ` + Mod.${statNames[ab.selectedStat]}(${formatMod(statMod)})`;
            total += statMod;
        }

        setRollNotification({
            title: `Habilidad: ${ab.title}`,
            details: rollsDetail.length > 0 ? `${rollsDetail.join(' | ')}${statLabel}` : `Sin dados seleccionados${statLabel}`,
            total: total,
            type: 'normal'
        });
    };

    const removeCustomAbility = (id) => {
        setCustomAbilities(customAbilities.filter(ab => ab.id !== id));
    };

    // --- AUTOMATIZACIÓN DE CARACTERÍSTICA DE LANZAMIENTO ---
    const getSpellcastingStat = () => {
        const lowerClass = (info.classLevel || "").toLowerCase();
        if (["clérigo", "clerigo", "druida", "explorador", "ranger"].some(c => lowerClass.includes(c))) return { key: 'wis', name: 'Sabiduría' };
        if (["bardo", "bard", "brujo", "warlock", "hechicero", "sorcerer", "paladín", "paladin"].some(c => lowerClass.includes(c))) return { key: 'cha', name: 'Carisma' };
        return { key: 'int', name: 'Inteligencia' };
    };

    const spellStat = getSpellcastingStat();
    const spellModValue = mods ? mods[spellStat.key] : 0;
    const spellAttackBonus = profBonus + spellModValue;
    const spellSaveDC = 8 + profBonus + spellModValue;

    const rollSpellAttack = () => {
        const d20 = Math.floor(Math.random() * 20) + 1;
        const total = d20 + spellAttackBonus;
        setRollNotification({
            title: "Tirada de Ataque de Conjuro",
            details: `Dado (d20): [${d20}] + Comp(+${profBonus}) + Mod.${spellStat.name}(${formatMod(spellModValue)})`,
            total: total,
            type: d20 === 20 ? 'crit' : d20 === 1 ? 'fail' : 'normal'
        });
    };

    const spellsByLevel = knownSpells.reduce((acc, spell) => {
        const lvl = spell.level === 0 ? "Trucos (Cantrips)" : `Nivel ${spell.level}`;
        if (!acc[lvl]) acc[lvl] = [];
        acc[lvl].push(spell);
        return acc;
    }, {});

    return (
        <div className="p-4 sm:p-6 bg-neutral-50 border-2 border-neutral-300 rounded-lg min-h-[500px] flex flex-col gap-6">
            
            {/* CABECERA DEL GRIMORIO */}
            <div className="flex justify-between items-center border-b-2 border-neutral-300 pb-4">
                <h2 className="text-2xl font-black text-purple-900 flex items-center gap-2">
                    <BookIcon size={28}/> Mi Grimorio <span className="text-xs text-neutral-500 font-normal">({info.classLevel || 'Sin Clase'})</span>
                </h2>
                <div className="text-sm font-bold bg-white px-3 py-1 rounded-full border border-neutral-300 text-neutral-600 shadow-sm">
                    {knownSpells.length} Hechizos Conocidos
                </div>
            </div>

            {/* PANEL DE ESTADÍSTICAS Y ATAQUE DE CONJURO */}
            <div className="bg-purple-900/5 border-2 border-purple-300 rounded-xl p-4 flex flex-col sm:flex-row justify-between items-center gap-4 shadow-sm">
                <div className="flex flex-col gap-1 w-full sm:w-auto">
                    <span className="text-xs font-black text-purple-900 uppercase tracking-wider flex items-center gap-1.5">
                        ✨ Parámetros Mágicos ({spellStat.name})
                    </span>
                    <div className="flex flex-wrap items-center gap-3 text-xs font-semibold text-neutral-700 mt-0.5">
                        <span className="bg-white px-2.5 py-1 rounded border border-purple-200">
                            Ataque: <strong className="text-purple-900 font-black">{formatMod(spellAttackBonus)}</strong>
                        </span>
                        <span className="bg-white px-2.5 py-1 rounded border border-purple-200">
                            CD de Salvación: <strong className="text-purple-900 font-black">{spellSaveDC}</strong>
                        </span>
                        <span className="text-neutral-400 text-[11px] italic">
                            (Comp +{profBonus} | Mod {formatMod(spellModValue)})
                        </span>
                    </div>
                </div>

                <button 
                    onClick={rollSpellAttack}
                    className="w-full sm:w-auto bg-purple-800 hover:bg-purple-700 text-white font-bold py-2.5 px-5 rounded-lg shadow-md border-b-4 border-purple-950 active:border-b-0 active:translate-y-[2px] transition flex items-center justify-center gap-2 text-sm shrink-0"
                >
                    🎲 Ataque de Conjuro ({formatMod(spellAttackBonus)})
                </button>
            </div>

            {/* --- MONEDERO MÁGICO (SPELL SLOTS) --- */}
            <div className="bg-white border-2 border-purple-200 rounded-xl p-4 shadow-sm flex flex-col gap-4">
                <div className="flex justify-between items-center border-b-2 border-purple-100 pb-2">
                    <h3 className="text-lg font-black text-purple-900 flex items-center gap-2">
                        🔮 Espacios de Magia (Nivel {info.level || 1})
                    </h3>
                    
                    {/* AQUÍ ESTÁ EL BOTÓN ACTUALIZADO */}
                    <button 
                        onClick={resetSpellSlots}
                        className="bg-purple-100 hover:bg-purple-200 text-purple-900 font-bold px-3 py-1.5 rounded-lg text-xs transition border border-purple-300 flex items-center gap-1"
                    >
                        🔄 Reiniciar espacios
                    </button>
                </div>
                
                <div className="flex flex-wrap gap-x-6 gap-y-4">
                    {MAX_SPELL_SLOTS.map((maxCap, magicLevelIndex) => {
                        const magicLevel = magicLevelIndex + 1;
                        const availableSlots = getAvailableSlots(info.classLevel, info.level);
                        const limit = availableSlots[magicLevelIndex];
                        
                        return (
                            <div key={`magic-level-${magicLevel}`} className="flex flex-col gap-2 min-w-[60px]">
                                <h4 className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider text-center bg-neutral-50 rounded border border-neutral-200 py-0.5">Nivel {magicLevel}</h4>
                                
                                <div className={`mx-auto ${magicLevel === 1 ? 'grid grid-cols-2 grid-rows-2 gap-1.5 w-max' : 'flex gap-1.5'}`}>
                                    {Array.from({ length: maxCap }).map((_, slotIndex) => {
                                        const isLocked = slotIndex >= limit;
                                        const isUsed = spellSlots && spellSlots[magicLevelIndex] ? spellSlots[magicLevelIndex][slotIndex] : false;

                                        return (
                                            <button
                                                key={`slot-${magicLevel}-${slotIndex}`}
                                                onClick={() => !isLocked && toggleSpellSlot(magicLevelIndex, slotIndex)}
                                                disabled={isLocked}
                                                title={isLocked ? 'Bloqueado por nivel/clase' : (isUsed ? 'Marcar como disponible' : 'Gastar espacio de magia')}
                                                className={`w-6 h-6 rounded-full border-2 transition-all flex-shrink-0 ${
                                                    isLocked 
                                                        ? 'bg-neutral-200 border-neutral-300 opacity-40 cursor-not-allowed' 
                                                        : isUsed 
                                                            ? 'bg-blue-500 border-blue-700 shadow-inner' 
                                                            : 'bg-white border-neutral-400 hover:border-blue-400 cursor-pointer shadow-sm'
                                                }`}
                                            />
                                        );
                                    })}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* BUSCADOR Y SELECTOR DE HECHIZOS */}
            <div className="relative spell-dropdown-container max-w-xl z-50">
                <label className="text-xs font-bold text-neutral-500 block mb-1">APRENDER NUEVO HECHIZO (Apto para: {info.classLevel})</label>
                <button onClick={() => setIsSpellDropdownOpen(!isSpellDropdownOpen)} className="w-full text-left text-sm border-2 border-purple-300 rounded-lg p-3 bg-purple-50 focus:outline-none flex justify-between items-center text-purple-900 font-bold shadow-sm transition hover:bg-purple-100">
                    <span>🔍 Busca hechizos compatibles con tu clase...</span><span className="text-xs">{isSpellDropdownOpen ? '▲' : '▼'}</span>
                </button>
                
                {isSpellDropdownOpen && (
                    <div className="absolute top-full left-0 w-full mt-2 bg-white border-2 border-purple-300 rounded-lg shadow-2xl flex flex-col z-[9999]" style={{ maxHeight: '350px' }}>
                        <div className="p-2 border-b border-neutral-200 bg-neutral-100 sticky top-0 z-10">
                            <input 
                                type="text" 
                                placeholder={`Buscar en hechizos de ${info.classLevel}...`} 
                                value={spellSearch} 
                                onChange={(e) => setSpellSearch(e.target.value)} 
                                className="w-full text-sm border border-neutral-300 rounded p-2 focus:outline-none focus:border-purple-600 font-medium bg-white" 
                                autoFocus 
                            />
                        </div>
                        <div className="overflow-y-auto p-1 flex-1" style={{ maxHeight: '280px' }}>
                            {typeof spellsDatabase === 'undefined' ? (
                                <div className="p-3 text-xs text-red-600 font-bold text-center">⚠️ Error: spellsDatabase no está definido.</div>
                            ) : (() => {
                                const classTranslation = {
                                    "mago": "wizard", "hechicero": "sorcerer", "clérigo": "cleric",
                                    "druida": "druid", "bardo": "bard", "brujo": "warlock",
                                    "paladín": "paladin", "explorador": "ranger", "guerrero": "fighter",
                                    "pícaro": "rogue", "monje": "monk"
                                };
                                const currentClassClean = (info.classLevel || "").toLowerCase().trim();
                                const searchClassInEnglish = classTranslation[currentClassClean] || currentClassClean;

                                const filteredSpells = spellsDatabase.filter(s => {
                                    const matchesSearch = s.name && s.name.toLowerCase().includes(spellSearch.toLowerCase());
                                    const matchesClass = s.classes && s.classes.toLowerCase().includes(searchClassInEnglish);
                                    return matchesSearch && matchesClass;
                                });

                                if (filteredSpells.length === 0) {
                                    return <div className="p-3 text-xs text-neutral-500 text-center italic">No se encontraron hechizos compatibles para "{info.classLevel}" con ese nombre.</div>;
                                }

                                return filteredSpells.slice(0, 50).map((spell, i) => (
                                    <div key={i} onClick={() => handleAddSpell(spell)} className="px-3 py-2.5 border-b border-neutral-100 last:border-0 hover:bg-purple-100 cursor-pointer transition flex justify-between items-center group">
                                        <div className="flex flex-col">
                                            <span className="font-bold text-neutral-900 group-hover:text-purple-950 text-sm">{spell.name}</span>
                                            <span className="text-[11px] text-neutral-500">{spell.school} • Clases: {formatClasses(spell.classes)}</span>
                                        </div>
                                        <span className="text-[10px] font-black bg-purple-100 text-purple-900 px-2 py-1 rounded uppercase min-w-[55px] text-center">
                                            {spell.level === 0 ? 'Truco' : `Nvl ${spell.level}`}
                                        </span>
                                    </div>
                                ));
                            })()}
                        </div>
                    </div>
                )}
            </div>

            {/* --- SECCIÓN DE HABILIDADES PERSONALIZADAS --- */}
            <div className="flex flex-col gap-4 mt-4 border-t-2 border-purple-200 pt-6">
                <div className="flex justify-between items-center">
                    <h3 className="text-lg font-black text-purple-900 flex items-center gap-2">
                        ⚡ Habilidades y Rasgos Personalizados
                    </h3>
                    <button 
                        onClick={addCustomAbility}
                        className="bg-purple-800 hover:bg-purple-700 text-white font-bold px-3 py-1.5 rounded-lg shadow text-xs transition flex items-center gap-1 border-b-2 border-purple-950 active:border-b-0 active:translate-y-[2px]"
                    >
                        + Añadir Habilidad Personalizada
                    </button>
                </div>

                {customAbilities.length === 0 ? (
                    <div className="text-center p-6 border-2 border-dashed border-neutral-300 rounded-xl text-neutral-400 italic text-xs">
                        No has añadido ninguna habilidad personalizada. Usa el botón de arriba para crear una.
                    </div>
                ) : (
                    <div className="flex flex-col gap-4">
                        {customAbilities.map((ab) => (
                            <div key={ab.id} className="bg-white border-2 border-purple-200 rounded-xl p-4 shadow-sm flex flex-col gap-3 relative group">
                                <button 
                                    onClick={() => removeCustomAbility(ab.id)} 
                                    className="absolute top-2 right-2 text-neutral-300 hover:text-red-700 font-bold w-6 h-6 flex items-center justify-center rounded hover:bg-red-50 transition" 
                                    title="Eliminar habilidad"
                                >
                                    &times;
                                </button>

                                {/* Título y Círculos de Usos */}
                                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pr-6">
                                    <input 
                                        type="text" 
                                        value={ab.title} 
                                        onChange={(e) => updateAbilityField(ab.id, 'title', e.target.value)}
                                        className="font-black text-purple-950 text-base border-b border-transparent hover:border-purple-300 focus:border-purple-600 focus:outline-none bg-transparent w-full sm:w-1/2"
                                        placeholder="Nombre de la habilidad"
                                    />
                                    
                                    {/* 10 Círculos de Usos */}
                                    <div className="flex items-center gap-1 bg-neutral-50 p-1.5 rounded-lg border border-neutral-200 overflow-x-auto max-w-full">
                                        <span className="text-[10px] font-bold text-neutral-500 mr-1 uppercase">Usos:</span>
                                        {ab.uses.map((isUsed, idx) => (
                                            <button
                                                key={idx}
                                                onClick={() => toggleAbilityUse(ab.id, idx)}
                                                className={`w-4 h-4 rounded-full border-2 transition-all flex items-center justify-center ${
                                                    isUsed ? 'bg-purple-600 border-purple-800' : 'bg-white border-neutral-300 hover:border-purple-400'
                                                }`}
                                                title={`Uso ${idx + 1}`}
                                            />
                                        ))}
                                    </div>
                                </div>

                                {/* Caja de texto para descripción */}
                                <textarea 
                                    value={ab.description}
                                    onChange={(e) => updateAbilityField(ab.id, 'description', e.target.value)}
                                    rows="2"
                                    className="w-full text-xs text-neutral-700 bg-purple-50/30 border border-purple-100 rounded-lg p-2 focus:outline-none focus:border-purple-400 resize-y"
                                    placeholder="Describe la habilidad aquí..."
                                />

                                {/* Configuración de Dados y Atributos para la Tirada */}
                                <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-neutral-100 bg-neutral-50 p-2 rounded-lg">
                                    <div className="flex flex-wrap items-center gap-2">
                                        <span className="text-[10px] font-bold text-neutral-600 uppercase">🎲 Dados:</span>
                                        {[4, 6, 8, 10, 12, 20, 100].map(sides => (
                                            <div key={sides} className="flex items-center gap-0.5 bg-white px-1.5 py-0.5 rounded border border-neutral-200">
                                                <span className="text-[10px] font-bold text-neutral-500">d{sides}</span>
                                                <input 
                                                    type="number" 
                                                    min="0" 
                                                    max="99" 
                                                    value={ab.diceCounts[sides] === 0 ? '' : ab.diceCounts[sides]} 
                                                    onChange={(e) => updateAbilityDice(ab.id, sides, e.target.value)} 
                                                    placeholder="0" 
                                                    className="w-6 text-center text-xs font-bold border-b border-neutral-300 focus:outline-none focus:border-purple-600 bg-transparent" 
                                                />
                                            </div>
                                        ))}
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <div className="flex items-center gap-1 bg-white px-2 py-1 rounded border border-neutral-200">
                                            <span className="text-[10px] font-bold text-neutral-600 uppercase">Atributo:</span>
                                            <select 
                                                value={ab.selectedStat} 
                                                onChange={(e) => updateAbilityField(ab.id, 'selectedStat', e.target.value)}
                                                className="text-xs font-bold text-purple-900 bg-transparent focus:outline-none cursor-pointer"
                                            >
                                                <option value="none">Ninguno</option>
                                                <option value="str">Fuerza</option>
                                                <option value="dex">Destreza</option>
                                                <option value="con">Constitución</option>
                                                <option value="int">Inteligencia</option>
                                                <option value="wis">Sabiduría</option>
                                                <option value="cha">Carisma</option>
                                            </select>
                                        </div>

                                        <button 
                                            onClick={() => rollAbilityDice(ab)}
                                            className="bg-purple-800 hover:bg-purple-700 text-white font-bold py-1.5 px-3 rounded text-xs transition shadow border-b-2 border-purple-950 active:border-b-0 active:translate-y-[2px]"
                                        >
                                            Tirar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* LISTA DE HECHIZOS CONOCIDOS */}
            <div className="flex flex-col gap-6 mt-2">
                {Object.keys(spellsByLevel).length === 0 ? (
                    <div className="text-center p-10 border-2 border-dashed border-neutral-300 rounded-xl text-neutral-400 italic">
                        Tu grimorio está vacío. Busca hechizos en el menú de arriba para aprenderlos.
                    </div>
                ) : (
                    Object.keys(spellsByLevel).sort().map((level, idx) => (
                        <div key={idx} className="flex flex-col gap-3">
                            <h3 className="text-sm font-black text-neutral-500 uppercase border-b-2 border-neutral-200 pb-1">{level}</h3>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                {spellsByLevel[level].map((spell, sIdx) => (
                                    <div key={sIdx} className="bg-white border-2 border-neutral-200 rounded-xl p-4 shadow-sm flex flex-col relative hover:border-purple-300 transition group">
                                        <button onClick={() => removeSpell(spell.name)} className="absolute top-2 right-2 text-neutral-300 hover:text-red-700 font-bold w-6 h-6 flex items-center justify-center rounded hover:bg-red-50 transition" title="Olvidar hechizo">&times;</button>
                                        
                                        <div className="flex justify-between items-start mb-2 pr-6">
                                            <div className="flex flex-col">
                                                <h4 className="text-lg font-black text-neutral-900 flex items-center gap-1">
                                                    <SparklesIcon size={16} className="text-purple-600"/> {spell.name}
                                                </h4>
                                                <span className="text-[10px] text-neutral-500 font-bold uppercase tracking-wider">{spell.school}</span>
                                            </div>
                                        </div>

                                        <div className="flex flex-wrap gap-2 text-xs font-semibold text-neutral-700 bg-neutral-50 p-2 rounded-lg border border-neutral-200 mb-2">
                                            <span title="Tiempo de Casteo">⏳ {spell.cast_time}</span>
                                            <span className="text-neutral-300">|</span>
                                            <span title="Rango">🎯 {spell.range}</span>
                                            <span className="text-neutral-300">|</span>
                                            <span title="Duración">⏱️ {spell.duration}</span>
                                            <span className="text-neutral-300">|</span>
                                            <span title="Componentes" className="text-purple-800">
                                                🧬 {spell.verbal === 1 ? 'V ' : ''}{spell.somatic === 1 ? 'S ' : ''}{spell.material === 1 ? 'M' : ''}
                                                {spell.material_cost ? ` (${spell.material_cost})` : ''}
                                            </span>
                                        </div>

                                        <div 
                                            className="text-xs text-neutral-700 leading-relaxed border-l-4 border-purple-500 pl-3 py-1 bg-purple-50/40 rounded-r-lg mt-1 whitespace-pre-line"
                                            dangerouslySetInnerHTML={{ __html: spell.description }}
                                        ></div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};