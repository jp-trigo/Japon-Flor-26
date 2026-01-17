
import { ItineraryItem, CityData, HotelData } from './types';

export const RAW_ITINERARY: ItineraryItem[] = [
  // DÍA 1: Llegada
  { fecha: "10/04/2026", diaSemana: "Viernes", hora: "09:55", momento: "Mañana", ciudad: "Tokyo", categoria: "Transporte", actividad: "Aterrizaje en Haneda", detalles: "Vuelo QR806. Recoger Pocket WiFi.", estado: "Confirmado" },
  { fecha: "10/04/2026", diaSemana: "Viernes", hora: "11:30", momento: "Mañana", ciudad: "Tokyo", categoria: "Hotel", actividad: "Check-in Hotel Imperial", detalles: "Estancia 3 noches. Hibiya.", estado: "Planificado" },
  { fecha: "10/04/2026", diaSemana: "Viernes", hora: "18:00", momento: "Noche", ciudad: "Tokyo", categoria: "Comida", actividad: "Cena en Yurakucho", detalles: "Izakayas bajo las vías del tren.", estado: "Planificado" },
  
  // DÍA 2: Tokyo Oeste
  { fecha: "11/04/2026", diaSemana: "Sábado", hora: "09:00", momento: "Mañana", ciudad: "Tokyo", categoria: "Turismo", actividad: "Santuario Meiji", detalles: "Paseo por el parque Yoyogi.", estado: "Planificado" },
  { fecha: "11/04/2026", diaSemana: "Sábado", hora: "11:30", momento: "Mañana", ciudad: "Tokyo", categoria: "Turismo", actividad: "Takeshita Street", detalles: "Harajuku y moda kawaii.", estado: "Planificado" },
  { fecha: "11/04/2026", diaSemana: "Sábado", hora: "16:00", momento: "Tarde", ciudad: "Tokyo", categoria: "Turismo", actividad: "Shibuya Crossing", detalles: "Vista desde Mag's Park.", estado: "Planificado" },

  // DÍA 3: Excursión Kamakura
  { fecha: "12/04/2026", diaSemana: "Domingo", hora: "08:30", momento: "Mañana", ciudad: "Kamakura", categoria: "Transporte", actividad: "Tren a Kamakura", detalles: "Línea Yokosuka (55 min).", estado: "Confirmado" },
  { fecha: "12/04/2026", diaSemana: "Domingo", hora: "10:00", momento: "Mañana", ciudad: "Kamakura", categoria: "Turismo", actividad: "Gran Buda (Daibutsu)", detalles: "Templo Kotoku-in.", estado: "Planificado" },
  { fecha: "12/04/2026", diaSemana: "Domingo", hora: "14:00", momento: "Tarde", ciudad: "Kamakura", categoria: "Turismo", actividad: "Isla de Enoshima", detalles: "Vistas al mar y atardecer.", estado: "Planificado" },

  // DÍA 4: Viaje a Kioto
  { fecha: "13/04/2026", diaSemana: "Lunes", hora: "09:00", momento: "Mañana", ciudad: "Tokyo/Kyoto", categoria: "Transporte", actividad: "Shinkansen a Kioto", detalles: "Hikari 507. Asientos 12A, 12B.", estado: "Confirmado" },
  { fecha: "13/04/2026", diaSemana: "Lunes", hora: "12:30", momento: "Mañana", ciudad: "Kyoto", categoria: "Hotel", actividad: "Check-in Fufu Kyoto", detalles: "Estancia 3 noches. Nanzenji.", estado: "Confirmado" },
  { fecha: "13/04/2026", diaSemana: "Lunes", hora: "16:00", momento: "Tarde", ciudad: "Kyoto", categoria: "Turismo", actividad: "Barrio de Gion", detalles: "Paseo buscando Geishas.", estado: "Planificado" },

  // DÍA 5: Kioto Clásico
  { fecha: "14/04/2026", diaSemana: "Martes", hora: "07:00", momento: "Mañana", ciudad: "Kyoto", categoria: "Turismo", actividad: "Fushimi Inari", detalles: "Subida al monte Inari temprano.", estado: "Planificado" },
  { fecha: "14/04/2026", diaSemana: "Martes", hora: "14:00", momento: "Tarde", ciudad: "Kyoto", categoria: "Turismo", actividad: "Kiyomizu-dera", detalles: "Templo del agua pura.", estado: "Planificado" },

  // DÍA 6: Nara
  { fecha: "15/04/2026", diaSemana: "Miércoles", hora: "09:30", momento: "Mañana", ciudad: "Nara", categoria: "Transporte", actividad: "Tren Aoniyoshi", detalles: "Tren turístico de lujo a Nara.", estado: "Confirmado" },
  { fecha: "15/04/2026", diaSemana: "Miércoles", hora: "11:00", momento: "Mañana", ciudad: "Nara", categoria: "Turismo", actividad: "Parque de Nara", detalles: "Dar galletas a los ciervos.", estado: "Planificado" },
  { fecha: "15/04/2026", diaSemana: "Miércoles", hora: "13:00", momento: "Comida", ciudad: "Nara", categoria: "Turismo", actividad: "Templo Todaiji", detalles: "Gran Buda de Bronce.", estado: "Planificado" },

  // DÍA 7: A Osaka
  { fecha: "16/04/2026", diaSemana: "Jueves", hora: "11:00", momento: "Mañana", ciudad: "Kyoto", categoria: "Turismo", actividad: "Bosque de Bambú", detalles: "Arashiyama y puente Togetsukyo.", estado: "Planificado" },
  { fecha: "16/04/2026", diaSemana: "Jueves", hora: "18:00", momento: "Tarde", ciudad: "Kyoto/Osaka", categoria: "Transporte", actividad: "Tren a Osaka", detalles: "Llegada a estación Namba.", estado: "Planificado" },
  { fecha: "16/04/2026", diaSemana: "Jueves", hora: "19:30", momento: "Noche", ciudad: "Osaka", categoria: "Hotel", actividad: "Check-in Royal Classic", detalles: "Estancia 2 noches. Namba.", estado: "Confirmado" },

  // DÍA 8: Osaka
  { fecha: "17/04/2026", diaSemana: "Viernes", hora: "10:00", momento: "Mañana", ciudad: "Osaka", categoria: "Turismo", actividad: "Castillo de Osaka", detalles: "Jardines y museo.", estado: "Planificado" },
  { fecha: "17/04/2026", diaSemana: "Viernes", hora: "19:00", momento: "Noche", ciudad: "Osaka", categoria: "Comida", actividad: "Ruta Dotonbori", detalles: "Takoyaki y neones.", estado: "Planificado" },

  // DÍA 9: Vuelta a Tokyo
  { fecha: "18/04/2026", diaSemana: "Sábado", hora: "11:00", momento: "Mañana", ciudad: "Osaka/Tokyo", categoria: "Transporte", actividad: "Shinkansen a Tokyo", detalles: "Nozomi 22. Bento de estación.", estado: "Confirmado" },
  { fecha: "18/04/2026", diaSemana: "Sábado", hora: "15:00", momento: "Tarde", ciudad: "Tokyo", categoria: "Hotel", actividad: "Check-in Roppongi", detalles: "Mitsui Garden Premier.", estado: "Confirmado" },

  // DÍA 10: Tokyo Moderno
  { fecha: "19/04/2026", diaSemana: "Domingo", hora: "10:00", momento: "Mañana", ciudad: "Tokyo", categoria: "Turismo", actividad: "TeamLab Borderless", detalles: "Azabudai Hills.", estado: "Confirmado" },
  { fecha: "19/04/2026", diaSemana: "Domingo", hora: "18:00", momento: "Noche", ciudad: "Tokyo", categoria: "Turismo", actividad: "Torre de Tokyo", detalles: "Vistas nocturnas.", estado: "Planificado" },

  // DÍA 11: Compras y Despedida
  { fecha: "20/04/2026", diaSemana: "Lunes", hora: "10:00", momento: "Mañana", ciudad: "Tokyo", categoria: "Compras", actividad: "Ginza Shopping", detalles: "Uniqlo, Itoya, Mitsukoshi.", estado: "Planificado" },
  { fecha: "20/04/2026", diaSemana: "Lunes", hora: "19:00", momento: "Noche", ciudad: "Tokyo", categoria: "Comida", actividad: "Cena de Despedida", detalles: "Gonpachi Nishi-Azabu.", estado: "Reservado" },

  // DÍA 12: Salida
  { fecha: "21/04/2026", diaSemana: "Martes", hora: "10:00", momento: "Mañana", ciudad: "Tokyo", categoria: "Transporte", actividad: "Narita Express", detalles: "Tren al aeropuerto.", estado: "Confirmado" },
  { fecha: "21/04/2026", diaSemana: "Martes", hora: "14:00", momento: "Tarde", ciudad: "Tokyo", categoria: "Transporte", actividad: "Vuelo de Salida", detalles: "QR807 Doha.", estado: "Confirmado" },
];

