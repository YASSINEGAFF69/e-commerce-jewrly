import { create } from 'zustand';

const useCartStore = create((set) => ({
  cart: [],
  cartTotal: 0,
  totalItems: 0,
  addToCart: ({ product, quantity }) =>
    set((state) => {
      const existingProductIndex = state.cart.findIndex((item) => item._id === product._id);
      const newQuantity = parseInt(quantity, 10);

      if (newQuantity <= 0) {
       
        const updatedCart = state.cart.filter((item) => item._id !== product._id);
        return {
          cart: updatedCart,
          cartTotal: calculateCartTotal(updatedCart),
          totalItems: calculateTotalItems(updatedCart),
        };
      }

      if (existingProductIndex !== -1) {
        
        const updatedCart = [...state.cart];
        updatedCart[existingProductIndex].quantity = newQuantity;

        return {
          cart: updatedCart,
          cartTotal: calculateCartTotal(updatedCart),
          totalItems: calculateTotalItems(updatedCart),
        };
      } else {
        return {
          cart: [...state.cart, { ...product, quantity: newQuantity }],
          cartTotal: calculateCartTotal([...state.cart, { ...product, quantity: newQuantity }]),
          totalItems: calculateTotalItems([...state.cart, { ...product, quantity: newQuantity }]),
        };
      }
    }),
  removeFromCart: (productId) =>
    set((state) => {
      const updatedCart = state.cart.filter((item) => item._id !== productId);

      return {
        cart: updatedCart,
        cartTotal: calculateCartTotal(updatedCart),
        totalItems: calculateTotalItems(updatedCart),
      };
    }),
  clearCart: () => set({ cart: [], cartTotal: 0, totalItems: 0 }),
}));

function calculateCartTotal(cart) {
  return cart.reduce((total, item) => total + item.price * item.quantity, 0);
}

function calculateTotalItems(cart) {
    return cart.reduce((total, item) => total + 1, 0);
  }

export default useCartStore;
