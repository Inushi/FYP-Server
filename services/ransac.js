const regression = require('regression');

// RANSAC parameters
let n = 2; // Number of points required to fit a line
let k = 1000; // Maximum number of iterations (50%, 6 points)
let t = 15; // Inlier tolerance

let bestModel = [0, 0];
let bestCount = 0;

exports.ransac = function (dataArray) {
  let data = [];
  dataArray.forEach(element => {
    data.push(element.signal)
  });

  for (let i = 1; i <= k; i++) {
    // Randomly select n points
    let idx = [];
    while (idx.length < n) {
      let randomIdx = Math.floor(Math.random() * data.length);
      if (!idx.includes(randomIdx)) {
        idx.push(randomIdx);
      }
    }
    let sample = idx.map((index) => data[index]);
  
    // Fit a line to the sample using linear regression
    let result = regression.linear(idx.map((index) => [index, data[index]]));
    let model = result.equation;
  
    // Compute distance to the line for all points
    let dist = data.map((point, index) => Math.abs(point - (model[0] * index + model[1])));
  
    // Count inliers
    let count = dist.filter((distance) => distance < t).length;
  
    // Update best model if necessary
    if (count > bestCount) {
      bestModel = model;
      bestCount = count;
    }
  }
  
  // Identify inliers
  let dist = data.map((point, index) => Math.abs(point - (bestModel[0] * index + bestModel[1])));
  let inliers = dist.map((distance) => distance < t);
  
  // Plot the data and the best fit line (using a different library or custom plotting code)
  
  // Displaying the inliers
  // console.log("Inliers of the data:");
  // console.log(data.filter((_, i) => inliers[i]));
  
  // Calculate the mode of the filtered data
  // let mode_value = calculateMode(data.filter((_, i) => inliers[i]));
  // console.log("Mode of the filtered data:");
  // console.log(mode_value);
  
  // Calculate the mean of the filtered data
  let mean_value = calculateMean(data.filter((_, i) => inliers[i]));
  console.log("Mean of the filtered data:");
  console.log(mean_value);

  //Logic for connecting to the blockchain goes here
}


// Function to calculate the mode of an array
function calculateMode(arr) {
  let modeMap = {};
  let maxCount = 0;
  let mode;

  for (let num of arr) {
    modeMap[num] = (modeMap[num] || 0) + 1;
    if (modeMap[num] > maxCount) {
      maxCount = modeMap[num];
      mode = num;
    }
  }

  return mode;
}

// Function to calculate the mean of an array
function calculateMean(arr) {
  let sum = arr.reduce((acc, val) => acc + val, 0);
  return sum / arr.length;
}