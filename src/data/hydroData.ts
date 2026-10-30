import { HydroStationData, QuizQuestion } from '../types/hydro';

export const HYDRO_STATIONS: Record<'flujo' | 'embalse' | 'bombeo', HydroStationData> = {
  flujo: {
    id: 'flujo',
    shortName: 'Por Flujo (Pasada)',
    title: 'Central Hidroeléctrica de Pasada (Por Flujo)',
    subtitle: 'Aprovechamiento directo del caudal fluvial sin embalsamiento significativo',
    tagline: 'Generación continua y bajo impacto paisajístico sujeta a la hidrología natural del río',
    description:
      'Las centrales de agua fluyente o por flujo aprovechan la corriente continua de un río sin acumular grandes reservas de agua. Utilizan un azud de derivación para captar una fracción del caudal, dirigiéndola mediante un canal de aducción hasta una cámara de carga. Desde allí, el agua cae por una tubería forzada hacia las turbinas (habitualmente Kaplan o Francis) y se devuelve íntegramente al cauce natural aguas abajo mediante un canal de restitución.',
    headRange: '5 - 50 m (Salto bajo a moderado)',
    flowRange: '10 - 450 m³/s (Caudal constante o variable según estación)',
    typicalTurbines: ['Kaplan (álabes y directrices regulables)', 'Francis de baja caída', 'Bulbo / Sifón'],
    regulationCapacity: 'Nula o horaria muy reducida (energía no gestionable, depende del río)',
    startUpTime: '2 a 5 minutos',
    defaultHead: 25,
    minHead: 5,
    maxHead: 60,
    defaultFlow: 80,
    minFlow: 10,
    maxFlow: 300,
    defaultEfficiency: 0.89,
    environmentalPros: [
      'Sin inundación de grandes valles ni alteración masiva de microclimas',
      'Mantenimiento continuo del caudal ecológico en el cauce original',
      'Huella de carbono de construcción significativamente inferior a las grandes presas',
      'Paso de peces y escalas bio-ambientales más sencillas de integrar'
    ],
    environmentalCons: [
      'Producción sujeta a épocas de estiaje (sequía) o avenidas no reguladas',
      'Incapacidad de almacenar excedentes para cubrir picos de demanda nocturnos/invernales',
      'Riesgo de colmatación por sedimentos finos en el canal y desarenador'
    ],
    components: [
      {
        id: 'rio_captacion',
        name: 'Cauce del Río y Azud de Derivación',
        category: 'captacion',
        tag: 'Captación Inicial',
        description:
          'Estructura de hormigón transversal al río de poca altura (presa vertedora) que eleva ligeramente el nivel de la lámina de agua para permitir la captación por gravedad hacia la obra de toma sin inundar el entorno.',
        physicsPrinciple: 'Energía potencial estática y conservación de masa: Q_total = Q_turbinado + Q_ecológico',
        materials: 'Hormigón ciclópeo o escollera compactada con vertedero de coronación libre.',
        keyFact: 'Debe respetar obligatoriamente el Caudal Ecológico ambiental para preservar el ecosistema acuático aguas abajo.',
        coords: { x: 12, y: 35 }
      },
      {
        id: 'rejas_toma',
        name: 'Reja de Desbaste y Obra de Toma',
        category: 'captacion',
        tag: 'Filtrado Primario',
        description:
          'Conjunto de barrotes metálicos dispuestos con separación calculada (20 a 50 mm) para interceptar troncos, ramas y detritos flotantes antes de que penetren al canal.',
        physicsPrinciple: 'Pérdida de carga menor por fricción de rejas hidrodinámicas: Δh = K · (v² / 2g)',
        materials: 'Acero estructural galvanizado con sistema de limpia-rejas automático.',
        keyFact: 'Una reja obstruida reduce drásticamente el caudal y puede causar cavitación en la turbina.',
        coords: { x: 22, y: 32 }
      },
      {
        id: 'canal_aduccion',
        name: 'Canal de Aducción / Derivación',
        category: 'conduccion',
        tag: 'Transporte a Lámina Libre',
        description:
          'Conducción artificial a cielo abierto que transporta el agua a cota casi horizontal con una pendiente mínima (0.5 a 1 por mil), maximizando la altura de caída disponible al llegar a la central.',
        physicsPrinciple: 'Ecuación de Manning para flujo uniforme en canal abierto: V = (1/n) · R_h^(2/3) · S^(1/2)',
        materials: 'Hormigón armado en solera y taludes para evitar infiltraciones y pérdidas.',
        keyFact: 'El agua se desplaza a baja velocidad (0.8 a 1.5 m/s) para evitar erosiones hidráulicas en las paredes.',
        coords: { x: 34, y: 30 }
      },
      {
        id: 'desarenador',
        name: 'Desarenador (Sedimentador)',
        category: 'captacion',
        tag: 'Purificación Física',
        description:
          'Ensanchamiento y profundización del canal donde la velocidad del agua desciende por debajo de 0.25 m/s, permitiendo que las arenas y partículas abrasivas decanten por gravedad al fondo.',
        physicsPrinciple: 'Ley de Stokes para la velocidad de sedimentación de partículas sólidas en fluido viscoso',
        materials: 'Cubeta de hormigón con tolvas de purga inferior y compuertas de lavado rápido.',
        keyFact: 'Evita el desgaste abrasivo por impacto de arena en los rodetes de la turbina.',
        coords: { x: 44, y: 30 }
      },
      {
        id: 'camara_carga',
        name: 'Cámara de Carga y Aliviadero',
        category: 'regulacion',
        tag: 'Transición Hidráulica',
        description:
          'Depósito terminal del canal de aducción que asegura la sumergencia de la embocadura de la tubería forzada, impidiendo la entrada de vórtices de aire hacia la turbina. Cuenta con un aliviadero lateral para verter excedentes.',
        physicsPrinciple: 'Condición de no descebado: Altura mínima de sumergencia para supresión de vórtices de entrada',
        materials: 'Depósito de hormigón con compuertas de cierre rápido (by-pass de seguridad).',
        keyFact: 'Si la central sufre un disparo eléctrico repentino, el caudal excedente se desvía por el aliviadero sin desbordar el canal.',
        coords: { x: 57, y: 30 }
      },
      {
        id: 'tuberia_forzada',
        name: 'Tubería Forzada (Penstock)',
        category: 'conduccion',
        tag: 'Presión Hidrostática',
        description:
          'Conducto a presión de fuerte pendiente que desciende desde la cámara de carga hasta la casa de máquinas, transformando la energía potencial del salto en energía cinética y de presión.',
        physicsPrinciple: 'Ecuación de Bernoulli: P_1/γ + z_1 + v_1²/(2g) = P_2/γ + z_2 + v_2²/(2g) + h_f',
        materials: 'Acero soldado de alta resistencia o PRFV apoyado sobre machones de hormigón.',
        keyFact: 'Soporta presiones proporcionales a la altura del salto: a 50 m de caída, la presión es de ~5 bar (500 kPa).',
        coords: { x: 67, y: 48 }
      },
      {
        id: 'casa_maquinas',
        name: 'Turbina Hidráulica (Kaplan / Francis)',
        category: 'generacion',
        tag: 'Conversión Mecánica',
        description:
          'Máquina motriz donde el flujo de agua impacta los álabes del rodete a alta velocidad, transfiriendo su momento angular al eje rotatorio con un rendimiento superior al 90%.',
        physicsPrinciple: 'Teorema de la cantidad de movimiento de Euler para turbomáquinas: P_m = ρ · Q · (u_1 · c_1u - u_2 · c_2u)',
        materials: 'Acero inoxidable martensítico con aleación cromo-níquel resistente a la cavitación.',
        keyFact: 'Las turbinas Kaplan cuentan con álabes orientables tanto en el distribuidor como en el rodete para adaptarse a caudales cambiantes.',
        coords: { x: 77, y: 70 }
      },
      {
        id: 'generador_sincrono',
        name: 'Generador Eléctrico Síncrono',
        category: 'electrico',
        tag: 'Conversión Electromagnética',
        description:
          'Rotor imantado que gira accionado por el eje de la turbina dentro de un estator bobinado, induciendo corriente alterna trifásica a frecuencia constante (50 Hz o 60 Hz).',
        physicsPrinciple: 'Ley de Faraday-Lenz: Fem inducida ε = -dΦ/dt y sincronismo n = 60 · f / p',
        materials: 'Chapas magnéticas de acero al silicio con devanados de cobre electrolítico refrigerados por aire.',
        keyFact: 'Alcanza una eficiencia del 97% al 98.5% en la conversión de par mecánico a electricidad.',
        coords: { x: 77, y: 60 }
      },
      {
        id: 'transformador',
        name: 'Transformador Elevador y Red',
        category: 'electrico',
        tag: 'Transporte Eléctrico',
        description:
          'Transforma la tensión de generación (media tensión: 6 a 15 kV) a alta tensión (66 a 220 kV) para su inyección eficiente a la red de transporte con mínimas pérdidas por efecto Joule.',
        physicsPrinciple: 'Pérdidas de Joule P_loss = I² · R; al elevar la tensión V, se reduce la corriente I proporcionalmente',
        materials: 'Núcleo de grano orientado inmerso en aceite dieléctrico vegetal o mineral.',
        keyFact: 'Permite transportar energía limpia generada en el río a ciudades situadas a cientos de kilómetros.',
        coords: { x: 88, y: 55 }
      },
      {
        id: 'restitucion',
        name: 'Canal de Desagüe / Restitución',
        category: 'restitucion',
        tag: 'Retorno Fluvial',
        description:
          'Conducto difusor (tubo de aspiración) que frena suavemente el agua expulsada por la turbina recuperando presión residual, retornando el 100% del caudal al lecho original del río.',
        physicsPrinciple: 'Efecto Venturi y recuperación de energía cinética mediante difusor cónico divergente',
        materials: 'Canal excavado y protegido con escollera en el punto de entrega para prevenir socavación.',
        keyFact: 'El agua no sufre ninguna alteración química; sale a la misma calidad biológica con la que ingresó.',
        coords: { x: 86, y: 80 }
      }
    ],
    stepGuide: [
      {
        step: 1,
        title: 'Captación en el Azud',
        description: 'El agua del río es derivada hacia la toma mediante un azud de baja altura que asegura el caudal ecológico continuo.',
        targetComponentId: 'rio_captacion'
      },
      {
        step: 2,
        title: 'Filtrado y Decantación',
        description: 'La reja de desbaste frena sólidos gruesos y el desarenador sedimenta arenas antes de entrar a la tubería.',
        targetComponentId: 'desarenador'
      },
      {
        step: 3,
        title: 'Aceleración en Tubería Forzada',
        description: 'Desde la cámara de carga, el agua desciende velozmente acumulando presión hidrostática y energía cinética.',
        targetComponentId: 'tuberia_forzada'
      },
      {
        step: 4,
        title: 'Conversión en la Turbina y Generador',
        description: 'El rodete hidráulico gira impulsando el generador síncrono que produce electricidad limpia.',
        targetComponentId: 'casa_maquinas'
      },
      {
        step: 5,
        title: 'Elevación de Tensión y Retorno al Río',
        description: 'El transformador inyecta la energía a la red eléctrica y el agua se restituye íntegra y cristalina al cauce fluvial.',
        targetComponentId: 'restitucion'
      }
    ]
  },

  embalse: {
    id: 'embalse',
    shortName: 'Con Embalse (Regulación)',
    title: 'Central Hidroeléctrica con Embalse (Presa)',
    subtitle: 'Almacenamiento masivo de agua y salto de gran altura con capacidad de regulación estacional',
    tagline: 'Energía renovable gestionable de arranque inmediato para estabilidad de la red eléctrica nacional',
    description:
      'Las centrales con embalse almacenan grandes volúmenes de agua mediante una presa de hormigón o escollera construida en una cuenca o garganta montañosa. Acumulan agua durante las épocas de lluvias o deshielo para turbinarla cuando el consumo eléctrico alcanza su máxima demanda. Permiten saltos hidráulicos desde 40 hasta más de 1.000 metros, utilizando turbinas Francis o Pelton con una alta capacidad de control y servicios auxiliares para la red.',
    headRange: '40 - 1.200 m (Salto medio a muy alto)',
    flowRange: '5 - 800 m³/s (Caudal regulado según horario y demanda)',
    typicalTurbines: ['Francis (saltos medios 50-400 m)', 'Pelton (grandes saltos >400 m de alta presión)'],
    regulationCapacity: 'Muy Alta (Regulación diaria, semanal o hiperanual)',
    startUpTime: '1 a 3 minutos (Capacidad Black-Start de arranque en frío)',
    defaultHead: 140,
    minHead: 30,
    maxHead: 400,
    defaultFlow: 120,
    minFlow: 20,
    maxFlow: 600,
    defaultEfficiency: 0.91,
    environmentalPros: [
      'Almacenamiento masivo que garantiza respaldo estacional frente a sequías energéticas',
      'Regulación de avenidas torrenciales protegiendo poblaciones aguas abajo de inundaciones',
      'Suministro polivalente para agua potable, riego agrícola e industria comarcal',
      'Arranque casi instantáneo para estabilizar la frecuencia eléctrica de la red ante contingencias'
    ],
    environmentalCons: [
      'Inundación de valles, requiriendo reubicación de poblaciones y hábitats naturales',
      'Efecto barrera en la migración de fauna piscícola y transporte natural de sedimentos',
      'Emisiones puntuales de metano durante los primeros años por descomposición de biomasa inundada'
    ],
    components: [
      {
        id: 'gran_embalse',
        name: 'Embalse de Regulación (Lago Artificial)',
        category: 'regulacion',
        tag: 'Almacenamiento Masivo',
        description:
          'Vasto cuerpo de agua creado artificialmente en el valle para almacenar cientos de hectómetros cúbicos, actuando como una gigantesca reserva de energía potencial gravitatoria disponible bajo demanda.',
        physicsPrinciple: 'Energía potencial acumulada: E_p = M · g · H_c.m. = ∫ ρ · g · z · dV',
        materials: 'Cuenca topográfica natural sellada e impermeabilizada geológicamente.',
        keyFact: 'Un embalse de 100 hm³ a 200 m de cota almacena el equivalente a 55 GWh de energía eléctrica potencial.',
        coords: { x: 14, y: 32 }
      },
      {
        id: 'presa_hormigon',
        name: 'Presa de Gravedad / Arco de Hormigón',
        category: 'regulacion',
        tag: 'Estructura de Retención',
        description:
          'Estructura civil masiva calculada para resistir el empuje hidrostático del agua acumulada y transmitirlo de forma segura a los cimientos rocosos del fondo y las laderas del valle.',
        physicsPrinciple: 'Empuje hidrostático: F = 0.5 · ρ · g · H² · L con equilibrio estático por peso propio',
        materials: 'Hormigón compactado con rodillo (HCR) o bloques de hormigón en masa con juntas de dilatación.',
        keyFact: 'Cuenta con galerías de inspección internas y drenajes para mitigar la subpresión en la base.',
        coords: { x: 28, y: 38 }
      },
      {
        id: 'aliviadero_vertedor',
        name: 'Aliviadero de Crecidas y Compuertas Radiales',
        category: 'regulacion',
        tag: 'Seguridad Hidráulica',
        description:
          'Canal de evacuación con compuertas móviles tipo Taintor o vertedero de laberinto que permite desaguar caudales torrenciales extraordinarios para evitar que el agua rebase la coronación de la presa.',
        physicsPrinciple: 'Caudal de vertedero libre: Q = C_d · L · H^(3/2) · √(2g)',
        materials: 'Hormigón de alta resistencia a la erosión con cuenco amortiguador disipador de energía al pie.',
        keyFact: 'Diseñado para avenidas milenarias: puede evacuar miles de m³/s de manera segura.',
        coords: { x: 28, y: 22 }
      },
      {
        id: 'torre_toma',
        name: 'Torre de Toma Sumergida',
        category: 'captacion',
        tag: 'Captación Profunda',
        description:
          'Torre vertical dotada de rejillas de protección y compuertas de seguridad a distintas cotas para captar el agua profunda a temperatura y densidad óptimas, exenta de restos flotantes.',
        physicsPrinciple: 'Presión estática profunda p = ρ · g · h_profundidad',
        materials: 'Estructura de hormigón armado con compuertas oruga de cierre estanco de emergencia.',
        keyFact: 'Permite aislar la galería de conducción para inspecciones de mantenimiento periódico.',
        coords: { x: 25, y: 48 }
      },
      {
        id: 'galeria_presion',
        name: 'Galería de Conducción a Presión',
        category: 'conduccion',
        tag: 'Túnel Subterráneo',
        description:
          'Túnel excavado en la roca con pendiente suave que conecta la toma de la presa con la chimenea de equilibrio, guiando el agua hacia el salto principal.',
        physicsPrinciple: 'Resistencia al rozamiento en conductos cerrados: Ecuación de Darcy-Weisbach h_f = f · (L/D) · (v²/2g)',
        materials: 'Roca excavada con revestimiento de hormigón proyectado y dovelas armadas.',
        keyFact: 'Puede medir desde unos cientos de metros hasta más de 15 kilómetros de longitud en centrales de alta montaña.',
        coords: { x: 42, y: 46 }
      },
      {
        id: 'chimenea_equilibrio',
        name: 'Chimenea de Equilibrio (Surge Tank)',
        category: 'regulacion',
        tag: 'Amortiguación de Golpe de Ariete',
        description:
          'Pozo vertical abierto a la atmósfera situado antes de la tubería forzada que amortigua las ondas de sobrepresión y depresión provocadas por el cierre o apertura brusca de las válvulas de turbina.',
        physicsPrinciple: 'Fenómeno de golpe de ariete (Allievi): c = √(K/ρ) y oscilación periódica del nivel libre',
        materials: 'Pozo vertical excavado en macizo rocoso con blindaje de hormigón armado.',
        keyFact: 'Sin esta chimenea, un cierre repentino de turbina reventaría las conducciones forzadas por sobrepresión acústica.',
        coords: { x: 53, y: 28 }
      },
      {
        id: 'tuberia_alta_presion',
        name: 'Tubería Forzada de Gran Caída',
        category: 'conduccion',
        tag: 'Alta Presión Dinámica',
        description:
          'Tubería de acero de grueso espesor instalada en la ladera o en pozo inclinado que canaliza el agua a presiones extremas directamente contra los inyectores o el distribuidor de la turbina.',
        physicsPrinciple: 'Fórmula de recipientes de pared gruesa (Lamé): Tensión circunferencial σ = P · r / e',
        materials: 'Acero microaleado de alta resistencia con anillos de refuerzo circunferenciales.',
        keyFact: 'A 400 m de salto neto, el agua impacta a una velocidad de casi 90 m/s (320 km/h).',
        coords: { x: 64, y: 55 }
      },
      {
        id: 'turbina_francis',
        name: 'Turbina Francis / Pelton',
        category: 'generacion',
        tag: 'Conversión Hidromecánica',
        description:
          'Turbina de reacción (Francis) con distribuidor móvil de álabes directores y rodete de flujo centrípeto, o turbina de impulsión (Pelton) con cucharas dobles donde chorros de agua a alta presión generan par motriz.',
        physicsPrinciple: 'Transformación de energía de presión y cinética en momento cinético rotacional',
        materials: 'Monobloque de acero forjado mecanizado en CNC con recubrimiento cerámico anti-erosión.',
        keyFact: 'Rendimientos pico de hasta 95%, siendo las máquinas rotativas más eficientes del planeta.',
        coords: { x: 75, y: 72 }
      },
      {
        id: 'generador_alta_potencia',
        name: 'Alternador Síncrono de Gran Potencia',
        category: 'electrico',
        tag: 'Generación Eléctrica',
        description:
          'Generador trifásico de rotor vertical acoplado directamente al eje de la turbina, capaz de generar cientos de megavatios de potencia eléctrica a cos(φ) regulable.',
        physicsPrinciple: 'Fuerza magnetomotriz y par electromagnético resistente en equilibrio con el par hidráulico',
        materials: 'Cobre de alta pureza con aislamiento clase F, refrigeración por aire forzado o circuito de agua cerrada.',
        keyFact: 'Aporta inercia mecánica física síncrona vital para estabilizar la frecuencia del sistema eléctrico interconectado.',
        coords: { x: 75, y: 62 }
      },
      {
        id: 'subestacion_exterior',
        name: 'Parque de Transformación y Alta Tensión',
        category: 'electrico',
        tag: 'Evacuación de Potencia',
        description:
          'Conjunto de transformadores elevadores monofásicos/trifásicos, interruptores en SF6 y seccionadores que canalizan la energía generada hacia las líneas de la red troncal (400 kV).',
        physicsPrinciple: 'Acoplamiento electromagnético inductivo y aislamiento dieléctrico para extra-alta tensión',
        materials: 'Transformadores de potencia con blindaje magnético y torres reticulares de acero.',
        keyFact: 'Puede entregar miles de megavatios simultáneos a las principales arterias de transporte energético.',
        coords: { x: 88, y: 48 }
      }
    ],
    stepGuide: [
      {
        step: 1,
        title: 'Acumulación en el Embalse',
        description: 'La presa retiene las aguas de lluvia y deshielo, almacenando energía potencial masiva en el lago artificial.',
        targetComponentId: 'gran_embalse'
      },
      {
        step: 2,
        title: 'Captación en Torre Sumergida',
        description: 'El agua entra a profundidad constante y recorre el túnel de presión subterráneo hacia la central.',
        targetComponentId: 'torre_toma'
      },
      {
        step: 3,
        title: 'Protección en Chimenea de Equilibrio',
        description: 'La chimenea de equilibrio absorbe las oscilaciones y el golpe de ariete al abrir o modular compuertas.',
        targetComponentId: 'chimenea_equilibrio'
      },
      {
        step: 4,
        title: 'Impulso a Gran Caída',
        description: 'El agua se precipita por la tubería forzada a alta presión y acciona con violencia controlada el rodete de la turbina Francis.',
        targetComponentId: 'turbina_francis'
      },
      {
        step: 5,
        title: 'Entrega a la Red Troncal',
        description: 'El generador síncrono produce energía masiva que el transformador eleva a la red de 400 kV en segundos.',
        targetComponentId: 'subestacion_exterior'
      }
    ]
  },

  bombeo: {
    id: 'bombeo',
    shortName: 'De Bombeo (Reversible)',
    title: 'Central Hidroeléctrica Reversible (De Bombeo)',
    subtitle: 'Almacenamiento energético a gran escala: turbinación en horas punta y bombeo en horas valle',
    tagline: 'La gran batería del sistema eléctrico: almacena excesos renovables e inyecta energía en momentos críticos',
    description:
      'Las centrales de bombeo puro o mixto cuentan con dos embalses a cotas topográficas diferentes (superior e inferior). Durante las horas de baja demanda o alta producción solar/eólica (horas valle), la central consume electricidad barata de la red para bombear agua desde el embalse inferior hacia el superior. Cuando la demanda se dispara (horas punta), el agua desciende por gravedad a través de las turbinas para generar y vender electricidad a alto valor, alcanzando un rendimiento global del ciclo del 75% al 82%.',
    headRange: '80 - 800 m (Salto entre embalse superior e inferior)',
    flowRange: '20 - 450 m³/s (Flujo bidireccional alternante)',
    typicalTurbines: ['Turbina-Bomba Reversible tipo Francis (Deriaz en saltos bajos)', 'Grupos ternarios (Turbina + Motor/Generador + Bomba separada)'],
    regulationCapacity: 'Máxima y Bidireccional (Consumo regulable en bombeo y generación en turbinación)',
    startUpTime: '60 a 120 segundos para cambio de régimen turbina/bomba',
    defaultHead: 210,
    minHead: 60,
    maxHead: 500,
    defaultFlow: 95,
    minFlow: 20,
    maxFlow: 350,
    defaultEfficiency: 0.88,
    environmentalPros: [
      'Almacenamiento masivo sin requerir metales pesados, litio ni cobalto de baterías electroquímicas',
      'Vida útil de más de 70 a 100 años con degradación de capacidad prácticamente nula',
      'Permite integrar el 100% de energías renovables intermitentes (solar fotovoltaica y eólica)',
      'Circuito cerrado de agua: el mismo volumen de agua se recicla continuamente entre ambos embalses'
    ],
    environmentalCons: [
      'Pérdida energética del ciclo completo (~20-25% de pérdidas termodinámicas y por fricción)',
      'Necesidad de condiciones orográficas muy particulares (dos cuencas cercanas con gran desnivel)',
      'Impacto visual y civil de dos embalses y galerías subterráneas en macizos montañosos'
    ],
    components: [
      {
        id: 'embalse_superior',
        name: 'Embalse Superior (Almacén Potencial)',
        category: 'regulacion',
        tag: 'Cota Alta (+Altitud)',
        description:
          'Depósito de agua situado en una meseta o cumbre de montaña que almacena el agua bombeada, representando energía potencial acumulada lista para liberarse en minutos.',
        physicsPrinciple: 'Capacidad energética: E = ρ · g · V · H · η_turbinado (en Joules / MWh)',
        materials: 'Cuenca excavada impermeabilizada con geomembrana de PEAD o asfalto hidráulico.',
        keyFact: 'Actúa como un depósito de carga rápida: se llena durante las horas de sol radiante o viento nocturno.',
        coords: { x: 18, y: 22 }
      },
      {
        id: 'toma_superior_bidireccional',
        name: 'Toma / Desagüe Superior Bidireccional',
        category: 'captacion',
        tag: 'Flujo Reversible',
        description:
          'Estructura hidráulica hidrodinámica diseñada para funcionar tanto como toma sumergida sin vórtices (en modo generación) como difusor de salida sin turbulencias desestabilizadoras (en modo bombeo).',
        physicsPrinciple: 'Simetría de tobera-difusor bidireccional y control de cavitación en flujo inverso',
        materials: 'Hormigón armado con rejas hidrodinámicas de bajo arrastre en ambos sentidos de flujo.',
        keyFact: 'Cuenta con compuertas planas de mantenimiento accionadas por servomotores hidráulicos.',
        coords: { x: 30, y: 28 }
      },
      {
        id: 'pozo_presion_bombeo',
        name: 'Pozo Vertical y Conducción Blindada',
        category: 'conduccion',
        tag: 'Transporte Bidireccional',
        description:
          'Pozo vertical perforado en roca y revestido en acero estructural capaz de resistir tanto la presión hidrostática de caída como la presión impulsada por las bombas durante el ascenso forzado.',
        physicsPrinciple: 'Resistencia a fatiga por ciclos alternantes de presión y despresurización cíclica diaria',
        materials: 'Blindaje interior de chapa de acero de alta resistencia envuelta en hormigón inyectado.',
        keyFact: 'Las velocidades del agua rondan los 4 a 6 m/s en ambos sentidos.',
        coords: { x: 42, y: 44 }
      },
      {
        id: 'chimenea_bombeo',
        name: 'Chimenea de Equilibrio Bidireccional',
        category: 'regulacion',
        tag: 'Seguridad Dinámica Reversible',
        description:
          'Cámara de oscilación dimensionada para controlar las transiciones de sobrepresión tanto en el frenado del turbinado como en el descebado o parada de emergencia de las bombas.',
        physicsPrinciple: 'Amortiguamiento de transitorios hidráulicos bidireccionales de masa de agua oscilante',
        materials: 'Pozo cilíndrico en roca con diafragmas de restricción de orificio calibrado.',
        keyFact: 'Crucial para evitar que el agua en retroceso cree vacíos destructivos (separación de columna líquida).',
        coords: { x: 48, y: 24 }
      },
      {
        id: 'caverna_maquinas',
        name: 'Caverna Subterránea de Potencia',
        category: 'generacion',
        tag: 'Casa de Máquinas Profunda',
        description:
          'Gran caverna excavada cientos de metros bajo tierra para ubicar las turbinas-bomba bajo una fuerte cota de sumergencia (inmersión), garantizando una presión de aspiración positiva para evitar cavitación en bombeo.',
        physicsPrinciple: 'NPSH (Net Positive Suction Head): NPSH_disponible > NPSH_requerido por la bomba',
        materials: 'Caverna rocosa estabilizada con bulones de anclaje, mallas y hormigón proyectado.',
        keyFact: 'Estar bajo tierra a gran profundidad permite que las bombas funcionen a altísima presión de aspiración sin cavitar.',
        coords: { x: 62, y: 64 }
      },
      {
        id: 'turbina_bomba_reversible',
        name: 'Grupo Turbina-Bomba Reversible',
        category: 'generacion',
        tag: 'Máquina Hidráulica Dual',
        description:
          'Rodete hidráulico especial de álabes curvados que en un sentido de giro funciona como turbina Francis generando par mecánico, y al invertir su rotación actúa como potente bomba centrífuga elevando agua.',
        physicsPrinciple: 'Inversión de velocidad periférica: u = ω · r. Rendimiento cíclico η_roundtrip = η_turbo · η_bomba ≈ 78%',
        materials: 'Acero inoxidable forjado austenítico-ferrítico resistente al estrés cíclico.',
        keyFact: 'Puede pasar de parada completa a plena generación en menos de 90 segundos.',
        coords: { x: 62, y: 74 }
      },
      {
        id: 'motor_generador_sincrono',
        name: 'Motor-Generador Reversible',
        category: 'electrico',
        tag: 'Máquina Eléctrica Reversible',
        description:
          'En modo generación funciona como alternador entregando corriente alterna a la red; en modo bombeo absorbe electricidad de la red funcionando como un colosal motor síncrono que impulsa la bomba.',
        physicsPrinciple: 'Reversibilidad electromagnética: Par motriz vs Par resistente según el signo del ángulo de potencia δ',
        materials: 'Estator laminado con devanados de barra Roebel y rotor con polos amortiguadores para arranque suave.',
        keyFact: 'Suele arrancarse en modo motor mediante variador de frecuencia estático (SFC) para no desestabilizar la red.',
        coords: { x: 62, y: 54 }
      },
      {
        id: 'conduccion_inferior',
        name: 'Túnel de Aspiración / Impulsión Inferior',
        category: 'conduccion',
        tag: 'Interconexión con Embalse Bajo',
        description:
          'Túnel a presión que conecta la caverna de turbinas con el embalse inferior, funcionando como difusor de descarga en generación y como conducto de succión de agua en modo bombeo.',
        physicsPrinciple: 'Ecuación de continuidad y conservación de energía cinética',
        materials: 'Túnel excavado con blindaje de hormigón reforzado.',
        keyFact: 'Dispone de compuertas tajaderas de aislamiento rápido para revisiones de los grupos.',
        coords: { x: 74, y: 72 }
      },
      {
        id: 'embalse_inferior',
        name: 'Embalse Inferior (Reservorio de Recogida)',
        category: 'regulacion',
        tag: 'Cota Baja (+Retención)',
        description:
          'Embalse o lago situado en la base de la montaña que recoge el agua turbinada y suministra el caudal necesario durante la fase de bombeo sin depender de aportaciones externas.',
        physicsPrinciple: 'Conservación de masa del ciclo hidráulico cerrado: V_superior + V_inferior = Constante',
        materials: 'Lago natural adaptado o presa de gravedad convencional en el cauce bajo del río.',
        keyFact: 'Permite operar el ciclo de almacenamiento indefinidamente, convirtiéndose en el pulmón del sistema eléctrico.',
        coords: { x: 88, y: 74 }
      },
      {
        id: 'red_bidireccional',
        name: 'Conexión a Red Eléctrica Bidireccional',
        category: 'electrico',
        tag: 'Flujo Eléctrico de Doble Sentido',
        description:
          'Transformadores y subestación que inyectan energía a la red durante los picos de demanda y absorben energía de parques eólicos y solares en momentos de sobreoferta.',
        physicsPrinciple: 'Flujo de potencia activa bidireccional P = (V_1 · V_2 / X) · sin(δ)',
        materials: 'Aparamenta blindada en gas SF6 (GIS) y transformadores elevadores reversibles.',
        keyFact: 'Crucial para arbitraje económico en el mercado eléctrico y evitar vertidos de energía renovable.',
        coords: { x: 88, y: 35 }
      }
    ],
    stepGuide: [
      {
        step: 1,
        title: 'Modo Bombeo (Horas Valle)',
        description: 'Cuando hay exceso de energía solar/eólica en la red, los motores bombean agua del embalse inferior al superior.',
        targetComponentId: 'embalse_inferior'
      },
      {
        step: 2,
        title: 'Almacenamiento de Energía Potencial',
        description: 'El embalse superior retiene millones de m³ de agua a gran altura como una batería limpia de escala GW.',
        targetComponentId: 'embalse_superior'
      },
      {
        step: 3,
        title: 'Disparo en Modo Generación (Horas Punta)',
        description: 'Al llegar el pico de demanda vespertino, las compuertas se abren y el agua se precipita a toda velocidad.',
        targetComponentId: 'pozo_presion_bombeo'
      },
      {
        step: 4,
        title: 'Turbinado en Caverna Profunda',
        description: 'El rodete reversible gira impulsando el generador síncrono para abastecer a la red en menos de dos minutos.',
        targetComponentId: 'caverna_maquinas'
      },
      {
        step: 5,
        title: 'Reciclaje en el Embalse Inferior',
        description: 'El agua se deposita en el embalse bajo para reiniciar el ciclo en el próximo período de sol o viento.',
        targetComponentId: 'embalse_inferior'
      }
    ]
  }
};

