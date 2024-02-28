import { useAtom } from "jotai";
import Loader from "../loader";
import { useGetEntity, useGetEntityList } from "../../api/query";
import { selectDivisionListAtom, selectLevelAtom, selectEntityAtom } from "../../store";
import { Badge, Offcanvas } from "react-bootstrap";

import './index.scss';
import SimpleChartNode from "../chart/SimpleChartNode";

const Entity = () => {
    const [level,] = useAtom(selectLevelAtom);
    const [selectedDivisionList,] = useAtom(selectDivisionListAtom);
    const [entitySelected, setEntitySelected] = useAtom(selectEntityAtom);

    const { isLoading, data } = useGetEntityList(level, selectedDivisionList);
    const entityQuery = useGetEntity(entitySelected);

    const renderSlider = () => {
        const entity = entityQuery.data?.entity;
        const divisionTree = entityQuery.data?.divisionList;

        return (
            <Offcanvas placement='end' show={entitySelected} onHide={() => setEntitySelected(undefined)}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Entity Detail</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    {entityQuery.isLoading && <Loader />}
                    {entity && (
                        <div className='entity'>
                            <div>Entity type</div>
                            <Badge data-testid='slider-badge'>{entity.type}</Badge>
                            <div>Entity Name</div>
                            <div>{entity.name}</div>
                        </div>
                    )}
                    {divisionTree && (
                        <>
                            <div>Entity hierachy </div>
                            <SimpleChartNode data={divisionTree[0]} />
                        </>
                    )}
                </Offcanvas.Body>
            </Offcanvas>
        )
    }

    const isListEmpty = !data || data.length <= 0;
    return <section className='mt-4 entity-wrapper'>
        <h1>Entity List</h1>
        {isLoading && <Loader />}
        {(!isListEmpty) && data.map((entity: Entity) => {
            return (
                <div className='entity' key={`entity-${entity.id}`} onClick={() => setEntitySelected(entity.id)}>
                    <Badge data-testid='list-badge'>{entity.type}</Badge>
                    <div>{entity.name}</div>
                </div>
            )
        })}
        {entitySelected && renderSlider()}
    </section>
}

export default Entity;