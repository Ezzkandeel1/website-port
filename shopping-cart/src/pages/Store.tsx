import storeItems from "../data/items.json";
import { Col, Row } from "react-bootstrap";
import StoreItems from "../componets/Storeitem";

export function Store() {
    return (
        <>
            <Row>
                <Col xs={12}>
                    <h1>Store</h1>
                </Col>
            </Row>
            <Row>
                {storeItems.map(item => (
                    <Col key={item.id} xs={12} sm={6} md={4} lg={3}>
                        <StoreItems {...item} />
                    </Col>
                ))}
            </Row>
        </>
    );
}
