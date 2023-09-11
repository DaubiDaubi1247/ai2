import { FC, useState } from "react";
import style from "./style/board.module.css"
import MainInputs from "./mainInputs/mainInputs";
import MainChart from "./mainCharts/MainCharts";
import {QueenSolverStatistic} from "../../common/queenSolver/queenSolverStatistic";

interface MainProps {

}

const Main: FC<MainProps> = () => {

    const [board, setboard] = useState<React.ReactNode[]>([])
    const [chartIsVisible, setchartIsVisible] = useState(false)
    const [queensSolverStatistic, setQueensSolverStatistic] = useState<QueenSolverStatistic | null>(null)

    return (
        <div>
            <MainInputs setBoard={setboard} setChartIsVisible={setchartIsVisible} setQueensSolverStatistic={setQueensSolverStatistic} />
            <div className={style.chessboard}>
                {board}
            </div>

            {chartIsVisible ? <MainChart queensSolverStatistic={queensSolverStatistic}/> : <></>}
        </div>
    );
}

export default Main;