export const HOTELS: HotelData[] = [
  {
    name: "Imperial Hotel Tokyo",
    city: "Tokyo",
    dates: "10 Abr - 13 Abr",
    description: "Un icono de la elegancia japonesa desde 1890. Situado frente al Palacio Imperial y el parque Hibiya, ofrece una mezcla perfecta de historia y lujo moderno.",
    address: "1-1-1 Uchisaiwaicho, Chiyoda-ku, Tokyo 100-8558",
    website: "https://www.imperialhotel.co.jp/e/tokyo/",
    coordinates: [35.6724, 139.7585],
    image: "https://imperial.hotelsoftokyo.com/data/Pics/OriginalPhoto/17060/1706054/1706054122/imperial-hotel-tokyo-tokyo-pic-23.JPEG"
  },
  {
    name: "Fufu Kyoto",
    city: "Kyoto",
    dates: "13 Abr - 16 Abr",
    description: "Un ryokan de lujo moderno escondido cerca del templo Nanzenji. Cada habitación cuenta con su propio baño de aguas termales y vistas a un jardín privado japonés.",
    address: "41 Nanzenji Kusakawacho, Sakyo Ward, Kyoto, 606-8437",
    website: "https://www.fufukyoto.jp/en/",
    coordinates: [35.0116, 135.7925],
    image: "https://www.fufukyoto.jp/files/ogp.jpg"
  },
  {
    name: "Hotel Royal Classic Osaka",
    city: "Osaka",
    dates: "16 Abr - 18 Abr",
    description: "Obra maestra del arquitecto Kengo Kuma, este hotel integra la fachada del antiguo teatro Kabukiza. Lujo artístico en el corazón vibrante de Namba.",
    address: "4-3-3 Namba, Chuo Ward, Osaka, 542-0076",
    website: "https://hotel-royalclassic.jp/en/",
    coordinates: [34.6654, 135.5015],
    image: "https://hotel-royalclassic.jp/common/img/ogp_img.png"
  },
  {
    name: "Mitsui Garden Roppongi",
    city: "Tokyo",
    dates: "18 Abr - 21 Abr",
    description: "Elegancia sofisticada en el distrito de Roppongi. Destaca por sus vistas nocturnas a la Torre de Tokio y su diseño interior contemporáneo con toques artísticos.",
    address: "3-15-17 Roppongi, Minato-ku, Tokyo 106-0032",
    website: "https://www.gardenhotels.co.jp/roppongi-premier/eng/",
    coordinates: [35.6631, 139.7329],
    image: "https://www.gardenhotels.co.jp/assets/images/roppongi-premier/home-2025/top-about-bg.jpg"
  }
];

