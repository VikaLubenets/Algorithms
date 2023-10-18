function getObjectFieldValue(obj, field) {
    if (typeof obj === 'object' && obj !== null) {
      if (obj.hasOwnProperty(field)) {
        return obj[field];
      } else {
        for (const key in obj) {
          if (obj.hasOwnProperty(key) && typeof obj[key] === 'object') {
            const result = getObjectFieldValue(obj[key], field);
            if (result !== undefined) {
              return result;
            }
          }
        }
      }
    }
    return undefined;
  }
  
  function compare(a, b) {
    const numA = parseFloat(a);
    const numB = parseFloat(b);
  
    if (!isNaN(numA) && !isNaN(numB)) {
      return numA - numB;
    } else if (!isNaN(numA)) {
      return -1;
    } else if (!isNaN(numB)) {
      return 1;
    } else {
      return String(a).localeCompare(String(b));
    }
  }
  
  function sortArray(array, order, field) {
    const templateSet = new Set(order);
    const templateIndex = new Map(order.map((val, idx) => [val, idx]));
  
    array.sort((a, b) => {
      const aField = typeof a === 'object' ? getObjectFieldValue(a, field) : a;
      const bField = typeof b === 'object' ? getObjectFieldValue(b, field) : b;
  
      const aIndex = templateIndex.has(aField) ? templateIndex.get(aField) : order.length;
      const bIndex = templateIndex.has(bField) ? templateIndex.get(bField) : order.length;
  
      if (aIndex !== bIndex) {
        return aIndex - bIndex;
      }
  
      return compare(aField, bField);
    });
  
    const extraItems = array.filter(item => {
      const itemField = typeof item === 'object' ? getObjectFieldValue(item, field) : item;
      return !templateSet.has(itemField);
    });
  
    extraItems.sort((a, b) => compare(
      typeof a === 'object' ? getObjectFieldValue(a, field) : a,
      typeof b === 'object' ? getObjectFieldValue(b, field) : b
    ));
  
    return array.filter(item => {
      const itemField = typeof item === 'object' ? getObjectFieldValue(item, field) : item;
      return templateSet.has(itemField);
    }).concat(extraItems);
  }
  
  module.exports = sortArray;