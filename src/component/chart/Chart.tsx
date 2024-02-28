import { useLoadDivisionList } from "../../api/query";
import Loader from "../loader";
import ChartNode from "./ChartNode";

const Chart = () => {
    const { isLoading, data } = useLoadDivisionList();

    if (isLoading) {
        return <Loader />
    }

    const isListEmpty = !data || data.length <= 0;
    return <section className={'mt-4'}>
        {(!isListEmpty) && data.map((division: any) => <ChartNode className='root' key={`root-node-${division.id}`} data={division} />)}
    </section>
}

export default Chart;