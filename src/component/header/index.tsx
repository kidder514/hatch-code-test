import { Button, Stack } from "react-bootstrap";

const Header = () => {
    return (
        <Stack direction="horizontal" gap={3}>
            <Button variant="primary" size='sm'>+ Expand All</Button>
            <Button variant="primary" size='sm'>- Fold All</Button>
        </Stack>
    )
}

export default Header;