import { FC, useState } from "react";
import { AntColonyTSP, City } from "../../common/artAlgorithmSolver/ArtAlgorithmSolver";
import Graph from "./Graph";
import { Node, Edge } from "vis-network/standalone/esm/vis-network";

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
        cities.push({ label: `City ${i + 1}`, id: i + 1})
    }

    return cities;
}

const Main: FC = () => {

    const [alpha, setAlpha] = useState(3.0);
    const [beta, setBeta] = useState(1.0);
    const [rho, setRho] = useState(0.1);
    const [q, setQ] = useState(1.0);
    const [towns, settowns] = useState(10);

    const handleAlphaChange = (e: any) => {
        setAlpha(parseFloat(e.target.value));
    };

    const handleBetaChange = (e: any) => {
        setBeta(parseFloat(e.target.value));
    };

    const handleRhoChange = (e: any) => {
        setRho(parseFloat(e.target.value));
    };

    const handleQChange = (e: any) => {
        setQ(parseFloat(e.target.value));
    };
    const handleTownsChange = (e: any) => {
        settowns(parseInt(e.target.value));
    };

    const [visibilityMatr, setVisibilityMatr] = useState(initMatr(towns))
    const [edges, setedges] = useState<Edge[]>([])

    const [cities, setcities] = useState<City[]>([])

    const [isVisble, setisVisble] = useState(false)
    const [minDist, setminDist] = useState("")

    // Пример использования

    const numAnts = 10;
    const maxGenerations = 100;

    const onClickCreateNewMatr = () => {
        setVisibilityMatr(initMatr(towns))
    }

    const onClickHandler = () => {
        const cities1 = initCities(towns);
        const antColony = new AntColonyTSP(cities1, numAnts, maxGenerations, alpha, beta, rho, q, visibilityMatr);
        const result = antColony.solveTSP();

        const edge: Edge[] = [];
        const edgeForPrint: Edge[] = [];

        for (let i = 0; i < cities1.length; i++) {
            for (let j = i + 1; j < cities1.length; j++) {
                edge.push({ from: cities1[i].id, to: cities1[j].id, label : visibilityMatr[i][j].toString()});
                edge.push({ from: cities1[j].id, to: cities1[i].id,label : visibilityMatr[i][j].toString() });
                
            }
        }

        for (let i = 0; i < result.tour.length - 1; i++) {
            edge.forEach(el => {
                if (el.from === result.tour[i].id && el.to === result.tour[i + 1].id) {
                    el.arrows = "to"
                    el.color = { color: "green" }
                    edgeForPrint.push(el);
                }
            })
        }

        let f = false;

        // edge.forEach(el => {
        //     f = false
        //     for (let i = 0; i < edgeForPrint.length; i++) {
        //         if (el.from === edgeForPrint[i].from && el.to === edgeForPrint[i].to || el.from === edgeForPrint[i].to && el.to === edgeForPrint[i].from) {
        //             f = true;
        //             break;
        //         }
        //     }

        //     if (!f) {
        //         edgeForPrint.push(el)
        //     }

        // })

        setedges(edgeForPrint);
        setisVisble(true)
        setcities(cities1)
        setminDist(result.tourLength.toString())
    }


    return (
        <div>
            <span>Введите альфа</span>
            <input
                type="number"
                style={{display: "block"}}
                placeholder="Введите альфа"
                value={alpha}
                onChange={handleAlphaChange}
            />
            <span>Введите бета</span>
            <input
                type="number"
                style={{display: "block"}}
                placeholder="Введите бета"
                value={beta}
                onChange={handleBetaChange}
            />
            <span>Введите испарения феромонов</span>
            <input
            style={{display: "block"}}
                type="number"
                placeholder="Введите испарения феромонов"
                value={rho}
                onChange={handleRhoChange}
            />
            <span>Введите количество феромона оставляемое муравьем</span>
            <input
                type="number"
                style={{display: "block"}}
                placeholder="Введите количество феромона"
                value={q}
                onChange={handleQChange}
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