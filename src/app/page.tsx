'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

// Oficinas SERNAPESCA por region
const OFICINAS = [
  { id: 1, nombre: 'SERNAPESCA Arica y Parinacota', region: 'Arica y Parinacota', ciudad: 'Arica', direccion: '21 de Mayo 269', telefono: '58 2232548', servicios: ['Registro Pescadores', 'Permisos', 'Fiscalizacion'] },
  { id: 2, nombre: 'SERNAPESCA Tarapaca', region: 'Tarapaca', ciudad: 'Iquique', direccion: 'Arturo Prat 827', telefono: '57 2411224', servicios: ['Registro Pescadores', 'Permisos', 'Acuicultura'] },
  { id: 3, nombre: 'SERNAPESCA Antofagasta', region: 'Antofagasta', ciudad: 'Antofagasta', direccion: 'Washington 2675', telefono: '55 2268470', servicios: ['Registro Pescadores', 'Permisos', 'Certificaciones'] },
  { id: 4, nombre: 'SERNAPESCA Atacama', region: 'Atacama', ciudad: 'Caldera', direccion: 'Gana 350', telefono: '52 2316244', servicios: ['Registro Pescadores', 'Permisos', 'Vedas'] },
  { id: 5, nombre: 'SERNAPESCA Coquimbo', region: 'Coquimbo', ciudad: 'Coquimbo', direccion: 'Melgarejo 851', telefono: '51 2312117', servicios: ['Registro Pescadores', 'Permisos', 'Acuicultura'] },
  { id: 6, nombre: 'SERNAPESCA Valparaiso', region: 'Valparaiso', ciudad: 'Valparaiso', direccion: 'Blanco 1048', telefono: '32 2219018', servicios: ['Registro Pescadores', 'Permisos', 'Exportacion'] },
  { id: 7, nombre: 'SERNAPESCA Metropolitana', region: 'Metropolitana', ciudad: 'Santiago', direccion: 'Victoria Subercaseaux 16', telefono: '2 26704000', servicios: ['Direccion Nacional', 'Certificaciones', 'Exportacion'] },
  { id: 8, nombre: 'SERNAPESCA OHiggins', region: 'OHiggins', ciudad: 'Pichilemu', direccion: 'Ortuzar 516', telefono: '72 2841134', servicios: ['Registro Pescadores', 'Permisos', 'Fiscalizacion'] },
  { id: 9, nombre: 'SERNAPESCA Maule', region: 'Maule', ciudad: 'Constitucion', direccion: 'Freire 450', telefono: '71 2671307', servicios: ['Registro Pescadores', 'Permisos', 'Algas'] },
  { id: 10, nombre: 'SERNAPESCA Biobio', region: 'Biobio', ciudad: 'Talcahuano', direccion: 'Blanco Encalada 443', telefono: '41 2544436', servicios: ['Registro Pescadores', 'Permisos', 'Industrial'] },
  { id: 11, nombre: 'SERNAPESCA Araucania', region: 'Araucania', ciudad: 'Puerto Saavedra', direccion: 'Arturo Prat 451', telefono: '45 2461234', servicios: ['Registro Pescadores', 'Permisos', 'Lacustre'] },
  { id: 12, nombre: 'SERNAPESCA Los Rios', region: 'Los Rios', ciudad: 'Valdivia', direccion: 'OHiggins 393', telefono: '63 2213548', servicios: ['Registro Pescadores', 'Permisos', 'Acuicultura'] },
  { id: 13, nombre: 'SERNAPESCA Los Lagos', region: 'Los Lagos', ciudad: 'Puerto Montt', direccion: 'Angelmó 1680', telefono: '65 2254800', servicios: ['Registro Pescadores', 'Permisos', 'Salmon', 'Mitilidos'] },
  { id: 14, nombre: 'SERNAPESCA Aysen', region: 'Aysen', ciudad: 'Puerto Aysen', direccion: 'Sargento Aldea 1050', telefono: '67 2336235', servicios: ['Registro Pescadores', 'Permisos', 'Salmon', 'Merluza'] },
  { id: 15, nombre: 'SERNAPESCA Magallanes', region: 'Magallanes', ciudad: 'Punta Arenas', direccion: 'Lautaro Navarro 1029', telefono: '61 2241479', servicios: ['Registro Pescadores', 'Permisos', 'Centolla', 'Merluza'] },
  { id: 16, nombre: 'SERNAPESCA Isla de Pascua', region: 'Valparaiso', ciudad: 'Hanga Roa', direccion: 'Atamu Tekena s/n', telefono: '32 2551024', servicios: ['Registro Pescadores', 'Pesca Artesanal'] }
];

