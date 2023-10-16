import { FC, useState } from "react";
import {AntColonyTSP, City} from "../../common/artAlgorithmSolver/ArtAlgorithmSolver";

const Main: FC = () => {
    
    const [initMatix, setinitMatix] = useState<number[][]>([])

    // Пример использования
    const cities: City[] = [
        { name: 'City 1', x: 100, y: 100 },
        { name: 'City 2', x: 200, y: 200 },
        { name: 'City 3', x: 101, y: 101 },
        { name: 'City 4', x: 400, y: 150 },
        // Добавьте остальные города с их координатами
    ];

    const numAnts = 10;
    const maxGenerations = 100;
    const alpha = 2.0;
    const beta = 1.0;
    const rho = 0.1;
    const q = 1.0;
    const antColony = new AntColonyTSP(cities, numAnts, maxGenerations, alpha, beta, rho, q);

    const onClickHandler = () => {
        const result = antColony.solveTSP();
    
        console.log('Best Tour:', result.tour.map((city) => city.name).join(' -> '));
        console.log('Minimum Distance:', result.tourLength);
        
        antColony.printDistanceMatrix();
    }


    return (
        <div>
            <button onClick={onClickHandler}> получить решение</button>

            <div>
                
            </div>
        </div>
    );
}

export default Main;