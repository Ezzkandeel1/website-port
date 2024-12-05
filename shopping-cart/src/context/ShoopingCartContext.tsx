import { createContext, ReactNode, useContext, useState } from "react";

type ShoppingCartProviderProps = {
    children: ReactNode;
};

type ShoppingCartContext = {
    cartQuantity: number;
    getItemQuantity: (id: number) => number;
    addToCart: (id: number) => void;
    removeFromCart: (id: number) => void;
    clearCart: () => void;
};

const ShoppingCartContext = createContext({} as ShoppingCartContext);

export function useShoppingCart() {
    return useContext(ShoppingCartContext);
}

export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
    const [cartItems, setCartItems] = useState<{ id: number; quantity: number }[]>([]);

    const cartQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    function getItemQuantity(id: number) {
        return cartItems.find((item) => item.id === id)?.quantity || 0;
    }

    function addToCart(id: number) {
        setCartItems((currentItems) => {
            if (currentItems.find((item) => item.id === id) == null) {
                return [...currentItems, { id, quantity: 1 }];
            } else {
                return currentItems.map((item) =>
                    item.id === id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
        });
    }

    function removeFromCart(id: number) {
        setCartItems((currentItems) => {
            return currentItems.map((item) =>
                item.id === id ? { ...item, quantity: item.quantity - 1 } : item
            ).filter((item) => item.quantity > 0);
        });
    }

    function clearCart() {
        setCartItems([]);
    }

    return (
        <ShoppingCartContext.Provider
            value={{
                cartQuantity,
                getItemQuantity,
                addToCart,
                removeFromCart,
                clearCart,
            }}
        >
            {children}
        </ShoppingCartContext.Provider>
    );
}
