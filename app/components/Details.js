"use client";  // Add this line at the top of the file

import Image from 'next/image';
import React, { useState } from 'react';
import useCartStore from "../cartStore";

function Details({ product }) {
  const addToCart = useCartStore((state) => state.addToCart);
  const [qty, setQty] = useState(1);
  const [mainImage, setMainImage] = useState(product?.images[0]);

  const handleAddToCart = () => {
    addToCart({ product, quantity: qty });
  };

  return (
    <div className="max-w-7xl mx-auto mt-20">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* left */}
        <div className="relative">
          <div className="image-container">
            <Image src={mainImage} width={400} height={400} className="product-detail-image" />
          </div>
          <div className="flex mt-2 space-x-2">
            {product?.images.map((image, index) => (
              <button key={index} onClick={() => setMainImage(image)} className="relative h-24 w-24">
                <Image src={image} className='small-image' layout="fill" objectFit="cover" alt={`Thumbnail ${index}`} />
              </button>
            ))}
          </div>
        </div>
        {/* right */}
        <div className="flex flex-col p-6 justify-between">
          <h1 className="text-3xl font-semibold text-[#6E4F3F]">{product?.name}</h1>
          <p className="text-lg text-gray-500 mt-4">{product?.description}</p>

          <div className="mt-5">
            <span className="text-[#6E4F3F] text-xl font-semibold">{product?.price} DT</span>
          </div>

          <div className="mt-6 flex flex-col text-gray-500">
            <label className="ml-2" htmlFor="">
              Qty
            </label>
            <input
              type="number"
              value={qty}
              onChange={(e) => setQty(e.target.value)}
              className="w-20 px-4 h-10 border border-gray-300 rounded-md"
            />
          </div>

          <div className="mt-6">
            <button onClick={handleAddToCart} className="bg-[#6E4F3F] text-white px-6 py-3 rounded-md">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Details;
