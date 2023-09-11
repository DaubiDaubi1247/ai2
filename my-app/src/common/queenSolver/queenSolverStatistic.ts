export class QueenSolverStatistic {
    private _countBadSolutionArr : number[];
    private _energyBestSolutionArr : number[];
    private _temperatureArr : number[];
    private _queens : number[];
    private _iterations : number[];


    get iterations(): number[] {
        return this._iterations;
    }

    get countBadSolutionArr(): number[] {
        return this._countBadSolutionArr;
    }

    get energyBestSolutionArr(): number[] {
        return this._energyBestSolutionArr;
    }

    get temperatureArr(): number[] {
        return this._temperatureArr;
    }

    get queens(): number[] {
        return this._queens;
    }

    set queens(value: number[]) {
        this._queens = value;
    }

    constructor() {
        this._countBadSolutionArr = []
        this._energyBestSolutionArr = []
        this._temperatureArr = []
        this._queens = []
        this._iterations = []
    }
    /**
     * addCountBadSolution
     */
    public addCountBadSolution(countBadSolution : number) : void {
        this._countBadSolutionArr.push(countBadSolution);
    }

    public addIteration(iteration : number) : void {
        this._iterations.push(iteration);
    }

    /**
     * energ
     */
    public addEnergyBestSolution(energyBestSolution : number) {
        this._energyBestSolutionArr.push(energyBestSolution);
    }

    public addTemperature(temperature : number) {
        this._temperatureArr.push(temperature);
    }

}