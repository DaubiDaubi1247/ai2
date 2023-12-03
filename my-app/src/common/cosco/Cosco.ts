export class CoscodNetwork {
    private weights: number[][];
    private readonly threshold: number;
    private readonly patterns: number[][]
    private readonly associate = [
      [-1,-1,1],
      [-1,1,-1],
      [-1,1,1],
      [1,-1,-1]
    ]
  
    constructor() {
        this.patterns = [
            // [1, -1, 1, -1],
            // [-1, 1, -1, 1],
            // [1, 1, 1, -1],
            // [-1, -1, 1, -1],
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
              [
                -1,
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
                -1,
                1,
                1,
                1,
                -1
              ]
           ];
           
      this.weights = new Array(3).fill(0).map(() => new Array(this.patterns[0].length).fill(0));
      this.threshold = 0;
      this.train()
    }
  
    train() {
      const size = this.patterns.length;
      const associate = [
        [-1,-1,1],
        [-1,1,-1],
        [-1,1,1],
        [1,-1,-1]
      ]
      if (size === 0) {
        throw new Error('At least one pattern is required for training.');
      }

      for (let i = 0; i < associate.length; i++) {
        this.weights = this.addMatrices(this.weights, this.multiplyColumnByRow(associate[i], this.patterns[i]))
      }

      console.log(this.weights)
    }
  
    predict(inputPattern: number[]): number[] {
      debugger
      console.log(inputPattern)


      let outputPattern = [...inputPattern]
      let prev : number[] = []
      
      for (let i = 0; i < 100 ; i++) {
        debugger
        if (!outputPattern) {
          outputPattern = [...prev]
        }
        prev = [...outputPattern]
        const predictIndex = this.findRowIndex(this.associate, this.multiplyMatrixByColumn(this.weights, outputPattern))
        outputPattern = this.patterns[predictIndex]
        
        if (outputPattern && this.arraysAreEqual(prev, outputPattern)) {
          return outputPattern
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

    multiplyColumnByRow(column: number[], row: number[]): number[][] {
      const result: number[][] = [];

      for (let i = 0; i < column.length; i++) {
        result[i] = [];
        for (let j = 0; j < row.length; j++) {
          result[i][j] = column[i] * row[j];
        }
      }
  
      return result;
    }
      

      addMatrices(matrixA: number[][], matrixB: number[][]): number[][] {

        if (matrixA.length !== matrixB.length || matrixA[0].length !== matrixB[0].length) {
          throw new Error('Matrices must have the same dimensions for addition');
        }
    
        const result: number[][] = [];
    
        for (let i = 0; i < matrixA.length; i++) {
          result[i] = [];
          for (let j = 0; j < matrixA[0].length; j++) {
            result[i][j] = matrixA[i][j] + matrixB[i][j];
          }
        }
    
        return result;
      }

      multiplyMatrixByColumn(matrix: number[][], column: number[]): number[] {
        const result: number[] = [];
    
        if (matrix[0].length !== column.length) {
          throw new Error('Invalid matrix and column dimensions for multiplication');
        }
    
        for (let i = 0; i < matrix.length; i++) {
          let sum = 0;
          for (let j = 0; j < column.length; j++) {
            sum += matrix[i][j] * column[j];
          }
          result[i] = sum;
        }

        return result.map(el => el > 0 ? 1 : -1)
       
      }

     findRowIndex(matrix: number[][], targetRow: number[]): number {
        for (let i = 0; i < matrix.length; i++) {
          if (this.arraysEqual(matrix[i], targetRow)) {
            return i;
          }
        }
        return -1; // Если строка не найдена
      }
    
      private arraysEqual(arr1: number[], arr2: number[]): boolean {
        return arr1.every((value, index) => value === arr2[index]);
      }
  }
  