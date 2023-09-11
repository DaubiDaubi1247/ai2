import React, { useState } from "react";
import NQueensSolver from "../../../common/queenSolver/queenSolver";
import ChessBoardHandler from "../../../common/board/boardHandler";
import {QueenSolverStatistic} from "../../../common/queenSolver/queenSolverStatistic";

interface MainInputsI {
    setBoard: (reactNodeArr: React.ReactNode[]) => void,
    setChartIsVisible : (chartIsVisible : boolean) => void,
    setQueensSolverStatistic : (queenStatistic : QueenSolverStatistic) => void,
}

const MainInputs: React.FC<MainInputsI> = ({setBoard, setChartIsVisible, setQueensSolverStatistic}) => {
    const [maxTemperature, setMaxTemperature] = useState<number>(100);
    const [minTemperature, setMinTemperature] = useState<number>(0.1);
    const [coolingRate, setCoolingRate] = useState<number>(0.95);
    const [numQueens, setNumQueens] = useState<number>(8);
    const [numSteps, setNumSteps] = useState<number>(1000);

    const handleMaxTemperatureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMaxTemperature(parseFloat(e.target.value));
    };

    const handleMinTemperatureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMinTemperature(parseFloat(e.target.value));
    };

    const handleCoolingRateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCoolingRate(parseFloat(e.target.value));
    };

    const handleNumQueensChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNumQueens(parseInt(e.target.value, 10));
    };

    const handleNumStepsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNumSteps(parseInt(e.target.value, 10));
    };

    const onclickGetSolution = () => {
        setBoard([]);
        const queensHandler = new NQueensSolver(numQueens, maxTemperature, minTemperature, coolingRate, numSteps);

        const queensSolverStatistic = queensHandler.solveNQueens();
        setQueensSolverStatistic(queensSolverStatistic);

        setBoard(ChessBoardHandler.getBoard(numQueens, queensSolverStatistic.queens));
        setChartIsVisible(true);

        document.documentElement.style.setProperty("--board-columns", numQueens.toString());
    }

    return (
        <div>
            <label>
                Максимальная температура:
                <input type="number" value={maxTemperature} onChange={handleMaxTemperatureChange} />
            </label>
            <br />
            <label>
                Минимальная температура:
                <input type="number" value={minTemperature} onChange={handleMinTemperatureChange} />
            </label>
            <br />
            <label>
                Коэффициент понижения температуры:
                <input type="number" value={coolingRate} onChange={handleCoolingRateChange} />
            </label>
            <br />
            <label>
                Количество ферзей:
                <input type="number" value={numQueens} onChange={handleNumQueensChange} />
            </label>
            <br />
            <label>
                Количество шагов при постоянном значении температуры:
                <input type="number" value={numSteps} onChange={handleNumStepsChange} />
            </label>
            <br />

            <button onClick={e => onclickGetSolution()}> получить решение</button>
        </div>
    );
};

export default MainInputs;
