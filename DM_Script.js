// ==========================================
// APLICACIÓN PRINCIPAL DM (DM_Script.js)
// ==========================================
const { useState } = React;

const DungeonMasterApp = () => {
    const [activeTab, setActiveTab] = useState('combat');
    const [combatants, setCombatants] = useState([]);
    const [turnIndex, setTurnIndex] = useState(-1);

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
            meta: monster.meta
        };
        setCombatants(prev => [...prev, newCombatant]);
        setActiveTab('combat');
    };

    return (
        <div className="min-h-screen bg-[#252B33] p-4 md:p-6 font-sans text-[#F1F5F9]">
            <div className="w-full max-w-[1600px] mx-auto flex flex-col gap-5">
                
                {/* BARRA SUPERIOR Y NAVEGACIÓN */}
                <div className="flex flex-col xl:flex-row justify-between items-center bg-[#323B46] p-4 rounded-xl shadow-sm border border-[#4E5D6F] gap-4">
                    <button 
                        onClick={() => window.location.href = 'index.html'}
                        className="bg-[#252B33] hover:bg-[#3E4A59] text-[#F1F5F9] font-semibold px-4 py-2 rounded-lg shadow-sm transition flex items-center gap-2 border border-[#4E5D6F] text-xs"
                    >
                        🛡️ Modo Jugador
                    </button>

                    <h1 className="text-lg font-bold text-[#F1F5F9] tracking-wide uppercase text-center">
                        🐉 Panel de Control del Dungeon Master
                    </h1>

                    <div className="flex flex-wrap gap-1.5 bg-[#252B33] p-1 rounded-xl border border-[#4E5D6F] shadow-inner">
                        <button 
                            onClick={() => setActiveTab('combat')}
                            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${activeTab === 'combat' ? 'bg-[#323B46] text-[#F1F5F9] shadow-sm font-bold border border-[#4E5D6F]' : 'text-[#94A3B8] hover:text-[#F1F5F9]'}`}
                        >
                            ⚔️ Combate ({combatants.length})
                        </button>
                        <button 
                            onClick={() => setActiveTab('bestiary')}
                            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${activeTab === 'bestiary' ? 'bg-[#323B46] text-[#F1F5F9] shadow-sm font-bold border border-[#4E5D6F]' : 'text-[#94A3B8] hover:text-[#F1F5F9]'}`}
                        >
                            📖 Bestiario
                        </button>
                        <button 
                            onClick={() => setActiveTab('shop')}
                            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${activeTab === 'shop' ? 'bg-[#323B46] text-[#F1F5F9] shadow-sm font-bold border border-[#4E5D6F]' : 'text-[#94A3B8] hover:text-[#F1F5F9]'}`}
                        >
                            🛒 Tienda
                        </button>
                    </div>
                </div>

                {/* CONTENIDO DE PESTAÑAS */}
                {activeTab === 'combat' && (
                    <DM_CombateTab 
                        combatants={combatants} 
                        setCombatants={setCombatants} 
                        turnIndex={turnIndex} 
                        setTurnIndex={setTurnIndex} 
                    />
                )}
                {activeTab === 'bestiary' && (
                    <DM_BeastTab 
                        addMonsterToCombat={addMonsterToCombat} 
                    />
                )}
                {activeTab === 'shop' && (
                    <DM_ShopTab />
                )}
            </div>
        </div>
    );
};

ReactDOM.render(<DungeonMasterApp />, document.getElementById('root'));