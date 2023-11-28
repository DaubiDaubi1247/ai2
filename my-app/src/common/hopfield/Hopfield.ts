export class HopfieldNetwork {
    private readonly weights: number[][];
    private readonly threshold: number;
    private readonly patterns: number[][]
  
    constructor(size: number) {
        this.patterns = [
            // [-1, 1, -1, 1],
            // [1, -1, 1, 1],
            // [-1, 1, -1, -1]
            [
                1,
                1,
                1,
                1,
                1,
                -1,
                -1,
                1,
                -1,
                -1,
                -1,
                -1,
                1,
                -1,
                -1,
                -1,
                -1,
                1,
                -1,
                -1,
                -1,
                -1,
                1,
                -1,
                -1
              ],
              [
                -1,
                -1,
                1,
                -1,
                -1,
                -1,
                1,
                -1,
                1,
                -1,
                1,
                -1,
                -1,
                -1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                -1,
                -1,
                -1,
                1
              ],
              [
                1,
                1,
                1,
                1,
                -1,
                1,
                -1,
                -1,
                -1,
                -1,
                1,
                -1,
                -1,
                -1,
                -1,
                1,
                -1,
                -1,
                -1,
                -1,
                1,
                -1,
                -1,
                -1,
                -1
              ],
           ];
      this.weights = new Array(this.patterns[0].length).fill(0).map(() => new Array(this.patterns[0].length).fill(0));
      this.threshold = 0;
      this.train()
    }
  
    train() {
      const size = this.patterns.length;
      if (size === 0) {
        throw new Error('At least one pattern is required for training.');
      }

      for (const data of this.patterns) {
        for (let i = 0; i < data.length; i++) {
            for (let j = 0; j < data.length; j++) {
              if (i !== j) {
                this.weights[i][j] += data[i] * data[j];
              }
            }
        }
      }
    }
  
    predict(inputPattern: number[]): number[] {
      const size = inputPattern.length;
      if (size !== this.weights.length) {
        throw new Error('Input pattern size must match the network size.');
      }
  
      let outputPattern: number[] = [...inputPattern];
      
      let isEqualWithPrev = false;
      
      for (let i = 0; i < 1000; i++) {
        let prev: number[] = [...outputPattern];
        for (let i = 0; i < size; i++) {
            let sum = 0;
            for (let j = 0; j < size; j++) {
              sum += this.weights[i][j] * outputPattern[j];
            }
            outputPattern[i] = sum >= this.threshold ? 1 : -1;
          }

          if (this.containsArray(outputPattern) && this.arraysAreEqual(prev, outputPattern)) {
              return outputPattern;
          }
    
      }
  
      return outputPattern;
    }

    private arraysAreEqual(array1: number[], array2: number[]): boolean {
        if (array1.length !== array2.length) {
          return false;
        }
    
        for (let i = 0; i < array1.length; i++) {
          if (array1[i] !== array2[i]) {
            return false;
          }
        }
    
        return true;
      }

    containsArray(targetArray: number[]): boolean {
        const flattenedTarget = targetArray.flat();
        
        for (const letter of this.patterns) {
          if (letter.length === flattenedTarget.length) {
            const flattenedLetter = letter.flat();
            let isEqual = true;
    
            for (let i = 0; i < flattenedLetter.length; i++) {
              if (flattenedLetter[i] !== flattenedTarget[i]) {
                isEqual = false;
                break;
              }
            }
    
            if (isEqual) {
              return true;
            }
          }
        }
    
        return false;
      }
  }
  