/**
 * @description This takes first object and second object having same set of keys
 * @param {object} obj1
 * @param {object} obj2
 * @returns {object} - object containing properties of obj1 which are different from corresponding properties in obj2
 */
export const filterKeyValuePair = (obj1, obj2) => {
  const filteredObj = Object.entries(obj1).filter(([key1, value1]) => {
    return obj2[key1] !== value1;
  });
  const newObj = Object.fromEntries(filteredObj);
  return newObj;
};
