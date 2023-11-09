export const sortedAndGetFirstElement = <T>(
  array: T[],
  callback: (item: T) => number,
  compareType: "ascending" | "descending" = "ascending"
): T => {
  const sortedArray = array
    .slice()
    .sort((a, b) =>
      compareType === "ascending"
        ? callback(a) - callback(b)
        : callback(b) - callback(a)
    );
  return sortedArray[0];
};
