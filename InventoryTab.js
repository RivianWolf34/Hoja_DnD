const { useState, useEffect } = React;

const InventoryTab = ({
    inventory, setInventory, currency, handleAddCoins, 
    autoProficienciesList, texts, handleTextChange, setTexts,
    craftPoison, craftAlchemy, useHealingPotion, 
    setApplyPoisonModal, setRollNotification, handleQuantityChange,
    toggleEquip, removeInventoryItem, handleToggleGrip
}) => {
    // 1. ESTADOS LOCALES (Sacados del script principal)
    const [itemSearch, setItemSearch] = useState('');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isCoinDropdownOpen, setIsCoinDropdownOpen] = useState(false);
    const [isProfDropdownOpen, setIsProfDropdownOpen] = useState(false);
    const [profSearch, setProfSearch] = useState('');

    // 2. EFECTO PARA CERRAR MENÚS AL HACER CLIC AFUERA (Localizado)
    useEffect(() => {
        const closeDropdown = (e) => { 
            if (!e.target.closest('.custom-dropdown-container')) setIsDropdownOpen(false); 
            if (!e.target.closest('.prof-dropdown-container')) setIsProfDropdownOpen(false);
            if (!e.target.closest('.coin-dropdown-container')) setIsCoinDropdownOpen(false);
        };
        document.addEventListener('click', closeDropdown);
        return () => document.removeEventListener('click', closeDropdown);
    }, []);

    // 3. OPCIONES Y FILTROS PARA COMPETENCIAS
    const proficiencyOptions = [
        { label: "Grupos de Armas", items: ["Todas las Armas Simples", "Todas las Armas Marciales"] },
        { label: "Armas Simples", items: Object.keys(weaponDatabase).filter(w => weaponDatabase[w].type === 'simple') },
        { label: "Armas Marciales", items: Object.keys(weaponDatabase).filter(w => weaponDatabase[w].type === 'martial') },
        { label: "Grupos de Armaduras", items: ["Armaduras Ligeras", "Armaduras Medias", "Armaduras Pesadas", "Escudos"] },
        { label: "Idiomas Estándar", items: ["Común", "Élfico", "Enano", "Gigante", "Gnomo", "Goblin", "Mediano", "Orco"] },
        { label: "Idiomas Exóticos", items: ["Abisal", "Celestial", "Dracónico", "Habla Profunda", "Infernal", "Primordial", "Silvano", "Infracomún"] },
        { label: "Herramientas y Kits", items: ["Herramientas de Ladrón", "Kit Artesano", "Kit Envenenador", "Kit Herborista", "Suministros de alquimista", "Útiles de cartógrafo"] },
        { label: "Instrumentos Musicales", items: ["Laúd", "Lira", "Flauta", "Flauta de pan", "Tambor", "Gaita", "Cuerno (Bocina)", "Dulcémele (Dulcimer)", "Chirimía (Caramillo / Shawm)", "Viola (Viol)"] }
    ];

    const filteredProfCategories = proficiencyOptions.map(category => {
        const matchingItems = category.items.filter(item => item.toLowerCase().includes(profSearch.toLowerCase()));
        return { ...category, items: matchingItems };
    }).filter(category => category.items.length > 0);

    const handleAddProficiency = (profName) => {
        setTexts(prev => ({
            ...prev,
            profAndLang: prev.profAndLang + (prev.profAndLang ? '\n' : '') + `• ${profName}`
        }));
        setProfSearch('');
        setIsProfDropdownOpen(false);
    };

    // 4. OPCIONES Y FILTROS PARA LA MOCHILA
    const filteredCategories = typeof dndItems !== 'undefined' ? dndItems.map(category => {
        const matchingItems = category.items.filter(item => item.toLowerCase().includes(itemSearch.toLowerCase()));
        return { ...category, items: matchingItems };
    }).filter(category => category.items.length > 0) : [];

    const handleAddItem = (itemName) => {
        if (itemName) {
            const newItem = { id: Date.now().toString(), name: itemName, equipped: false, grip: 1, quantity: 1 };
            setInventory([...inventory, newItem]);
            setItemSearch('');
            setIsDropdownOpen(false);
        }
    };

    return (
        <div className="flex flex-col gap-6 w-full">
            {/* FILA 1: 2 COLUMNAS (MONEDERO Y COMPETENCIAS) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
                {/* COLUMNA 1: MONEDERO */}
                <div className="border-2 border-neutral-300 rounded-xl p-5 bg-neutral-50 flex flex-col shadow-sm w-full coin-dropdown-container">
                    <div className="font-extrabold text-neutral-800 mb-4 border-b-2 border-neutral-200 pb-2 text-base flex justify-between items-center">
                        <span>MONEDERO (DIVISAS)</span>
                        <span className="text-xs text-neutral-500 font-semibold">Valor total aprox: {currency.cp + currency.sp*10 + currency.gp*100} PC</span>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-3 mb-4 bg-white p-3 rounded-lg border border-neutral-300 text-center shadow-sm w-full">
                        <div>
                            <label className="text-xs font-bold text-amber-900 block mb-1">PC (Cobre)</label>
                            <div className="w-full text-center border rounded p-2 text-base font-black bg-amber-50 text-amber-950 cursor-default">{currency.cp}</div>
                        </div>
                        <div>
                            <label className="text-xs font-bold text-slate-700 block mb-1">PP (Plata)</label>
                            <div className="w-full text-center border rounded p-2 text-base font-black bg-slate-50 text-slate-900 cursor-default">{currency.sp}</div>
                        </div>
                        <div>
                            <label className="text-xs font-bold text-yellow-800 block mb-1">PO (Oro)</label>
                            <div className="w-full text-center border rounded p-2 text-base font-black bg-yellow-50 text-yellow-900 cursor-default">{currency.gp}</div>
                        </div>
                    </div>

                    <div className="relative w-full mt-auto">
                        <button onClick={() => setIsCoinDropdownOpen(!isCoinDropdownOpen)} className="w-full text-left text-xs border border-neutral-300 rounded p-2.5 bg-white focus:outline-none flex justify-between items-center text-neutral-700 font-bold hover:bg-neutral-50 transition shadow-sm">
                            <span>🪙 Modificar dinero del monedero...</span><span className="text-xs">{isCoinDropdownOpen ? '▲' : '▼'}</span>
                        </button>
                        {isCoinDropdownOpen && (
                            <div className="absolute top-full left-0 w-full mt-1 bg-white border border-neutral-300 rounded-lg shadow-xl z-40 flex flex-col p-3 gap-3">
                                <div className="bg-yellow-50/50 rounded border border-yellow-200 p-2">
                                    <div className="text-xs font-bold text-yellow-900 text-center mb-1.5">ORO (PO)</div>
                                    <div className="flex justify-center gap-1.5 mb-1">
                                        {[1, 5, 10, 50].map(val => <button key={`gp-add-${val}`} onClick={() => handleAddCoins(val, 'gp')} className="flex-1 py-1.5 bg-yellow-200 text-yellow-900 rounded text-xs font-bold hover:bg-yellow-300 border border-yellow-300 transition shadow-sm">+{val}</button>)}
                                    </div>
                                    <div className="flex justify-center gap-1.5">
                                        {[-1, -5, -10, -50].map(val => <button key={`gp-sub-${val}`} onClick={() => handleAddCoins(val, 'gp')} className="flex-1 py-1.5 bg-white text-red-700 rounded text-xs font-bold hover:bg-red-50 border border-red-200 transition shadow-sm">{val}</button>)}
                                    </div>
                                </div>

                                <div className="bg-slate-50/50 rounded border border-slate-200 p-2">
                                    <div className="text-xs font-bold text-slate-800 text-center mb-1.5">PLATA (PP)</div>
                                    <div className="flex justify-center gap-1.5 mb-1">
                                        {[1, 5, 10, 50].map(val => <button key={`sp-add-${val}`} onClick={() => handleAddCoins(val, 'sp')} className="flex-1 py-1.5 bg-slate-200 text-slate-800 rounded text-xs font-bold hover:bg-slate-300 border border-slate-300 transition shadow-sm">+{val}</button>)}
                                    </div>
                                    <div className="flex justify-center gap-1.5">
                                        {[-1, -5, -10, -50].map(val => <button key={`sp-sub-${val}`} onClick={() => handleAddCoins(val, 'sp')} className="flex-1 py-1.5 bg-white text-red-700 rounded text-xs font-bold hover:bg-red-50 border border-red-200 transition shadow-sm">{val}</button>)}
                                    </div>
                                </div>

                                <div className="bg-amber-50/50 rounded border border-amber-200 p-2">
                                    <div className="text-xs font-bold text-amber-900 text-center mb-1.5">COBRE (PC)</div>
                                    <div className="flex justify-center gap-1.5 mb-1">
                                        {[1, 5, 10, 50].map(val => <button key={`cp-add-${val}`} onClick={() => handleAddCoins(val, 'cp')} className="flex-1 py-1.5 bg-amber-200 text-amber-900 rounded text-xs font-bold hover:bg-amber-300 border border-amber-300 transition shadow-sm">+{val}</button>)}
                                    </div>
                                    <div className="flex justify-center gap-1.5">
                                        {[-1, -5, -10, -50].map(val => <button key={`cp-sub-${val}`} onClick={() => handleAddCoins(val, 'cp')} className="flex-1 py-1.5 bg-white text-red-700 rounded text-xs font-bold hover:bg-red-50 border border-red-200 transition shadow-sm">{val}</button>)}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* COLUMNA 2: COMPETENCIAS */}
                <div className="border-2 border-neutral-300 rounded-xl p-5 bg-neutral-50 flex flex-col shadow-sm w-full prof-dropdown-container">
                    <div className="font-extrabold text-neutral-800 mb-4 border-b-2 border-neutral-200 pb-2 text-base">
                        COMPETENCIAS E IDIOMAS EXTRA
                    </div>

                    <div className="mb-3 flex flex-col gap-1.5 border-b border-neutral-200 pb-3">
                        <div className="text-xs font-bold text-neutral-500 uppercase">Automáticas por tu Clase y Raza</div>
                        <div className="flex flex-wrap gap-1.5">
                            {autoProficienciesList.map((prof, idx) => (
                                <span key={`auto-prof-${idx}`} className={`text-xs px-2.5 py-1 rounded font-bold border shadow-sm ${prof.source === 'Clase' ? 'bg-orange-50 text-orange-800 border-orange-200' : 'bg-green-50 text-green-800 border-green-200'}`}>
                                    {prof.label} <span className="opacity-75 italic font-normal">({prof.source})</span>
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col gap-1.5 mb-3 relative">
                        <button onClick={() => setIsProfDropdownOpen(!isProfDropdownOpen)} className="w-full text-left text-xs border border-neutral-300 rounded p-2.5 bg-white focus:outline-none flex justify-between items-center text-neutral-600 truncate transition hover:bg-neutral-100 font-semibold shadow-sm">
                            <span>Añadir competencia extra...</span><span className="text-[10px]">{isProfDropdownOpen ? '▲' : '▼'}</span>
                        </button>
                        {isProfDropdownOpen && (
                            <div className="absolute top-full left-0 w-full mt-1 bg-white border border-neutral-300 rounded shadow-lg z-30 flex flex-col" style={{maxHeight: '250px'}}>
                                <div className="p-1 border-b border-neutral-200 bg-neutral-50 sticky top-0 z-40">
                                    <input type="text" placeholder="🔍 Buscar (ej. Marciales, Élfico)..." value={profSearch} onChange={(e) => setProfSearch(e.target.value)} className="w-full text-xs border border-neutral-300 rounded p-1.5 focus:outline-none focus:border-red-600 font-medium" autoFocus />
                                </div>
                                <div className="overflow-y-auto p-1 flex-1">
                                    {filteredProfCategories.length > 0 ? (
                                        filteredProfCategories.map((category, idx) => (
                                            <div key={idx} className="mb-1">
                                                <div className="text-[11px] font-bold text-neutral-500 uppercase px-2 py-1 bg-neutral-100">{category.label}</div>
                                                {category.items.map((item, i) => (
                                                    <div key={i} onClick={() => handleAddProficiency(item)} className="px-3 py-1.5 text-xs text-neutral-800 hover:bg-red-50 hover:text-red-800 cursor-pointer transition font-medium">{item}</div>
                                                ))}
                                            </div>
                                        ))
                                    ) : <div className="px-3 py-2 text-xs text-neutral-500 text-center italic">No se encontraron opciones.</div>}
                                </div>
                            </div>
                        )}
                    </div>

                    <textarea name="profAndLang" value={texts.profAndLang} onChange={handleTextChange} className="w-full bg-white border border-neutral-300 rounded-lg p-2.5 resize-none focus:outline-none focus:border-red-600 text-xs leading-relaxed font-medium mt-auto" placeholder="Armaduras, armas, herramientas y lenguajes extras adquiridos..." style={{minHeight: '75px'}}></textarea>
                </div>
            </div>

            {/* FILA 2: INVENTARIO (MOCHILA) */}
            <div className="border-2 border-neutral-300 rounded-xl p-5 bg-neutral-50 flex flex-col shadow-sm w-full">
                <div className="font-extrabold text-neutral-800 mb-4 border-b-2 border-neutral-200 pb-2 text-base flex justify-between items-center">
                    <span>MOCHILA (Inventario)</span>
                    <span className="text-xs bg-neutral-200 px-3 py-1 rounded-full text-neutral-700 font-bold">{inventory.filter(i => !i.equipped).length} ítems guardados</span>
                </div>
                
                <div className="flex flex-col gap-2 mb-4 relative custom-dropdown-container max-w-md">
                    <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="w-full text-left text-sm border-2 border-neutral-300 rounded-lg p-2.5 bg-white focus:outline-none flex justify-between items-center text-neutral-700 font-semibold shadow-sm hover:border-red-400 transition">
                        <span>Añadir objeto...</span><span className="text-xs">▼</span>
                    </button>
                    {isDropdownOpen && (
                        <div className="absolute top-full left-0 w-full mt-1 bg-white border-2 border-neutral-300 rounded-xl shadow-2xl z-30 flex flex-col" style={{maxHeight: '320px'}}>
                            <div className="p-2 border-b border-neutral-200 bg-neutral-50 sticky top-0 z-40">
                                <input type="text" placeholder="🔍 Buscar objeto..." value={itemSearch} onChange={(e) => setItemSearch(e.target.value)} className="w-full text-sm border border-neutral-300 rounded-lg p-2 focus:outline-none focus:border-red-600" autoFocus />
                            </div>
                            <div className="overflow-y-auto p-2 flex-1">
                                {filteredCategories.length > 0 ? (
                                    filteredCategories.map((category, idx) => (
                                        <div key={idx} className="mb-2">
                                            <div className="text-xs font-black text-neutral-600 uppercase px-2 py-1 bg-neutral-100 rounded">{category.label}</div>
                                            {category.items.map((item, i) => (
                                                <div key={i} onClick={() => handleAddItem(item)} className="px-3 py-2 text-sm text-neutral-800 hover:bg-red-50 hover:text-red-800 cursor-pointer transition font-medium">{item}</div>
                                            ))}
                                        </div>
                                    ))
                                ) : <div className="px-3 py-3 text-sm text-neutral-500 text-center italic">No se encontraron objetos.</div>}
                            </div>
                        </div>
                    )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                    {(() => {
                        const getItemCategory = (name) => {
                            const musicalInstruments = ["Laúd", "Lira", "Flauta", "Flauta de pan", "Tambor", "Gaita", "Cuerno (Bocina)", "Dulcémele (Dulcimer)", "Chirimía (Caramillo / Shawm)", "Viola (Viol)"];
                            if (weaponDatabase[name]) return "Armas";
                            if (armorDatabase[name]) return "Armaduras y Escudos";
                            if (ammoDatabase[name]) return "Municiones";
                            if (healingPotionDatabase[name]) return "Pociones Curativas";
                            if (poisonDatabase[name]) return "Venenos";
                            if (materialDatabase[name] || name.includes("Toxina") || name.includes("Concentrado")) return "Materiales y Toxinas";
                            if (kitDatabase[name] || name.includes("Kit") || name.includes("Herramientas")) return "Herramientas y Kits";
                            if (musicalInstruments.includes(name)) return "Instrumentos Musicales";
                            if (name === "Frasco" || name.includes("Foco")) return "Focos y Recipientes";
                            return "Equipo de Aventurero";
                        };
                        
                        const unequipped = inventory.filter(i => !i.equipped);
                        const groups = unequipped.reduce((acc, item) => {
                            const cat = getItemCategory(item.name);
                            if (!acc[cat]) acc[cat] = [];
                            acc[cat].push(item);
                            return acc;
                        }, {});

                        return Object.keys(groups).map((category, catIdx) => (
                            <div key={`cat-${catIdx}`} className="flex flex-col bg-white p-3.5 rounded-xl border-2 border-neutral-200 shadow-sm gap-2">
                                <div className="text-xs font-black text-neutral-700 uppercase px-2 py-1 bg-neutral-100 rounded border-b">{category}</div>
                                <div className="flex flex-col gap-2 max-h-64 overflow-y-auto pr-1">
                                    {groups[category].map(item => {
                                        const kStat = kitDatabase[item.name];
                                        const pStat = poisonDatabase[item.name];
                                        const hStat = healingPotionDatabase[item.name];
                                        const mStat = materialDatabase[item.name];
                                        const amStat = ammoDatabase[item.name];
                                        const isToxin = item.name.includes("Toxina");
                                        
                                        let bgClass = 'bg-white border-neutral-200 hover:bg-neutral-50';
                                        if (kStat) bgClass = 'bg-orange-50/80 border-orange-300';
                                        else if (amStat) bgClass = 'bg-yellow-50/80 border-yellow-300';
                                        else if (isToxin || (mStat && !mStat.craftable)) bgClass = 'bg-emerald-50/80 border-emerald-300';
                                        else if (mStat && mStat.craftable) bgClass = 'bg-lime-50/80 border-lime-300';
                                        else if (item.name === 'Frasco') bgClass = 'bg-blue-50/80 border-blue-300';
                                        else if (pStat) bgClass = 'bg-purple-50/80 border-purple-300';
                                        else if (hStat) bgClass = 'bg-pink-50/80 border-pink-300';
                                        
                                        return (
                                            <div key={item.id} className={`flex flex-col p-2.5 rounded-lg border-2 text-sm shadow-sm transition ${bgClass}`}>
                                                <div className="flex items-center justify-between">
                                                    <span className={`truncate flex-1 font-bold ${kStat ? 'text-orange-950 text-base' : amStat ? 'text-yellow-950 text-base' : isToxin || mStat ? 'text-emerald-950 text-base' : item.name === 'Frasco' ? 'text-blue-950 text-base' : hStat ? 'text-pink-950 text-base' : 'text-neutral-900'}`}>{item.name} {item.quantity > 0 ? `(x${item.quantity})` : ''}</span>
                                                    <div className="flex gap-1.5 items-center">
                                                        {pStat && (
                                                            <div className="flex items-center gap-1 flex-wrap">
                                                                <button onClick={() => craftPoison(item.id, item.name, pStat.dc, false)} className="px-1.5 py-0.5 rounded text-xs bg-green-700 text-white hover:bg-green-800 shadow transition font-bold" title="Craftear con Frasco, Toxina y Kit">🧪</button>
                                                                {item.name === "Veneno Avanzado" && (
                                                                    <button onClick={() => craftPoison(item.id, item.name, pStat.dc, true)} className="px-1.5 py-0.5 rounded text-xs bg-emerald-800 text-white hover:bg-emerald-900 shadow transition font-bold" title="Craftear con 3x Veneno Básico, Frasco y Kit">🧪(3x)</button>
                                                                )}
                                                                <button onClick={() => {
                                                                    if ((item.quantity || 0) > 0) {
                                                                        setApplyPoisonModal({ poisonItem: item, poisonName: item.name, poisonDesc: pStat.desc, poisonDamage: pStat.damageDice });
                                                                    } else {
                                                                        setRollNotification({ title: `Sin cargas`, details: `No te quedan unidades de ${item.name} en el inventario.`, total: '🚫', type: 'fail' });
                                                                    }
                                                                }} disabled={(item.quantity || 0) <= 0} className={`px-1.5 py-0.5 rounded text-xs ${(item.quantity || 0) > 0 ? 'bg-red-700 text-white hover:bg-red-800 cursor-pointer' : 'bg-neutral-300 text-neutral-400 cursor-not-allowed'} shadow transition font-bold`} title="Aplicar veneno a arma">🩸</button>
                                                                <div className="flex items-center border rounded overflow-hidden bg-white">
                                                                    <button onClick={() => handleQuantityChange(item.id, -1)} className="px-1.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 font-black">-</button>
                                                                    <span className="px-2 text-xs font-black text-neutral-900 min-w-[20px] text-center">{item.quantity || 0}</span>
                                                                    <button onClick={() => handleQuantityChange(item.id, 1)} className="px-1.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 font-black">+</button>
                                                                </div>
                                                            </div>
                                                        )}
                                                        {hStat && (
                                                            <div className="flex items-center gap-1 flex-wrap">
                                                                <button onClick={() => craftAlchemy(item.id, item.name, hStat.dc, hStat.ingredientName)} className="px-1.5 py-0.5 rounded text-xs bg-pink-700 text-white hover:bg-pink-800 shadow transition font-bold" title="Craftear poción">🧪</button>
                                                                {item.name === "Poción de Curación Superior" && (
                                                                    <button onClick={() => craftAlchemy(item.id, item.name, hStat.dc, null, true)} className="px-1.5 py-0.5 rounded text-xs bg-rose-700 text-white hover:bg-rose-800 shadow transition font-bold" title="Craftear con 3x Básicas">🧪(3x)</button>
                                                                )}
                                                                <button onClick={() => useHealingPotion(item.id, item.name, hStat.healDice, hStat.healBonus)} disabled={(item.quantity || 0) <= 0} className={`px-1.5 py-0.5 rounded text-xs ${(item.quantity || 0) > 0 ? 'bg-red-600 text-white hover:bg-red-700 cursor-pointer' : 'bg-neutral-300 text-neutral-400 cursor-not-allowed'} shadow transition font-bold`} title="Beber poción">❤️</button>
                                                                <div className="flex items-center border rounded overflow-hidden bg-white">
                                                                    <button onClick={() => handleQuantityChange(item.id, -1)} className="px-1.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 font-black">-</button>
                                                                    <span className="px-2 text-xs font-black text-neutral-900 min-w-[20px] text-center">{item.quantity || 0}</span>
                                                                    <button onClick={() => handleQuantityChange(item.id, 1)} className="px-1.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 font-black">+</button>
                                                                </div>
                                                            </div>
                                                        )}
                                                        {mStat && mStat.craftable && (
                                                            <div className="flex items-center gap-1 flex-wrap">
                                                                <button onClick={() => craftAlchemy(item.id, item.name, mStat.craftDc, mStat.craftIngredient)} className="px-1.5 py-0.5 rounded text-xs bg-lime-700 text-white hover:bg-lime-800 shadow transition font-bold" title="Destilar">⚗️</button>
                                                                <div className="flex items-center border rounded overflow-hidden bg-white">
                                                                    <button onClick={() => handleQuantityChange(item.id, -1)} className="px-1.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 font-black">-</button>
                                                                    <span className="px-2 text-xs font-black text-neutral-900 min-w-[20px] text-center">{item.quantity || 0}</span>
                                                                    <button onClick={() => handleQuantityChange(item.id, 1)} className="px-1.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 font-black">+</button>
                                                                </div>
                                                            </div>
                                                        )}
                                                        {(kStat || amStat || item.name === 'Frasco' || isToxin || (mStat && !mStat.craftable)) && !pStat && !hStat && (
                                                            <div className="flex items-center border rounded overflow-hidden bg-white">
                                                                <button onClick={() => handleQuantityChange(item.id, -1)} className="px-1.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 font-black">-</button>
                                                                <span className="px-2 text-xs font-black text-neutral-900 min-w-[20px] text-center">{item.quantity || 0}</span>
                                                                <button onClick={() => handleQuantityChange(item.id, 1)} className="px-1.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 font-black">+</button>
                                                            </div>
                                                        )}
                                                        {!pStat && !hStat && !mStat && !kStat && !amStat && item.name !== 'Frasco' && !isToxin && (
                                                            <>
                                                                <div className="flex items-center border rounded overflow-hidden bg-white">
                                                                    <button onClick={() => handleQuantityChange(item.id, -1)} className="px-1.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 font-black">-</button>
                                                                    <span className="px-2 text-xs font-black text-neutral-900 min-w-[20px] text-center">{item.quantity || 0}</span>
                                                                    <button onClick={() => handleQuantityChange(item.id, 1)} className="px-1.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 font-black">+</button>
                                                                </div>
                                                                <button onClick={() => toggleEquip(item.id)} className="px-2 py-0.5 rounded text-xs font-bold bg-neutral-200 text-neutral-800 hover:bg-neutral-300 border transition">Equipar</button>
                                                            </>
                                                        )}
                                                        <button onClick={() => removeInventoryItem(item.id)} className="text-red-600 hover:text-red-800 font-black px-1 text-base" title="Tirar objeto">&times;</button>
                                                    </div>
                                                </div>
                                                {kStat && <div className="text-[11px] mt-1 italic text-orange-900">{kStat.desc}</div>}
                                                {amStat && <div className="text-[11px] mt-1 italic text-yellow-900">{amStat.desc}</div>}
                                                {isToxin && <div className="text-[11px] mt-1 italic text-emerald-900">Ingrediente biológico fundamental.</div>}
                                                {item.name === 'Frasco' && <div className="text-[11px] mt-1 italic text-blue-900">Recipiente de vidrio para alquimia.</div>}
                                                {pStat && <div className="text-[11px] mt-1 italic text-purple-900">{pStat.desc}</div>}
                                                {hStat && <div className="text-[11px] mt-1 italic text-pink-900">{hStat.desc}</div>}
                                                {mStat && <div className="text-[11px] mt-1 italic text-emerald-900">{mStat.desc}</div>}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        ));
                    })()}
                </div>
                
                <textarea name="equipment" value={texts.equipment} onChange={handleTextChange} className="w-full bg-white border-2 border-neutral-200 rounded-lg p-2.5 resize-none focus:outline-none focus:border-red-600 text-sm text-neutral-700 min-h-[60px]" placeholder="Otras anotaciones de inventario general..."></textarea>
            </div>

            {/* FILA 3: EQUIPAMIENTO ACTIVO */}
            <div className="border-2 border-neutral-300 rounded-xl p-5 bg-neutral-50 flex flex-col shadow-sm w-full">
                <div className="font-extrabold text-neutral-800 mb-4 border-b-2 border-neutral-200 pb-2 text-base flex justify-between items-center">
                    <span>EQUIPAMIENTO ACTIVO</span>
                    <div className="flex gap-3">
                        <span className="text-xs bg-neutral-200 px-3 py-1 rounded-full text-neutral-700 font-bold">Manos activas: {inventory.filter(i => i.equipped && (weaponDatabase[i.name] || (armorDatabase[i.name] && armorDatabase[i.name].type === "shield"))).reduce((acc, i) => { const w = weaponDatabase[i.name]; const isTwoH = w && w.properties && w.properties.some(p => typeof p === 'string' && p.includes("Dos manos")); return acc + (i.grip === 2 || isTwoH ? 2 : 1); }, 0)}/2</span>
                        <span className="text-xs bg-neutral-200 px-3 py-1 rounded-full text-neutral-700 font-bold">{inventory.filter(i => i.equipped).length} ítems equipados</span>
                    </div>
                </div>

                {inventory.filter(i => i.equipped).length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                        {inventory.filter(i => i.equipped).map(item => {
                            const wStat = weaponDatabase[item.name];
                            const aStat = armorDatabase[item.name];
                            let statDesc = wStat ? `Daño: ${wStat.damage} ${wStat.damageType}` : (aStat ? aStat.desc : "");
                            if (item.poisoned) statDesc += ` | 🧪 Veneno (${item.poisonDamage})`;
                            const isTwoH = wStat && wStat.properties && wStat.properties.some(p => typeof p === 'string' && p.includes("Dos manos"));
                            const isVers = wStat && wStat.properties && wStat.properties.some(p => typeof p === 'string' && p.includes("Versátil"));
                            return (
                                <div key={item.id} className="flex flex-col bg-red-50/70 p-3.5 rounded-xl border-2 border-red-200 text-sm shadow-sm justify-between">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="font-extrabold text-red-950 text-base">{item.name} {item.grip === 2 ? '(A 2 Manos)' : ''}</span>
                                        <div className="flex gap-2 items-center">
                                            {isVers && !isTwoH && (
                                                <button onClick={() => handleToggleGrip(item.id)} className="px-2.5 py-1 rounded-lg text-xs font-bold bg-blue-800 text-white hover:bg-blue-900 shadow transition">
                                                    {item.grip === 2 ? '1 Mano' : '2 Manos'}
                                                </button>
                                            )}
                                            <button onClick={() => toggleEquip(item.id)} className="px-2.5 py-1 rounded-lg text-xs font-bold bg-red-800 text-white hover:bg-red-900 shadow transition">Desequipar</button>
                                        </div>
                                    </div>
                                    {statDesc && <span className="text-xs text-neutral-600 italic font-medium">{statDesc}</span>}
                                </div>
                            );
                        })}
                    </div>
                ) : <div className="text-sm text-neutral-400 italic text-center p-8 bg-white rounded-lg border">No llevas equipo activo actualmente</div>}
            </div>
        </div>
    );
};