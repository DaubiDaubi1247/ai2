import { FC, useState } from "react";
import BinaryART1, {Claster} from "../../common/artAlgorithmSolver/ArtAlgorithmSolver";
import InputForm from "./MainInputs/MainInputs";
import OutputClusters from "./OtputClusters/OutputClusters";


interface MainProps {

}

const Main: FC<MainProps> = () => {

    const [dataIsVisible, setDataIsVisible] = useState(false)
    const [clusters, setClusters] = useState<Claster[]>([])

    return (
        <div>
            <InputForm setClusters={setClusters} setIsVisible={setDataIsVisible}/>

            <div>

            </div>

            {dataIsVisible ? <OutputClusters clusters={clusters}/> : <></>}
        </div>
    );
}

export default Main;