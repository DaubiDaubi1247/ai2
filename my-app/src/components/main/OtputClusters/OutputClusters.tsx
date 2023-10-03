import React from 'react';
import {Claster} from "../../../common/artAlgorithmSolver/ArtAlgorithmSolver";
import ClusterView from "./clusterView/ClusterView";

interface ClustersProps {
    clusters : Claster[],
}

const OutputClusters : React.FC<ClustersProps> = ({clusters}) => {

    const clustersView = clusters.filter(el => el.children.length !== 0)
        .map((el, i) => <ClusterView cluster={el} counterClusters={i}/>)

    // for (const claster of art1.clusters) {
    //   if (claster.children.length === 0) continue
    //   console.log(`прототип`, claster.prototype)
    //   console.log(`classter # ${counter}`, claster.children)
    //   console.log()
    //   counter++;
    // }

    return (
        <div style={{display : 'flex'}}>
            {clustersView}
        </div>
    );
};

export default OutputClusters;