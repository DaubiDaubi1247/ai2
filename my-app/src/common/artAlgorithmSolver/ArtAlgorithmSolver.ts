export interface City {
    name: string;
    x: number;
    y: number;
}

interface Ant {
    tour: City[];
    tourLength: number;
}

export class AntColonyTSP {
    private cities: City[];
    private numAnts: number;
    private maxGenerations: number;
    private alpha: number;
    private beta: number;
    private rho: number;
    private q: number;
    private pheromoneMatrix: number[][];
    public  visibilityMatrix: number[][];

    constructor(
        cities: City[],
        numAnts: number,
        maxGenerations: number,
        alpha: number,
        beta: number,
        rho: number,
        q: number
    ) {
        this.cities = cities;
        this.numAnts = numAnts;
        this.maxGenerations = maxGenerations;
        this.alpha = alpha;
        this.beta = beta;
        this.rho = rho;
        this.q = q;
        this.pheromoneMatrix = [];
        this.visibilityMatrix = [];
        // this.visibilityMatrix = [
        //     [0, 10, 15, 20],
        //     [10, 0, 35, 25],
        //     [15, 35, 0, 30],
        //     [20, 25, 30, 0]
        //   ];

        for (let i = 0; i < cities.length; i++) {
            this.pheromoneMatrix[i] = new Array(cities.length).fill(1);
            this.visibilityMatrix[i] = new Array(cities.length);
        }

        for (let i = 0; i < cities.length; i++) {
            for (let j = 0; j < cities.length; j++) {

                if (this.visibilityMatrix[i][j] !== undefined) continue
                if (i !== j) {
                    const distance = Math.floor(Math.random() * 101) + 1
                    this.visibilityMatrix[i][j] = distance;
                    this.visibilityMatrix[j][i] = distance;
                } else {
                    this.visibilityMatrix[i][j] = 0;
                }
            }
        }
    }

    private selectNextCity(ant: Ant, currentIndex: number): number {
        const rouletteWheel = Math.random();
        let totalProbability = 0;

        for (let i = 0; i < this.cities.length; i++) {
            if (!ant.tour.includes(this.cities[i])) {
                totalProbability +=
                    (this.pheromoneMatrix[currentIndex][i] ** this.alpha) *
                    (this.visibilityMatrix[currentIndex][i] ** this.beta);
            }
        }

        let accumulatedProbability = 0;
        for (let i = 0; i < this.cities.length; i++) {
            if (!ant.tour.includes(this.cities[i])) {
                const probability =
                    (this.pheromoneMatrix[currentIndex][i] ** this.alpha) *
                    (this.visibilityMatrix[currentIndex][i] ** this.beta) /
                    totalProbability;

                if (accumulatedProbability + probability >= rouletteWheel) {
                    return i;
                }
                accumulatedProbability += probability;
            }
        }

        // Fallback: should not reach this point
        for (let i = 0; i < this.cities.length; i++) {
            if (!ant.tour.includes(this.cities[i])) {
                return i;
            }
        }

        return -1;
    }

    public solveTSP(): Ant {

        this.pheromoneMatrix.forEach(el => el = new Array(this.cities.length).fill(1))
        let bestAnt: Ant = { tour: [], tourLength: Number.MAX_VALUE };

        for (let generation = 0; generation < this.maxGenerations; generation++) {
            const ants: Ant[] = [];

            for (let antIndex = 0; antIndex < this.numAnts; antIndex++) {
                const ant: Ant = { tour: [], tourLength: 0 };

                // Initialize ant's tour with a random city
                const randomCityIndex = 0;
                ant.tour.push(this.cities[randomCityIndex]);

                for (let i = 1; i < this.cities.length; i++) {
                    const currentIndex = this.cities.indexOf(ant.tour[ant.tour.length - 1]);
                    const nextCityIndex = this.selectNextCity(ant, currentIndex);
                    ant.tour.push(this.cities[nextCityIndex]);
                    ant.tourLength += this.visibilityMatrix[currentIndex][nextCityIndex];
                }
                // Return to the initial city
                ant.tourLength +=
                    this.visibilityMatrix[this.cities.indexOf(ant.tour[ant.tour.length - 1])][
                        this.cities.indexOf(ant.tour[0])
                        ];
                ant.tour.push(ant.tour[0]);

                if (ant.tourLength < bestAnt.tourLength) {
                    bestAnt = { ...ant };
                }

                ants.push(ant);
            }

            // Update pheromone levels
            for (let i = 0; i < this.cities.length; i++) {
                for (let j = 0; j < this.cities.length; j++) {
                    if (i !== j) {
                        this.pheromoneMatrix[i][j] = (1 - this.rho) * this.pheromoneMatrix[i][j];

                        ants.forEach((ant) => {
                            const currentIndex = this.cities.indexOf(ant.tour[i]);
                            const nextIndex = this.cities.indexOf(ant.tour[i + 1]);

                            this.pheromoneMatrix[currentIndex][nextIndex] += this.q / ant.tourLength;
                            this.pheromoneMatrix[nextIndex][currentIndex] += this.q / ant.tourLength;
                        });
                    }
                }
            }
        }

        return bestAnt;
    }

    public printDistanceMatrix() {
            // Выводим матрицу расстояний с пояснениями
    for (let i = 0; i < this.cities.length; i++) {
        for (let j = 0; j < this.cities.length; j++) {
          const cityA = this.cities[i].name;
          const cityB = this.cities[j].name;
          const distance = this.visibilityMatrix[i][j];
  
          console.log(`Расстояние между ${cityA} и ${cityB}: ${distance}`);
        }
      }
    }
    
}

