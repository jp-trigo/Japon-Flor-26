
export interface ItineraryItem {
  fecha: string;
  diaSemana: string;
  hora: string;
  momento: string;
  ciudad: string;
  categoria: string;
  actividad: string;
  detalles: string;
  estado: string;
}

export enum AppRoute {
  HOME = '/',
  ITINERARY = '/itinerary',
  BOOKINGS = '/bookings',
  MAP = '/map',
  DESTINATIONS = '/destinations'
}

export interface CityData {
  name: string;
  description: string;
  tagline: string;
  image: string;
  temp: number;
  weather: string;
  days: number;
  coordinates: [number, number];
}

export interface HotelData {
  name: string;
  city: string;
  dates: string;
  description: string;
  address: string;
  website: string;
  coordinates: [number, number];
  image: string;
}
