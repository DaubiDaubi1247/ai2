export class QueenSolverStatistic {
    countBadSolutionArr : number[];
    energyBestSolutionArr : number[];
    temperatureArr : number[];

    constructor() {
        this.countBadSolutionArr = []
        this.energyBestSolutionArr = []
        this.temperatureArr = []
    }


    /**
     * addCountBadSolution
     */
    public addCountBadSolution(countBadSolution : number) : void {
        this.countBadSolutionArr.push(countBadSolution);
    }

    /**
     * energ
     */
    public addEnergyBestSolution(energyBestSolution : number) {
        this.energyBestSolutionArr.push(energyBestSolution);
    }

    public addTemperature(temperature : number) {
        this.temperatureArr.push(temperature);
    }

}