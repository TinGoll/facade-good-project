declare module OrderFormTypes {
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

export const mockData: OrderFormTypes.Data = {
  materials: [
    { id: 1, name: "Дуб", type: "Массив" },
    { id: 2, name: "Ольха", type: "Массив" },
    { id: 3, name: "МДФ 16 мм", type: "МДФ 16 мм" },
    { id: 4, name: "МДФ 19 мм", type: "МДФ 19 мм" },
    { id: 5, name: "МДФ 22 мм", type: "МДФ 22 мм" },
  ],
  models: [
    {
      id: 1,
      name: "Афина",
      materials: ["Массив", "МДФ 22 мм"],
    },
    {
      id: 2,
      name: "Петр",
      materials: ["Массив"],
    },
    {
      id: 3,
      name: "Эндер",
      materials: ["МДФ 22 мм", "МДФ 16 мм"],
    },
    {
      id: 4,
      name: "Гладкий",
      materials: ["МДФ 16 мм", "МДФ 19 мм", "МДФ 22 мм"],
    },
    {
      id: 5,
      name: "Жабросли",
      materials: ["МДФ 16 мм"],
    },
  ],
  colors: [
    { id: 1, name: "Капучино" },
    { id: 1, name: "Ваниль" },
    { id: 1, name: "Орех" },
    { id: 1, name: "Миндаль" },
  ],
  glossiness: [
    { id: 1, name: "Глубоко матовый (10%)" },
    { id: 2, name: "Матовый (20%)" },
    { id: 3, name: "Лёгкий глянец (40%)" },
    { id: 4, name: "Глянец (70%)" },
    { id: 5, name: "Сильный глянец (90%)" },
  ],
  patinas: [
    { id: 1, name: "Золотая" },
    { id: 2, name: "Серебро" },
    { id: 3, name: "Черная" },
    { id: 4, name: "Кориченвая" },
  ],
  facades: [
    { id: 1, name: "Глухой" },
    { id: 2, name: "Витрина" },
    { id: 3, name: "Решётка" },
  ],
  accessories: [
    { id: 1, group: "Колонна", name: "Колонна №1" },
    { id: 1, group: "Колонна", name: "Колонна №2" },
    { id: 1, group: "Карниз", name: "Карниз №1" },
    { id: 1, group: "Карниз", name: "Карниз №2" },
    { id: 1, group: "Карниз", name: "Карниз №3" },
    { id: 1, group: "Цоколь", name: "Цоколь №1" },
    { id: 1, group: "Цоколь", name: "Цоколь №2" },
  ],
};
