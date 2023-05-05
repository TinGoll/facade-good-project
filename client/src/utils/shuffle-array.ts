const compare = <T>(a: T, b: T): number => {
  return Math.random() - 0.5;
};

export const shuffle = <T extends any = any>(array: T[]): T[] => {
  return array.sort(compare);
};



    