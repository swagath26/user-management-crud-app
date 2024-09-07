const initMap = (
  mapContainer: string | HTMLElement,
  center: [number, number], 
  zoom: number = 11
): L.Map => {

    let container: HTMLElement | null = null;

    // If mapContainer is a string, resolve the element by ID
    if (typeof mapContainer === 'string') {
        container = document.getElementById(mapContainer);
    } else {
        container = mapContainer;
    }

    // Ensure the container is found
    if (!container) {
        console.log("Map container element not found.");
    }

    if (!window.L) {
      console.error("Leaflet library (window.L) is not loaded.");
    }

    const map_obj: L.Map = window.L.map(mapContainer, {
      center: center,
      zoom: zoom
    });

    window.L.maptilerLayer({
      apiKey: 'cIpY5YW2swGKoC5mFkdK',
      style: window.L.MaptilerStyle.STREETS,
    }).addTo(map_obj);

    const LeafletLogo = document.querySelector('.leaflet-container a img') as HTMLImageElement | null;
    if(LeafletLogo) LeafletLogo.style.display = 'none';

    const LeafletAttribute = document.querySelector('.leaflet-control-attribution') as HTMLElement | null;
    if(LeafletAttribute) LeafletAttribute.style.display = 'none';

    return map_obj;
}

export default initMap;