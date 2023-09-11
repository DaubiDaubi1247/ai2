import { QueenSolverStatistic } from "./queenSolverStatistic";

export default class NQueensSolver {
    private N: number;
    private queens: number[] = [];
    private maxTemperature: number = 1.0;
    private minTemperature: number = 0.1;
    private coolingRate: number = 0.95;
    private countStepsForStableTemperature = 1000;

    constructor(N: number, maxTemperature : number, minTemperature: number, coolingRate : number, countStepsForStableTemperature: number) {
        this.N = N;
        this.maxTemperature = maxTemperature;
        this.minTemperature = minTemperature;
        this.coolingRate = coolingRate;
        this.countStepsForStableTemperature = countStepsForStableTemperature;
    }

    public solveNQueens(): number[] {

        let solutionStatistic = new QueenSolverStatistic();

        this.queens = this.initialState();
        let currentEnergy = this.calculateEnergy(this.queens);

        while (this.maxTemperature > this.minTemperature) {

            let countBadSolution = 0;
            let bestEnergy = currentEnergy;

            for (let i = 0; i < this.countStepsForStableTemperature; i++) {
                
                const newQueens = this.getNeighborState(this.queens);
                const newEnergy = this.calculateEnergy(newQueens);
                
                let isBadSolution = Math.random() < this.acceptanceProbability(currentEnergy, newEnergy, this.maxTemperature);
                countBadSolution += +isBadSolution;

                if (newEnergy < currentEnergy || isBadSolution) {
                    this.queens = newQueens;
                    currentEnergy = newEnergy;
                    bestEnergy = newEnergy;
                }
                
            }
            solutionStatistic.addCountBadSolution(countBadSolution);
            solutionStatistic.addEnergyBestSolution(bestEnergy);
            solutionStatistic.addTemperature(this.maxTemperature);
            this.maxTemperature *= this.coolingRate;
        }

        return this.queens;
    }

    private initialState(): number[] {

        return Array.from({ length: this.N }, (_, index) => index + 1)
    }

    private getUniqueRandomCol(randomRow : number) : number {
        let randomCol = Math.floor(Math.random() * this.N);

        while (randomRow === randomCol) {
            randomCol = Math.floor(Math.random() * this.N);
        }

        return randomCol;
    }

    private getNeighborState(state: number[]): number[] {
        const newState = state.slice();
        const randomRow = Math.floor(Math.random() * this.N);
        const randomCol = this.getUniqueRandomCol(randomRow);
        [newState[randomRow], newState[randomCol]] = [newState[randomCol], newState[randomRow]];

        return newState;
    }


    private calculateEnergy(state: number[]): number {
        let energy = 0;
        for (let row = 0; row < this.N; row++) {
            for (let col = row + 1; col < this.N; col++) {
                if (state[row] === state[col] || Math.abs(state[row] - state[col]) === Math.abs(row - col)) {
                    energy++;
                }
            }
        }
        return energy;
    }

    private acceptanceProbability(currentEnergy: number, newEnergy: number, maxTemperature: number): number {
        if (newEnergy < currentEnergy) {
            return 1.0;
        }
        return Math.exp((currentEnergy - newEnergy) / maxTemperature);
    }
}
