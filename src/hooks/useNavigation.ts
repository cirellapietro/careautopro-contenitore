
export const useNavigation = () => {
  /**
   * Apre Google Maps in una nuova scheda con una destinazione specifica.
   * @param destination L'indirizzo di destinazione da cercare su Google Maps.
   */
  const MapsTo = (destination: string) => {
    const encodedDestination = encodeURIComponent(destination);
    const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodedDestination}`;
    
    if (typeof window !== "undefined") {
      window.open(mapsUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return { MapsTo };
};
