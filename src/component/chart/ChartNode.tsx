import { Button } from "react-bootstrap";
import { isEmpty } from "../../util/object";

import './ChartNode.scss'

interface ChartNodeProps {
    data: DivisionNode;
    selectedDivisionList: number[];
    setSelectedDivision?: any;
    className?: string;
}

const ChartNode = ({ data, selectedDivisionList, setSelectedDivision, className }: ChartNodeProps) => {
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
                        <Button variant="primary" size='sm'>+ Division</Button>
                        <Button variant="primary" size='sm'>+ Entity</Button>
                    </div>
                    <div className='form-wrapper'>
                        {/* <AddDivisionForm /> */}
                        {/* <AddEntityForm /> */}
                    </div>
                </div>
            </div>

            {renderChildren(data.children)}
        </section >
    )
}


export default ChartNode;