export const COMPARISON_DATA = [
  {
    parameter: 'Concepto Principal',
    flujo: 'Aprovecha caudal natural directo sin retención masiva',
    embalse: 'Acumula grandes volúmenes de agua en presa para regular la producción',
    bombeo: 'Batería hidráulica reversible con dos embalses a distinta cota'
  },
  {
    parameter: 'Salto Hidráulico Típico (H)',
    flujo: 'Bajo a Medio (5 a 50 m)',
    embalse: 'Medio a Muy Alto (40 a 1.200 m)',
    bombeo: 'Medio a Alto (80 a 800 m)'
  },
  {
    parameter: 'Caudal de Diseño (Q)',
    flujo: 'Alto y variable según el río (10 - 450 m³/s)',
    embalse: 'Regulado a voluntad según demanda (5 - 800 m³/s)',
    bombeo: 'Bidireccional alterno (20 - 450 m³/s)'
  },
  {
    parameter: 'Turbinas Habituales',
    flujo: 'Kaplan, Bulbo, Francis de baja caída',
    embalse: 'Francis, Pelton de alta presión',
    bombeo: 'Turbina-Bomba Reversible tipo Francis, grupos ternarios'
  },
  {
    parameter: 'Capacidad de Regulación',
    flujo: 'Nula o casi nula (depende de la hidrología)',
    embalse: 'Muy Alta (días, meses o temporadas completas)',
    bombeo: 'Máxima Bidireccional (genera y consume potencia a demanda)'
  },
  {
    parameter: 'Tiempo de Respuesta al Arranque',
    flujo: '2 a 5 minutos',
    embalse: '1 a 3 minutos (excelente respaldo de frecuencia)',
    bombeo: '60 a 120 segundos (cambio rápido generación ⇄ bombeo)'
  },
  {
    parameter: 'Rendimiento del Ciclo',
    flujo: '85% - 92% (energía hidromecánica a eléctrica)',
    embalse: '88% - 93% (energía hidromecánica a eléctrica)',
    bombeo: '75% - 82% (eficiencia del ciclo completo bombeo + turbinado)'
  },
  {
    parameter: 'Impacto Ambiental Terrestre',
    flujo: 'Muy bajo: no inunda valles ni crea grandes lagos',
    embalse: 'Alto: requiere anegar valles y desplazar hábitats',
    bombeo: 'Medio: requiere dos reservorios, a menudo cuencas ya existentes'
  },
  {
    parameter: 'Función en el Mix Energético',
    flujo: 'Generación renovable de base o banda continua',
    embalse: 'Generación gestionable para cubrir horas punta y estabilizar red',
    bombeo: 'Almacenamiento de excedentes solares/eólicos y arbitraje de precios'
  }
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    type: 'flujo',
    question: '¿Cuál es la principal característica de una central hidroeléctrica de pasada (por flujo)?',
    options: [
      'Almacena agua durante años para sequías prolongadas.',
      'Aprovecha el caudal continuo del río sin un embalse de gran retención.',
      'Bombeará agua montaña arriba todas las noches.',
      'Utiliza agua salada del océano directamente.'
    ],
    correctIndex: 1,
    explanation:
      'Las centrales por flujo o de pasada carecen de un gran embalse regulador; aprovechan directamente el caudal disponible que fluye por el río en cada momento.'
  },
  {
    id: 2,
    type: 'embalse',
    question: '¿Qué componente protege a una central de embalse contra las peligrosas sobrepresiones del golpe de ariete?',
    options: [
      'El transformador elevador.',
      'La chimenea de equilibrio (pozo de oscilación).',
      'La reja de desbaste superficial.',
      'El canal de restitución.'
    ],
    correctIndex: 1,
    explanation:
      'La chimenea de equilibrio (surge tank) es un pozo vertical que amortigua las ondas de sobrepresión cuando se cierran bruscamente las válvulas o compuertas de la turbina.'
  },
  {
    id: 3,
    type: 'bombeo',
    question: '¿En qué momento del día suele operar en modo bombeo una central reversible?',
    options: [
      'En las horas punta de máxima demanda eléctrica industrial.',
      'En horas valle o cuando hay sobreproducción de energía solar y eólica barata.',
      'Únicamente cuando hay tormentas eléctricas sobre la presa.',
      'Nunca bombea agua; solo genera energía en un sentido.'
    ],
    correctIndex: 1,
    explanation:
      'En horas valle o cuando la energía renovable (solar/eólica) excede la demanda, el coste de la electricidad es muy bajo; la central aprovecha para bombear agua al embalse superior y almacenarla.'
  },
  {
    id: 4,
    type: 'general',
    question: '¿Cuál es la fórmula física fundamental para calcular la potencia eléctrica teórica generada por una central hidroeléctrica?',
    options: [
      'P = V × I × cos(φ)',
      'P = ρ × g × Q × H × η',
      'P = 0.5 × m × v²',
      'P = F × d / t'
    ],
    correctIndex: 1,
    explanation:
      'La potencia hidroeléctrica se rige por P = ρ · g · Q · H · η, donde ρ es la densidad del agua, g la aceleración de la gravedad, Q el caudal turbinado, H el salto neto y η el rendimiento global.'
  },
  {
    id: 5,
    type: 'flujo',
    question: '¿Qué tipo de turbina es especialmente ideal para centrales con bajo salto hidráulico pero caudales elevados?',
    options: [
      'Turbina Pelton con inyectores de alta presión.',
      'Turbina Kaplan con álabes orientables de hélice.',
      'Turbina de vapor de etapas múltiples.',
      'Turbina Tesla de discos lisos.'
    ],
    correctIndex: 1,
    explanation:
      'La turbina Kaplan funciona como una hélice de barco con álabes móviles orientables, óptima para grandes volúmenes de agua a saltos bajos (2 a 40 metros).'
  },
  {
    id: 6,
    type: 'bombeo',
    question: '¿Cuál es la eficiencia típica aproximada del ciclo cerrado completo (round-trip) de una central de bombeo?',
    options: [
      'Entre 25% y 35%',
      'Entre 50% y 60%',
      'Entre 75% y 82%',
      '100% sin ninguna pérdida termodinámica'
    ],
    correctIndex: 2,
    explanation:
      'El rendimiento global del ciclo cerrado (bombear agua arriba y luego turbinarla abajo) ronda el 75% al 82%, lo que la convierte en el sistema de almacenamiento de energía a gran escala más eficiente y duradero del mundo.'
  }
];
