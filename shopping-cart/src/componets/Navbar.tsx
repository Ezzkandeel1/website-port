import { Container, Nav, Navbar as NavbarBs } from "react-bootstrap";
import { useShoppingCart } from "../context/ShoopingCartContext";

export function Navbar() {
    const { cartQuantity } = useShoppingCart(); // Dynamically get the total cart quantity

    return (
        <NavbarBs className="bg-white shadow-sm mb-3">
            <Container>
                <Nav className="me-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="/store">Store</Nav.Link>
                    <Nav.Link href="/about">About</Nav.Link>
                </Nav>
                <div style={{ position: "relative" }}>
                    <button
                        className="btn btn-primary rounded-circle d-flex align-items-center justify-content-center"
                        style={{ width: "3rem", height: "3rem" }}
                        aria-label="Cart"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 576 512"
                            fill="currentColor"
                            style={{ width: "1.5rem", height: "1.5rem" }}
                        >
                            <path d="M528.12 301.319l47.273-208C579.724 77.31 562.7 64 543.343 64H128.005L121.255 32H24a24 24 0 0 0 0 48h66.343l59.45 256H464a24 24 0 0 0 24-24 24 24 0 0 0-24-24H187.684l-7.682-32H528.12zM112 432a40 40 0 1 0 40-40 40.045 40.045 0 0 0-40 40zm320 0a40 40 0 1 0 40-40 40.045 40.045 0 0 0-40 40z" />
                        </svg>
                    </button>
                    {cartQuantity > 0 && (
                        <span
                            className="badge bg-danger"
                            style={{
                                position: "absolute",
                                top: "-5px",
                                right: "-5px",
                                fontSize: "0.75rem",
                                borderRadius: "50%",
                                width: "1.5rem",
                                height: "1.5rem",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            {cartQuantity}
                        </span>
                    )}
                </div>
            </Container>
        </NavbarBs>
    );
}
