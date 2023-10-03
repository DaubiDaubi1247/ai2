export default class MatrixConverter {

    async convertFile(file : File) {
        const data = await file.text();
        const lines = data.split('\n');
        const matrix : number[][] = [];

        for (const line of lines) {
          const row = line.trim().split(' ').map(Number);
          matrix.push(row);
        }

        return matrix;

    }
  }