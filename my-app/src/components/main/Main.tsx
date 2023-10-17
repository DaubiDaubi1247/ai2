import { FC, useState } from "react";
import { AntColonyTSP, City } from "../../common/artAlgorithmSolver/ArtAlgorithmSolver";
import Graph from "./Graph";
import { Node, Edge } from "vis-network/standalone/esm/vis-network";

const initMatr = (cities : City[])  =>  {
    const visibilityMatrix : number[][] = [];

    for (let i = 0; i < cities.length; i++) {
        visibilityMatrix[i] = new Array(cities.length);
    }

    for (let i = 0; i < cities.length; i++) {
        for (let j = 0; j < cities.length; j++) {

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

const Main: FC = () => {

    const cities: City[] = [
        { label: 'City 1', id: 1, x: 100, y: 100 },
        { label: 'City 2', id: 2, x: 200, y: 200 },
        { label: 'City 3', id: 3, x: 101, y: 101 },
        { label: 'City 4', id: 4, x: 400, y: 150 },
        { label: 'City 5', id: 5, x: 600, y: 700 },
        // Добавьте остальные города с их координатами
    ];
    const [visibilityMatr, setVisibilityMatr] = useState(initMatr(cities))
    const [edges, setedges] = useState<Edge[]>([])

    const [isVisble, setisVisble] = useState(false)
    const [minDist, setminDist] = useState("")

    // Пример использования

    const numAnts = 10;
    const maxGenerations = 100;
    const alpha = 2.0;
    const beta = 1.0;
    const rho = 0.1;
    const q = 1.0;
    
    const onClickCreateNewMatr = () => {
        setVisibilityMatr(initMatr(cities))
    }
    
    const onClickHandler = () => {
        const antColony = new AntColonyTSP(cities, numAnts, maxGenerations, alpha, beta, rho, q, visibilityMatr);
        const result = antColony.solveTSP();

        const edge : Edge[] = [];
        const edgeForPrint : Edge[] = [];

        for (let i = 0; i < cities.length; i++) {
            for (let j = i + 1; j < cities.length; j++) {
                edge.push({ from: cities[i].id, to: cities[j].id });
                edge.push({ from: cities[j].id, to: cities[i].id });
            }
        }

        for (let i = 0; i < result.tour.length - 1; i++) {
            edge.forEach(el => {
                if (el.from === result.tour[i].id && el.to === result.tour[i + 1].id) {
                    el.arrows = "to"
                    el.color = {color : "green"}
                    edgeForPrint.push(el);
                }
            })
        }

        let f = false;

        edge.forEach(el => {
            f =false
            for (let i = 0; i < edgeForPrint.length; i++) {
                if (el.from === edgeForPrint[i].from && el.to === edgeForPrint[i].to || el.from === edgeForPrint[i].to && el.to === edgeForPrint[i].from) {
                    f = true;
                    break;
                }
            }

            if (!f) {
                edgeForPrint.push(el)
            }

        })

        setedges(edgeForPrint);
        setisVisble(true)

        console.log('Best Tour:', result.tour.map((city) => city.label).join(' -> '));
        console.log('Minimum Distance:', result.tourLength);
        setminDist(result.tourLength.toString())
    }


    return (
        <div>
            <button onClick={onClickHandler}> получить решение</button>
            <button onClick={onClickCreateNewMatr}>Создать новую матрицу</button>

            <div>
                {isVisble && <Graph nodes={cities} edges={edges}/>}
            </div>

            <div>
                Кратчайший путь : {minDist}
            </div>
        </div>
    );
}

export default Main;