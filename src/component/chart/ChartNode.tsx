import { Button } from "react-bootstrap";
import { isEmpty } from "../../util/object";

import './ChartNode.scss'
import { useState } from "react";
import AddDivisionForm from "../addDivisionForm";
import AddEntityForm from "../addEntityForm";
import { UseMutateFunction, UseMutationResult } from "@tanstack/react-query";

interface ChartNodeProps {
    data: DivisionNode;
    selectedDivisionList: number[];
    setSelectedDivision?: any;
    className?: string;
    addDivision: UseMutateFunction<any, Error, {
        parent: DivisionNode;
        name: string;
    }, unknown>
    addEntity: UseMutateFunction<any, Error, {
        parent: DivisionNode;
        name: string;
        type: EntityType;
    }, unknown>
}

const ChartNode = ({ data, selectedDivisionList, setSelectedDivision, className, addDivision, addEntity }: ChartNodeProps) => {
    const [isDivisionFormOpen, setIsDivisionFormOpen] = useState(false);
    const [isEntityFormOpen, setIsEntityFormOpen] = useState(false);

    const divisionButtonHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        setIsDivisionFormOpen(!isDivisionFormOpen);
        setIsEntityFormOpen(false)
    }

    const entityButtonHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        setIsDivisionFormOpen(false);
        setIsEntityFormOpen(!isEntityFormOpen)
    }

    const renderChildren = (children: { [key: number]: DivisionNode }) => {
        if (isEmpty(children)) return;
        return Object
            .entries(children)
            .map(([key, value]) => {
                return (
                    <ChartNode
                        selectedDivisionList={selectedDivisionList}
                        setSelectedDivision={setSelectedDivision}
                        key={`node-${value.id}`}
                        data={value}
                        addDivision={addDivision}
                        addEntity={addEntity}
                    />)
            });
    }

    const selectHandler = () => {
        let listSelected;
        if (selectedDivisionList.includes(data.id)) {
            listSelected = selectedDivisionList.filter(id => id !== data.id);
        } else {
            listSelected = [...selectedDivisionList];
            listSelected.push(data.id);
        }

        setSelectedDivision(listSelected);
    }

    return (
        <section className={`division-node ${className || ''}`} style={{
            paddingLeft: `${1.5 * (data.level - 1)}rem`
        }}>
            <div
                className={`parent-wrapper ${selectedDivisionList?.includes(data.id) ? 'selected' : ''}`}
                onClick={selectHandler}
            >
                <div className='title'>{data.name}</div>
                <div className='action-wrapper'>
                    <div className='button-wrapper'>
                        <Button variant="primary" size='sm' onClick={divisionButtonHandler}>+ Division</Button>
                        <Button variant="primary" size='sm' onClick={entityButtonHandler}>+ Entity</Button>
                    </div>
                    <div className='form-wrapper'>
                        {isDivisionFormOpen && <AddDivisionForm data={data} action={addDivision} />}
                        {isEntityFormOpen && <AddEntityForm data={data} action={addEntity} />}
                    </div>
                </div>
            </div>
            {renderChildren(data.children)}
        </section >
    )
}


export default ChartNode;