export class TravelingSalesmanGeneticAlgorithm {
  private population: number[][];
  private distances: number[][];

  constructor(distances: number[][]) {
    this.distances = distances;
    this.population = [];
  }

  // Генерация случайного маршрута, начиная с указанной начальной точки
  private generateRandomRoute(): number[] {
    const route = Array.from({ length: this.distances.length }, (_, index) => index);

    // Используем алгоритм случайной перестановки для перемешивания маршрута
    for (let i = route.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [route[i], route[j]] = [route[j], route[i]];
    }

    return route;
  }

  // Расчет общего расстояния для данного маршрута
  public calculateRouteDistance(route: number[]): number {
    let distance = 0;
    for (let i = 0; i < route.length - 1; i++) {
      distance += this.distances[route[i]][route[i + 1]];
    }
    distance += this.distances[route[route.length - 1]][route[0]]; // Замыкаем маршрут
    return distance;
  }

  // Создание начальной популяции
  private createInitialPopulation(populationSize: number): void {
    this.population = [];
    for (let i = 0; i < populationSize; i++) {
      const route = this.generateRandomRoute();
      this.population.push(route);
    }
  }

  // Выбор родителей для скрещивания
  private selectParentsUsingRouletteWheel(): number[][] {
    const parents = [];
    //Сумма приспособленностей (в данном случае, обратной длины маршрута) всех особей в текущей популяции. 
    //Это значение используется для нормализации вероятностей выбора родителей.
    const totalFitness = this.population.reduce((sum, route) => sum + this.calculateRouteFitness(route), 0);

    for (let i = 0; i < 2; i++) {
      let spin = Math.random() * totalFitness;
      let currentSum = 0;

      for (const route of this.population) {
        currentSum += this.calculateRouteFitness(route);
        if (currentSum >= spin) {
          parents.push(route);
          break;
        }
      }
    }

    return parents;
  }

  // Расчет приспособленности для маршрута (длины маршрута в данном случае)
  private calculateRouteFitness(route: number[]): number {
    return 1 / this.calculateRouteDistance(route);
  }

  // Скрещивание двух родителей для создания потомка
  // 1)	потомок, хромосома которого на позициях от 1 до   состоит из генов первого родителя, а на позициях от   до L  - из генов второго родителя
  private crossover(parent1: number[], parent2: number[]): number[] {
    const start = Math.floor(Math.random() * parent1.length);
    const end = Math.floor(Math.random() * (parent1.length - start)) + start;

    const child = parent1.slice(start, end);
    for (const city of parent2) {
      if (!child.includes(city)) {
        child.push(city);
      }
    }

    return child;
  }

  // Мутация маршрута с заданной вероятностью
  private mutate(route: number[], mutationRate: number): number[] {
    if (Math.random() < mutationRate) {
      const index1 = Math.floor(Math.random() * route.length);
      const index2 = (index1 + 1) % route.length;

      [route[index1], route[index2]] = [route[index2], route[index1]];
    }

    return route;
  }

  // Эволюция популяции на заданное количество итераций
  private evolvePopulation(iterations: number, populationSize: number, mutationRate: number): void {
    this.createInitialPopulation(populationSize);

    for (let i = 0; i < iterations; i++) {
      const newPopulation = [];

      while (newPopulation.length < this.population.length) {
        const [parent1, parent2] = this.selectParentsUsingRouletteWheel();
        const child = this.crossover(parent1, parent2);
        this.mutate(child, mutationRate);
        newPopulation.push(child);
      }

      this.population = newPopulation;
    }
  }

  // Решение задачи коммивояжера с использованием генетического алгоритма
  public solve(iterations: number, populationSize: number, mutationRate: number): number[] {
    this.evolvePopulation(iterations, populationSize, mutationRate);

    let bestRoute = this.population[0];
    let bestDistance = this.calculateRouteDistance(bestRoute);

    for (const route of this.population) {
      const distance = this.calculateRouteDistance(route);
      if (distance < bestDistance) {
        bestDistance = distance;
        bestRoute = route;
      }
    }

    return bestRoute;
  }
}
