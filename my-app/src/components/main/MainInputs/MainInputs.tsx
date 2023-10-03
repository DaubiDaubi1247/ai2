import React, { useState } from 'react';
import BinaryART1, {Claster} from "../../../common/artAlgorithmSolver/ArtAlgorithmSolver";
import MatrixConverter from "../../../common/matrixConverter/MatrixConverter";

interface InputFormProps {
   setIsVisible : (visible : boolean) => void,
   setClusters : (clusters : Claster[]) => void
}
const InputForm: React.FC<InputFormProps> = ({setClusters, setIsVisible}) => {
  // Состояния для параметров
  const [vigilance, setVigilance] = useState<number>(0.9);
  const [vectorSize, setVectorSize] = useState<number>(4);
  const [beta, setBeta] = useState<number>(1);
    const [fileList, setFileList] = useState<FileList | null>();

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

  const onClickHandler = async () => {
    const art1 = new BinaryART1(beta, vectorSize, vigilance);

    const matrixConverter = new MatrixConverter();

      if (fileList) {
          art1.train(await matrixConverter.convertFile(fileList[0]))
      }

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

        <input type="file" id="fileInput" onChange={(e) => setFileList(e.target.files)}/>

      <button onClick={onClickHandler}>Получить решение</button>
    </div>
  );
};

export default InputForm;
