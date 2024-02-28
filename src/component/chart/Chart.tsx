import { useAtom } from "jotai";
import { useLoadDivisionList } from "../../api/query";
import Loader from "../loader";
import ChartNode from "./ChartNode";
import { selectDivisionListAtom } from "../../store";

const Chart = () => {
    const { isLoading, data } = useLoadDivisionList();
    const [selectedDivisionList, setSelectedDivision] = useAtom(selectDivisionListAtom);

    if (isLoading) {
        return <Loader />
    }

    const isListEmpty = !data || data.length <= 0;
    return <section className={'mt-4'}>
        {(!isListEmpty) && data.map((division: any) => <ChartNode selectedDivisionList={selectedDivisionList} setSelectedDivision={setSelectedDivision} className='root' key={`root-node-${division.id}`} data={division} />)}
    </section>
}

export default Chart;