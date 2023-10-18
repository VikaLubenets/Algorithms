function onionWrapper(...args) {
    let firstCall = true;
    const cities = new Set();
    let taxFunc = null;
  
    for (const arg of args) {
      if (typeof arg === 'function') {
        taxFunc = arg;
      } else if (typeof arg === 'string') {
        addCity(arg);
      }
    }
  
    function addCity(city) {
      cities.add(city);
    }
  
    function superOnion(...visitedCities) {
      visitedCities.forEach(city => cities.delete(city));
      const remainingCities = [...cities].sort();
  
      if (taxFunc) {
        taxFunc(remainingCities);
      }
  
      return onionWrapper(...visitedCities);
    }

    if(firstCall){
        firstCall = false;
        return
    } else {
        return superOnion;
    }
  }
  
  module.exports = onionWrapper;




// function onionWrapper(...args) {
//     const cities = new Set();
//     let taxFunc;
  
//     for (const arg of args) {
//       if (typeof arg === 'string') {
//         cities.add(arg);
//       } else if (typeof arg === 'function' && !taxFunc) {
//         taxFunc = arg;
//       }
//     }
  
//     function superOnion(...visitedCities) {
//       for (const city of visitedCities) {
//         cities.delete(city);
//       }
  
//       const remainingCities = Array.from(cities);
//       taxFunc(remainingCities);
//     }
  
//     return superOnion;
//   }
  
//   module.exports = onionWrapper;