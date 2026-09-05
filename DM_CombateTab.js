// ==========================================
// PESTAÑA DE COMBATE (DM_CombateTab.js)
// ==========================================
const { useState } = React;

const DM_CombateTab = ({ combatants, setCombatants, turnIndex, setTurnIndex }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [monsterSearch, setMonsterSearch] = useState('');

    // Estados para el Lanzador de Dados Multidado
    const [dice1Qty, setDice1Qty] = useState(1);
    const [dice1Type, setDice1Type] = useState(20);
    
    const [dice2Qty, setDice2Qty] = useState(0);
    const [dice2Type, setDice2Type] = useState(6);
    
    const [dice3Qty, setDice3Qty] = useState(0);
    const [dice3Type, setDice3Type] = useState(4);
    
    const [diceMod, setDiceMod] = useState(0);
    const [lastDiceResult, setLastDiceResult] = useState(null);

    // Estado para expandir las fichas de acción de los monstruos en combate
    const [expandedMonsters, setExpandedMonsters] = useState({});

    const filteredMonsters = typeof DM_DataMonster !== 'undefined' 
        ? DM_DataMonster.filter(m => m.name.toLowerCase().includes(monsterSearch.toLowerCase()))
        : [];

    const addMonsterToCombat = (monster) => {
        const maxHp = parseInt(monster["Hit Points"]) || 10;
        const ac = parseInt(monster["Armor Class"]) || 10;

        const newCombatant = {
            id: Date.now() + Math.random(),
            name: monster.name,
            type: 'monster',
            hp: maxHp,
            maxHp: maxHp,
            ac: ac,
            initiative: '',
            meta: monster.meta,
            savingThrowsText: monster["Saving Throws"] || "",
            resistances: monster["Damage Resistances"] || "",
            damageImmunities: monster["Damage Immunities"] || "",
            conditionImmunities: monster["Condition Immunities"] || "",
            actions: monster.Actions || "",
            abilityMods: {
                STR: monster.STR_mod,
                DEX: monster.DEX_mod,
                CON: monster.CON_mod,
                INT: monster.INT_mod,
                WIS: monster.WIS_mod,
                CHA: monster.CHA_mod
            }
        };
        setCombatants([...combatants, newCombatant]);
        setIsDropdownOpen(false);
        setMonsterSearch('');
    };

    const addPlayerToCombat = () => {
        const newPlayer = {
            id: Date.now(),
            name: 'Jugador',
            type: 'player',
            initiative: ''
        };
        setCombatants([...combatants, newPlayer]);
    };

    const updateCombatant = (id, field, value) => {
        setCombatants(combatants.map(c => 
            c.id === id ? { ...c, [field]: value } : c
        ));
    };

    const adjustHp = (id, currentHp, amount) => {
        const newHp = Math.max(0, parseInt(currentHp || 0) + amount);
        updateCombatant(id, 'hp', newHp);
    };

    const removeCombatant = (id) => {
        setCombatants(combatants.filter(c => c.id !== id));
    };

    const sortInitiative = () => {
        const sorted = [...combatants].sort((a, b) => {
            const initA = parseInt(a.initiative) || 0;
            const initB = parseInt(b.initiative) || 0;
            return initB - initA;
        });
        setCombatants(sorted);
        setTurnIndex(0);
    };

    const nextTurn = () => {
        if (combatants.length === 0) return;
        setTurnIndex((turnIndex + 1) % combatants.length);
    };

    const prevTurn = () => {
        if (combatants.length === 0) return;
        setTurnIndex(turnIndex - 1 < 0 ? combatants.length - 1 : turnIndex - 1);
    };

    const rollCustomDice = () => {
        const rollGroup = (qty, type) => {
            const q = parseInt(qty || 0, 10);
            const t = parseInt(type, 10);
            let rolls = [];
            let sum = 0;
            if (q > 0 && t > 0) {
                for (let i = 0; i < q; i++) {
                    const r = Math.floor(Math.random() * t) + 1;
                    rolls.push(r);
                    sum += r;
                }
            }
            return { rolls, sum, text: q > 0 ? `${q}d${t}` : null };
        };

        const g1 = rollGroup(dice1Qty, dice1Type);
        const g2 = rollGroup(dice2Qty, dice2Type);
        const g3 = rollGroup(dice3Qty, dice3Type);
        const mod = parseInt(diceMod || 0, 10);

        const total = g1.sum + g2.sum + g3.sum + mod;

        let formulaParts = [];
        if (g1.text) formulaParts.push(g1.text);
        if (g2.text) formulaParts.push(g2.text);
        if (g3.text) formulaParts.push(g3.text);
        
        if (mod !== 0 || formulaParts.length === 0) {
            formulaParts.push(mod >= 0 ? `+${mod}` : `${mod}`);
        }

        setLastDiceResult({
            formula: formulaParts.join(' '),
            total,
            g1, g2, g3,
            mod
        });
    };

    const rollSavingThrow = (combatantId, ability) => {
        setCombatants(combatants.map(c => {
            if (c.id !== combatantId) return c;
            let modifier = 0;
            let source = "Base";

            if (c.savingThrowsText) {
                const regex = new RegExp(`${ability}\\s*([+\\-]\\d+)`, 'i');
                const match = c.savingThrowsText.match(regex);
                if (match) {
                    modifier = parseInt(match[1], 10);
                    source = "Proficiente";
                }
            }

            if (source === "Base" && c.abilityMods && c.abilityMods[ability]) {
                const modStr = String(c.abilityMods[ability]);
                const cleaned = modStr.replace(/[^0-9+-]/g, '');
                modifier = parseInt(cleaned, 10) || 0;
                source = "Mod. Base";
            }

            const d20 = Math.floor(Math.random() * 20) + 1;
            const total = d20 + modifier;

            return {
                ...c,
                lastRoll: { ability, d20, modifier, total, source }
            };
        }));
    };

    const toggleExpand = (id) => {
        setExpandedMonsters(prev => ({ ...prev, [id]: !prev[id] }));
    };

    return (
        <div className="flex flex-col gap-5">
            
            {/* CABECERA Y BOTONES DE ACCIÓN */}
            <div className="flex flex-col sm:flex-row justify-between items-center bg-[#323B46] p-4 rounded-xl border border-[#4E5D6F] shadow-sm gap-4">
                <h2 className="text-xl font-bold text-[#F1F5F9] flex items-center gap-2">
                    ⚔️ Rastreador de Combate e Iniciativa
                </h2>
                
                <div className="flex flex-wrap items-center gap-3">
                    <div className="relative">
                        <button 
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            className="bg-[#475569] hover:bg-[#64748B] text-[#F1F5F9] font-bold px-4 py-2 rounded-lg text-xs transition shadow-sm flex items-center gap-1.5 border border-[#4E5D6F]"
                        >
                            Añadir Monstruo ➕
                        </button>

                        {isDropdownOpen && (
                            <div className="absolute right-0 mt-2 w-72 bg-[#323B46] border border-[#4E5D6F] rounded-xl shadow-xl z-50 flex flex-col max-h-80 overflow-hidden">
                                <div className="p-2.5 border-b border-[#4E5D6F] bg-[#252B33]">
                                    <input 
                                        type="text" 
                                        placeholder="Buscar monstruo..." 
                                        value={monsterSearch} 
                                        onChange={(e) => setMonsterSearch(e.target.value)}
                                        className="w-full bg-[#3E4A59] text-xs border border-[#4E5D6F] rounded-lg p-2 text-[#F1F5F9] focus:outline-none focus:border-[#64748B]"
                                        autoFocus
                                    />
                                </div>
                                <div className="overflow-y-auto p-1.5 flex-1">
                                    {filteredMonsters.length === 0 ? (
                                        <div className="p-3 text-xs text-[#94A3B8] text-center italic">No se encontró el monstruo.</div>
                                    ) : (
                                        filteredMonsters.map((monster, idx) => (
                                            <div 
                                                key={idx} 
                                                onClick={() => addMonsterToCombat(monster)}
                                                className="px-3 py-2 text-xs font-semibold text-[#F1F5F9] hover:bg-[#3E4A59] cursor-pointer rounded-lg transition border-b border-[#3E4A59] last:border-0"
                                            >
                                                {monster.name} <span className="text-[10px] text-[#94A3B8] font-normal block">{monster.meta}</span>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>
                        )}
                    </div>

                    <button 
                        onClick={addPlayerToCombat}
                        className="bg-[#3E4A59] hover:bg-[#475569] text-[#F1F5F9] font-bold px-4 py-2 rounded-lg text-xs transition border border-[#4E5D6F] shadow-sm"
                    >
                        + Añadir Jugador
                    </button>

                    <button 
                        onClick={sortInitiative}
                        className="bg-[#475569] hover:bg-[#64748B] text-[#F1F5F9] font-bold px-4 py-2 rounded-lg text-xs transition shadow-sm border border-[#4E5D6F]"
                    >
                        ⇅ Ordenar Iniciativa
                    </button>
                </div>
            </div>

            {/* PANEL DE LANZADOR DE DADOS FLOTANTE (STICKY) */}
            <div className="sticky top-4 z-30 bg-[#323B46]/95 backdrop-blur-md p-3.5 rounded-xl border border-[#4E5D6F] shadow-md flex flex-col xl:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3 flex-wrap">
                    <span className="text-xs font-bold text-[#F1F5F9] uppercase tracking-wide">🎲 Lanzador Multidado:</span>
                    
                    {/* SET 1 */}
                    <div className="flex items-center gap-1 bg-[#3E4A59] px-2 py-1 rounded-lg border border-[#4E5D6F]">
                        <input type="number" min="0" max="20" value={dice1Qty} onChange={(e) => setDice1Qty(e.target.value)} className="w-10 bg-[#252B33] text-center text-xs font-bold rounded border border-[#4E5D6F] p-0.5 text-[#F1F5F9]" />
                        <select value={dice1Type} onChange={(e) => setDice1Type(e.target.value)} className="bg-[#252B33] text-[#F1F5F9] text-xs font-bold rounded border border-[#4E5D6F] p-0.5 focus:outline-none">
                            <option value="4">d4</option><option value="6">d6</option><option value="8">d8</option><option value="10">d10</option><option value="12">d12</option><option value="20">d20</option><option value="100">d100</option>
                        </select>
                    </div>

                    <span className="text-xs font-bold text-[#94A3B8]">+</span>

                    {/* SET 2 */}
                    <div className="flex items-center gap-1 bg-[#3E4A59] px-2 py-1 rounded-lg border border-[#4E5D6F]">
                        <input type="number" min="0" max="20" value={dice2Qty} onChange={(e) => setDice2Qty(e.target.value)} className="w-10 bg-[#252B33] text-center text-xs font-bold rounded border border-[#4E5D6F] p-0.5 text-[#F1F5F9]" />
                        <select value={dice2Type} onChange={(e) => setDice2Type(e.target.value)} className="bg-[#252B33] text-[#F1F5F9] text-xs font-bold rounded border border-[#4E5D6F] p-0.5 focus:outline-none">
                            <option value="4">d4</option><option value="6">d6</option><option value="8">d8</option><option value="10">d10</option><option value="12">d12</option><option value="20">d20</option><option value="100">d100</option>
                        </select>
                    </div>

                    <span className="text-xs font-bold text-[#94A3B8]">+</span>

                    {/* SET 3 */}
                    <div className="flex items-center gap-1 bg-[#3E4A59] px-2 py-1 rounded-lg border border-[#4E5D6F]">
                        <input type="number" min="0" max="20" value={dice3Qty} onChange={(e) => setDice3Qty(e.target.value)} className="w-10 bg-[#252B33] text-center text-xs font-bold rounded border border-[#4E5D6F] p-0.5 text-[#F1F5F9]" />
                        <select value={dice3Type} onChange={(e) => setDice3Type(e.target.value)} className="bg-[#252B33] text-[#F1F5F9] text-xs font-bold rounded border border-[#4E5D6F] p-0.5 focus:outline-none">
                            <option value="4">d4</option><option value="6">d6</option><option value="8">d8</option><option value="10">d10</option><option value="12">d12</option><option value="20">d20</option><option value="100">d100</option>
                        </select>
                    </div>

                    {/* MODIFICADOR GLOBAL */}
                    <div className="flex items-center gap-1">
                        <span className="text-[10px] text-[#94A3B8]">Mod:</span>
                        <input type="number" value={diceMod} onChange={(e) => setDiceMod(e.target.value)} className="w-14 bg-[#3E4A59] text-center text-xs font-bold rounded border border-[#4E5D6F] p-1 text-[#F1F5F9]" />
                    </div>

                    <button 
                        onClick={rollCustomDice}
                        className="bg-[#475569] hover:bg-[#64748B] text-[#F1F5F9] font-bold px-3 py-1.5 rounded-lg text-xs transition border border-[#4E5D6F] shadow-sm"
                    >
                        Lanzar 🚀
                    </button>
                </div>

                {lastDiceResult && (
                    <div className="bg-[#3E4A59] px-3.5 py-1.5 rounded-lg border border-[#4E5D6F] text-xs flex items-center gap-2 shadow-inner shrink-0">
                        <span className="font-bold text-[#94A3B8]">{lastDiceResult.formula}:</span>
                        <strong className="text-white text-sm bg-[#252B33] px-2.5 py-0.5 rounded border border-[#4E5D6F]">{lastDiceResult.total}</strong>
                    </div>
                )}
            </div>

            {/* BARRA DE CONTROL DE TURNOS */}
            <div className="flex justify-between items-center bg-[#323B46] p-3 rounded-xl border border-[#4E5D6F] text-sm shadow-sm">
                <button onClick={prevTurn} className="text-[#F1F5F9] hover:bg-[#3E4A59] font-semibold px-3 py-1 bg-[#3E4A59] rounded-lg border border-[#4E5D6F] text-xs transition">◀ Anterior</button>
                <span className="font-bold text-[#F1F5F9] uppercase tracking-wider text-xs">
                    {turnIndex >= 0 && combatants[turnIndex] ? `Turno Activo: ${combatants[turnIndex].name}` : 'Iniciativa no ordenada'}
                </span>
                <button onClick={nextTurn} className="text-[#F1F5F9] hover:bg-[#3E4A59] font-semibold px-3 py-1 bg-[#3E4A59] rounded-lg border border-[#4E5D6F] text-xs transition">Siguiente ▶</button>
            </div>

            {/* ZONA DE LISTA DE COMBATIENTES */}
            <div className="flex flex-col gap-2.5">
                {combatants.length === 0 ? (
                    <div className="text-center p-12 bg-[#323B46] border border-dashed border-[#4E5D6F] rounded-xl text-[#94A3B8] italic text-xs">
                        El campo de batalla está vacío. Añade monstruos desde el Bestiario o jugadores para comenzar.
                    </div>
                ) : (
                    combatants.map((c, i) => (
                        <div 
                            key={c.id} 
                            className={`flex flex-col gap-3 p-3.5 rounded-xl border transition-all ${
                                turnIndex === i 
                                    ? 'bg-[#323B46] border-[#64748B] shadow-md ring-1 ring-[#64748B]' 
                                    : 'bg-[#3E4A59]/80 border-[#4E5D6F] hover:bg-[#323B46]'
                            }`}
                        >
                            <div className="flex flex-col md:flex-row items-center justify-between gap-3">
                                <div className="flex items-center gap-3 w-full md:w-auto flex-1">
                                    <div className="flex flex-col items-center w-12">
                                        <span className="text-[9px] text-[#94A3B8] uppercase font-bold">Init</span>
                                        <input 
                                            type="number" 
                                            value={c.initiative} 
                                            onChange={(e) => updateCombatant(c.id, 'initiative', e.target.value)} 
                                            className="w-full bg-[#252B33] text-center text-sm font-bold rounded-lg border border-[#4E5D6F] focus:outline-none focus:border-[#64748B] p-1 text-[#F1F5F9]" 
                                        />
                                    </div>

                                    <div className="flex-1">
                                        <input 
                                            type="text" 
                                            value={c.name} 
                                            onChange={(e) => updateCombatant(c.id, 'name', e.target.value)} 
                                            className={`w-full bg-transparent font-bold focus:outline-none focus:border-b focus:border-[#64748B] text-sm ${c.type === 'player' ? 'text-[#93C5FD]' : 'text-[#F1F5F9]'}`} 
                                        />
                                        {c.meta && <span className="text-[10px] text-[#94A3B8] truncate block">{c.meta}</span>}
                                    </div>
                                </div>

                                {c.type === 'monster' ? (
                                    <div className="flex flex-wrap items-center gap-2 w-full md:w-auto justify-end">
                                        {/* AC */}
                                        <div className="flex flex-col items-center w-12">
                                            <span className="text-[9px] text-[#94A3B8] uppercase font-bold">AC</span>
                                            <input 
                                                type="number" 
                                                value={c.ac} 
                                                onChange={(e) => updateCombatant(c.id, 'ac', e.target.value)} 
                                                className="w-full bg-[#252B33] text-center text-sm rounded-lg border border-[#4E5D6F] focus:outline-none p-1 text-[#F1F5F9]" 
                                            />
                                        </div>

                                        {/* HP Control Ampliado (Ancho w-14 para que no se corte 225) */}
                                        <div className="flex items-center gap-1 bg-[#323B46] px-2 py-1 rounded-xl border border-[#4E5D6F] shadow-sm">
                                            <span className="text-[9px] text-[#94A3B8] uppercase font-bold mr-0.5">HP</span>
                                            
                                            <div className="flex items-center gap-0.5">
                                                <button onClick={() => adjustHp(c.id, c.hp, -10)} className="px-1.5 py-0.5 bg-[#475569] hover:bg-[#64748B] text-[#F1F5F9] rounded text-[10px] font-bold transition" title="Restar 10 HP">-10</button>
                                                <button onClick={() => adjustHp(c.id, c.hp, -5)} className="px-1.5 py-0.5 bg-[#475569] hover:bg-[#64748B] text-[#F1F5F9] rounded text-[10px] font-bold transition" title="Restar 5 HP">-5</button>
                                                <button onClick={() => adjustHp(c.id, c.hp, -1)} className="px-1.5 py-0.5 bg-[#475569] hover:bg-[#64748B] text-[#F1F5F9] rounded text-[10px] font-bold transition" title="Restar 1 HP">-1</button>
                                            </div>

                                            <input 
                                                type="number" 
                                                value={c.hp} 
                                                onChange={(e) => updateCombatant(c.id, 'hp', e.target.value)} 
                                                className="w-14 bg-transparent text-center font-bold text-xs focus:outline-none text-[#F1F5F9]" 
                                            />
                                            <span className="text-[#94A3B8] text-xs">/</span>
                                            <input 
                                                type="number" 
                                                value={c.maxHp} 
                                                onChange={(e) => updateCombatant(c.id, 'maxHp', e.target.value)} 
                                                className="w-14 bg-transparent text-center text-[#94A3B8] text-xs focus:outline-none" 
                                            />

                                            <div className="flex items-center gap-0.5">
                                                <button onClick={() => adjustHp(c.id, c.hp, 1)} className="px-1.5 py-0.5 bg-[#475569] hover:bg-[#64748B] text-[#F1F5F9] rounded text-[10px] font-bold transition" title="Curar 1 HP">+1</button>
                                                <button onClick={() => adjustHp(c.id, c.hp, 5)} className="px-1.5 py-0.5 bg-[#475569] hover:bg-[#64748B] text-[#F1F5F9] rounded text-[10px] font-bold transition" title="Curar 5 HP">+5</button>
                                                <button onClick={() => adjustHp(c.id, c.hp, 10)} className="px-1.5 py-0.5 bg-[#475569] hover:bg-[#64748B] text-[#F1F5F9] rounded text-[10px] font-bold transition" title="Curar 10 HP">+10</button>
                                            </div>
                                        </div>

                                        {/* Módulo de Tirada de Salvación */}
                                        <div className="flex items-center gap-1.5 bg-[#323B46] px-2.5 py-1 rounded-xl border border-[#4E5D6F] shadow-sm">
                                            <select 
                                                id={`save-select-${c.id}`}
                                                className="bg-[#252B33] text-[#F1F5F9] rounded p-1 text-[11px] font-bold border border-[#4E5D6F] focus:outline-none"
                                                defaultValue="DEX"
                                            >
                                                <option value="STR">FUE</option>
                                                <option value="DEX">DES</option>
                                                <option value="CON">CON</option>
                                                <option value="INT">INT</option>
                                                <option value="WIS">SAB</option>
                                                <option value="CHA">CAR</option>
                                            </select>
                                            <button 
                                                onClick={() => {
                                                    const selectEl = document.getElementById(`save-select-${c.id}`);
                                                    rollSavingThrow(c.id, selectEl.value);
                                                }}
                                                className="bg-[#475569] hover:bg-[#64748B] text-[#F1F5F9] px-2.5 py-1 rounded-lg text-xs font-bold transition shadow-sm border border-[#4E5D6F]"
                                            >
                                                🎲 Tirar
                                            </button>
                                            {c.lastRoll && (
                                                <span className="text-[11px] font-bold text-[#F1F5F9] bg-[#252B33] px-2 py-0.5 rounded-lg border border-[#4E5D6F]">
                                                    {c.lastRoll.ability}: <strong className="text-white underline">{c.lastRoll.total}</strong> <span className="text-[9px] text-[#94A3B8]">({c.lastRoll.d20}{c.lastRoll.modifier >= 0 ? '+' : ''}{c.lastRoll.modifier})</span>
                                                </span>
                                            )}
                                        </div>

                                        {/* Botón para expandir Acciones */}
                                        <button 
                                            onClick={() => toggleExpand(c.id)}
                                            className="bg-[#3E4A59] hover:bg-[#475569] text-[#F1F5F9] px-3 py-1.5 rounded-lg text-xs font-bold transition border border-[#4E5D6F] shadow-sm"
                                        >
                                            {expandedMonsters[c.id] ? '🔼 Ocultar Ficha' : '📖 Ver Acciones e Inmunidades'}
                                        </button>
                                    </div>
                                ) : (
                                    <div className="text-[11px] text-[#94A3B8] italic px-3 py-1 bg-[#323B46] rounded-lg border border-[#4E5D6F] shadow-sm">
                                        Jugador (Autogestionado)
                                    </div>
                                )}

                                <button 
                                    onClick={() => removeCombatant(c.id)} 
                                    className="text-[#94A3B8] hover:text-red-400 font-bold px-2 text-base transition self-center"
                                    title="Eliminar del combate"
                                >
                                    &times;
                                </button>
                            </div>

                            {c.type === 'monster' && expandedMonsters[c.id] && (
                                <div className="bg-[#252B33] p-4 rounded-xl border border-[#4E5D6F] shadow-inner flex flex-col gap-3 text-xs text-[#CBD5E1]">
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pb-2 border-b border-[#4E5D6F]">
                                        <div><strong className="text-[#F1F5F9]">Resistencias:</strong> {c.resistances || 'Ninguna'}</div>
                                        <div><strong className="text-[#F1F5F9]">Inm. Daño:</strong> {c.damageImmunities || 'Ninguna'}</div>
                                        <div><strong className="text-[#F1F5F9]">Inm. Condiciones:</strong> {c.conditionImmunities || 'Ninguna'}</div>
                                    </div>

                                    {c.actions && (
                                        <div>
                                            <h4 className="font-bold text-[#F1F5F9] uppercase mb-1 tracking-wider">Acciones del Monstruo:</h4>
                                            <div className="space-y-1.5 leading-relaxed text-[#CBD5E1]" dangerouslySetInnerHTML={{ __html: c.actions }} />
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};