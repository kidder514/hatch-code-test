import { Button, Stack } from "react-bootstrap";
import { useGetDepth } from "../../api/query";
import { useAtom, useSetAtom } from "jotai";
import { selectDivisionListAtom, selectLevelAtom } from "../../store";

const Header = () => {
    const [level, setLevel] = useAtom(selectLevelAtom);
    const setDivisionList = useSetAtom(selectDivisionListAtom);
    const { isLoading, data } = useGetDepth();

    const resetAllSelection = () => {
        setDivisionList([]);
        setLevel(1);
    }

    if (isLoading)
        return false;


    const renderLevelButton = () => {
        if (data) {
            return Array.from(Array(data).keys()).map((value) =>
                <Button
                    className={value + 1 === level ? 'active' : ''}
                    key={`level-${value + 1}-button`}
                    variant="primary"
                    size='sm'
                    onClick={() => setLevel(value + 1)}
                >
                    {value + 1}
                </Button>
            )
        }
    }

    return (
        <Stack direction="horizontal" gap={3}>
            <div>Filter by level</div>
            {renderLevelButton()}
            <Button variant="primary" size='sm' onClick={resetAllSelection}>Reset All</Button>
        </Stack>
    )

}

export default Header;