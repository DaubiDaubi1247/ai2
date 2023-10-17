import React, { useEffect } from "react";
import { Options, Edge, Node } from "vis-network/standalone/esm/vis-network";

import useVisNetwork from "./useVisNetwork";

export interface GrapgProps {
    nodes : Node[],
    edges : Edge[]
}

// const nodes: Node[] = [
//     { id: 1, label: "Algie" },
//     { id: 2, label: "Alston" },
//     { id: 3, label: "Barney" },
//     { id: 4, label: "Coley" },
//     { id: 5, label: "Grant" },
//     { id: 6, label: "Langdon" },
//     { id: 7, label: "Lee" },
//     { id: 8, label: "Merlin" },
//     { id: 9, label: "Mick" },
//     { id: 10,label: "Tod" },
//   ];

// const edges: Edge[] = [
//     { from: 2, to: 8, value: 3 },
//     { from: 2, to: 9, value: 5 },
//     { from: 2, to: 10, value: 1 },
//     { from: 4, to: 6, value: 8 },
//     { from: 5, to: 7, value: 2 },
//     { from: 4, to: 5, value: 1 },
//     { from: 9, to: 10, value: 2 },
//     { from: 2, to: 3, value: 6 },
//     { from: 3, to: 9, value: 4 },
//     { from: 5, to: 3, value: 1 },
//     { from: 2, to: 7, value: 4 },
//   ];

const options: Options = {
    layout: {
        hierarchical: false,
      },
    edges: {
        arrows: {
          to: {scaleFactor: 0.9 }, // Уменьшает размер стрелкиб
        },
        smooth: {
            enabled : true,
            roundness : 0.1,
            type: 'dynamic',
          },
      },
};

const Graph : React.FC<GrapgProps> = ({nodes, edges }) => {
    debugger
  const { ref, network } = useVisNetwork({
    options,
    edges,
    nodes
  });

  const handleClick = () => {
    if (!network) return;

    network.focus(5);
  };

  return (
    <>
      <div style={{ height: 700, width: "100%" }} ref={ref} />
    </>
  );
};

export default Graph
