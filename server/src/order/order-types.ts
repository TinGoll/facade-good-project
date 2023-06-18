declare module Order {
  interface Data {
    header: Order.Header;
    facades: Order.Facade[];
    accessories: Order.Accessorie[];
    files: any[];
  }

  interface Header {
    material?: string;
    model?: string;
    color?: string;
    glossiness?: string;
    drill?: string;
    patina?: string;
    thermalseam?: string;
    roll?: string;
    note: string;

    date?: string;
    mail?: string;
    phone?: string;
    title?: string;
  }

  interface Facade {
    id: string | number;
    height?: number;
    width?: number;
    amount?: number;
    type?: string;
    note?: string;
  }

  interface Accessorie {
    id: number | string;
    type?: string;
    model?: string;
    height?: number;
    amount?: number;
    note?: string;
  }
}
