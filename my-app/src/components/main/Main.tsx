import { FC, useEffect, useState } from "react";
import ChessBoardHandler from "../../common/board/boardHandler";
import style from "./style/board.module.css"
import NQueensSolver from "../../common/queenSolver/queenSolver";
import MainInputs from "./mainInputs/mainInputs";
import MainChart from "./mainCharts/MainCharts";

interface MainProps {

}

const Main: FC<MainProps> = () => {

    const [board, setboard] = useState<React.ReactNode[]>([])
    const [chartIsVisible, setchartIsVisible] = useState(false)

    return (
        <div>
            <MainInputs setBoard={setboard} setChartIsVisible={setchartIsVisible} />
            <div className={style.chessboard}>
                {board}
            </div>

            {chartIsVisible ? <MainChart/> : <></>}
        </div>
    );
}

export default Main;