import Image from "next/image";
import React from "react";
import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";
import ReactStars from "react-rating-stars-component";
import { useDispatch } from "react-redux";
import { addToCart } from "../../reducers/cartSlice";
import { useRouter } from "next/router";

const ProductCard = ({ img, price, name, rating, desc, product }) => {
  const dispatch = useDispatch();
  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };
  const router = useRouter();
  return (
    <div className="productCard">
      <div
        className="productCard_img"
        onClick={() => router.push(`/product/${product._id}`)}
      >
        <Image src={img} alt="Image" width={220} height={220} />
      </div>
      <div className="productCard_name">
        <p>{name}</p>
      </div>
      <div className="productCard_rating">
        <ReactStars
          count={5}
          size={24}
          isHalf={true}
          emptyIcon={<BsStar />}
          halfIcon={<BsStarHalf />}
          fullIcon={<BsStarFill />}
          value={rating}
          edit={false}
          activeColor="#ffd700"
        />
        ,
      </div>

      <div className="productCard_desc">
        <p>{desc}</p>
      </div>
      <div className="productCard__">
        <div className="productCard_price">
          <p>₹{price}.00</p>
        </div>
        <div
          className="productCard_cta"
          onClick={() => handleAddToCart(product)}
        >
          <p>Add To Cart</p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
