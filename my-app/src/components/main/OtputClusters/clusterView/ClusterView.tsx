import React from 'react';
import {Claster} from "../../../../common/artAlgorithmSolver/ArtAlgorithmSolver";
import randomColor from "randomcolor";

interface ClusterProps {
    cluster : Claster,
    counterClusters : number
}

const ClusterView : React.FC<ClusterProps>= ({cluster, counterClusters}) => {

    const color = randomColor();

    const clusterItemsToJSX = (clusterItems : number[]) => clusterItems.map(el => <span >{el + " "}</span>)

    const clusterChildren = cluster.children.map(el => <div style={{borderBottom : "solid"}}>{clusterItemsToJSX(el)}</div>)

    return (
        <div>
            <h1>Кластер #{counterClusters}</h1>
            <div>
                <h2>Прототип класстера</h2>
                <span style={{border : "solid", padding : '5px', backgroundColor : color}}>{clusterItemsToJSX(cluster.prototype)}</span>
            </div>
            <div>
                <h2>Вектора признаки входящие в этот класстер</h2>
                <div style={{border : "solid", backgroundColor : color}}>{clusterChildren}</div>
            </div>
        </div>
    )
};

export default ClusterView;