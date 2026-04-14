
import { Vehicle } from './types';

// Funzione di base per lanciare Google Maps con Waypoints
export const launchGoogleMapsNavigation = (
  destination: string,
  vehicle: Vehicle,
  waypoints: string[]
) => {
  const waypointsString = waypoints.join('|');
  const fuelType = vehicle.fuel_type === 'electric' ? 'electric_vehicle_charging_station' : 'gas_station';

  // Aggiungiamo stazioni di servizio e caffè come waypoint
  const allWaypoints = [
    ...waypoints,
    fuelType,
    'cafe',
    'rest_area'
  ].join('|');

  const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(destination)}&waypoints=${encodeURIComponent(allWaypoints)}&travelmode=driving`;

  // Avviso vocale prima di lanciare Maps
  const utterance = new SpeechSynthesisUtterance("Percorso inviato a Google Maps con le soste consigliate per il tuo veicolo. Buon viaggio.");
  utterance.lang = 'it-IT';
  window.speechSynthesis.speak(utterance);

  // Apri Google Maps in un nuovo tab
  window.open(mapsUrl, '_blank');
};
