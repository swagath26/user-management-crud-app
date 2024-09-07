// leaflet-global.d.ts
declare global {
    interface Window {
      L: typeof import('leaflet'); // Declare L from Leaflet
    }
  
    namespace L {
      function maptilerLayer(options: { apiKey: string; style: string }): L.Layer;  // Add maptilerLayer method
      const MaptilerStyle: {
        STREETS: string;
      };
    }
  }
  
  export {};