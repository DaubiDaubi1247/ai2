import { FC, useState } from "react";
import BinaryART1 from "../../common/artAlgorithmSolver/ArtAlgorithmSolver";

interface MainProps {

}

const Main: FC<MainProps> = () => {

    // Пример использования
    const inputSize = 5; // Размер входных данных
    const categorySize = 3; // Максимальное количество категорий
    const vigilance = 0.9; // Параметр вигилиантности

    const art1 = new BinaryART1(inputSize, categorySize, vigilance);

// Обучение
    const trainingData = [
        [1,1,1,0],
        [1,1,1,0],
        [1,0,0,0],
        [1,0,0,0]
    ];



    const onClickHandler = () => {
        art1.train(trainingData)

        let counter = 0;

        for (const claster of art1.clusters) {
            if (claster.children.length === 0) continue
            console.log(`прототип`, claster.prototype)
            console.log(`classter # ${counter}`, claster.children)
            console.log()
            counter++;
        }
    }

// Вывод всех кластеров


    return (
        <div>
            <button onClick={onClickHandler}>Получить решение</button>
        </div>
    );
}

export default Main;