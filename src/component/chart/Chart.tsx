import { useAtom } from "jotai";
import { useLoadDivisionList } from "../../api/query";
import Loader from "../loader";
import ChartNode from "./ChartNode";
import { selectDivisionListAtom, selectLevelAtom } from "../../store";

const Chart = () => {
    const [level,] = useAtom(selectLevelAtom);
    const [selectedDivisionList, setSelectedDivision] = useAtom(selectDivisionListAtom);

    const { isLoading, data } = useLoadDivisionList(level);

    const isListEmpty = !data || data.length <= 0;
    return <section className={'mt-4'}>
        <h1>Division List</h1>
        {isLoading && <Loader />}
        {(!isListEmpty) && data.map((division: any) => <ChartNode selectedDivisionList={selectedDivisionList} setSelectedDivision={setSelectedDivision} className='root' key={`root-node-${division.id}`} data={division} />)}
    </section>
}

export default Chart;