export const CITIES: CityData[] = [
  {
    name: "Tokyo",
    tagline: "Neón y Tradición",
    description: "El corazón palpitante donde el futuro se encuentra con el pasado.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDN8ilJCS7v6RqLkdRehLaZl3KGooix3X7LBPLeZilTHANfR3TL7Lb9SjpZMLa7UdtUg8ZRNgfGHN1V4ESzcfFj-1D1q5fJ9v9k7vGgN5VBcHTYRE-D7xckk_-RFWfrTE_GIhdndLqG2vvUw8n0yaksMAWTplN2qBCOQb23u3orjR7tKpn-O4HEgSSSA9Us5gKnX9F4WbipiuqcIzoAggOmlYW20QYZhH6r40km8v2oOttOp1sIb-ChFimaacU6mG8YfClFz_TlK-I",
    temp: 18,
    weather: "partly_cloudy_day",
    days: 6,
    coordinates: [35.6762, 139.6503]
  },
  {
    name: "Kamakura",
    tagline: "El Zen del Mar",
    description: "Un destino costero con historia samurái y festivales.",
    image: "https://lp-cms-production.imgix.net/2019-06/53684665.jpg?fit=crop&q=40&sharp=10&vib=20&auto=format&ixlib=react-8.6.4",
    temp: 17,
    weather: "partly_cloudy_day",
    days: 1,
    coordinates: [35.3192, 139.5467]
  },
  {
    name: "Kioto",
    tagline: "El Japón Eterno",
    description: "La capital cultural con templos dorados y barrios de geishas.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDYXay9fPdkBrOS9KzXLrjDsM1KoDJKInROXH9-YpbSdB7gLm_4Xp43K0I63peYA0Y9GMu7OD5e3C5F-I0jsQBEQQIvD_OAeZHfm7bdQe-s8pSIrmS2gI8sYZVplhB0v8l9H227TFrrUdhkRNGMvxGHCCPFSfinJ6ZadDzzqVxCA59WylFGlw7fwKXscblkMBN2CiaD2_3vha9YVDmvYAT7bRyXXJJBnSb0KqKMptagxqaIelzAjZDif0P809lpS9dnfUgyscWxBmI",
    temp: 20,
    weather: "sunny",
    days: 3,
    coordinates: [35.0116, 135.7681]
  },
  {
    name: "Nara",
    tagline: "Ciervos y Templos",
    description: "Hogar del Gran Buda y cientos de ciervos amigables.",
    image: "https://images.unsplash.com/photo-1624253321171-1be53e12f5f4?q=80&w=800&auto=format&fit=crop",
    temp: 19,
    weather: "cloud",
    days: 1,
    coordinates: [34.6851, 135.8048]
  },
  {
    name: "Osaka",
    tagline: "Sabor y Energía",
    description: "Famosa por su comida callejera y el vibrante barrio de Dotonbori.",
    image: "https://images.unsplash.com/photo-1590559899731-a382839e5549?q=80&w=800&auto=format&fit=crop",
    temp: 22,
    weather: "clear_day",
    days: 2,
    coordinates: [34.6937, 135.5023]
  }
];