const REGIONES = ['Todas', 'Arica y Parinacota', 'Tarapaca', 'Antofagasta', 'Atacama', 'Coquimbo', 'Valparaiso', 'Metropolitana', 'OHiggins', 'Maule', 'Biobio', 'Araucania', 'Los Rios', 'Los Lagos', 'Aysen', 'Magallanes'];

// Tipos de permisos y licencias
const PERMISOS = [
  { nombre: 'Registro Pescador Artesanal (RPA)', icono: '🎣', descripcion: 'Habilitacion para ejercer pesca artesanal', requisitos: ['Cedula identidad', 'Declaracion residencia', 'Curso basico'], costo: 'Gratuito', vigencia: 'Indefinido' },
  { nombre: 'Autorizacion de Pesca Artesanal', icono: '📜', descripcion: 'Permiso para pescar especies con cuota', requisitos: ['RPA vigente', 'Embarcacion inscrita', 'Sin sanciones'], costo: 'Gratuito', vigencia: 'Anual' },
  { nombre: 'Permiso Pesca Recreativa', icono: '🏖️', descripcion: 'Para pesca deportiva y recreativa', requisitos: ['Cedula identidad', 'Formulario online'], costo: '$5.000 - $15.000', vigencia: '1 dia a 1 año' },
  { nombre: 'Licencia Pesca Submarina', icono: '🤿', descripcion: 'Habilitacion para buceo extractivo', requisitos: ['RPA', 'Curso buceo', 'Certificado medico'], costo: '$10.000', vigencia: 'Anual' },
  { nombre: 'Autorizacion Recolector Orilla', icono: '🦪', descripcion: 'Extraccion de mariscos sin embarcacion', requisitos: ['RPA', 'Zona asignada', 'Sin sanciones'], costo: 'Gratuito', vigencia: 'Anual' },
  { nombre: 'Concesion Acuicultura', icono: '🐟', descripcion: 'Permiso para cultivo de especies marinas', requisitos: ['Estudio impacto', 'Proyecto tecnico', 'Garantia'], costo: 'Variable', vigencia: '25 años' }
];

// Especies principales y vedas
const ESPECIES = [
  { especie: 'Merluza Comun', icono: '🐟', zona: 'IV a X Region', temporada: 'Todo el año', talla: '35 cm', estado: 'Cuota' },
  { especie: 'Congrio Dorado', icono: '🐍', zona: 'IV a XII Region', temporada: 'Todo el año', talla: '55 cm', estado: 'Libre' },
  { especie: 'Reineta', icono: '🐠', zona: 'V a X Region', temporada: 'Marzo - Diciembre', talla: '30 cm', estado: 'Cuota' },
  { especie: 'Loco', icono: '🐚', zona: 'III a XII Region', temporada: 'Julio - Diciembre', talla: '10 cm', estado: 'Veda parcial' },
  { especie: 'Centolla', icono: '🦀', zona: 'XI y XII Region', temporada: 'Julio - Noviembre', talla: '12 cm caparazon', estado: 'Cuota' },
  { especie: 'Erizo', icono: '🦔', zona: 'I a XII Region', temporada: 'Variable por zona', talla: '7 cm', estado: 'Area de manejo' },
  { especie: 'Jibia', icono: '🦑', zona: 'III a X Region', temporada: 'Todo el año', talla: 'Sin talla', estado: 'Libre' },
  { especie: 'Salmon', icono: '🐟', zona: 'X a XII Region', temporada: 'Acuicultura', talla: 'N/A', estado: 'Cultivo' }
];

