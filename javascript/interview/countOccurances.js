const array = [2, 2, 2, 3, 3, 3, 4, 4, 5, 6, 6, 7, 8, 8, 8, 8, 8, 10, 10];
const target = 4;

const findFirst = function(array, target, start, end) {
  const mid = Math.floor((end - start) / 2) + start;
  //console.log(`Start: ${start} [${array[start]}], End: ${end} [${array[end]}], Mid: ${mid} [${array[mid]}]`);
  
  if (start === mid && array[mid] !== target) {
    return -1;
  } else if (array[mid] === target && (mid === 0 || array[mid-1] !== target)) {
    return mid;
  } else if (array[mid] >= target) {
    return findFirst(array, target, start, mid);
  } else if (array[mid] < target) {
    return findFirst(array, target, mid+1, end);
  }
}

const findLast = function(array, target, start, end) {
  const mid = Math.floor((end - start) / 2) + start;
  //console.log(`Start: ${start} [${array[start]}], End: ${end} [${array[end]}], Mid: ${mid} [${array[mid]}]`);

  if (start === mid && array[mid] !== target) {
    return -1;
  } else if (array[mid] === target && (mid === array.length - 1 || array[mid+1] !== target)) {
    return mid;
  } else if (array[mid] <= target) {
    return findLast(array, target, mid+1, end);
  } else if (array[mid] > target) {
    return findLast(array, target, start, mid);
  }
}

const countOccurances = function(array, target) {
  const maxIndex = array.length - 1;
  const firstOccurance = findFirst(array, target, 0, maxIndex);
  const lastOccurance = findLast(array, target, 0, maxIndex);
  if (firstOccurance === -1) {
    return 0;
  } else {
    return lastOccurance - firstOccurance + 1;
  }
}

console.assert(countOccurances(array, 1) === 0, "The number of 1's was not 0");
console.assert(countOccurances(array, 2) === 3, "The number of 2's was not 3");
console.assert(countOccurances(array, 3) === 3, "The number of 3's was not 3");
console.assert(countOccurances(array, 4) === 2, "The number of 4's was not 2");
console.assert(countOccurances(array, 5) === 1, "The number of 5's was not 1");
console.assert(countOccurances(array, 6) === 2, "The number of 6's was not 2");
console.assert(countOccurances(array, 7) === 1, "The number of 7's was not 1");
console.assert(countOccurances(array, 8) === 5, "The number of 8's was not 5");
console.assert(countOccurances(array, 9) === 0, "The number of 9's was not 0");
console.assert(countOccurances(array, 10) === 2, "The number of 10's was not 2");
console.assert(countOccurances(array, 11) === 0, "The number of 11's was not 0");
