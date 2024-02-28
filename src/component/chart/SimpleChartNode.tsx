import { Button } from "react-bootstrap";
import { isEmpty } from "../../util/object";
import './ChartNode.scss'

interface SimpleChartNodeProps {
    data: DivisionNode;
}

const SimpleChartNode = ({ data }: SimpleChartNodeProps) => {
    const renderChildren = (children: { [key: number]: DivisionNode }) => {
        if (isEmpty(children)) return;
        return Object
            .entries(children)
            .map(([key, value]) => {
                return (
                    <SimpleChartNode
                        key={`node-${value.id}`}
                        data={value}
                    />)
            });
    }

    return (
        <section className='division-node' style={{
            paddingLeft: `${1.5 * (data.level - 1)}rem`
        }}>
            <div className='parent-wrapper'>
                <div className='title'>{data.name}</div>
            </div>
            {renderChildren(data.children)}
        </section >
    )
}


export default SimpleChartNode;