// Glosario pesquero
const GLOSARIO = [
  { termino: 'SERNAPESCA', definicion: 'Servicio Nacional de Pesca y Acuicultura, fiscaliza y administra la actividad pesquera' },
  { termino: 'RPA', definicion: 'Registro de Pescador Artesanal, inscripcion obligatoria para ejercer pesca artesanal' },
  { termino: 'Veda', definicion: 'Prohibicion temporal de extraccion de una especie para proteger su reproduccion' },
  { termino: 'Cuota', definicion: 'Limite maximo de captura permitido por temporada para una especie' },
  { termino: 'AMERB', definicion: 'Area de Manejo y Explotacion de Recursos Bentonicos, zona asignada a pescadores' },
  { termino: 'Talla Minima', definicion: 'Tamano minimo legal que debe tener un ejemplar para ser extraido' },
  { termino: 'Pesca Artesanal', definicion: 'Actividad pesquera con embarcaciones menores a 18 metros de eslora' },
  { termino: 'Pesca Industrial', definicion: 'Actividad pesquera con embarcaciones mayores, sujeta a cuotas industriales' },
  { termino: 'Desembarque', definicion: 'Descarga de la captura en puerto, debe ser declarada a SERNAPESCA' },
  { termino: 'Bitacora', definicion: 'Registro obligatorio de capturas, zonas y esfuerzo de pesca' },
  { termino: 'Caleta', definicion: 'Puerto o fondeadero donde operan los pescadores artesanales' },
  { termino: 'Marea Roja', definicion: 'Fenomeno toxico que prohibe extraccion de mariscos en zonas afectadas' }
];

