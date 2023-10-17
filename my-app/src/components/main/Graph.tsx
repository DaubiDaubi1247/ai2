import React, { useEffect } from "react";
import { Options, Edge, Node } from "vis-network/standalone/esm/vis-network";

import useVisNetwork from "./useVisNetwork";

export interface GrapgProps {
    nodes : Node[],
    edges : Edge[]
}

const options: Options = {
  autoResize : false,
    edges: {
        arrows: {
          to: {scaleFactor: 0.9 }, // Уменьшает размер стрелкиб
        },
        
      },
      width: '800px', // Ширина контейнера
      height: '600px', // Высота контейнера
};

const Graph : React.FC<GrapgProps> = ({nodes, edges }) => {
  const { ref } = useVisNetwork({
    options,
    edges,
    nodes
  });

  return (
    <>
      <div style={{ height: 500, width: "100%" }} ref={ref} />
    </>
  );
};

export default Graph
