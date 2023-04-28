import Head from "next/head";
import React, { useEffect, useState } from "react";
import baseUrl from "../../../helpers/baseUrl";
import { useDispatch } from "react-redux";

const Product_Details = ({ prod, success }) => {
  const dispatch = useDispatch();
  const [count, setCount] = useState(0);
  const [atc, setAtc] = useState(1);
  const [product, setProduct] = useState(null);
  const [images, setImages] = useState(null);
  const [reviews, setReviews] = useState(null);
  const [price, setPrice] = useState(null);
  const [ratings, setRatings] = useState(null);
  const [numOfReviews, setNumOfReviews] = useState(null);
  useEffect(() => {
    setProduct(prod);
    setImages(prod.img);
    setReviews(prod.reviews);
    setPrice(prod.prices);
    setRatings(prod.ratings);
    setNumOfReviews(prod.numOfReviews);
  }, [prod]);

  if (!product || !images) {
    return (
      <div className="loader">
        <div className="lds-facebook">
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    );
  }
  if (atc <= 0) {
    setAtc(1);
  }
  if (success === false) {
    return <h1>Product not found</h1>;
  }
  const title = `Bites - ${product.name}`;
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <div className="product">
        <h1>{product.name}</h1>
      </div>
    </>
  );
};

export async function getServerSideProps({ params: { id } }) {
  let res = null;
  let data = null;
  try {
    res = await fetch(`${baseUrl}/api/v1/product/${id}`);
    data = await res.json();
    return {
      props: {
        success: data.success,
        prod: data.product,
      },
    };
  } catch (err) {
    return {
      props: {
        product: null,
        error: err.message,
      },
    };
  }
}

export default Product_Details;
