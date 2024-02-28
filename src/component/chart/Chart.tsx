import { useAtom } from "jotai";
import { useLoadDivisionList } from "../../api/query";
import Loader from "../loader";
import ChartNode from "./ChartNode";
import { selectDivisionListAtom, selectLevelAtom } from "../../store";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addDivision, addEntity } from "../../api/api";
import { END_POINT } from "../../constant";

const Chart = () => {
    const [level,] = useAtom(selectLevelAtom);
    const [selectedDivisionList, setSelectedDivision] = useAtom(selectDivisionListAtom);
    const { isLoading, data } = useLoadDivisionList(level);
    const queryClient = useQueryClient();

    const useAddDivision = useMutation({
        mutationFn: addDivision,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [END_POINT.LOAD_DIVISION_LIST] });
            queryClient.invalidateQueries({ queryKey: [END_POINT.GET_DIVISION_DEPTH] });
        },
    });

    const useAddEntity = useMutation({
        mutationFn: addEntity,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [END_POINT.GET_ENTITY_LIST] });
        },
    });

    const isListEmpty = !data || data.length <= 0;
    return <section className={'mt-4'}>
        <h1>Division List</h1>
        {isLoading && <Loader />}
        {(!isListEmpty) && data.map((division: any) => {
            return (
                <ChartNode
                    selectedDivisionList={selectedDivisionList}
                    setSelectedDivision={setSelectedDivision}
                    className='root'
                    key={`root-node-${division.id}`}
                    data={division}
                    addDivision={useAddDivision.mutate}
                    addEntity={useAddEntity.mutate}
                />
            )
        })}
    </section>
}

export default Chart;