export default function PescaPage() {
  const [busqueda, setBusqueda] = useState('');
  const [regionFiltro, setRegionFiltro] = useState('Todas');
  const [mostrarResultados, setMostrarResultados] = useState(false);

  // Calculadora de cuota
  const [tipoPermiso, setTipoPermiso] = useState('recreativa_dia');
  const [cantidadDias, setCantidadDias] = useState('1');
  const [tipoEmbarcacion, setTipoEmbarcacion] = useState('sin_embarcacion');

  const oficinasFiltradas = OFICINAS.filter(oficina => {
    const coincideBusqueda = oficina.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
                             oficina.ciudad.toLowerCase().includes(busqueda.toLowerCase()) ||
                             oficina.servicios.some(s => s.toLowerCase().includes(busqueda.toLowerCase()));
    const coincideRegion = regionFiltro === 'Todas' || oficina.region === regionFiltro;
    return coincideBusqueda && coincideRegion;
  });

  const calcularCostoPermiso = () => {
    const dias = parseInt(cantidadDias) || 1;

    const tarifas: Record<string, number> = {
      'recreativa_dia': 5000,
      'recreativa_semana': 10000,
      'recreativa_mes': 15000,
      'recreativa_anual': 25000,
      'submarina': 10000
    };

    const costoBase = tarifas[tipoPermiso] || 5000;

    let costoTotal = costoBase;
    if (tipoPermiso === 'recreativa_dia') {
      costoTotal = costoBase * Math.min(dias, 7);
    }

    const embarcacionCosto = tipoEmbarcacion === 'con_embarcacion' ? 5000 : 0;

    return {
      costoBase,
      embarcacionCosto,
      costoTotal: costoTotal + embarcacionCosto,
      descripcion: tipoPermiso.includes('recreativa') ? 'Pesca Recreativa' : 'Pesca Submarina'
    };
  };

  const resultado = calcularCostoPermiso();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Header */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500 rounded-full filter blur-3xl" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-cyan-500 rounded-full filter blur-3xl" />
        </div>

        <div className="max-w-6xl mx-auto px-4 py-16 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <span className="text-6xl mb-4 block">🐟</span>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Pesca y Acuicultura
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Oficinas SERNAPESCA, permisos de pesca, vedas, especies y calculadora de licencias
            </p>

            <div className="flex flex-wrap justify-center gap-4 mt-6">
              <span className="px-4 py-2 bg-blue-500/20 rounded-full text-blue-300 text-sm">
                🎣 Pesca Artesanal
              </span>
              <span className="px-4 py-2 bg-cyan-500/20 rounded-full text-cyan-300 text-sm">
                🦞 Mariscos
              </span>
              <span className="px-4 py-2 bg-teal-500/20 rounded-full text-teal-300 text-sm">
                🐟 Acuicultura
              </span>
            </div>
          </motion.div>
        </div>
      </header>

      {/* Buscador de Oficinas SERNAPESCA */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
        >
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <span>🔍</span> Buscador de Oficinas SERNAPESCA
          </h2>

          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div className="md:col-span-2">
              <label className="block text-sm text-gray-400 mb-2">Buscar por ciudad o servicio</label>
              <input
                type="text"
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                onFocus={() => setMostrarResultados(true)}
                placeholder="Ej: Puerto Montt, salmon, permisos..."
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">Region</label>
              <select
                value={regionFiltro}
                onChange={(e) => setRegionFiltro(e.target.value)}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-blue-500"
              >
                {REGIONES.map(region => (
                  <option key={region} value={region} className="bg-slate-800">{region}</option>
                ))}
              </select>
            </div>
          </div>

          <button
            onClick={() => setMostrarResultados(true)}
            className="w-full py-3 bg-gradient-to-r from-blue-500 to-cyan-600 text-white font-bold rounded-xl hover:from-blue-600 hover:to-cyan-700 transition"
          >
            🔍 Buscar Oficinas ({oficinasFiltradas.length} encontradas)
          </button>

          {mostrarResultados && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mt-6 space-y-4 max-h-96 overflow-y-auto"
            >
              {oficinasFiltradas.map((oficina) => (
                <div key={oficina.id} className="bg-white/5 rounded-xl p-4 border border-white/10">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-white">{oficina.nombre}</h3>
                      <p className="text-blue-400 text-sm">📞 {oficina.telefono}</p>
                    </div>
                    <span className="px-3 py-1 bg-blue-500/20 rounded-full text-blue-300 text-xs">
                      {oficina.region}
                    </span>
                  </div>
                  <p className="text-gray-400 text-sm mt-2">📍 {oficina.direccion}, {oficina.ciudad}</p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {oficina.servicios.map((servicio, i) => (
                      <span key={i} className="px-2 py-1 bg-cyan-500/20 rounded text-xs text-cyan-300">
                        {servicio}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </motion.div>
      </section>

      {/* Calculadora de Permisos */}
      <section className="max-w-6xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-cyan-600/20 to-blue-600/20 rounded-2xl p-6 border border-cyan-500/30"
        >
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <span>🧮</span> Calculadora de Permiso de Pesca Recreativa
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Tipo de Permiso</label>
                <select
                  value={tipoPermiso}
                  onChange={(e) => setTipoPermiso(e.target.value)}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-cyan-500"
                >
                  <option value="recreativa_dia" className="bg-slate-800">Pesca Recreativa - Diario</option>
                  <option value="recreativa_semana" className="bg-slate-800">Pesca Recreativa - Semanal</option>
                  <option value="recreativa_mes" className="bg-slate-800">Pesca Recreativa - Mensual</option>
                  <option value="recreativa_anual" className="bg-slate-800">Pesca Recreativa - Anual</option>
                  <option value="submarina" className="bg-slate-800">Pesca Submarina - Anual</option>
                </select>
              </div>

              {tipoPermiso === 'recreativa_dia' && (
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Cantidad de Dias</label>
                  <input
                    type="number"
                    value={cantidadDias}
                    onChange={(e) => setCantidadDias(e.target.value)}
                    min="1"
                    max="7"
                    placeholder="1-7 dias"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500"
                  />
                </div>
              )}

              <div>
                <label className="block text-sm text-gray-400 mb-2">Embarcacion</label>
                <select
                  value={tipoEmbarcacion}
                  onChange={(e) => setTipoEmbarcacion(e.target.value)}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-cyan-500"
                >
                  <option value="sin_embarcacion" className="bg-slate-800">Sin embarcacion (orilla)</option>
                  <option value="con_embarcacion" className="bg-slate-800">Con embarcacion (+$5.000)</option>
                </select>
              </div>

              <div className="p-4 bg-blue-500/20 rounded-xl">
                <p className="text-sm text-blue-300">
                  💡 El permiso se obtiene en linea en www.sernapesca.cl o en oficinas regionales
                </p>
              </div>
            </div>

            <div className="bg-white/5 rounded-xl p-6">
              <div className="text-center mb-6">
                <p className="text-gray-400 mb-2">Costo Total Estimado</p>
                <p className="text-5xl font-bold text-cyan-400">
                  ${resultado.costoTotal.toLocaleString('es-CL')}
                </p>
                <p className="text-gray-500 mt-2">{resultado.descripcion}</p>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-gray-400">
                  <span>Permiso base:</span>
                  <span className="text-white">${resultado.costoBase.toLocaleString('es-CL')}</span>
                </div>
                {resultado.embarcacionCosto > 0 && (
                  <div className="flex justify-between text-gray-400">
                    <span>Embarcacion:</span>
                    <span className="text-white">+${resultado.embarcacionCosto.toLocaleString('es-CL')}</span>
                  </div>
                )}
                <div className="flex justify-between text-gray-400 border-t border-white/10 pt-2">
                  <span>Total:</span>
                  <span className="text-cyan-400 font-bold">${resultado.costoTotal.toLocaleString('es-CL')}</span>
                </div>
              </div>

              <div className="mt-4 p-3 bg-cyan-500/20 rounded-lg">
                <p className="text-xs text-cyan-300">
                  ⚠️ Valores referenciales. Consulta tarifas vigentes en SERNAPESCA
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Permisos y Licencias */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
          <span>📋</span> Permisos y Licencias de Pesca
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PERMISOS.map((permiso, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i }}
              className="bg-white/5 backdrop-blur rounded-xl p-6 border border-white/10 hover:border-blue-500/50 transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <span className="text-4xl">{permiso.icono}</span>
                <span className="px-3 py-1 bg-blue-500/20 rounded-full text-blue-300 text-xs">
                  {permiso.vigencia}
                </span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{permiso.nombre}</h3>
              <p className="text-gray-400 text-sm mb-3">{permiso.descripcion}</p>

              <div className="flex justify-between items-center text-sm mb-4">
                <span className="text-gray-500">Costo:</span>
                <span className="text-cyan-400 font-medium">{permiso.costo}</span>
              </div>

              <div className="border-t border-white/10 pt-3">
                <p className="text-xs text-gray-500 mb-2">Requisitos:</p>
                <ul className="space-y-1">
                  {permiso.requisitos.map((req, j) => (
                    <li key={j} className="text-xs text-gray-400 flex items-center gap-2">
                      <span className="text-blue-400">✓</span> {req}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Especies y Vedas */}
      <section className="bg-white/5 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
            <span>🦞</span> Especies Principales y Regulaciones
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {ESPECIES.map((especie, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * i }}
                className="bg-gradient-to-br from-blue-600/20 to-cyan-600/20 rounded-xl p-4 border border-blue-500/30"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-3xl">{especie.icono}</span>
                  <div>
                    <h3 className="font-bold text-white text-sm">{especie.especie}</h3>
                    <p className="text-xs text-gray-400">{especie.zona}</p>
                  </div>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Temporada:</span>
                    <span className="text-white">{especie.temporada}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Talla minima:</span>
                    <span className="text-white">{especie.talla}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Estado:</span>
                    <span className={`font-medium ${
                      especie.estado === 'Libre' ? 'text-green-400' :
                      especie.estado.includes('Veda') ? 'text-red-400' : 'text-yellow-400'
                    }`}>
                      {especie.estado}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-red-500/20 rounded-xl border border-red-500/30">
            <p className="text-sm text-red-300">
              ⚠️ <strong>Importante:</strong> Las vedas y cuotas cambian periodicamente. Consulta siempre en SERNAPESCA antes de pescar. La extraccion en veda tiene multas de hasta $50.000 por ejemplar.
            </p>
          </div>
        </div>
      </section>

      {/* Pasos para obtener RPA */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
          <span>📝</span> Como Obtener el Registro de Pescador Artesanal
        </h2>

        <div className="grid md:grid-cols-6 gap-4">
          {[
            { paso: '1', titulo: 'Requisitos', desc: 'Cedula y residencia costera', icono: '📋' },
            { paso: '2', titulo: 'Curso', desc: 'Capacitacion basica (16 hrs)', icono: '📚' },
            { paso: '3', titulo: 'Solicitud', desc: 'En oficina SERNAPESCA', icono: '🏢' },
            { paso: '4', titulo: 'Revision', desc: 'Verificacion antecedentes', icono: '🔍' },
            { paso: '5', titulo: 'Registro', desc: 'Inscripcion en RPA', icono: '✅' },
            { paso: '6', titulo: 'Credencial', desc: 'Recibe tu carnet RPA', icono: '🪪' }
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i }}
              className="text-center"
            >
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center mx-auto mb-3 text-2xl">
                {item.icono}
              </div>
              <div className="text-xs text-blue-400 mb-1">Paso {item.paso}</div>
              <h3 className="font-bold text-white text-sm">{item.titulo}</h3>
              <p className="text-xs text-gray-500 mt-1">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Glosario */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
          <span>📖</span> Glosario Pesquero
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {GLOSARIO.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.05 * i }}
              className="bg-white/5 rounded-xl p-4 border border-white/10"
            >
              <h3 className="font-bold text-blue-400 mb-2">{item.termino}</h3>
              <p className="text-sm text-gray-400">{item.definicion}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Recursos */}
      <section className="bg-gradient-to-r from-blue-600/20 to-cyan-600/20 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
            <span>🔗</span> Recursos Oficiales
          </h2>

          <div className="grid md:grid-cols-4 gap-4">
            {[
              { nombre: 'SERNAPESCA', url: 'https://www.sernapesca.cl', icono: '🐟', desc: 'Servicio Nacional de Pesca' },
              { nombre: 'Pesca Recreativa', url: 'https://www.sernapesca.cl/area-de-trabajo/pesca-recreativa', icono: '🎣', desc: 'Permisos online' },
              { nombre: 'Subpesca', url: 'https://www.subpesca.cl', icono: '📊', desc: 'Subsecretaria de Pesca' },
              { nombre: 'Vedas Vigentes', url: 'https://www.sernapesca.cl/informacion-utilidad/vedas-extractivas', icono: '🚫', desc: 'Consulta vedas actuales' }
            ].map((recurso, i) => (
              <a
                key={i}
                href={recurso.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl p-4 transition-all"
              >
                <span className="text-2xl mb-2 block">{recurso.icono}</span>
                <h3 className="font-bold text-white text-sm">{recurso.nombre}</h3>
                <p className="text-xs text-gray-500 mt-1">{recurso.desc}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-500 text-sm">
            Pesca y Acuicultura - Parte de{' '}
            <a href="https://newcool-informada.vercel.app" className="text-blue-400 hover:underline">
              NewCooltura Informada
            </a>
          </p>
          <p className="text-gray-600 text-xs mt-2">
            Informacion basada en datos oficiales de SERNAPESCA
          </p>
        </div>
      </footer>
    </div>
  );
}
