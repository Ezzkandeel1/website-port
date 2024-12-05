import { Card, Button } from "react-bootstrap";
import { useShoppingCart } from "../context/ShoopingCartContext";

type StoreItemsProps = {
    id: number;
    name: string;
    price: number;
    imgUrl: string;
};

export default function StoreItems({ id, name, price, imgUrl }: StoreItemsProps) {
    const { getItemQuantity, addToCart, removeFromCart, clearCart } = useShoppingCart();
    const quantity = getItemQuantity(id);

    return (
        <Card className="h-100 shadow-sm border-0 rounded">
            <Card.Img
                variant="top"
                src={imgUrl}
                alt={name}
                height="200px"
                style={{
                    objectFit: "cover",
                    borderTopLeftRadius: "0.375rem",
                    borderTopRightRadius: "0.375rem",
                }}
            />
            <Card.Body className="d-flex flex-column p-3">
                <Card.Title className="d-flex justify-content-between align-items-center mb-3">
                    <span className="fs-5 fw-bold">{name}</span>
                    <span className="text-primary fw-bold">${price.toFixed(2)}</span>
                </Card.Title>
                <div className="mt-auto">
                    {quantity === 0 ? (
                        <Button
                            className="w-100"
                            variant="primary"
                            onClick={() => addToCart(id)}
                        >
                            <i className="bi bi-cart-plus me-2"></i>Add to Cart
                        </Button>
                    ) : (
                        <div className="d-flex flex-column align-items-center">
                            <div className="d-flex justify-content-between align-items-center w-100 mb-2">
                                <Button
                                    variant="outline-danger"
                                    size="sm"
                                    onClick={() => removeFromCart(id)}
                                >
                                    <i className="bi bi-dash">-</i>
                                </Button>
                                <span className="fs-6">
                                    <strong>{quantity}</strong> in cart
                                </span>
                                <Button
                                    variant="outline-success"
                                    size="sm"
                                    onClick={() => addToCart(id)}
                                >
                                    <i className="bi bi-plus">+</i>
                                </Button>
                            </div>
                            <Button
                                variant="danger"
                                size="sm"
                                onClick={() => clearCart()}
                            >
                                Clear Cart
                            </Button>
                        </div>
                    )}
                </div>
            </Card.Body>
        </Card>
    );
}
