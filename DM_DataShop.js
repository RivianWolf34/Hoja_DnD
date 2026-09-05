// ==========================================
// PESTAÑA DE TIENDA (DM_ShopTab.js)
// ==========================================
const { useState, useEffect } = React;

const DM_ShopTab = () => {
    const [shopItems, setShopItems] = useState([]);
    const [itemSearchQuery, setItemSearchQuery] = useState('');

    // Base de datos unificada de objetos de jugador con precios asignados
    const masterPlayerItemDatabase = {
        // Armas Simples
        "Bastón": { type: "Arma Simple", damage: "1d6 contundente", properties: "Versátil (1d8)", desc: "Bastón de madera robusto.", cost: "2 sp" },
        "Daga": { type: "Arma Simple", damage: "1d4 perforante", properties: "Sutil, Ligera, Arrojadiza", desc: "Arma corta de hoja fina.", cost: "2 gp" },
        "Gran garrote": { type: "Arma Simple", damage: "1d8 contundente", properties: "Dos manos", desc: "Garrote pesado de madera.", cost: "2 sp" },
        "Hacha de mano": { type: "Arma Simple", damage: "1d6 cortante", properties: "Ligera, Arrojadiza", desc: "Hacha pequeña para combate o tala.", cost: "5 gp" },
        "Hoz": { type: "Arma Simple", damage: "1d4 cortante", properties: "Ligera", desc: "Herramienta agrícola adaptada como arma.", cost: "1 gp" },
        "Jabalina": { type: "Arma Simple", damage: "1d6 perforante", properties: "Arrojadiza", desc: "Lanza ligera diseñada para ser lanzada.", cost: "5 sp" },
        "Lanza": { type: "Arma Simple", damage: "1d6 perforante", properties: "Arrojadiza, Versátil (1d8)", desc: "Arma de asta equilibrada.", cost: "1 gp" },
        "Martillo ligero": { type: "Arma Simple", damage: "1d4 contundente", properties: "Ligera, Arrojadiza", desc: "Martillo pequeño de mano.", cost: "2 gp" },
        "Maza": { type: "Arma Simple", damage: "1d6 contundente", properties: "Ninguna", desc: "Cabeza de metal pesada sobre empuñadura.", cost: "5 gp" },
        "Arco corto": { type: "Arma Simple", damage: "1d6 perforante", properties: "A distancia, Dos manos (Requiere Flechas)", desc: "Arco ligero y compacto.", cost: "25 gp" },
        "Ballesta ligera": { type: "Arma Simple", damage: "1d8 perforante", properties: "A distancia, Dos manos, Recarga (Requiere Virotes)", desc: "Ballesta de carga mecánica.", cost: "25 gp" },
        "Dardo": { type: "Arma Simple", damage: "1d4 perforante", properties: "A distancia, Sutil, Arrojadiza", desc: "Proyectil puntiagudo equilibrado.", cost: "5 cp" },
        "Honda": { type: "Arma Simple", damage: "1d4 contundente", properties: "A distancia (Requiere Rocas)", desc: "Tira de cuero para lanzar piedras.", cost: "1 sp" },

        // Armas Marciales
        "Alabarda": { type: "Arma Marcial", damage: "1d10 cortante", properties: "Pesada, Alcance, Dos manos", desc: "Arma de asta con hoja de hacha y pica.", cost: "20 gp" },
        "Cimitarra": { type: "Arma Marcial", damage: "1d6 cortante", properties: "Sutil, Ligera", desc: "Espada curva de filo único.", cost: "25 gp" },
        "Espada corta": { type: "Arma Marcial", damage: "1d6 perforante", properties: "Sutil, Ligera", desc: "Espada de hoja corta y recta.", cost: "10 gp" },
        "Espada larga": { type: "Arma Marcial", damage: "1d8 cortante", properties: "Versátil (1d10)", desc: "Espada recta equilibrada.", cost: "15 gp" },
        "Espadón": { type: "Arma Marcial", damage: "2d6 cortante", properties: "Pesada, Dos manos", desc: "Gran espada a dos manos.", cost: "50 gp" },
        "Estoque": { type: "Arma Marcial", damage: "1d8 perforante", properties: "Sutil", desc: "Espada fina y estilizadamente puntiaguda.", cost: "25 gp" },
        "Guja": { type: "Arma Marcial", damage: "1d10 cortante", properties: "Pesada, Alcance, Dos manos", desc: "Arma de asta con hoja en forma de cuchilla.", cost: "20 gp" },
        "Hacha de batalla": { type: "Arma Marcial", damage: "1d8 cortante", properties: "Versátil (1d10)", desc: "Hacha robusta de una o dos manos.", cost: "10 gp" },
        "Hacha enana": { type: "Arma Marcial", damage: "1d12 cortante", properties: "Pesada, Dos manos", desc: "Pesada hacha de manufactura enana.", cost: "30 gp" },
        "Lanza de caballería": { type: "Arma Marcial", damage: "1d12 perforante", properties: "Alcance, Especial", desc: "Diseñada para cargas montadas.", cost: "10 gp" },
        "Látigo": { type: "Arma Marcial", damage: "1d4 cortante", properties: "Sutil, Alcance", desc: "Tira de cuero trenzado larga.", cost: "2 gp" },
        "Lucero del alba": { type: "Arma Marcial", damage: "1d8 perforante", properties: "Ninguna", desc: "Maza con esfera de púas de hierro.", cost: "15 gp" },
        "Martillo de guerra": { type: "Arma Marcial", damage: "1d8 contundente", properties: "Versátil (1d10)", desc: "Martillo contundente pesado.", cost: "15 gp" },
        "Mayal": { type: "Arma Marcial", damage: "1d8 contundente", properties: "Ninguna", desc: "Esfera de metal unida por cadena a mango.", cost: "10 gp" },
        "Pica": { type: "Arma Marcial", damage: "1d10 perforante", properties: "Pesada, Alcance, Dos manos", desc: "Lanza extremadamente larga.", cost: "5 gp" },
        "Tridente": { type: "Arma Marcial", damage: "1d6 perforante", properties: "Arrojadiza, Versátil (1d8)", desc: "Arma de tres puntas.", cost: "5 gp" },
        "Arco largo": { type: "Arma Marcial", damage: "1d8 perforante", properties: "A distancia, Pesada, Dos manos (Requiere Flechas)", desc: "Arco alto de gran alcance.", cost: "50 gp" },
        "Ballesta de mano": { type: "Arma Marcial", damage: "1d6 perforante", properties: "A distancia, Ligera, Recarga (Requiere Virotes)", desc: "Ballesta compacta de una mano.", cost: "75 gp" },
        "Ballesta pesada": { type: "Arma Marcial", damage: "1d10 perforante", properties: "A distancia, Pesada, Dos manos, Recarga (Requiere Virotes)", desc: "Ballesta militar de asedio.", cost: "50 gp" },
        "Cerbatana": { type: "Arma Marcial", damage: "1 perforante", properties: "A distancia, Recarga (Requiere Agujas)", desc: "Tubo soplador de dardos envenenados.", cost: "10 gp" },
        "Red": { type: "Arma Marcial", damage: "0 contundente", properties: "Especial, Arrojadiza", desc: "Red para inmovilizar objetivos.", cost: "1 gp" },

        // Armaduras y Escudos
        "Acolchada (Ligera)": { type: "Armadura Ligera", desc: "CA 11 + Des | Desv. Sigilo", cost: "5 gp" },
        "Cuero (Ligera)": { type: "Armadura Ligera", desc: "CA 11 + Des", cost: "10 gp" },
        "Cuero tachonado (Ligera)": { type: "Armadura Ligera", desc: "CA 12 + Des", cost: "45 gp" },
        "Pieles (Media)": { type: "Armadura Media", desc: "CA 12 + Des (máx +2)", cost: "10 gp" },
        "Camisa de mallas (Media)": { type: "Armadura Media", desc: "CA 13 + Des (máx +2)", cost: "50 gp" },
        "Cota de escamas (Media)": { type: "Armadura Media", desc: "CA 14 + Des (máx +2) | Desv. Sigilo", cost: "50 gp" },
        "Coraza (Media)": { type: "Armadura Media", desc: "CA 14 + Des (máx +2)", cost: "400 gp" },
        "Medio placas (Media)": { type: "Armadura Media", desc: "CA 15 + Des (máx +2) | Desv. Sigilo", cost: "750 gp" },
        "Cota de anillas (Pesada)": { type: "Armadura Pesada", desc: "CA 14 fijo | Desv. Sigilo", cost: "30 gp" },
        "Cota de malla (Pesada)": { type: "Armadura Pesada", desc: "CA 16 fijo | Desv. Sigilo", cost: "75 gp" },
        "Cota de bandas (Pesada)": { type: "Armadura Pesada", desc: "CA 17 fijo | Desv. Sigilo", cost: "200 gp" },
        "Placas (Pesada)": { type: "Armadura Pesada", desc: "CA 18 fijo | Desv. Sigilo", cost: "1500 gp" },
        "Escudo": { type: "Escudo", desc: "+2 CA adicional", cost: "10 gp" },

        // Municiones
        "Flechas": { type: "Munición", desc: "Munición estándar para arcos (Paquete de 20).", cost: "1 gp" },
        "Virotes": { type: "Munición", desc: "Munición pesada para ballestas (Paquete de 20).", cost: "1 gp" },
        "Rocas": { type: "Munición", desc: "Munición contundente para hondas.", cost: "4 cp" },
        "Agujas": { type: "Munición", desc: "Munición ligera para cerbatanas (Paquete de 50).", cost: "1 gp" },

        // Pociones y Venenos
        "Poción de Curación": { type: "Poción", desc: "Cura 2d4+2 HP. Requiere Kit Herborista.", cost: "50 gp" },
        "Poción de Curación Mayor": { type: "Poción", desc: "Cura 4d4+4 HP.", cost: "150 gp" },
        "Poción de Curación Superior": { type: "Poción", desc: "Cura 8d4+8 HP.", cost: "450 gp" },
        "Agua bendita": { type: "Objeto Mágico", desc: "Frasco que inflige daño radiante a fiend/undead.", cost: "25 gp" },
        "Antídoto": { type: "Objeto", desc: "Ventaja en salvaciones contra veneno por 1 hora.", cost: "50 gp" },
        "Veneno Básico": { type: "Veneno", desc: "Salvación CON DC 10 o sufre +1d4 daño Veneno.", cost: "100 gp" },
        "Veneno Intermedio": { type: "Veneno", desc: "Salvación CON DC 14 o sufre +3d6 daño Veneno.", cost: "250 gp" },
        "Veneno Avanzado": { type: "Veneno", desc: "Salvación CON DC 18 o sufre +5d6 daño y estado Envenenado.", cost: "500 gp" },

        // Materiales y Toxinas
        "Toxina Botánica": { type: "Material", desc: "Extracto vegetal tóxico básico.", cost: "25 gp" },
        "Toxina Bestial": { type: "Material", desc: "Sustancia venenosa extraída de bestias.", cost: "75 gp" },
        "Toxina Planar": { type: "Material", desc: "Fluido altamente letal de origen planar.", cost: "200 gp" },
        "Concentrado Herbal": { type: "Material", desc: "Extracto líquido verdoso de plantas comunes.", cost: "10 gp" },
        "Concentrado Aceitoso": { type: "Material", desc: "Aceite denso y purificado para alquimia.", cost: "30 gp" },
        "Concentrado Vital": { type: "Material", desc: "Fluido mágico extraído de criaturas feéricas.", cost: "100 gp" },

        // Herramientas y Kits
        "Kit Artesano": { type: "Herramienta", desc: "Repara equipamiento y crea disfraces o arreglos.", cost: "25 gp" },
        "Herramientas de Ladrón": { type: "Herramienta", desc: "Forzar cerraduras y desactivar trampas.", cost: "25 gp" },
        "Kit Herborista": { type: "Herramienta", desc: "Identifica plantas y fabrica pociones de curación.", cost: "5 gp" },
        "Kit Envenenador": { type: "Herramienta", desc: "Refina sustancias letales y aplica venenos en armas.", cost: "50 gp" },

        // Instrumentos Musicales
        "Laúd": { type: "Instrumento", desc: "Instrumento musical de cuerda.", cost: "35 gp" },
        "Lira": { type: "Instrumento", desc: "Pequeño arpa de mano.", cost: "30 gp" },
        "Flauta": { type: "Instrumento", desc: "Flauta de viento sencilla.", cost: "2 gp" },
        "Flauta de pan": { type: "Instrumento", desc: "Conjunto de tubos de caña unidos.", cost: "12 gp" },
        "Tambor": { type: "Instrumento", desc: "Instrumento de percusión.", cost: "6 gp" },
        "Gaita": { type: "Instrumento", desc: "Instrumento de viento con bolsa de aire.", cost: "30 gp" },
        "Cuerno (Bocina)": { type: "Instrumento", desc: "Cuerno acústico para señales o música.", cost: "3 gp" },
        "Dulcémele (Dulcimer)": { type: "Instrumento", desc: "Instrumento de cuerda percutida.", cost: "25 gp" },
        "Chirimía (Caramillo / Shawm)": { type: "Instrumento", desc: "Precursor medieval del oboe.", cost: "2 gp" },
        "Viola (Viol)": { type: "Instrumento", desc: "Instrumento de cuerda frotada.", cost: "30 gp" },

        // Focos Mágicos
        "Foco arcano": { type: "Foco Mágico", desc: "Cristal, orbe o varita para canalizar conjuros arcanos.", cost: "10 gp" },
        "Foco druídico": { type: "Foco Mágico", desc: "Sprig de muérdago o tótem sagrado natural.", cost: "5 gp" },
        "Símbolo sagrado": { type: "Foco Mágico", desc: "Emblema o relicario de una deidad.", cost: "5 gp" },

        // Equipo de Aventurero
        "Abrojos": { type: "Equipo", desc: "Púas de hierro para obstaculizar persecuciones (Bolsa de 20).", cost: "5 cp" },
        "Antorcha": { type: "Equipo", desc: "Proporciona luz brillante durante 1 hora.", cost: "1 cp" },
        "Cuerda de cáñamo (15m)": { type: "Equipo", desc: "Cuerda resistente para escalar o asegurar.", cost: "1 gp" },
        "Frasco": { type: "Equipo", desc: "Recipiente de vidrio o arcilla para líquidos.", cost: "2 cp" },
        "Linterna sorda": { type: "Equipo", desc: "Linterna de haz focalizado.", cost: "10 gp" },
        "Mochila": { type: "Equipo", desc: "Permite cargar equipo de aventura.", cost: "2 gp" },
        "Raciones (1 día)": { type: "Equipo", desc: "Alimentos secos aptos para viaje prolongado.", cost: "5 sp" },
        "Saco de dormir": { type: "Equipo", desc: "Protección cómoda contra la intemperie al descansar.", cost: "1 gp" },
        "Yesquero": { type: "Equipo", desc: "Contiene yesca, pedernal y eslabón para encender fuego.", cost: "5 sp" }
    };

    // Función de reabastecimiento con aleatoriedad real (Fisher-Yates) sobre los ítems de jugador
    const loadShop = () => {
        const itemNames = Object.keys(masterPlayerItemDatabase);
        const shuffled = [...itemNames];
        
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        
        // Tomar 10 objetos aleatorios y estructurarlos con sus datos completos
        const selected = shuffled.slice(0, 10).map(name => ({
            name: name,
            ...masterPlayerItemDatabase[name]
        }));

        setShopItems(selected);
        setItemSearchQuery('');
    };

    // Cargar la tienda al iniciar la pestaña
    useEffect(() => {
        loadShop();
    }, []);

    // Resultados de búsqueda en la base de datos de jugador
    const searchResults = itemSearchQuery.trim() !== ''
        ? Object.keys(masterPlayerItemDatabase)
            .filter(name => name.toLowerCase().includes(itemSearchQuery.toLowerCase()))
            .slice(0, 6)
            .map(name => ({ name, ...masterPlayerItemDatabase[name] }))
        : [];

    // Añadir objeto específico seleccionado desde el buscador
    const addItemToShop = (item) => {
        setShopItems([item, ...shopItems]);
        setItemSearchQuery('');
    };

    // Eliminar un objeto de la vista de la tienda
    const removeItemFromShop = (indexToRemove) => {
        setShopItems(shopItems.filter((_, idx) => idx !== indexToRemove));
    };

    return (
        <div className="flex flex-col gap-5">
            
            {/* CABECERA Y BOTÓN DE REABASTECIMIENTO */}
            <div className="bg-[#323B46] p-4 rounded-xl border border-[#4E5D6F] shadow-sm flex flex-col sm:flex-row justify-between items-center gap-4">
                <h2 className="text-xl font-bold text-[#F1F5F9] flex items-center gap-2">
                    🛒 Tienda
                </h2>

                <button 
                    onClick={loadShop}
                    className="bg-[#475569] hover:bg-[#64748B] text-[#F1F5F9] font-bold px-4 py-2 rounded-lg border border-[#4E5D6F] transition shadow-sm text-xs flex items-center gap-1.5"
                >
                    🔄 Reabastecer Tienda (10 Aleatorios)
                </button>
            </div>

            {/* BARRA DE BÚSQUEDA MANUAL DE OBJETOS */}
            <div className="bg-[#323B46] p-3.5 rounded-xl border border-[#4E5D6F] shadow-sm relative">
                <div className="relative w-full">
                    <input 
                        type="text"
                        placeholder="🔍 Buscar objeto específico para añadir..."
                        value={itemSearchQuery}
                        onChange={(e) => setItemSearchQuery(e.target.value)}
                        className="w-full bg-[#252B33] border border-[#4E5D6F] rounded-lg p-2.5 text-xs text-[#F1F5F9] focus:outline-none focus:border-[#64748B] shadow-inner"
                    />
                    
                    {/* DESPLEGABLE DE RESULTADOS */}
                    {searchResults.length > 0 && (
                        <div className="absolute left-0 right-0 mt-1 bg-[#252B33] border border-[#4E5D6F] rounded-xl shadow-2xl z-50 overflow-hidden flex flex-col">
                            {searchResults.map((item, idx) => (
                                <div 
                                    key={idx}
                                    onClick={() => addItemToShop(item)}
                                    className="px-3 py-2.5 text-xs text-[#F1F5F9] hover:bg-[#3E4A59] cursor-pointer border-b border-[#4E5D6F] last:border-0 flex justify-between items-center transition"
                                >
                                    <span className="font-semibold">{item.name}</span>
                                    <span className="text-[10px] text-[#34D399]">
                                        {item.cost} ➕
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* GRID DE 10 OBJETOS EN LA TIENDA */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {shopItems.length === 0 ? (
                    <div className="col-span-full text-center p-12 bg-[#323B46] border border-dashed border-[#4E5D6F] rounded-xl text-[#94A3B8] italic text-xs">
                        La tienda está vacía. Usa el buscador superior para añadir objetos o haz clic en reabastecer.
                    </div>
                ) : (
                    shopItems.map((item, idx) => (
                        <div key={idx} className="bg-[#323B46] border border-[#4E5D6F] rounded-xl p-4 shadow-sm flex flex-col justify-between gap-3 relative group">
                            
                            {/* Botón para quitar objeto individual */}
                            <button 
                                onClick={() => removeItemFromShop(idx)}
                                className="absolute top-2 right-2 text-[#94A3B8] hover:text-red-400 font-bold px-1.5 rounded bg-[#252B33] border border-[#4E5D6F] text-xs transition shadow-sm"
                                title="Quitar de la tienda"
                            >
                                &times;
                            </button>

                            <div>
                                <div className="flex justify-between items-start gap-2 mb-1 pr-5">
                                    <h3 className="font-bold text-sm text-[#F1F5F9]">{item.name}</h3>
                                    <span className="bg-[#252B33] text-[#34D399] border border-[#4E5D6F] px-2 py-0.5 rounded text-[10px] font-bold shrink-0">
                                        {item.cost}
                                    </span>
                                </div>
                                <p className="text-[10px] text-[#94A3B8] italic mb-2">
                                    {item.type} {item.damage ? `• Daño: ${item.damage}` : ''}
                                </p>
                                <div className="text-xs text-[#CBD5E1] leading-relaxed line-clamp-4">
                                    {item.desc || item.properties || 'Sin descripción detallada.'}
                                </div>
                            </div>
                            <div className="border-t border-[#4E5D6F] pt-2 flex justify-between items-center text-[10px] text-[#94A3B8]">
                                <span>{item.properties ? `Prop: ${item.properties}` : 'Objeto estándar'}</span>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};