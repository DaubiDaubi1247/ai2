import {QueenSolverStatistic} from "./queenSolverStatistic";

export default class QueenSolverStatisticConverter  {
    public static convertToChart(queenSOlverStatistic : QueenSolverStatistic | null) {

        if (queenSOlverStatistic === null) {
            return ;
        }

        const resDataForChart = [];

        for (let i = 0; i < queenSOlverStatistic.iterations.length; i++) {
            resDataForChart.push({
                name : queenSOlverStatistic.iterations.at(i),
                badSol : queenSOlverStatistic.countBadSolutionArr.at(i),
                bestEn : queenSOlverStatistic.energyBestSolutionArr.at(i),
                temp : queenSOlverStatistic.temperatureArr.at(i)
            })
        }

        return resDataForChart;
    }
}