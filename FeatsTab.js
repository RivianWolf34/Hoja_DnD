// ==========================================
// IMPORTACIONES Y CONFIGURACIÓN INICIAL
// ==========================================
// Importamos los Hooks de React necesarios para esta pestaña
const { useState, useEffect } = React;

// ------------------------------------------
// DEFINICIÓN DE ICONOS LOCALES
// ------------------------------------------
// Copiamos los iconos que esta pestaña necesita para que no marque error de "undefined"
const BiohazardIcon = ({ className, size = 24 }) => (<svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"/><path d="M12 12v.01"/><path d="M11.99 15.5a3.5 3.5 0 1 0-3.03-5.26"/><path d="M12.01 15.5a3.5 3.5 0 1 1 3.03-5.26"/><path d="M12 12V8.5"/></svg>);
const SwordIcon = ({ className, size = 24 }) => (<svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="14.5 17.5 3 6 3 3 6 3 17.5 14.5"/><line x1="13" x2="19" y1="19" y2="13"/><line x1="16" x2="20" y1="16" y2="20"/><line x1="19" x2="21" y1="21" y2="19"/></svg>);
const BookOpenIcon = ({ className, size = 24 }) => (<svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>);
const ZapIcon = ({ className, size = 24 }) => (<svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>);

// ==========================================
// COMPONENTE PRINCIPAL DE LA PESTAÑA
// ==========================================
const FeatsTab = ({
    info, currentRace, texts, handleTextChange, 
    selectedFeats, setSelectedFeats, allowedFeats
}) => {
    
    // ------------------------------------------
    // ESTADOS LOCALES (Variables exclusivas de esta pestaña)
    // ------------------------------------------
    // Controla lo que el usuario escribe en el buscador de dotes
    const [featSearch, setFeatSearch] = useState('');
    // Controla si el menú desplegable para elegir dotes está abierto (true) o cerrado (false)
    const [isFeatDropdownOpen, setIsFeatDropdownOpen] = useState(false);

    // ------------------------------------------
    // FUNCIONES LOCALES DE LÓGICA
    // ------------------------------------------
    // Función que se ejecuta cuando el usuario hace clic fuera del menú de dotes para cerrarlo
    useEffect(() => {
        const closeDropdown = (e) => { 
            // Si el clic no ocurrió dentro del contenedor del menú, lo cerramos
            if (!e.target.closest('.feat-dropdown-container')) setIsFeatDropdownOpen(false); 
        };
        document.addEventListener('click', closeDropdown);
        return () => document.removeEventListener('click', closeDropdown); // Limpieza del evento
    }, []);

    // Función para agregar una nueva dote a la lista del personaje
    const handleAddFeat = (featName) => {
        // Solo permite agregar si no hemos superado el límite de dotes y si no la tenemos ya
        if (selectedFeats.length < allowedFeats && !selectedFeats.includes(featName)) {
            setSelectedFeats([...selectedFeats, featName]); // Guarda la nueva dote
            setIsFeatDropdownOpen(false); // Cierra el menú desplegable
            setFeatSearch(''); // Limpia el texto del buscador
        }
    };

    // Función para eliminar (olvidar) una dote de la lista
    const removeFeat = (featName) => {
        // Filtra la lista actual quitando únicamente la dote seleccionada
        setSelectedFeats(selectedFeats.filter(f => f !== featName));
    };

    // ==========================================
    // RENDERIZADO VISUAL (HTML/JSX)
    // ==========================================
    return (
        // Contenedor principal de toda la pestaña de Dotes y Rasgos
        <div className="p-4 sm:p-6 bg-neutral-50 border-2 border-neutral-300 rounded-lg min-h-[500px] flex flex-col gap-6">
            
            {/* --- SECCIÓN 1: CAJAS DE INFORMACIÓN DE ORIGEN (Raza, Clase, Trasfondo) --- */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                
                {/* Caja de Rasgos Raciales (Color Verde) */}
                <div className="border-2 border-neutral-300 rounded-lg p-3 bg-white shadow-inner border-green-200 flex flex-col">
                    <div className="font-bold text-green-900 mb-2 border-b-2 border-green-200 pb-1 text-sm flex items-center gap-2">
                        <BiohazardIcon size={16} /> RASGOS RACIALES: {info.race}
                    </div>
                    <div className="text-xs text-neutral-700 space-y-1.5">
                        <p><strong className="text-black">Atributos:</strong> Los bonos (+{currentRace.bonuses.str > 0 ? `${currentRace.bonuses.str} Fue ` : ''}{currentRace.bonuses.dex > 0 ? `${currentRace.bonuses.dex} Des ` : ''}{currentRace.bonuses.con > 0 ? `${currentRace.bonuses.con} Con ` : ''}{currentRace.bonuses.int > 0 ? `${currentRace.bonuses.int} Int ` : ''}{currentRace.bonuses.wis > 0 ? `${currentRace.bonuses.wis} Sab ` : ''}{currentRace.bonuses.cha > 0 ? `${currentRace.bonuses.cha} Car` : ''}) ya están aplicados.</p>
                        <p><strong className="text-black">Idiomas base:</strong> {currentRace.languages}</p>
                        <p><strong className="text-black">Rasgos:</strong> {currentRace.traits}</p>
                        <p><strong className="text-black">Resistencias:</strong> {currentRace.resistances}</p>
                    </div>
                </div>

                {/* Caja de Rasgos de Clase (Color Rojo) */}
                <div className="border-2 border-neutral-300 rounded-lg p-3 bg-white shadow-inner border-red-200 flex flex-col">
                    <div className="font-bold text-red-900 mb-2 border-b-2 border-red-200 pb-1 text-sm flex items-center gap-2">
                        <SwordIcon size={16} /> RASGOS DE CLASE: {info.classLevel}
                    </div>
                    {/* Aquí se imprime el texto plano proveniente de la base de datos de la clase */}
                    <div className="text-xs text-neutral-700 whitespace-pre-line leading-relaxed">
                        {texts.features}
                    </div>
                </div>

                {/* Caja de Rasgos de Trasfondo (Color Naranja) */}
                <div className="border-2 border-neutral-300 rounded-lg p-3 bg-white shadow-inner border-orange-200 flex flex-col">
                    <div className="font-bold text-orange-900 mb-2 border-b-2 border-orange-200 pb-1 text-sm flex items-center gap-2">
                        <BookOpenIcon size={16} /> TRASFONDO: {info.background || 'Ninguno'}
                    </div>
                    {/* Muestra la descripción del trasfondo seleccionado, o un mensaje de aviso */}
                    <div className="text-xs text-neutral-700 whitespace-pre-line leading-relaxed">
                        {info.background && typeof backgroundDatabase !== 'undefined' ? backgroundDatabase[info.background]?.desc || 'Trasfondo personalizado' : 'Selecciona un trasfondo desde la cabecera.'}
                    </div>
                </div>
            </div>

            {/* --- SECCIÓN 2: DOTES Y MEJORAS DE ATRIBUTO (ASI) --- */}
            <div className="border-t-2 border-neutral-300 pt-6">
                
                {/* Cabecera de la sección de Dotes y Contador */}
                <div className="flex justify-between items-center mb-6 pb-2 border-b-2 border-neutral-300">
                    <h2 className="text-xl font-black text-red-900 flex items-center gap-2"><ZapIcon size={24}/> Dotes Generales y Mejoras (ASI)</h2>
                    {/* Indicador visual de cuántas dotes puedes elegir basado en tu nivel/clase */}
                    <div className="bg-white px-4 py-2 rounded-lg border-2 border-neutral-300 shadow-sm">
                        <span className="text-sm font-bold text-neutral-600">Espacios Disponibles: </span>
                        <span className={`text-xl font-black ${selectedFeats.length === allowedFeats ? 'text-green-600' : 'text-red-700'}`}>{selectedFeats.length} / {allowedFeats}</span>
                    </div>
                </div>
                
                <p className="text-sm text-neutral-600 mb-6 max-w-3xl">
                    Aquí puedes aprender tanto <strong>Dotes Generales</strong> como <strong>Dotes Raciales exclusivas</strong> para tu especie actual (<span className="text-red-800 font-bold">{info.race}</span>).
                </p>

                {/* Contenedor del Buscador de Dotes (Solo aparece si tienes espacios libres) */}
                {selectedFeats.length < allowedFeats && (
                    <div className="mb-6 relative feat-dropdown-container max-w-md">
                        <label className="text-xs font-bold text-neutral-500 block mb-1">AÑADIR DOTE / MEJORA</label>
                        {/* Botón que abre/cierra el menú desplegable */}
                        <button onClick={() => setIsFeatDropdownOpen(!isFeatDropdownOpen)} className="w-full text-left text-sm border-2 border-red-300 rounded p-2.5 bg-red-50 focus:outline-none flex justify-between items-center text-red-800 font-bold shadow-sm">
                            <span>Selecciona una dote para aprender...</span><span className="text-[10px]">▼</span>
                        </button>
                        
                        {/* Lista desplegable con el buscador (Visible solo si isFeatDropdownOpen es true) */}
                        {isFeatDropdownOpen && typeof featsDatabase !== 'undefined' && (
                            <div className="absolute top-full left-0 w-full mt-1 bg-white border-2 border-neutral-300 rounded shadow-2xl z-30 flex flex-col max-h-72">
                                <div className="p-2 border-b border-neutral-200 bg-neutral-100 sticky top-0 z-40">
                                    <input type="text" placeholder="🔍 Buscar dote..." value={featSearch} onChange={(e) => setFeatSearch(e.target.value)} className="w-full text-sm border border-neutral-300 rounded p-2 focus:outline-none focus:border-red-600" autoFocus />
                                </div>
                                <div className="overflow-y-auto p-1 flex-1">
                                    {/* Mapea y filtra la base de datos de dotes según lo escrito en el buscador */}
                                    {Object.keys(featsDatabase).filter(f => f.toLowerCase().includes(featSearch.toLowerCase())).map((feat, i) => {
                                        const fData = featsDatabase[feat];
                                        return (
                                            <div key={i} onClick={() => handleAddFeat(feat)} className="px-3 py-2 text-sm text-neutral-800 hover:bg-red-50 hover:text-red-800 cursor-pointer transition border-b border-neutral-100 last:border-0 flex justify-between items-center">
                                                <div>
                                                    <strong>{feat}</strong>
                                                    <div className="text-[10px] text-neutral-400">{fData.desc}</div>
                                                </div>
                                                <span className="text-[10px] bg-neutral-200 text-neutral-700 px-2 py-0.5 rounded font-bold uppercase">{fData.category}</span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* Grid que muestra las dotes que el personaje ya ha seleccionado y aprendido */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {selectedFeats.map((featName, index) => {
                        const featInfo = featsDatabase ? featsDatabase[featName] : { category: "General", stat: "-", desc: "Dote personalizada." };
                        return (
                            <div key={`feat-${index}`} className="bg-white border-2 border-neutral-300 rounded-lg p-4 shadow-sm flex flex-col relative group">
                                {/* Botón para eliminar/olvidar la dote */}
                                <button onClick={() => removeFeat(featName)} className="absolute top-2 right-2 text-neutral-300 hover:text-red-700 font-bold px-2 rounded hover:bg-red-50 transition" title="Olvidar dote">&times;</button>
                                <div className="flex items-center justify-between mb-1">
                                    <h3 className="text-lg font-black text-neutral-800">{featName}</h3>
                                    <span className="text-[10px] bg-red-100 text-red-800 px-2 py-0.5 rounded font-bold uppercase">{featInfo?.category || "General"}</span>
                                </div>
                                <div className="text-xs text-neutral-500 mb-2">Incremento/Atributo: {featInfo?.stat || "-"}</div>
                                <div className="text-xs text-neutral-700 leading-relaxed">{featInfo?.desc || ""}</div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* --- SECCIÓN 3: PERSONALIDAD, IDEALES, VÍNCULOS Y DEFECTOS (Rol) --- */}
            {/* Estos campos de texto se guardan en el estado global 'texts' del script principal */}
            <div className="border-t-2 border-neutral-300 pt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold text-neutral-600 uppercase">Rasgos de Personalidad</label>
                    <textarea name="personality" value={texts.personality} onChange={handleTextChange} className="w-full bg-white border-2 border-neutral-300 rounded-lg p-3 resize-none focus:outline-none focus:border-red-600 text-sm h-28" placeholder="Rasgos de personalidad..."></textarea>
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold text-neutral-600 uppercase">Ideales</label>
                    <textarea name="ideals" value={texts.ideals} onChange={handleTextChange} className="w-full bg-white border-2 border-neutral-300 rounded-lg p-3 resize-none focus:outline-none focus:border-red-600 text-sm h-28" placeholder="Ideales del personaje..."></textarea>
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold text-neutral-600 uppercase">Vínculos</label>
                    <textarea name="bonds" value={texts.bonds} onChange={handleTextChange} className="w-full bg-white border-2 border-neutral-300 rounded-lg p-3 resize-none focus:outline-none focus:border-red-600 text-sm h-28" placeholder="Vínculos con el mundo..."></textarea>
                </div>
            </div>
            
            {/* Área exclusiva para los defectos del personaje */}
            <div className="grid grid-cols-1 md:grid-cols-1 gap-4 mt-4">
                <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold text-neutral-600 uppercase">Flaws (Defectos)</label>
                    <textarea name="flaws" value={texts.flaws} onChange={handleTextChange} className="w-full bg-white border-2 border-neutral-300 rounded-lg p-3 resize-none focus:outline-none focus:border-red-600 text-sm h-24" placeholder="Defectos o debilidades..."></textarea>
                </div>
            </div>
            
        </div>
    );
};