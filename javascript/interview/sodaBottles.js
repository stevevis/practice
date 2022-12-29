// Given a collection of soda bottles of different sizes, find all unique combinations of bottles that result in a 
// given amount of soda.

const bottles = [1, 6, 3, 7, 4, 5, 5, 2, 9, 8];
const target = 10;

function findCombos(bottles, target) {
  const combos = [];
  bottles.sort();
  dfs(bottles, target, [], 0, combos);
  return combos;
}

function dfs(bottles, remainder, currentPath, start, combos) {
  if (remainder === 0 && currentPath.length > 1) {
    combos.push(currentPath.slice());
  }

  if (remainder < 0) {
     return;
  }

  for (let i = start; i < bottles.length; i++) {
    if (bottles[i] <= remainder) {
      currentPath.push(bottles[i]);
      dfs(bottles, remainder - bottles[i], currentPath, i+1, combos);
      currentPath.pop();
    }
  }
}

console.log(findCombos(bottles, target));
