declare module Hdbk {
    interface Data {
      materials: Material[];
      models: Model[];
      colors: Color[];
      glossiness: Glossiness[];
      patinas: Patina[];
      facades: Facade[];
      accessories: Accessorie[];
    }
    interface Material {
      id: number;
      name: string;
      type: string;
    }
  
    interface Model {
      id: number;
      name: string;
      materials: string[];
    }
  
    interface Color {
      id: number;
      name: string;
    }
    interface Glossiness {
      id: number;
      name: string;
    }
    interface Patina {
      id: number;
      name: string;
    }
    interface Facade {
      id: number;
      name: string;
    }
    interface Accessorie {
      id: number;
      group: string;
      name: string;
    }
  }
  
  export { Hdbk };