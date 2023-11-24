import { FC, useState } from "react";
import { AntColonyTSP, City } from "../../common/artAlgorithmSolver/ArtAlgorithmSolver";
import Graph from "./Graph";
import { Node, Edge } from "vis-network/standalone/esm/vis-network";
import { TravelingSalesmanGeneticAlgorithm } from "../../common/geneticAlg/GeneteicAlg";

const initMatr = (towns : number) => {
    const visibilityMatrix: number[][] = [];

    for (let i = 0; i < towns; i++) {
        visibilityMatrix[i] = new Array(towns);
    }

    for (let i = 0; i < towns; i++) {
        for (let j = 0; j < towns; j++) {

            if (visibilityMatrix[i][j] !== undefined) continue
            if (i !== j) {
                const distance = Math.floor(Math.random() * 101) + 1
                visibilityMatrix[i][j] = distance;
                visibilityMatrix[j][i] = distance;
            } else {
                visibilityMatrix[i][j] = 0;
            }
        }
    }

    return visibilityMatrix;
}

const initCities = (countCity : number) => {

    const cities: City[] = []

    for (let i = 0; i < countCity; i++) {
        cities.push({ label: `City ${i }`, id: i })
    }

    return cities;
}

const Main: FC = () => {

    const [iterations, setiterations] = useState(1000);
    const [populations, setpopulations] = useState(50);
    const [mutations, setmutations] = useState(0.01);
    const [q, setQ] = useState(1.0);
    const [towns, settowns] = useState(10);

    const handleiterationsChange = (e: any) => {
        setiterations(parseFloat(e.target.value));
    };

    const handlepopulationsChange = (e: any) => {
        setpopulations(parseFloat(e.target.value));
    };

    const handlemutationsChange = (e: any) => {
        setmutations(parseFloat(e.target.value));
    };

    const handleTownsChange = (e: any) => {
        settowns(parseInt(e.target.value));
    };

    const [visibilityMatr, setVisibilityMatr] = useState(initMatr(towns))
    const [edges, setedges] = useState<Edge[]>([])

    const [cities, setcities] = useState<City[]>([])

    const [isVisble, setisVisble] = useState(false)
    const [minDist, setminDist] = useState(-1)

    // Пример использования

    const numAnts = 10;
    const maxGenerations = 100;

    const onClickCreateNewMatr = () => {
        setVisibilityMatr(initMatr(towns))
    }

    const onClickHandler = () => {
          
        const tspGA = new TravelingSalesmanGeneticAlgorithm(visibilityMatr);
        const bestRoute = tspGA.solve(iterations, populations, mutations, );
        
        console.log('Best Route:', bestRoute);
        console.log('Best Distance:', tspGA.calculateRouteDistance(bestRoute));

        const cities1 = initCities(visibilityMatr.length);
        // const antColony = new AntColonyTSP(cities1, numAnts, maxGenerations, iterations, populations, mutations, q, visibilityMatr);
        // const result = antColony.solveTSP();

        const edge: Edge[] = [];
        const edgeForPrint: Edge[] = [];

        for (let i = 0; i < bestRoute.length - 1; i++) {
            edge.push({from : bestRoute[i], to : bestRoute[i + 1], label : visibilityMatr[bestRoute[i]][bestRoute[i + 1]].toString()})
            // for (let j = i + 1; j < bestRoute.length; j++) {
            //     edge.push({ from: bestRoute[i], to: bestRoute[j], label : distances[i][j].toString()});
            //     edge.push({ from: bestRoute[j], to: bestRoute[i],label : distances[i][j].toString() });
                
            // }
        }
        edge.push({from : bestRoute[bestRoute.length - 1], to : bestRoute[0], label : visibilityMatr[bestRoute[0]][bestRoute[bestRoute.length - 1]].toString()})

            edge.forEach(el => {
                
                    el.arrows = "to"
                    el.color = { color: "green" }
                    edgeForPrint.push(el);
                
            })

            console.log(visibilityMatr)

        setedges(edgeForPrint);
        setisVisble(true)
        cities1[bestRoute[0]].color = "#FFFF00"
        setcities(cities1)
        setminDist(tspGA.calculateRouteDistance(bestRoute))
    
    }

      


    return (
        <div>
            <span>Введите колво итераций</span>
            <input
                type="number"
                style={{display: "block"}}
                placeholder="Введите итерации"
                value={iterations}
                onChange={handleiterationsChange}
            />
            <span>Введите размер популяции</span>
            <input
                type="number"
                style={{display: "block"}}
                placeholder="Введите размер популяции"
                value={populations}
                onChange={handlepopulationsChange}
            />
            <span>Введите коэф мутации</span>
            <input
            style={{display: "block"}}
                type="number"
                placeholder="Введите коэф мутации"
                value={mutations}
                onChange={handlemutationsChange}
            />

            <span>Введите количество городов</span>
            <input
                type="number"
                style={{display: "block"}}
                placeholder="Введите количество городов"
                value={towns}
                onChange={handleTownsChange}
            />
            <button onClick={onClickHandler}> получить решение</button>
            <button onClick={onClickCreateNewMatr}>Создать новую матрицу</button>

            <div>
                {isVisble && <Graph nodes={cities} edges={edges} />}
            </div>

            <div>
                Кратчайший путь : {minDist}
            </div>
        </div>
    );
}

export default Main;