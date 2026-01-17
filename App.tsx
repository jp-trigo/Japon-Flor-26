
import React, { useEffect, useRef, useState } from 'react';
import { HashRouter, Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { AppRoute, HotelData } from './types';
import { RAW_ITINERARY, CITIES, HOTELS } from './constants';

// Declare Leaflet globally since it's loaded via CDN
declare const L: any;

// --- Components ---

const BottomNav: React.FC = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { label: 'Inicio', icon: 'home', route: AppRoute.HOME },
    { label: 'Itinerario', icon: 'calendar_month', route: AppRoute.ITINERARY },
    { label: 'Mapa', icon: 'map', route: AppRoute.MAP },
    { label: 'Reservas', icon: 'confirmation_number', route: AppRoute.BOOKINGS },
    { label: 'Destinos', icon: 'explore', route: AppRoute.DESTINATIONS },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-[1000] bg-white/95 dark:bg-surface-dark/95 backdrop-blur-lg border-t border-gray-100 dark:border-gray-800 pb-safe pt-2 transition-colors">
      <div className="flex items-center justify-around max-w-md mx-auto px-1">
        {navItems.map((item) => (
          <Link
            key={item.route}
            to={item.route}
            className={`flex flex-col items-center gap-1 w-16 transition-all ${
              isActive(item.route) ? 'text-primary' : 'text-gray-400 dark:text-gray-500 hover:text-text-main dark:hover:text-white'
            }`}
          >
            <div className="relative">
              <span className={`material-symbols-outlined text-[24px] ${isActive(item.route) ? 'filled' : ''}`}>
                {item.icon}
              </span>
              {isActive(item.route) && (
                <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-primary rounded-full"></span>
              )}
            </div>
            <span className={`text-[9px] ${isActive(item.route) ? 'font-bold' : 'font-medium'}`}>{item.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
};

// --- Mini Map Component for Hotel ---
const HotelMiniMap: React.FC<{ coords: [number, number], hotelName: string }> = ({ coords, hotelName }) => {
  const miniMapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (miniMapRef.current) {
      const map = L.map(miniMapRef.current, {
        zoomControl: false,
        attributionControl: false,
        dragging: false,
        touchZoom: false,
        scrollWheelZoom: false,
        doubleClickZoom: false,
        boxZoom: false
      }).setView(coords, 15);

      const isDarkMode = document.documentElement.classList.contains('dark');
      const tileUrl = isDarkMode 
        ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
        : 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png';

      L.tileLayer(tileUrl).addTo(map);

      const markerIcon = L.divIcon({
        className: 'custom-div-icon',
        html: `<div class="custom-marker"><span class="material-symbols-outlined text-primary text-[14px] filled">location_on</span></div>`,
        iconSize: [20, 20],
        iconAnchor: [10, 10]
      });

      L.marker(coords, { icon: markerIcon }).addTo(map);

      return () => map.remove();
    }
  }, [coords]);

  return <div ref={miniMapRef} className="h-24 w-full rounded-xl mt-3 border border-gray-100 dark:border-gray-800" />;
};

// --- Screens ---

const ScreenMap: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const leafletInstance = useRef<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (mapRef.current && !leafletInstance.current) {
      leafletInstance.current = L.map(mapRef.current, {
        zoomControl: false,
        attributionControl: false
      }).setView([35.2, 137.5], 7); // Adjusted view to see more of the route

      const isDarkMode = document.documentElement.classList.contains('dark');
      const tileUrl = isDarkMode 
        ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
        : 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png';

      L.tileLayer(tileUrl).addTo(leafletInstance.current);
      // L.control.zoom({ position: 'bottomright' }).addTo(leafletInstance.current);

      CITIES.forEach(city => {
        const markerIcon = L.divIcon({
          className: 'custom-div-icon',
          html: `<div class="custom-marker"><span class="material-symbols-outlined text-primary text-[18px] filled">location_on</span></div>`,
          iconSize: [30, 30],
          iconAnchor: [15, 15]
        });

        const popupContent = `
          <div class="flex flex-col">
            <img src="${city.image}" class="w-full h-24 object-cover" />
            <div class="p-3">
              <h3 class="font-bold text-base text-gray-900">${city.name}</h3>
              <p class="text-xs text-gray-500 mb-2">${city.tagline}</p>
              <button id="btn-${city.name.toLowerCase()}" class="w-full bg-primary text-white text-[10px] font-bold py-1.5 rounded-lg uppercase tracking-wider">Ver Itinerario</button>
            </div>
          </div>
        `;

        const marker = L.marker(city.coordinates, { icon: markerIcon })
          .addTo(leafletInstance.current)
          .bindPopup(popupContent);

        marker.on('popupopen', () => {
          const btn = document.getElementById(`btn-${city.name.toLowerCase()}`);
          if (btn) {
            btn.onclick = () => navigate(AppRoute.ITINERARY);
          }
        });
      });

      // Simple ordering for polyline based on logic not array index: Tokyo -> Kamakura -> Kyoto -> Nara -> Osaka -> Tokyo
      const routeCoordinates = [
         CITIES.find(c => c.name === 'Tokyo')!.coordinates,
         CITIES.find(c => c.name === 'Kamakura')!.coordinates,
         CITIES.find(c => c.name === 'Tokyo')!.coordinates, // Return from day trip
         CITIES.find(c => c.name === 'Kioto')!.coordinates,
         CITIES.find(c => c.name === 'Nara')!.coordinates,
         CITIES.find(c => c.name === 'Kioto')!.coordinates, // Return from day trip
         CITIES.find(c => c.name === 'Osaka')!.coordinates,
         CITIES.find(c => c.name === 'Tokyo')!.coordinates
      ];

      L.polyline(routeCoordinates, {
        color: '#ea2a33',
        weight: 3,
        opacity: 0.6,
        dashArray: '6, 8',
        lineCap: 'round'
      }).addTo(leafletInstance.current);
    }

    return () => {
      if (leafletInstance.current) {
        leafletInstance.current.remove();
        leafletInstance.current = null;
      }
    };
  }, [navigate]);

  return (
    <div className="h-full w-full relative flex flex-col bg-background-light dark:bg-background-dark">
      <header className="absolute top-0 left-0 right-0 z-[1001] p-4 pointer-events-none">
        <div className="bg-white/90 dark:bg-surface-dark/90 backdrop-blur-md rounded-2xl shadow-lg border border-gray-100 dark:border-gray-800 p-3 flex items-center justify-between pointer-events-auto">
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-primary uppercase tracking-widest">Explora Japón</span>
            <h1 className="text-base font-bold dark:text-white">Mapa de Ruta 2026</h1>
          </div>
          <div className="flex gap-2">
            <div className="px-3 py-1 bg-primary-soft dark:bg-red-900/20 text-primary text-[10px] font-bold rounded-full border border-primary/10">
              5 Ciudades
            </div>
          </div>
        </div>
      </header>
      <div ref={mapRef} className="flex-1 z-0" />
    </div>
  );
};

