import { useAtom } from "jotai";
import Loader from "../loader";
import { useGetEntityList } from "../../api/query";
import { selectDivisionListAtom, selectLevelAtom } from "../../store";

import './index.scss';
import { Badge } from "react-bootstrap";

const Entity = () => {
    const [level,] = useAtom(selectLevelAtom);
    const [selectedDivisionList,] = useAtom(selectDivisionListAtom);

    const { isLoading, data } = useGetEntityList(level, selectedDivisionList);

    const isListEmpty = !data || data.length <= 0;
    return <section className='mt-4 entity-wrapper'>
        <h1> Entity List</h1>
        {isLoading && <Loader />}
        {(!isListEmpty) && data.map((entity: Entity) => {
            return (
                <div className='entity' key={`entity-${entity.id}`}>
                    <Badge>{entity.type}</Badge>
                    <div>{entity.name}</div>
                </div>
            )
        })}
    </section>
}

export default Entity;