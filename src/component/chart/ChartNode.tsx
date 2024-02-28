import { Button } from "react-bootstrap";
import { isEmpty } from "../../util/object";

import './ChartNode.scss'
import { useState } from "react";

interface ChartNodeProps {
    data: DivisionNode,
    className?: string;
}



const ChartNode = ({ data, className }: ChartNodeProps) => {
    const [isExpanded, setIsExpanded] = useState(true);

    const renderChildren = (children: { [key: number]: DivisionNode }) => {
        if (isEmpty(children)) return;
        return Object
            .entries(children)
            .map(([key, value]) => < ChartNode key={`node-${value.id}`} data={value} />);
    }

    return (
        <section className={`division-node ${className || ''}`} style={{
            paddingLeft: `${1.5 * (data.level - 1)}rem`
        }}>
            <div className='parent-wrapper' onClick={() => setIsExpanded(!isExpanded)}>
                <div className='title'>{isExpanded ? '-' : '+'} {data.name}</div>
                <div className='button-wrapper'>
                    <Button variant="primary" size='sm'>+ Division</Button>
                    <Button variant="primary" size='sm'>+ Entity</Button>
                </div>
            </div>

            {isExpanded && renderChildren(data.children)}
        </section >
    )
}


export default ChartNode;