const ScreenSummary: React.FC = () => {
  const nextActivity = RAW_ITINERARY[0];

  return (
    <div className="h-full overflow-y-auto pb-24 max-w-md mx-auto bg-background-light dark:bg-background-dark no-scrollbar">
      {/* Header */}
      <header className="sticky top-0 z-50 flex items-center bg-white/80 dark:bg-surface-dark/80 backdrop-blur-md px-4 py-3 justify-between border-b border-gray-100/50 dark:border-gray-800 transition-colors">
        <button className="flex size-10 items-center justify-center rounded-full active:bg-black/5 text-text-main dark:text-white">
          <span className="material-symbols-outlined">menu</span>
        </button>
        <div className="flex flex-col items-center">
          <span className="text-xs font-bold text-primary tracking-widest uppercase">Japón en Flor</span>
          <span className="text-xs font-medium text-text-muted dark:text-gray-400">Resumen del Viaje</span>
        </div>
        <div className="size-10 flex items-center justify-center relative">
          <span className="material-symbols-outlined text-text-main dark:text-white">notifications</span>
          <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-primary ring-2 ring-white dark:ring-surface-dark"></span>
        </div>
      </header>

      <div className="px-5 pt-6 pb-4 space-y-8">
        
        {/* HERO CARD */}
        <div className="relative w-full rounded-3xl overflow-hidden shadow-glow group aspect-[4/5] sm:aspect-video shrink-0">
          <div className="absolute inset-0 bg-gray-900">
            <div className="absolute inset-0 opacity-60 bg-[url('https://lh3.googleusercontent.com/aida-public/AB6AXuBhqVHmNNsGpR_5fGVd0-yzxk8wk0kx3OTfaScVnZFgg6Kwprwvab2Fi4rixoYkBtu4a3X-b7fRR5xnGXDYVkvwU7rCKLxYZDlzvujyoRECqlqLwPJEogpNLhMDU2tCAK0oFe-VKbyRtBhMfCEzCVjGhoOns61MM9MJkcxM4_dx7n88AGmxcGKS7ilv1FN1oLBo_fAsj3OZn8SO-pmDEMbfARr77Uhx7avhHZbzawczn7N8J_KTz7j7MAmRisFoJIofzBVVVVt-m5c')] bg-cover bg-center animate-kenburns"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/40 to-transparent mix-blend-multiply"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
          </div>
          <div className="relative z-10 p-6 flex flex-col items-center text-center h-full justify-between">
            <div className="mt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/20 text-white text-[11px] font-bold uppercase tracking-wider mb-3 shadow-sm">
                <span className="material-symbols-outlined text-[14px]">flight_takeoff</span> Próxima Aventura
              </span>
              <h1 className="text-4xl font-extrabold text-white leading-tight drop-shadow-sm">Japón<br/><span className="text-pink-200">2026</span></h1>
            </div>
            <div className="flex flex-col gap-1 items-center">
              <p className="text-white/90 text-sm font-medium tracking-wide">Del 10 al 21 de Abril</p>
            </div>
            <div className="w-full">
              <p className="text-white/80 text-xs font-semibold uppercase tracking-widest mb-3">Tu Viaje Empieza en</p>
              <div className="grid grid-cols-4 gap-2">
                {['45', '12', '08', '30'].map((val, i) => (
                  <div key={i} className="bg-white/10 backdrop-blur-md rounded-2xl p-2 border border-white/10 flex flex-col items-center shadow-sm">
                    <span className="text-xl font-bold text-white">{val}</span>
                    <span className="text-[9px] text-white/70 uppercase">{['Días', 'Hrs', 'Min', 'Seg'][i]}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* SECTION: NEXT UP */}
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 delay-100">
          <div className="flex items-center justify-between mb-3 px-1">
             <h2 className="text-lg font-bold text-text-main dark:text-white">Próxima Parada</h2>
             <Link to={AppRoute.ITINERARY} className="text-[11px] font-bold text-primary">VER TODO</Link>
          </div>
          <div className="bg-white dark:bg-surface-dark p-4 rounded-2xl shadow-card border border-gray-100 dark:border-gray-800 flex items-center gap-4 relative overflow-hidden group">
             <div className="absolute right-0 top-0 bottom-0 w-1 bg-primary"></div>
             <div className="h-12 w-12 rounded-xl bg-primary-soft dark:bg-red-900/20 flex flex-col items-center justify-center shrink-0 text-primary border border-primary/10">
               <span className="text-[9px] font-bold uppercase">ABR</span>
               <span className="text-lg font-bold leading-none">10</span>
             </div>
             <div className="flex-1 min-w-0">
               <h3 className="font-bold text-text-main dark:text-white truncate">{nextActivity.actividad}</h3>
               <p className="text-xs text-text-muted dark:text-gray-400 truncate">{nextActivity.detalles}</p>
             </div>
             <div className="h-8 w-8 rounded-full bg-gray-50 dark:bg-gray-800 flex items-center justify-center">
               <span className="material-symbols-outlined text-gray-400 text-[20px]">chevron_right</span>
             </div>
          </div>
        </div>

        {/* SECTION: ROUTE PREVIEW */}
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 delay-200">
          <div className="flex items-center justify-between mb-3 px-1">
             <h2 className="text-lg font-bold text-text-main dark:text-white">Tu Ruta (12 Días)</h2>
             <span className="text-[11px] font-bold text-text-muted">5 CIUDADES</span>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-4 -mx-5 px-5 no-scrollbar snap-x">
             {CITIES.map((city, i) => (
               <div key={i} className="snap-start shrink-0 flex flex-col items-center gap-2 group">
                  <div className="w-16 h-16 rounded-full p-1 border-2 border-primary/20 group-hover:border-primary transition-colors">
                    <img src={city.image} className="w-full h-full object-cover rounded-full" alt={city.name} />
                  </div>
                  <span className="text-xs font-bold text-text-main dark:text-white">{city.name}</span>
               </div>
             ))}
          </div>
        </div>

        {/* SECTION: QUICK ACTIONS GRID */}
        <div className="grid grid-cols-2 gap-3 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-300">
           <Link to={AppRoute.BOOKINGS} className="bg-primary-soft dark:bg-red-900/10 p-4 rounded-2xl border border-primary/10 flex flex-col gap-2 group hover:bg-red-100 dark:hover:bg-red-900/20 transition-colors">
              <div className="h-8 w-8 rounded-full bg-white/80 dark:bg-white/10 flex items-center justify-center">
                 <span className="material-symbols-outlined text-primary text-[20px]">confirmation_number</span>
              </div>
              <div>
                <span className="block text-xs font-medium text-text-sub dark:text-gray-400">Reservas</span>
                <span className="block text-sm font-bold text-primary">Mis Tickets</span>
              </div>
           </Link>
           <div className="bg-blue-50 dark:bg-blue-900/10 p-4 rounded-2xl border border-blue-100 dark:border-blue-900/20 flex flex-col gap-2">
              <div className="h-8 w-8 rounded-full bg-white/80 dark:bg-white/10 flex items-center justify-center">
                 <span className="material-symbols-outlined text-blue-600 dark:text-blue-400 text-[20px]">cloud</span>
              </div>
              <div>
                <span className="block text-xs font-medium text-text-sub dark:text-gray-400">Tokyo</span>
                <span className="block text-sm font-bold text-blue-700 dark:text-blue-300">18°C Soleado</span>
              </div>
           </div>
        </div>

      </div>
    </div>
  );
};

const ScreenItinerary: React.FC = () => {
  const grouped = RAW_ITINERARY.reduce((acc, curr) => {
    if (!acc[curr.fecha]) acc[curr.fecha] = [];
    acc[curr.fecha].push(curr);
    return acc;
  }, {} as Record<string, typeof RAW_ITINERARY>);

  return (
    <div className="h-full overflow-y-auto pb-24 bg-background-light dark:bg-background-dark transition-colors no-scrollbar">
      <header className="sticky top-0 w-full z-50 bg-white/95 dark:bg-surface-dark/95 backdrop-blur-md border-b border-gray-100 dark:border-gray-800 pt-safe transition-colors">
        <div className="flex items-center h-14 justify-between px-4">
          <Link to={AppRoute.HOME} className="flex size-10 items-center justify-center rounded-full active:bg-gray-100 dark:active:bg-gray-800 transition text-text-main dark:text-white">
            <span className="material-symbols-outlined">arrow_back_ios_new</span>
          </Link>
          <div className="flex flex-col items-center">
            <span className="text-sm font-bold text-text-main dark:text-white tracking-tight">Itinerario Completo</span>
            <span className="text-[11px] font-bold text-primary uppercase tracking-widest">Abr 10 - Abr 21</span>
          </div>
          <div className="size-10 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden border-2 border-white dark:border-surface-dark shadow-sm">
            <img src="https://picsum.photos/seed/japan/100" className="w-full h-full object-cover" />
          </div>
        </div>
      </header>

      <main className="mt-4 px-4 max-w-lg mx-auto w-full flex flex-col gap-6 pb-6">
        {Object.entries(grouped).map(([date, items], dayIdx) => (
          <details key={date} className="group bg-white dark:bg-surface-dark rounded-2xl shadow-card border border-gray-100 dark:border-gray-800 overflow-hidden" open={dayIdx === 0}>
            <summary className="relative flex cursor-pointer items-center justify-between p-4 z-10 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
              <div className="flex items-center gap-4">
                <div className="flex flex-col items-center justify-center bg-primary-soft dark:bg-red-900/20 rounded-xl h-12 w-12 shrink-0 border border-primary/10">
                  <span className="text-[9px] font-bold text-primary uppercase">{date.split('/')[1]} Abr</span>
                  <span className="text-lg font-bold text-primary">{date.split('/')[0]}</span>
                </div>
                <div>
                   <span className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-0.5">Día {dayIdx + 1}</span>
                   <span className="text-base font-bold text-text-main dark:text-white">{items[0].ciudad}</span>
                </div>
              </div>
              <span className="material-symbols-outlined text-gray-400 group-open:rotate-180 transition-transform">expand_more</span>
            </summary>
            <div className="px-5 pb-6 pt-2 border-t border-gray-50 dark:border-gray-800/50">
              {items.map((item, iIdx) => (
                <div key={iIdx} className="relative flex gap-4 z-10 mb-5 last:mb-0 group/item">
                  {iIdx !== items.length - 1 && <div className="absolute left-[9px] top-8 bottom-[-20px] w-[2px] bg-gray-100 dark:bg-gray-800"></div>}
                  <span className={`material-symbols-outlined text-[18px] z-10 mt-1 ${item.categoria === 'Transporte' ? 'text-blue-500' : item.categoria === 'Hotel' ? 'text-purple-500' : 'text-primary'}`}>
                    {item.categoria === 'Transporte' ? 'train' : item.categoria === 'Hotel' ? 'hotel' : item.categoria === 'Compras' ? 'shopping_bag' : item.categoria === 'Comida' ? 'restaurant' : 'temple_buddhist'}
                  </span>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                         <h4 className="text-sm font-bold text-text-main dark:text-white leading-tight group-hover/item:text-primary transition-colors">{item.actividad}</h4>
                         <span className="text-[10px] font-medium text-gray-400 bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded">{item.hora}</span>
                    </div>
                    <p className="text-xs text-text-sub dark:text-gray-400 mt-1">{item.detalles}</p>
                  </div>
                </div>
              ))}
            </div>
          </details>
        ))}
      </main>
    </div>
  );
};

const ScreenBookings: React.FC = () => {
  const trains = RAW_ITINERARY.filter(i => i.categoria === 'Transporte' && (i.actividad.includes('Tren') || i.actividad.includes('Shinkansen') || i.actividad.includes('Express')));
  const [expandedHotels, setExpandedHotels] = useState<Record<string, boolean>>({});

  const toggleHotel = (name: string) => {
    setExpandedHotels(prev => ({ ...prev, [name]: !prev[name] }));
  };

  return (
    <div className="h-full bg-background-light dark:bg-background-dark transition-colors overflow-y-auto pb-32 no-scrollbar">
      <header className="sticky top-0 z-50 bg-white/90 dark:bg-surface-dark/90 backdrop-blur-md border-b border-gray-100 dark:border-gray-800 px-6 py-5">
          <h1 className="text-2xl font-extrabold tracking-tight dark:text-white">Mis Reservas</h1>
          <p className="text-xs text-text-muted font-bold uppercase tracking-widest mt-1">Viaje a Japón 2026</p>
      </header>

      <div className="p-5 flex flex-col gap-8 max-w-lg mx-auto">
        
        {/* SECTION: HOTELS */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <span className="material-symbols-outlined text-primary filled">hotel</span>
            <h2 className="text-lg font-bold dark:text-white">Hoteles Confirmados</h2>
          </div>
          <div className="flex flex-col gap-6">
            {HOTELS.map((hotel, idx) => {
              const isExpanded = !!expandedHotels[hotel.name];
              return (
                <div key={idx} className="bg-white dark:bg-surface-dark rounded-3xl shadow-card overflow-hidden border border-gray-100 dark:border-gray-800 transition-all">
                  <div className={`relative ${isExpanded ? 'h-48' : 'h-36'} transition-all duration-300`}>
                    <img src={hotel.image} className="w-full h-full object-cover" alt={hotel.name} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                    <div className="absolute top-4 left-4">
                        <span className="inline-flex items-center gap-1 bg-black/40 backdrop-blur-md border border-white/20 rounded-lg px-2 py-1">
                             <span className="material-symbols-outlined text-white text-[12px]">calendar_month</span>
                             <span className="text-[10px] font-bold text-white uppercase tracking-wide">{hotel.dates}</span>
                        </span>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                      <div className="flex flex-col">
                        <span className="text-[10px] font-bold text-white/80 uppercase tracking-widest">{hotel.city}</span>
                        <h3 className="text-white text-xl font-bold leading-none">{hotel.name}</h3>
                      </div>
                      <button 
                        onClick={() => toggleHotel(hotel.name)}
                        className="bg-white/20 backdrop-blur-md border border-white/20 text-white rounded-full size-10 flex items-center justify-center active:scale-95 transition-transform"
                      >
                        <span className="material-symbols-outlined">{isExpanded ? 'expand_less' : 'expand_more'}</span>
                      </button>
                    </div>
                  </div>
                  
                  {isExpanded && (
                    <div className="p-5 animate-in fade-in slide-in-from-top-4 duration-300">
                      <p className="text-sm text-text-sub dark:text-gray-400 leading-relaxed mb-4">{hotel.description}</p>
                      
                      <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-2xl mb-4">
                        <span className="material-symbols-outlined text-primary text-[20px]">location_on</span>
                        <div>
                          <p className="text-[11px] font-bold text-gray-400 uppercase">Dirección</p>
                          <p className="text-xs font-semibold dark:text-gray-200">{hotel.address}</p>
                        </div>
                      </div>

                      <HotelMiniMap coords={hotel.coordinates} hotelName={hotel.name} />

                      <div className="mt-5 pt-4 border-t border-gray-50 dark:border-gray-800 flex justify-between items-center">
                        <a 
                          href={hotel.website} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-primary text-xs font-bold flex items-center gap-1 group"
                        >
                          Sitio Web <span className="material-symbols-outlined text-[16px] transition-transform group-hover:translate-x-1">open_in_new</span>
                        </a>
                        <span className="text-[10px] font-bold px-3 py-1 bg-green-100 text-green-700 rounded-full">CONFIRMADO</span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* SECTION: TRAINS */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <span className="material-symbols-outlined text-primary filled">train</span>
            <h2 className="text-lg font-bold dark:text-white">Billetes de Tren</h2>
          </div>
          <div className="flex flex-col gap-3">
            {trains.map((train, idx) => (
              <div key={idx} className="bg-white dark:bg-surface-dark p-4 rounded-2xl shadow-card border-l-4 border-primary border border-gray-100 dark:border-gray-800 flex justify-between items-center group active:scale-[0.99] transition-transform">
                <div>
                  <h4 className="text-sm font-bold dark:text-white">{train.actividad}</h4>
                  <div className="flex items-center gap-2 mt-1">
                      <span className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-[10px] font-medium text-gray-500">{train.hora}</span>
                      <p className="text-[11px] text-text-muted">{train.fecha}</p>
                  </div>
                  <p className="text-[11px] text-primary font-bold mt-2 uppercase tracking-tight">{train.detalles}</p>
                </div>
                <span className="material-symbols-outlined text-gray-200 text-3xl group-hover:text-primary transition-colors">qr_code_2</span>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION: FLIGHTS */}
        <section className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <span className="material-symbols-outlined text-primary filled">flight</span>
            <h2 className="text-lg font-bold dark:text-white">Vuelos</h2>
          </div>
          <div className="bg-primary dark:bg-red-800 rounded-3xl p-6 text-white shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 opacity-10">
              <span className="material-symbols-outlined text-[120px]">flight_takeoff</span>
            </div>
            <div className="flex justify-between items-center relative z-10 mb-6">
              <div>
                <p className="text-[10px] font-bold text-white/70 uppercase">Vuelo 10 Abr</p>
                <h3 className="text-2xl font-black">MAD</h3>
              </div>
              <div className="flex-1 px-4 flex flex-col items-center">
                <div className="w-full h-px bg-white/30 relative">
                   <span className="material-symbols-outlined absolute left-1/2 -translate-x-1/2 -top-3 text-[24px]">flight</span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-[10px] font-bold text-white/70 uppercase">Llegada</p>
                <h3 className="text-2xl font-black">HND</h3>
              </div>
            </div>
            <div className="flex justify-between border-t border-white/20 pt-4 relative z-10">
               <div>
                 <p className="text-[10px] font-bold text-white/70 uppercase">Estado</p>
                 <p className="text-sm font-bold">A tiempo</p>
               </div>
               <div className="text-right">
                 <p className="text-[10px] font-bold text-white/70 uppercase">Terminal</p>
                 <p className="text-sm font-bold">3</p>
               </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

const ScreenDestinations: React.FC = () => {
  return (
    <div className="h-full overflow-y-auto pb-24 bg-background-light dark:bg-background-dark transition-colors no-scrollbar">
      <header className="sticky top-0 z-50 flex items-center justify-between bg-white/90 dark:bg-surface-dark/90 px-4 py-4 backdrop-blur-md border-b border-gray-100 dark:border-gray-800">
          <Link to={AppRoute.HOME} className="flex h-10 w-10 items-center justify-center rounded-full bg-white dark:bg-zinc-800 shadow-sm border border-gray-100 dark:border-gray-700">
              <span className="material-symbols-outlined dark:text-white text-sm">arrow_back_ios_new</span>
          </Link>
          <h2 className="text-lg font-bold dark:text-white">Destinos</h2>
          <button className="flex h-10 w-10 items-center justify-center rounded-full bg-white dark:bg-zinc-800 shadow-sm border border-gray-100 dark:border-gray-700">
              <span className="material-symbols-outlined dark:text-white text-[20px]">search</span>
          </button>
      </header>
      <div className="mt-6 flex flex-col gap-6 px-4 pb-10">
        {CITIES.map((city, idx) => (
          <div key={idx} className="group relative overflow-hidden rounded-3xl shadow-lg aspect-[16/10] bg-gray-200">
            <img src={city.image} alt={city.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
            <div className="relative h-full flex flex-col justify-between p-6">
              <div className="flex justify-between items-start">
                <span className="inline-flex items-center gap-1 rounded-full bg-white/20 backdrop-blur-md px-3 py-1 text-[10px] font-bold text-white shadow-sm border border-white/20">
                  <span className="material-symbols-outlined text-[12px] filled text-white">schedule</span>
                  {city.days} Días
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-white/20 backdrop-blur-md px-2 py-1 text-white border border-white/20">
                   <span className="material-symbols-outlined text-[14px]">{city.weather}</span>
                </span>
              </div>
              <div>
                 <span className="text-[10px] font-bold text-primary-light uppercase tracking-widest mb-1 block">{city.tagline}</span>
                 <h2 className="text-3xl font-bold text-white mb-2">{city.name}</h2>
                 <p className="text-xs text-white/80 line-clamp-2">{city.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- Main App Component ---

const App: React.FC = () => {
  return (
    <HashRouter>
      <div className="relative overflow-hidden h-screen w-full bg-background-light dark:bg-background-dark max-w-md mx-auto shadow-2xl">
        <div className="h-full w-full">
          <Routes>
            <Route path={AppRoute.HOME} element={<ScreenSummary />} />
            <Route path={AppRoute.ITINERARY} element={<ScreenItinerary />} />
            <Route path={AppRoute.BOOKINGS} element={<ScreenBookings />} />
            <Route path={AppRoute.MAP} element={<ScreenMap />} />
            <Route path={AppRoute.DESTINATIONS} element={<ScreenDestinations />} />
          </Routes>
        </div>
        <BottomNav />
      </div>
    </HashRouter>
  );
};

export default App;
