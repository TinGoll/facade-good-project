export const convertToTranslit = (cyrillicText: string): string => {
  const cyrillicMap: { [key: string]: string } = {
    а: "a",
    б: "b",
    в: "v",
    г: "g",
    д: "d",
    е: "e",
    ё: "yo",
    ж: "zh",
    з: "z",
    и: "i",
    й: "y",
    к: "k",
    л: "l",
    м: "m",
    н: "n",
    о: "o",
    п: "p",
    р: "r",
    с: "s",
    т: "t",
    у: "u",
    ф: "f",
    х: "kh",
    ц: "ts",
    ч: "ch",
    ш: "sh",
    щ: "sch",
    ъ: "i",
    ь: "i",
    ы: "y",
    э: "e",
    ю: "yu",
    я: "ya",
    " ": "-",
    ",": "-",
  };

  return cyrillicText
    .toLowerCase()
    .split("")
    .map((char) => cyrillicMap[char] || char)
    .join("");
};

