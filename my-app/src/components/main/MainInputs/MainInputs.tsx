import React, { useState } from 'react';
import BinaryART1, {Claster} from "../../../common/artAlgorithmSolver/ArtAlgorithmSolver";

interface InputFormProps {
   setIsVisible : (visible : boolean) => void,
   setClusters : (clusters : Claster[]) => void
}
const InputForm: React.FC<InputFormProps> = ({setClusters, setIsVisible}) => {
  // Состояния для параметров
  const [vigilance, setVigilance] = useState<number>(0.5);
  const [vectorSize, setVectorSize] = useState<number>(4);
  const [beta, setBeta] = useState<number>(1);

  // Обработчики изменения значений параметров
  const handleVigilanceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(e.target.value);
      setVigilance(newValue);
  };

  const handleVectorSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value);
    if (newValue > 0) {
      setVectorSize(newValue);
    }
  };

  const handleBetaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(e.target.value);
      setBeta(newValue);
  };


// Обучение
  const trainingData = [
    [1,1,1,0],
    [1,1,1,0],
    [1,0,0,0],
    [1,0,0,0]
  ];

  const onClickHandler = () => {
    const art1 = new BinaryART1(beta, vectorSize, vigilance);
    art1.train(trainingData)

    setIsVisible(true)
    setClusters(art1.clusters)
  }

  return (
    <div>
      <label>
        Параметр внимательности (0 &lt; ρ ≤ 1):
        <input
          type="number"
          step="0.01"
          min="0"
          max="1"
          value={vigilance}
          onChange={handleVigilanceChange}
        />
      </label>
      <br />
      <label>
        Размер вектора (d):
        <input
          type="number"
          min="1"
          value={vectorSize}
          onChange={handleVectorSizeChange}
        />
      </label>
      <br />
      <label>
        Бета-параметр (β):
        <input
          type="number"
          min="1"
          value={beta}
          onChange={handleBetaChange}
        />
      </label>

      <button onClick={onClickHandler}>Получить решение</button>
    </div>
  );
};

export default InputForm;
