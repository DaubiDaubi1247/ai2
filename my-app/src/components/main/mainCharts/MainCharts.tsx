import {LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend} from 'recharts';
import React from "react";
import {QueenSolverStatistic} from "../../../common/queenSolver/queenSolverStatistic";
import QueenSolverStatisticConverter from "../../../common/queenSolver/QueenSolverStatisticConverter";

interface MainChartI {
    queensSolverStatistic : QueenSolverStatistic | null
}


const MainChart : React.FC<MainChartI> = ({queensSolverStatistic}) => {

    return (
        <LineChart width={800} height={400} data={QueenSolverStatisticConverter.convertToChart(queensSolverStatistic)}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="badSol" stroke="#8884d8" />
            <Line type="monotone" dataKey="bestEn" stroke="#82ca9d" />
            <Line type="monotone" dataKey="temp" stroke="#ff7300" />
        </LineChart>
    );
  
}

export default MainChart