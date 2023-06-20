function roundCoordinates(array) {
    // Round latitude and longitude values to 3 decimal points
    const roundedArray = array.map(obj => ({
      latitude: parseFloat(obj.latitude.toFixed(5)),
      longitude: parseFloat(obj.longitude.toFixed(5)),
      value: obj.value
    }));
  
    // Group objects based on matching latitude and longitude values
    const groupedArrays = {};
    roundedArray.forEach(obj => {
      const key = `${obj.latitude}_${obj.longitude}`;
      if (!groupedArrays[key]) {
        groupedArrays[key] = [];
      }
      groupedArrays[key].push(obj);
    });
  
    // Convert grouped arrays into an array of arrays
    const result = Object.values(groupedArrays);
  
    return result;
  }
  
  // Example usage
  const objectsArray = [
    { latitude: 42.123456, longitude: -71.987654, value: "A" },
    { latitude: 42.123456, longitude: -71.987654, value: "B" },
    { latitude: 42.987654, longitude: -71.123456, value: "C" },
    { latitude: 42.987654, longitude: -71.123456, value: "D" },
    { latitude: 42.987654, longitude: -71.123456, value: "E" },
    { latitude: 42.987654, longitude: -71.987654, value: "F" }
  ];
  
  const resultArray = roundCoordinates(objectsArray);
  console.log(resultArray);