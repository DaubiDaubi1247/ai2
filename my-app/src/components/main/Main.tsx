import React, { useState } from 'react';
import { HopfieldNetwork } from '../../common/hopfield/Hopfield';
 // Предположим, что ваш класс находится в файле HopfieldNetwork.ts
//@ts-ignore
const Square = ({ isActive , onClick }) => {
  const style = {
    width: '50px',
    height: '50px',
    backgroundColor: isActive ? 'black' : 'white',
    border: '1px solid #ccc',
    cursor: 'pointer',
  };

  return <div style={style} onClick={onClick}></div>;
};

const HopfieldNetworkUI = () => {
  const networkSize = 5;
  
  const [inputPattern, setInputPattern] = useState<number[]>(new Array(networkSize * networkSize).fill(-1));
  const [outputPattern, setOutputPattern] = useState<number[]>(new Array(networkSize * networkSize).fill(-1));
  
  const handleSquareClick = (index: number) => {
      const updatedInputPattern = [...inputPattern];
      updatedInputPattern[index] = inputPattern[index] === 1 ? -1 : 1;
      setInputPattern(updatedInputPattern);
    };
    
    
    const handlePredictClick = () => {
    const hopfieldNet = new HopfieldNetwork(networkSize);
    const predictedPattern = hopfieldNet.predict(inputPattern);
    debugger
    setOutputPattern(predictedPattern);
  };

  return (
    <div>
      <h2>Hopfield Network UI</h2>
      <div>
        <h3>Input Pattern</h3>
        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${networkSize}, 50px)` }}>
          {inputPattern.map((value, index) => (
            <Square key={index} isActive={value === 1} onClick={() => handleSquareClick(index)} />
          ))}
        </div>
      </div>
      <button onClick={handlePredictClick}>Predict Output</button>
      <div>
        <h3>Output Pattern</h3>
        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${networkSize}, 50px)` }}>
          {outputPattern.map((value, index) => (
            <Square key={index} isActive={value === 1} onClick={() => {}} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HopfieldNetworkUI;
