// ==========================================
// PESTAÑA DE BESTIARIO (DM_BeastTab.js)
// ==========================================
const { useState } = React;

const DM_BeastTab = ({ addMonsterToCombat }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedMonster, setSelectedMonster] = useState(null);
    const [isImageModalOpen, setIsImageModalOpen] = useState(false);

    const filteredMonsters = typeof DM_DataMonster !== 'undefined' 
        ? DM_DataMonster.filter(m => m.name.toLowerCase().includes(searchTerm.toLowerCase()))
        : [];

    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            {/* Lista Izquierda */}
            <div className="lg:col-span-5 bg-[#323B46] rounded-xl p-4 shadow-sm border border-[#4E5D6F] flex flex-col h-[75vh]">
                <h2 className="text-xs font-bold text-[#94A3B8] mb-3 border-b border-[#4E5D6F] pb-2 uppercase tracking-wider">Librería de Monstruos</h2>
                <input 
                    type="text"
                    placeholder="Buscar en el bestiario..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-[#252B33] border border-[#4E5D6F] rounded-lg p-2.5 text-xs text-[#F1F5F9] focus:outline-none focus:border-[#64748B] mb-3 shadow-inner"
                />
                <div className="flex-1 overflow-y-auto pr-2 flex flex-col gap-2">
                    {filteredMonsters.map((monster, idx) => (
                        <div 
                            key={idx} 
                            onClick={() => { setSelectedMonster(monster); setIsImageModalOpen(false); }}
                            className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center gap-3 ${
                                selectedMonster?.name === monster.name 
                                    ? 'bg-[#3E4A59] border-[#64748B] shadow-sm' 
                                    : 'bg-[#252B33]/80 border-[#4E5D6F] hover:bg-[#323B46]'
                            }`}
                        >
                            {monster.img_url && (
                                <img src={monster.img_url} alt="" className="w-20 h-20 object-cover rounded-lg border border-[#4E5D6F] shrink-0" />
                            )}
                            <div className="flex-1 min-w-0">
                                <h3 className="font-semibold text-[#F1F5F9] text-sm truncate">{monster.name}</h3>
                                <p className="text-[10px] text-[#94A3B8] italic truncate">{monster.meta}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Visor Derecho del Monstruo */}
            <div className="lg:col-span-7 bg-[#323B46] rounded-xl p-5 shadow-sm border border-[#4E5D6F] flex flex-col h-[75vh] overflow-y-auto">
                {!selectedMonster ? (
                    <div className="flex items-center justify-center h-full text-[#94A3B8] italic text-xs">
                        Selecciona un monstruo de la lista izquierda para ver sus estadísticas completas.
                    </div>
                ) : (
                    <div className="flex flex-col gap-4">
                        <div className="border-b border-[#4E5D6F] pb-3 flex justify-between items-start gap-4">
                            <div className="flex items-center gap-4">
                                {selectedMonster.img_url && (
                                    <img 
                                        src={selectedMonster.img_url} 
                                        alt={selectedMonster.name} 
                                        onClick={() => setIsImageModalOpen(true)}
                                        className="w-32 h-32 object-cover rounded-xl border-2 border-[#4E5D6F] shadow-sm shrink-0 cursor-pointer hover:opacity-90 hover:scale-[1.02] transition"
                                        title="Haz clic para ampliar la imagen"
                                    />
                                )}
                                <div>
                                    <h2 className="text-xl font-bold text-[#F1F5F9]">{selectedMonster.name}</h2>
                                    <p className="text-xs italic text-[#94A3B8]">{selectedMonster.meta}</p>
                                    {selectedMonster.img_url && (
                                        <span className="text-[10px] text-[#94A3B8] block mt-1 underline cursor-pointer" onClick={() => setIsImageModalOpen(true)}>
                                            🔍 Clic en la imagen para ampliar
                                        </span>
                                    )}
                                </div>
                            </div>
                            <button 
                                onClick={() => addMonsterToCombat(selectedMonster)}
                                className="bg-[#475569] hover:bg-[#64748B] text-[#F1F5F9] px-4 py-2 rounded-lg text-xs font-bold transition shadow-sm shrink-0 border border-[#4E5D6F]"
                            >
                                ⚔️ Añadir al Combate
                            </button>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-semibold text-[#F1F5F9] bg-[#252B33] p-3 rounded-xl border border-[#4E5D6F] shadow-inner">
                            <div><span className="text-[#94A3B8]">AC:</span> {selectedMonster["Armor Class"]}</div>
                            <div><span className="text-[#94A3B8]">HP:</span> {selectedMonster["Hit Points"]}</div>
                            <div><span className="text-[#94A3B8]">Vel:</span> {selectedMonster["Speed"]}</div>
                            <div><span className="text-[#94A3B8]">CR:</span> {selectedMonster["Challenge"]}</div>
                        </div>

                        <div className="flex justify-between bg-[#252B33] rounded-xl p-3 text-center text-xs border border-[#4E5D6F] font-semibold text-[#F1F5F9] shadow-inner">
                            <div><span className="block text-[#94A3B8] text-[9px] uppercase font-bold">STR</span>{selectedMonster.STR} {selectedMonster.STR_mod}</div>
                            <div><span className="block text-[#94A3B8] text-[9px] uppercase font-bold">DEX</span>{selectedMonster.DEX} {selectedMonster.DEX_mod}</div>
                            <div><span className="block text-[#94A3B8] text-[9px] uppercase font-bold">CON</span>{selectedMonster.CON} {selectedMonster.CON_mod}</div>
                            <div><span className="block text-[#94A3B8] text-[9px] uppercase font-bold">INT</span>{selectedMonster.INT} {selectedMonster.INT_mod}</div>
                            <div><span className="block text-[#94A3B8] text-[9px] uppercase font-bold">WIS</span>{selectedMonster.WIS} {selectedMonster.WIS_mod}</div>
                            <div><span className="block text-[#94A3B8] text-[9px] uppercase font-bold">CHA</span>{selectedMonster.CHA} {selectedMonster.CHA_mod}</div>
                        </div>

                        <div className="text-xs text-[#CBD5E1] flex flex-col gap-1 bg-[#252B33]/50 p-3 rounded-xl border border-[#4E5D6F]">
                            {selectedMonster["Saving Throws"] && <p><strong className="text-[#F1F5F9]">Salvaciones:</strong> {selectedMonster["Saving Throws"]}</p>}
                            {selectedMonster.Skills && <p><strong className="text-[#F1F5F9]">Habilidades:</strong> {selectedMonster.Skills}</p>}
                            {selectedMonster["Damage Resistances"] && <p><strong className="text-[#F1F5F9]">Resistencias al daño:</strong> {selectedMonster["Damage Resistances"]}</p>}
                            {selectedMonster["Damage Immunities"] && <p><strong className="text-[#F1F5F9]">Inmunidades al daño:</strong> {selectedMonster["Damage Immunities"]}</p>}
                            {selectedMonster["Condition Immunities"] && <p><strong className="text-[#F1F5F9]">Inmunidades a condiciones:</strong> {selectedMonster["Condition Immunities"]}</p>}
                            {selectedMonster.Senses && <p><strong className="text-[#F1F5F9]">Sentidos:</strong> {selectedMonster.Senses}</p>}
                            {selectedMonster.Languages && <p><strong className="text-[#F1F5F9]">Idiomas:</strong> {selectedMonster.Languages}</p>}
                        </div>

                        {selectedMonster.Traits && (
                            <div className="text-xs">
                                <h4 className="font-bold text-[#F1F5F9] border-b border-[#4E5D6F] pb-1 mb-2 uppercase tracking-wider text-[11px]">Rasgos</h4>
                                <div className="text-[#CBD5E1] space-y-2 leading-relaxed" dangerouslySetInnerHTML={{ __html: selectedMonster.Traits }} />
                            </div>
                        )}

                        {selectedMonster.Actions && (
                            <div className="text-xs">
                                <h4 className="font-bold text-[#F1F5F9] border-b border-[#4E5D6F] pb-1 mb-2 uppercase tracking-wider text-[11px]">Acciones</h4>
                                <div className="text-[#CBD5E1] space-y-2 leading-relaxed" dangerouslySetInnerHTML={{ __html: selectedMonster.Actions }} />
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* MODAL DE IMAGEN */}
            {isImageModalOpen && selectedMonster && selectedMonster.img_url && (
                <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="bg-[#323B46] p-5 rounded-2xl shadow-2xl border border-[#4E5D6F] flex flex-col items-center gap-4 max-w-4xl max-h-[90vh] relative">
                        <button 
                            onClick={() => setIsImageModalOpen(false)}
                            className="absolute top-3 right-3 bg-[#252B33] hover:bg-[#3E4A59] text-[#F1F5F9] font-black w-8 h-8 rounded-full flex items-center justify-center border border-[#4E5D6F] transition shadow-sm text-sm"
                            title="Cerrar previsualización"
                        >
                            &times;
                        </button>
                        <h3 className="font-bold text-lg text-[#F1F5F9] pr-10">{selectedMonster.name}</h3>
                        <div className="overflow-hidden rounded-xl border border-[#4E5D6F] bg-[#252B33] flex items-center justify-center max-h-[75vh]">
                            <img 
                                src={selectedMonster.img_url} 
                                alt={selectedMonster.name} 
                                className="max-w-full max-h-[70vh] object-contain" 
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};