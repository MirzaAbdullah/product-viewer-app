/**
 * This methods allows to perform wild-card search on the collection based on the searchKey
 * @param {Array<unknown>} collection - the JSON collection on which wild-card operation needs to apply
 * @param {string} searchKey - the value which is used as a value to perform wild-card on the entire collection
 * @returns the collection with a possible combinations based on the searchKey
 */
export const filterBasedOnAnyValueOnAllKeys = (
  collection: Array<unknown>,
  searchValue: string
): Array<unknown> => {
  return collection.filter((element) => {
    return Object.values(element as any).some(
      (value) =>
        value !== null &&
        (value as string)
          .toString()
          .toLowerCase()
          .includes(searchValue.toLowerCase())
    );
  });
};
