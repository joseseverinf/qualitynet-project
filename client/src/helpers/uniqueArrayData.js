export const uniqueArrayData = (array, fieldToFilter) => {
    const setValues = new Set(array.map((ele) => ele[fieldToFilter]));
    return Array.from(setValues);
  };