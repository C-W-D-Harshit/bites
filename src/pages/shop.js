import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { Checkbox } from "@mui/material";
import baseUrl from "../../helpers/baseUrl";
import ProductCard from "../../components/product/productCard";
import axios from "axios";

const Shop = ({ products }) => {
  const [rating, setRating] = React.useState(5);
  const [price, setPrice] = React.useState([0, 500]);
  const [checked, setChecked] = React.useState(false);
  const [category, setCategory] = React.useState("");
  const [items, setItems] = React.useState([]);
  const [un, setUn] = React.useState([]);
  const [keyword, setKeyword] = React.useState("");
  const [dat, setData] = React.useState([]);
  const [currentPage, setCurrentPage] = React.useState(1);

  const handleChecked = (event) => {
    setChecked(event.target.checked);
  };

  const handleChange = (event, newValue) => {
    setPrice(newValue);
  };
  function valuetext(valu) {
    setRating(valu);
    return `${valu}°C`;
  }
  React.useEffect(() => {
    if (products) {
      const uq = products.map((product) => product.category);
      const g = [...new Set(uq)];
      const newUn = g.map((item, index) => ({
        id: index + 1,
        category: item,
        checked: false,
      }));
      setUn(newUn);
    }
    getData();
  }, []);
  async function getData() {
    const data_ = await axios.get(
      `/api/v1/products?keyword=${keyword}&page=${currentPage}`
    );
    setData(data_.data);
  }

  const handleCheckboxChange = (id) => {
    const newUn = un.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setUn(newUn);
  };
  console.log(un);

  return (
    <div className="shop">
      <div className="shop_fil">
        <p>Filter</p>
        <div className="shop_filter">
          <p>Rating</p>
          <Slider
            aria-label="Temperature"
            defaultValue={3}
            getAriaValueText={valuetext}
            valueLabelDisplay="auto"
            step={1}
            marks
            min={1}
            max={5}
          />
        </div>
        <div className="shop_filter">
          <p>Price</p>
          <Slider
            getAriaLabel={() => "Temperature range"}
            value={price}
            onChange={handleChange}
            valueLabelDisplay="auto"
            getAriaValueText={valuetext}
            min={0}
            step={500}
            max={10000}
          />
        </div>
        <div className="shop_filter">
          <p>Categories</p>
          <div className="shop_filter_">
            {un &&
              un.map((u) => (
                <div className="shop_filter__" key={u.id}>
                  <Checkbox
                    checked={u.checked}
                    onChange={() => {
                      handleCheckboxChange(u.id);
                      setCategory(u.category);
                    }}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                  <p style={{ textTransform: "capitalize" }}>{u.category}</p>
                </div>
              ))}
          </div>
        </div>
      </div>
      <div className="shop_hold">
        {dat.products &&
          dat.products
            .reverse()
            .map((product) => (
              <ProductCard
                key={product._id}
                id={product._id}
                img={"/food_1.png"}
                rating={product.ratings}
                name={product.name}
                desc={product.desc}
                price={product.prices[0]}
                product={product}
              />
            ))}
      </div>
    </div>
  );
};

export async function getServerSideProps() {
  try {
    const res = await fetch(`${baseUrl}/api/v1/products`);
    const data = await res.json();
    return {
      props: {
        products: data.products,
      },
    };
  } catch (err) {
    return {
      props: {
        products: null,
        error: err.message,
      },
    };
  }
}

export default Shop;
