export function compareArrays<T>(
  arr1: T[],
  arr2: T[],
  getId: (item: T) => number,
  compare: (item: T) => any
): T[] {
  const result: T[] = [];

  for (const obj1 of arr1) {
    const matchingObj = arr2.find((obj2) => getId(obj1) === getId(obj2));

    if (matchingObj && compare(obj1) !== compare(matchingObj)) {
      result.push(matchingObj);
    }
  }

  return result;
}
