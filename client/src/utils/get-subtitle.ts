export const getSubtitle = (subtitle: string): [string, string] => {
  let firstElem = subtitle;
  let secondElem = "";

  if (subtitle.includes("(")) {
    const sList = subtitle.split("(");
    // первый элемент
    firstElem = sList[0].trim();
    // второй элемент
    secondElem = sList[1].split(")")[0].trim();
  }
  return [firstElem, secondElem];
};
