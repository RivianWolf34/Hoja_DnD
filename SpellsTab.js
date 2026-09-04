// ==========================================
// IMPORTACIONES Y CONFIGURACIÓN INICIAL
// ==========================================
const { useState, useEffect } = React;

// --- ICONOS LOCALES ---
const BookIcon = ({ className, size = 24 }) => (<svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg>);
const SparklesIcon = ({ className, size = 24 }) => (<svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>);
const ZapIcon = ({ className, size = 24 }) => (<svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>);

// ==========================================
// COMPONENTE PRINCIPAL DEL GRIMORIO
// ==========================================
const SpellsTab = ({ knownSpells, setKnownSpells, info, spellSlots, toggleSpellSlot }) => {
    
    // --- ESTADOS LOCALES ---
    const [spellSearch, setSpellSearch] = useState('');
    const [isSpellDropdownOpen, setIsSpellDropdownOpen] = useState(false);

    // --- FUNCIONES LOCALES ---
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

    // Agrupamos los hechizos conocidos por nivel
    const spellsByLevel = knownSpells.reduce((acc, spell) => {
        const lvl = spell.level === 0 ? "Trucos (Cantrips)" : `Nivel ${spell.level}`;
        if (!acc[lvl]) acc[lvl] = [];
        acc[lvl].push(spell);
        return acc;
    }, {});

    // ==========================================
    // RENDERIZADO VISUAL (HTML/JSX)
    // ==========================================
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

            {/* ⚡ PANEL DE ESPACIOS DE MAGIA / USOS (Integrado aquí) */}
            <div className="border-2 border-neutral-300 rounded-lg p-3 bg-neutral-50 flex flex-col">
                <div className="flex items-center gap-2 font-bold text-neutral-700 mb-2 border-b-2 border-neutral-200 pb-1 text-xs">
                    <ZapIcon size={18} /> ESPACIOS DE MAGIA / USOS
                </div>
                <p className="text-[10px] text-neutral-500 mb-3 leading-tight italic">
                    * El nivel de magia indica que ese slot sirve para conjuros de ese nivel o inferior.
                </p>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
                    {spellSlots && Object.entries(spellSlots).map(([level, slots]) => {
                        const lvlIdx = Number(level) - 1;
                        
                        const getAvailableSpellSlots = (cls, lvl) => {
                            const numLvl = Number(lvl);
                            const fullCasters = ["Mago", "Hechicero", "Clérigo", "Druida", "Bardo"];
                            const halfCasters = ["Paladín", "Explorador"];
                            const warlock = ["Brujo"];

                            if (fullCasters.includes(cls)) {
                                const table = [[], [2,0,0,0,0,0,0,0,0], [3,0,0,0,0,0,0,0,0], [4,2,0,0,0,0,0,0,0], [4,3,0,0,0,0,0,0,0], [4,3,2,0,0,0,0,0,0], [4,3,3,0,0,0,0,0,0], [4,3,3,1,0,0,0,0,0], [4,3,3,2,0,0,0,0,0], [4,3,3,3,1,0,0,0,0], [4,3,3,3,2,0,0,0,0], [4,3,3,3,2,1,0,0,0], [4,3,3,3,2,1,0,0,0], [4,3,3,3,2,1,1,0,0], [4,3,3,3,2,1,1,0,0], [4,3,3,3,2,1,1,1,0], [4,3,3,3,2,1,1,1,0], [4,3,3,3,2,1,1,1,1], [4,3,3,3,3,1,1,1,1], [4,3,3,3,3,2,1,1,1], [4,3,3,3,3,2,2,1,1]];
                                return table[numLvl] || table[20];
                            }
                            if (halfCasters.includes(cls)) {
                                const table = [[], [0,0,0,0,0,0,0,0,0], [2,0,0,0,0,0,0,0,0], [3,0,0,0,0,0,0,0,0], [3,0,0,0,0,0,0,0,0], [4,2,0,0,0,0,0,0,0], [4,2,0,0,0,0,0,0,0], [4,3,0,0,0,0,0,0,0], [4,3,0,0,0,0,0,0,0], [4,3,2,0,0,0,0,0,0], [4,3,2,0,0,0,0,0,0], [4,3,3,0,0,0,0,0,0], [4,3,3,0,0,0,0,0,0], [4,3,3,1,0,0,0,0,0], [4,3,3,1,0,0,0,0,0], [4,3,3,2,0,0,0,0,0], [4,3,3,2,0,0,0,0,0], [4,3,3,3,1,0,0,0,0], [4,3,3,3,1,0,0,0,0], [4,3,3,3,2,0,0,0,0], [4,3,3,3,2,0,0,0,0]];
                                return table[numLvl] || table[20];
                            }
                            if (warlock.includes(cls)) {
                                const table = [[], [1,0,0,0,0,0,0,0,0], [2,0,0,0,0,0,0,0,0], [0,2,0,0,0,0,0,0,0], [0,2,0,0,0,0,0,0,0], [0,0,2,0,0,0,0,0,0], [0,0,2,0,0,0,0,0,0], [0,0,0,2,0,0,0,0,0], [0,0,0,2,0,0,0,0,0], [0,0,0,0,2,0,0,0,0], [0,0,0,0,2,0,0,0,0], [0,0,0,0,3,0,0,0,0], [0,0,0,0,3,0,0,0,0], [0,0,0,0,3,0,0,0,0], [0,0,0,0,3,0,0,0,0], [0,0,0,0,3,0,0,0,0], [0,0,0,0,3,0,0,0,0], [0,0,0,0,4,0,0,0,0], [0,0,0,0,4,0,0,0,0], [0,0,0,0,4,0,0,0,0], [0,0,0,0,4,0,0,0,0]];
                                return table[numLvl] || table[20];
                            }
                            return [0,0,0,0,0,0,0,0,0];
                        };

                        const maxAllowed = getAvailableSpellSlots(info.classLevel, info.level)[lvlIdx];
                        
                        return (
                            <div key={`spell-level-${level}`} className="flex flex-col gap-2 items-center bg-white border border-neutral-200 rounded p-2 shadow-sm">
                                <span className="text-[10px] font-black text-purple-900 uppercase text-center leading-tight">NIVEL DE MAGIA {level}</span>
                                <div className={`flex gap-1.5 justify-center ${level === '1' ? 'grid grid-cols-2 grid-rows-2 w-fit' : 'flex-wrap'}`}>
                                    {slots.map((isActive, idx) => {
                                        const isLocked = idx >= maxAllowed;
                                        return (
                                            <button
                                                key={`spell-${level}-${idx}`}
                                                onClick={() => !isLocked && toggleSpellSlot(level, idx)}
                                                disabled={isLocked}
                                                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                                                    isLocked ? 'bg-neutral-200 border-neutral-300 opacity-50 cursor-not-allowed' :
                                                    isActive ? 'bg-purple-600 border-purple-800 shadow-inner' : 'bg-neutral-100 border-neutral-300 hover:border-purple-400 hover:bg-purple-50'
                                                }`}
                                                title={`Nivel de Magia ${level}`}
                                            >
                                                {isLocked ? <span className="text-[10px] text-neutral-400">✖</span> : (isActive && <div className="w-2.5 h-2.5 bg-white rounded-full"></div>)}
                                            </button>
                                        )
                                    })}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>

            {/* BUSCADOR Y SELECTOR DE HECHIZOS (Filtrado por Clase) */}
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

                                        <div className="text-xs text-neutral-700 leading-relaxed border-l-4 border-purple-500 pl-3 py-1 bg-purple-50/40 rounded-r-lg mt-1 whitespace-pre-line">
                                            {spell.description}
                                        </div>
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