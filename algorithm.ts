// 실행 명령어 : ts-node algorithm.ts

const response = getMaxProduct([1, 3, 5, 7, 9]);

console.log(
  `result : ${response.maxProductCombi[0]}, ${response.maxProductCombi[1]}`,
);

function getAllPermutations(arr: number[]): number[][] {
  const results: number[][] = [];

  function backtrack(done: number[], bucket: number[]): number[] | any {
    if (bucket.length === 0) return results.push(done);

    for (let i = 0; i < bucket.length; i++) {
      const pickNum = bucket[i];

      const nextDone = [...done, pickNum];

      const nextBucket = [];

      for (let a = 0; a < bucket.length; a++) {
        if (a !== i) {
          nextBucket.push(bucket[a]);
        }
      }

      backtrack(nextDone, nextBucket);
    }
  }

  backtrack([], arr);

  return results;
}

function getMaxProduct(inputArr: number[]): {
  maxProduct: number;
  maxProductCombi: number[];
} {
  let maxProduct = 0;
  let maxProductCombi = [0, 0];

  const allPermutations = getAllPermutations(inputArr);

  for (const permutation of allPermutations) {
    for (let i = 1; i <= Math.floor(permutation.length / 2); i++) {
      const num1 = parseInt(permutation.slice(0, i).join(""));
      const num2 = parseInt(permutation.slice(i).join(""));

      const product = num1 * num2;

      if (product > maxProduct) {
        maxProduct = product;
        maxProductCombi = [num1, num2];
      }
    }
  }

  return { maxProduct, maxProductCombi };
}
