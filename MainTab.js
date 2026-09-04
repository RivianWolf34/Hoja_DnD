// 1. Pegamos los Iconos que usa solo esta pestaña para que no marque error de "undefined"
const ShieldIcon = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>);
const HeartIcon = ({ className, size = 24 }) => (<svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>);
const ZapIcon = ({ className, size = 24 }) => (<svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>);
const SwordIcon = ({ className, size = 24 }) => (<svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="14.5 17.5 3 6 3 3 6 3 17.5 14.5"/><line x1="13" x2="19" y1="19" y2="13"/><line x1="16" x2="20" y1="16" y2="20"/><line x1="19" x2="21" y1="21" y2="19"/></svg>);
const CrosshairIcon = ({ className, size = 24 }) => (<svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"/><line x1="22" x2="18" y1="12" y2="12"/><line x1="6" x2="2" y1="12" y2="12"/><line x1="12" x2="12" y1="6" y2="2"/><line x1="12" x2="12" y1="22" y2="18"/></svg>);

// 2. Definimos el componente y le pedimos al script principal que nos mande todas estas herramientas
const MainTab = ({ 
    abilities, effectiveAbilities, mods, profBonus, proficiencies, 
    toggleProficiency, combat, handleCombatChange, adjustHP, 
    toggleDeathSave, activeConditions, toggleCondition, spellSlots, 
    toggleSpellSlot, computedAC, stealthDisadvantage, isArmorPenalized, 
    computedAttacks, racialAttacksUI, texts, handleTextChange, 
    rollAbilityCheck, rollWeaponAttack, rollWeaponDamage, rollPoisonDamage, 
    removeWeaponPoison, handleQuantityChange, handleAbilityChange, info,
    formatMod, currentRace, conditionsList, activeCustomResistances 
}) => {
    
    // Aquí adentro va todo el código exacto de la pestaña "Hoja Principal"
    return (
        <div className="flex flex-col gap-6">
            {/* --- BLOQUE 1: CARACTERÍSTICAS --- */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
                {[
                    { id: 'str', name: 'FUERZA' }, { id: 'dex', name: 'DESTREZA' },
                    { id: 'con', name: 'CONSTITUCIÓN' }, { id: 'int', name: 'INTELIGENCIA' },
                    { id: 'wis', name: 'SABIDURÍA' }, { id: 'cha', name: 'CARISMA' }
                ].map(stat => (
                    <div key={stat.id} className="border-2 border-neutral-300 rounded-lg p-2 text-center bg-neutral-50 relative pb-5 shadow-sm">
                        <button onClick={() => rollAbilityCheck(`Característica: ${stat.name}`, mods[stat.id], stat.id)} className="absolute top-1 right-1 text-neutral-300 hover:text-red-700 transition" title="Tirar"><ZapIcon size={12} /></button>
                        <div className="text-[10px] font-bold text-neutral-600 mb-0.5">{stat.name}</div>
                        <div className="text-xl font-bold">{formatMod(mods[stat.id])}</div>
                        <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 flex items-center bg-white border border-neutral-300 rounded-full h-6 px-1.5 shadow-sm min-w-[4.2rem] justify-center">
                            <input type="number" value={abilities[stat.id]} onChange={(e) => handleAbilityChange(stat.id, e.target.value)} className="w-9 text-center text-sm font-semibold focus:outline-none bg-transparent" title="Puntuación Base (Sin Raza)" />
                            {currentRace.bonuses[stat.id] > 0 && (
                                <span className="text-[10px] font-bold text-green-600 border-l border-neutral-200 pl-1 ml-0.5" title="Bono Racial">+{currentRace.bonuses[stat.id]}</span>
                            )}
                        </div>
                        <div className="absolute -bottom-7 text-[9px] text-neutral-400 font-bold w-full text-center">Total: {effectiveAbilities[stat.id]}</div>
                    </div>
                ))}
            </div>

            {/* --- BLOQUE 2: COLUMNAS PRINCIPALES --- */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-3">
                
                {/* Columna Izquierda */}
                <div className="flex flex-col gap-4">
                    <div className="flex gap-4">
                        <div className="flex-1 flex flex-col gap-4">
                            <div className="flex items-center gap-2 border-2 border-neutral-300 p-2 rounded-lg bg-neutral-50">
                                <div className="w-10 h-10 border border-neutral-400 rounded-full flex items-center justify-center font-bold text-lg">+{profBonus}</div>
                                <div className="text-sm font-bold uppercase text-neutral-600">Bono Competencia</div>
                            </div>
                            <div className="border-2 border-neutral-300 p-3 rounded-lg bg-neutral-50">
                                <div className="text-xs font-bold text-neutral-600 uppercase mb-2 text-center">Tiradas de Salvación</div>
                                {['str', 'dex', 'con', 'int', 'wis', 'cha'].map(stat => {
                                    const isProf = proficiencies.saves[stat];
                                    const total = mods[stat] + (isProf ? profBonus : 0);
                                    return (
                                        <div key={stat} className="flex items-center justify-between my-1 hover:bg-neutral-200 p-1 rounded transition group">
                                            <div className="flex items-center gap-2">
                                                <input type="checkbox" checked={isProf} onChange={() => toggleProficiency('saves', stat)} className="accent-red-700 w-4 h-4 cursor-pointer" />
                                                <span className="w-6 text-right font-bold border-b border-neutral-300 text-sm">{formatMod(total)}</span>
                                                <span className="text-sm capitalize">{statNamesTranslated[stat]}</span>
                                            </div>
                                            <button onClick={() => rollAbilityCheck(`Salvación: ${statNamesTranslated[stat]}`, total, stat)} className="text-neutral-300 hover:text-red-700 transition" title="Tirar"><ZapIcon size={14} /></button>
                                        </div>
                                    );
                                })}
                            </div>
                            <div className="border-2 border-neutral-300 p-3 rounded-lg bg-neutral-50">
                                <div className="text-xs font-bold text-neutral-600 uppercase mb-2 text-center">Habilidades</div>
                                {skillList.map(skill => {
                                    const isProf = proficiencies.skills[skill.id];
                                    const total = mods[skill.stat] + (isProf ? profBonus : 0);
                                    return (
                                        <div key={skill.id} className="flex items-center justify-between my-0.5 hover:bg-neutral-200 p-1 rounded transition group">
                                            <div className="flex items-center gap-2">
                                                <input type="checkbox" checked={isProf} onChange={() => toggleProficiency('skills', skill.id)} className="accent-red-700 w-4 h-4 cursor-pointer" />
                                                <span className="w-6 text-right font-bold border-b border-neutral-300 text-sm">{formatMod(total)}</span>
                                                <span className="text-sm truncate w-36 sm:w-40" title={skill.name}>
                                                    {skill.name} <span className="text-[10px] text-neutral-500 font-normal">({statNamesTranslated[skill.stat].substring(0,3).toUpperCase()})</span> {skill.id === 'stealth' && stealthDisadvantage && <span className="text-[9px] text-red-600 font-bold ml-1">(DESV)</span>}
                                                </span>
                                            </div>
                                            <button onClick={() => rollAbilityCheck(`Habilidad: ${skill.name}`, total, skill.stat)} className="text-neutral-300 hover:text-red-700 transition" title="Tirar"><ZapIcon size={14} /></button>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 border-2 border-neutral-300 p-2 rounded-lg bg-neutral-50 mt-auto">
                        <div className="w-10 h-10 border border-neutral-400 rounded flex items-center justify-center font-bold text-lg">
                            {10 + mods.wis + (proficiencies.skills.perception ? profBonus : 0)}
                        </div>
                        <div className="text-sm font-bold uppercase text-neutral-600 leading-tight">Percepción Pasiva</div>
                    </div>
                </div>

                {/* Columna Derecha */}
                <div className="flex flex-col gap-4">
                    <div className="grid grid-cols-3 gap-2">
                        <div className="border-2 border-neutral-300 rounded-lg p-2 flex flex-col items-center justify-center bg-neutral-50 relative">
                            <ShieldIcon className="absolute text-neutral-200 w-16 h-16 opacity-50 z-0" />
                            <div className="text-2xl font-bold z-10 text-neutral-800">{computedAC}</div>
                            <div className="flex items-center gap-1 z-10 mt-1">
                                <span className="text-[9px] font-bold text-neutral-600">CA +</span>
                                <input type="number" name="acBonus" value={combat.acBonus} onChange={handleCombatChange} className="w-6 text-[10px] text-center border-b border-neutral-400 bg-transparent focus:outline-none" placeholder="0" title="Bono extra (ej. Escudo de fe)" />
                            </div>
                        </div>
                        <div className="border-2 border-neutral-300 rounded-lg p-2 flex flex-col items-center justify-center bg-neutral-50 relative group">
                            <button onClick={() => rollAbilityCheck(`Iniciativa`, mods.dex, 'dex')} className="absolute top-1 right-1 text-neutral-300 hover:text-red-700 transition"><ZapIcon size={14}/></button>
                            <div className="text-2xl font-bold z-10">{formatMod(mods.dex)}</div>
                            <span className="text-xs font-bold text-neutral-600 mt-1 z-10">INICIATIVA</span>
                        </div>
                        <div className="border-2 border-neutral-300 rounded-lg p-2 flex flex-col items-center justify-center bg-neutral-50">
                            <input type="number" name="speed" value={combat.speed} onChange={handleCombatChange} className="w-12 text-2xl font-bold text-center bg-transparent focus:outline-none text-green-800" title="Actualizado por Raza" />
                            <span className="text-xs font-bold text-neutral-600 mt-1">VELOCIDAD</span>
                        </div>
                    </div>

                    <div className="border-2 border-neutral-300 rounded-lg p-3 bg-neutral-50 flex flex-col gap-2">
                        <div className="flex justify-between items-center text-sm font-bold text-neutral-600">
                            <span>PUNTOS DE GOLPE MÁXIMOS</span>
                            <input type="number" name="hpMax" value={combat.hpMax} onChange={handleCombatChange} className="w-16 border-b text-right bg-transparent focus:outline-none text-black" />
                        </div>
                        <div className="flex items-center justify-center gap-4 py-2">
                            <button onClick={() => adjustHP(-1)} className="p-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-full transition"><ZapIcon size={16} /></button>
                            <input type="number" name="hpCurrent" value={combat.hpCurrent} onChange={handleCombatChange} className="w-20 text-4xl font-bold text-center bg-transparent focus:outline-none" />
                            <button onClick={() => adjustHP(1)} className="p-2 bg-green-100 hover:bg-green-200 text-green-700 rounded-full transition"><HeartIcon size={16} /></button>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                        <div className="border-2 border-neutral-300 rounded-lg p-2 bg-neutral-50 flex flex-col justify-between">
                            <div className="text-xs text-neutral-500 flex gap-2"><span>Nivel</span><input type="text" value={info.level} readOnly className="w-8 border-b bg-transparent" /></div>
                            <input type="text" name="hitDice" value={combat.hitDice} onChange={handleCombatChange} className="w-full text-xl font-bold text-center bg-transparent focus:outline-none mt-1" />
                            <div className="text-center text-[10px] font-bold text-neutral-600">DADOS DE GOLPE</div>
                        </div>
                        <div className="border-2 border-neutral-300 rounded-lg p-2 bg-neutral-50 flex flex-col justify-between items-center">
                            <div className="w-full flex flex-col gap-1">
                                <div className="flex items-center justify-between px-1"><span className="text-[10px] font-bold text-neutral-500">Éxitos</span><div className="flex gap-1">{[0,1,2].map(i => <input key={`succ-${i}`} type="checkbox" checked={combat.deathSaves.successes[i]} onChange={() => toggleDeathSave('successes', i)} className="accent-neutral-700 w-3 h-3" />)}</div></div>
                                <div className="flex items-center justify-between px-1"><span className="text-[10px] font-bold text-neutral-500">Fallos</span><div className="flex gap-1">{[0,1,2].map(i => <input key={`fail-${i}`} type="checkbox" checked={combat.deathSaves.failures[i]} onChange={() => toggleDeathSave('failures', i)} className="accent-red-700 w-3 h-3" />)}</div></div>
                            </div>
                            <div className="text-center text-[10px] font-bold text-neutral-600 mt-1">SALV. DE MUERTE</div>
                        </div>
                    </div>

                    <div className="border-2 border-neutral-300 rounded-lg p-3 bg-neutral-50 flex flex-col">
                        <div className="font-bold text-neutral-700 mb-2 border-b-2 border-neutral-200 pb-1 text-xs">CONDICIONES Y EFECTOS ACTIVOS</div>
                        <div className="flex flex-wrap gap-1">
                            {conditionsList.map(cond => (
                                <button key={cond} onClick={() => toggleCondition(cond)} 
                                    className={`text-xs px-2.5 py-1 rounded-full font-bold border transition ${activeConditions.includes(cond) ? 'bg-red-600 text-white border-red-800 shadow-inner' : 'bg-white text-neutral-500 border-neutral-300 hover:bg-neutral-200'}`}>
                                    {cond}
                                </button>
                            ))}
                        </div>

                        {/* --- SECCIÓN DE CONDICIONES Y RESISTENCIAS ACTIVAS --- */}
                        <div className="flex flex-wrap gap-2 items-center my-3">
                            {activeConditions.map((cond, i) => (
                                <span key={i} className="bg-red-100 text-red-800 text-xs font-black px-2.5 py-1 rounded-full border border-red-300 shadow-sm">
                                    {cond}
                                </span>
                            ))}
    
                        {/* ✨ RESISTENCIAS ACTIVAS POR EQUIPO MÁGICO */}
                            {activeCustomResistances.map((res, i) => (
                                <span key={`res-${i}`} className="bg-blue-100 text-blue-900 text-xs font-black px-2.5 py-1 rounded-full border border-blue-300 shadow-sm" title={`Otorgado por: ${res.name}`}>
                        🛡️ Resistencia: {res.resistance}
                                </span>
                            ))}
                        </div>
                    </div>













    
                    <div className="border-2 border-neutral-300 rounded-lg p-3 bg-neutral-50 flex flex-col">
                        <div className="flex items-center gap-2 font-bold text-neutral-700 mb-2 border-b-2 border-neutral-200 pb-1 text-xs"><SwordIcon size={18} /> ATAQUES Y CONJUROS</div>
                        
                        {isArmorPenalized && (
                            <div className="bg-red-100 border border-red-400 p-2 rounded mb-3 text-xs text-red-900 font-bold shadow-sm flex flex-col gap-1">
                                <span className="flex items-center gap-1">⚠️ PENALIZACIÓN POR ARMADURA</span>
                                <span className="font-normal">Llevas armadura o escudo sin competencia. Tienes <strong className="text-red-950">Desventaja</strong> en tiradas de Fuerza y Destreza. 
                                {["Bardo", "Brujo", "Clérigo", "Druida", "Explorador", "Paladín", "Hechicero", "Mago"].includes(info.classLevel) && (
                                    <strong className="block mt-1">❌ TU MAGIA ESTÁ BLOQUEADA (No puedes lanzar conjuros).</strong>
                                )}</span>
                            </div>
                        )}

                        <div className="mb-3 flex flex-col gap-2">
                            {racialAttacksUI}
                            {computedAttacks.map((atk, i) => (
                                <div key={`atk-${i}`} className="flex flex-col bg-white p-3 border border-neutral-200 rounded-lg shadow-sm text-sm gap-2">
                                    <div className="flex justify-between items-start font-bold">
                                        <div className="flex flex-col">
                                            <span className="text-neutral-900 text-base flex items-center gap-2 flex-wrap">
                                                {atk.name}
                                                {atk.poisoned && (
                                                    <span className="inline-flex items-center gap-1.5 text-xs bg-green-50 text-green-800 border border-green-300 px-2.5 py-0.5 rounded-full font-bold shadow-sm">
                                                        <span>🧪 Veneno</span>
                                                        <button onClick={() => rollPoisonDamage(atk.id, atk.name, atk.poisonDamage)} className="hover:bg-green-100 px-1.5 py-0.5 rounded flex items-center gap-1 transition cursor-pointer text-green-900" title="Tirar daño de veneno y consumir carga">
                                                            ({atk.poisonDamage}) 🎲
                                                        </button>
                                                        <button onClick={() => removeWeaponPoison(atk.id)} className="hover:bg-red-100 hover:text-red-800 text-green-900 font-black px-1.5 py-0.5 rounded transition cursor-pointer" title="Quitar veneno">
                                                            &times;
                                                        </button>
                                                    </span>
                                                )}
                                            </span>
                                            {atk.ammoType && (
                                                <span className={`text-[10px] mt-1 font-semibold flex items-center gap-1 ${atk.hasAmmo ? 'text-neutral-500' : 'text-red-600'}`}>
                                                    <CrosshairIcon size={12} /> Requiere: {atk.ammoType} (Quedan: {atk.ammoCount})
                                                </span>
                                            )}
                                        </div>
                                        <span className="text-red-700 font-extrabold text-base">Atq: {atk.toHit}</span>
                                    </div>
                                    <div className="text-xs text-neutral-400 italic">Cálculo: {atk.breakdown}</div>
                                    <div className="flex gap-1.5 mt-1 pt-1.5 border-t border-neutral-100 flex-wrap">
                                        <button 
                                            onClick={() => {
                                                if (atk.ammoType) {
                                                    if (!atk.hasAmmo) return;
                                                    if (atk.ammoItemId) handleQuantityChange(atk.ammoItemId, -1);
                                                }
                                                rollWeaponAttack(atk.name, atk.toHitNum, atk.statId, atk.ammoType);
                                            }} 
                                            disabled={atk.ammoType && !atk.hasAmmo}
                                            className={`flex-1 ${atk.ammoType && !atk.hasAmmo ? 'bg-neutral-300 text-neutral-400 border-neutral-400 cursor-not-allowed' : 'bg-red-800 hover:bg-red-700 text-white border-red-950 active:translate-y-[2px] active:border-b-0'} font-bold py-2 px-3 rounded text-sm transition shadow-md border-b-2 flex justify-center gap-1 min-w-[90px]`}
                                        >
                                            ⚔️ Atq ({atk.toHit})
                                        </button>
                                        <button onClick={() => rollWeaponDamage(atk.name, atk.baseDamageDice, atk.statMod)} className="flex-1 bg-neutral-800 hover:bg-neutral-700 text-white font-bold py-2 px-3 rounded text-sm transition shadow-md border-b-2 border-black flex justify-center gap-1 min-w-[90px] active:border-b-0 active:translate-y-[2px]">💥 Daño ({atk.damage})</button>
                                    </div>
                                    {atk.isThrown && !atk.isTwoHandedGrip && (
                                        <div className="flex gap-1.5 mt-1 pt-1 border-t border-neutral-100 border-dashed flex-wrap">
                                            <button onClick={() => rollWeaponAttack(`${atk.name} (Lanzada)`, atk.toHitNum, atk.statId)} className="flex-1 bg-blue-800 hover:bg-blue-700 text-white font-bold py-2 px-3 rounded text-sm transition shadow-sm flex justify-center gap-1 min-w-[100px]">🎯 Lanzar ({atk.toHit})</button>
                                            <button onClick={() => rollWeaponDamage(`${atk.name} (Lanzada)`, atk.baseDamageDice, atk.statMod)} className="flex-1 bg-slate-700 hover:bg-slate-600 text-white font-bold py-2 px-3 rounded text-sm transition shadow-sm flex justify-center gap-1 min-w-[100px]">💥 Daño Lanzado</button>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                        <textarea name="attacks" value={texts.attacks} onChange={handleTextChange} className="w-full flex-1 bg-transparent resize-none focus:outline-none text-sm leading-relaxed" placeholder="Anotaciones extra (conjuros, trucos)..."></textarea>
                    </div>
                </div>
            </div>
        </div>
    );
};