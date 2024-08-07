import React, { useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import useCartStore from "../cartStore";
import Link from 'next/link';
import { useUser } from "@clerk/nextjs";
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { collection, addDoc, serverTimestamp, query, orderBy, getDocs } from 'firebase/firestore';
import { db } from '@/firebase'; // Adjust the import path as needed

function Cart() {
  const cart = useCartStore((state) => state.cart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const totalItems = useCartStore((state) => state.totalItems);
  const cartTotal = useCartStore((state) => state.cartTotal);
  const { user } = useUser();
  const router = useRouter();

  const [deliveryDetails, setDeliveryDetails] = useState({
    firstName: '',
    lastName: '',
    address: '',
    postalCode: '',
    city: '',
    phone: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRemoveFromCart = (productId) => {
    removeFromCart(productId);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDeliveryDetails({
      ...deliveryDetails,
      [name]: value,
    });
  };

  const handleCheckout = async (e) => {
  e.preventDefault();
  setIsSubmitting(true);

  try {
    const email = user?.emailAddresses[0]?.emailAddress;
    if (email) {
      await addDoc(collection(db, "orders"), {
        cart, // Array of product objects
        createdAt: serverTimestamp(), // Timestamp for when the order was created
        deliveryDetails: {
          address: deliveryDetails.address,
          city: deliveryDetails.city,
          firstName: deliveryDetails.firstName,
          lastName: deliveryDetails.lastName,
          phone: deliveryDetails.phone,
          postalCode: deliveryDetails.postalCode,
          email,
        },
        status: "pending", // Initial status
      });
      toast.success('Order placed successfully');
    } else {
      toast.error('User email not found');
    }
  } catch (error) {
    console.error(error);
    toast.error('Order placement failed');
  } finally {
    setIsSubmitting(false);
  }
};

  // Fetch and sort orders by timestamp
  const fetchOrders = async () => {
    const ordersQuery = query(collection(db, "orders"), orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(ordersQuery);
    const orders = querySnapshot.docs.map(doc => doc.data());
    return orders;
  };

  React.useEffect(() => {
    fetchOrders().then(orders => {
      console.log("Sorted Orders:", orders);
      // Handle orders as needed, e.g., set them in state
    });
  }, []);

  return (
    <div className='max-w-3xl mx-auto mt-20'>
      <h1 className="text-3xl text-center font-semibold text-[#6E4F3F] mb-6">{totalItems} items in Cart</h1>

      <table className="w-full border-collapse">
        <thead>
          <tr className="text-[#6E4F3F] border-b border-gray-200">
            <th className="py-2 px-4">Product</th>
            <th className="py-2 px-4">Quantity</th>
            <th className="py-2 px-4">Price</th>
            <th className="py-2 px-4">Remove</th>
          </tr>
        </thead>
        <tbody>
          {cart?.map((product) => (
            <tr key={product?._id} className="hover:bg-gray-50 text-center border-b border-gray-300 text-[#6E4F3F]">
              <td className="py-2 px-4">
                {product?.name}
              </td>
              <td className="py-2 px-4">{product?.quantity}</td>
              <td className="py-2 px-4">${product?.price}</td>
              <td className="py-2 px-4">
                <FaTrash onClick={() => handleRemoveFromCart(product?._id)} className="text-[#6E4F3F] mx-auto cursor-pointer" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Total Section */}
      <div className="mt-4 text-[#6E4F3F] ml-auto">
        <p className="text-lg font-semibold text-right mr-4">Total: ${cartTotal}</p>
      </div>

      {/* Delivery Form Section */}
      <div className='mt-10 p-10 bg-gray-100'>
        <form onSubmit={handleCheckout} className='space-y-4'>
          <div>
            <label className="block text-[#6E4F3F]">First name (optional)</label>
            <input type="text" name="firstName" value={deliveryDetails.firstName} onChange={handleChange} className="w-full border rounded p-2" />
          </div>
          <div>
            <label className="block text-[#6E4F3F]">Last name</label>
            <input type="text" name="lastName" value={deliveryDetails.lastName} onChange={handleChange} className="w-full border rounded p-2" required />
          </div>
          <div>
            <label className="block text-[#6E4F3F]">Address</label>
            <input type="text" name="address" value={deliveryDetails.address} onChange={handleChange} className="w-full border rounded p-2" required />
          </div>
          <div>
            <label className="block text-[#6E4F3F]">Postal code (optional)</label>
            <input type="text" name="postalCode" value={deliveryDetails.postalCode} onChange={handleChange} className="w-full border rounded p-2" />
          </div>
          <div>
            <label className="block text-[#6E4F3F]">City</label>
            <input type="text" name="city" value={deliveryDetails.city} onChange={handleChange} className="w-full border rounded p-2" required />
          </div>
          <div>
            <label className="block text-[#6E4F3F]">Phone</label>
            <input type="text" name="phone" value={deliveryDetails.phone} onChange={handleChange} className="w-full border rounded p-2" required />
          </div>

          <button type="submit" disabled={isSubmitting || cartTotal === 0 || !deliveryDetails.address} className="text-lg w-full font-semibold text-center mr-4 bg-[#6E4F3F] text-white py-2 px-4 rounded hover:text-[#6E4F3F] hover:bg-white border border-[#6E4F3F]">
            {isSubmitting ? "Processing..." : "Checkout"}
          </button>
        </form>
      </div>

      <div className="mt-6 text-[#6E4F3F] max-w-sm mx-auto space-y-4">
        <button className="text-lg w-full font-semibold text-center mr-4 bg-white hover:bg-[#6E4F3F] hover:text-white text-[#6E4F3F] border border-[#6E4F3F] py-2 px-4 rounded">
          <Link href="/">Back to Shopping</Link>
        </button>
      </div>
    </div>
  );
}

export default Cart;
