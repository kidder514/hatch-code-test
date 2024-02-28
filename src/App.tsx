import { Col, Container, Row } from 'react-bootstrap';
import Header from './component/header';
import Content from './component/content';

import './mock';
import './App.scss'
import Entity from './component/entity';

const App = () => {
    return (
        <main >
            <Container fluid className='p-3'>
                <Row>
                    <Col>
                        <Header />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Content />
                    </Col>
                    <Col>
                        <Entity />
                    </Col>
                </Row>
            </Container>
        </main>
    )
}
export default App;