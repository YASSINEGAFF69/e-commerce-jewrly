import Image from "next/image";
import Link from 'next/link';

function Card({ product }) {
  return (
    <div>
      <Link href={`details/${product?.slug}`}>
        <div className="product-card">
          <Image
            src={product?.images[0]}
            width={250}
            height={250}
            className="product-image"
            alt={product?.name}
          />
          <p className="product-name">{product?.name}</p>
          <p className="product-price">{product?.price} DT</p>
        </div>
      </Link>
    </div>
  );
}

export default Card;
