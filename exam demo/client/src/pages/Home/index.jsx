import React, { useContext } from "react";
import styles from "../Home/home.module.scss";
import { Button, Col, Row } from "antd";
import { useGetProductQuery } from "../../service/productApi";
import { useState } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { BasketContext } from "../../context/basketContext";
import { FavContext } from "../../context/wishlistContext";
import { Link } from "react-router-dom";
import { TextField } from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


const Home = () => {
  const { data: products, refetch } = useGetProductQuery();
  const [query, setQuery] = useState("");
  const { basket, setBasket } = useContext(BasketContext);
  const { fav, setFav } = useContext(FavContext);
const [sort,setSort]=useState("");

  const handleWishlist = (product) => {
    const addToFav = fav.find((x) => x._id === product._id);
    if (!addToFav) {
      setFav([...fav, product]);
      localStorage.setItem("fav", JSON.stringify([...fav, product]));
    } else {
      const updateWishlist = fav.filter((x) => x._id !== product._id);
      setFav(updateWishlist);
      localStorage.setItem("fav", JSON.stringify(updateWishlist));
    }
  };

  let filteredData = products
    ? products.data.filter((product) =>
        product.title.toLowerCase().includes(query.toLowerCase())
      )
    : [];

    if (sort==="A-Z") {
      filteredData=filteredData.sort((a,b)=>a.title.localeCompare(b.title))
    } else  if(sort==="Z-A"){
      filteredData=filteredData.sort((a,b)=>b.title.localeCompare(a.title))
    }

  return (
    <>
      <section className={styles.sect1}>
        <div className="container"></div>
      </section>

      <section>
        <div className={styles.sect3}>
          <div className="container">
            <TextField
              id="outlined-basic"
              name="search"
              label="Search"
              variant="outlined"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
             <FormControl sx={{ m: 1, minWidth: 120 }}>
        <Select
          value={sort}
          onChange={(e)=>setSort(e.target.value)}
          displayEmpty
          inputProps={{ 'aria-label': 'Without label' }}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={"A-Z"}>A-Z</MenuItem>
          <MenuItem value={"Z-A"}>Z-A</MenuItem>
        </Select>
      </FormControl>
            <Row
              gutter={{
                xs: 8,
                sm: 16,
                md: 24,
                lg: 32,
              }}
            >
              <div className={styles.cards}>
                {filteredData &&
                  filteredData.map((product) => (
                    <Col
                      key={product._id}
                      className="gutter-row"
                      span={8}
                      xs={24}
                      sm={24}
                      md={12}
                      lg={8}
                    >
                      <div className={styles.card}>
                        <img
                          src={product.img}
                          alt=""
                          width={200}
                          height={200}
                        />
                        <h3>{product.title}</h3>
                        <p>{product.bio}</p>
                        <Button
                          onClick={() => {
                            let duplicateItem = basket.find(
                              (x) => x._id === product._id
                            );
                            if (duplicateItem) {
                              duplicateItem.count += 1;
                              setBasket([...basket]);
                              localStorage.setItem(
                                "basket",
                                JSON.stringify([...basket])
                              );
                            } else {
                              const newBasket = { ...product };
                              newBasket.count = 1;
                              setBasket([...basket, newBasket]);
                              localStorage.setItem(
                                "basket",
                                JSON.stringify([...basket, newBasket])
                              );
                            }
                          }}
                        >
                          Basket
                        </Button>
                        <Button onClick={() => handleWishlist(product)}>
                          <FavoriteIcon
                            style={{
                              color: fav.find((x) => x._id === product._id)
                                ? "red"
                                : "inherit",
                            }}
                          />
                        </Button>
                        <Button>
                          <Link to={`detail/${product._id}`}>Detail</Link>
                        </Button>
                      </div>
                    </Col>
                  ))}
              </div>
            </Row>
          </div>
        </div>
      </section>

      <section>
        <div className={styles.sect4}>
          <div className="container">
            <h2>OUR LEADERSHIP</h2>
            <p className={styles.p}>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut{" "}
              <br />
              corporis, eius, eos consectetur consequuntur sit. Aut,
              <br />
              perspiciatis, reprehenderit.
            </p>

            <Row
              gutter={{
                xs: 8,
                sm: 16,
                md: 24,
                lg: 32,
              }}
            >
              <Col
                className="gutter-row"
                span={8}
                xs={24}
                sm={24}
                md={12}
                lg={8}
                style={{ border: "1px solid black" }}
              >
                <img
                  src="https://preview.colorlib.com/theme/foundation/images/person_3.jpg"
                  alt=""
                />
                <p>MINING EXPERT</p>
                <p>
                  Lorem ipsum dolor sit amet, <br /> consectetur adipisicing
                  elit. Nihil <br />
                  quia veritatis, nam quam obcaecati <br /> fuga.
                </p>
              </Col>

              <Col
                className="gutter-row"
                span={8}
                xs={24}
                sm={24}
                md={12}
                lg={8}
                style={{ border: "1px solid black" }}
              >
                <img
                  src="https://preview.colorlib.com/theme/foundation/images/person_1.jpg"
                  alt=""
                />
                <p>MINING EXPERT</p>
                <p>
                  Lorem ipsum dolor sit amet, <br /> consectetur adipisicing
                  elit. Nihil <br />
                  quia veritatis, nam quam obcaecati <br />
                  fuga.
                </p>
              </Col>
              <Col
                className="gutter-row"
                span={8}
                xs={24}
                sm={24}
                md={12}
                lg={8}
                style={{ border: "1px solid black" }}
              >
                {/* <div className={styles.card}> */}
                <img
                  src="https://preview.colorlib.com/theme/foundation/images/person_2.jpg"
                  alt=""
                />
                <p>MINING EXPERT</p>
                <p>
                  Lorem ipsum dolor sit amet,
                  <br /> consectetur adipisicing elit. Nihil <br />
                  quia veritatis, nam quam obcaecati <br /> fuga.
                </p>
                {/* </div> */}
              </Col>
              {/* </div> */}
            </Row>
          </div>
        </div>
      </section>

      <section>
        <div className={styles.sect5}>
          <div className="container">
            <h1>Our Blog</h1>
            <Row >
              <Col span={12} xs={24}
                sm={24}
                md={12}
                lg={12}>
                <img
                  src="https://preview.colorlib.com/theme/foundation/images/hero_1_no-text.jpg"
                  alt=""
                  width={500}
                  height={400}
                />
                <h2>How to Invest In Investing Company</h2>
                <span>JANUARY 18, 2019 BY JAMES COOPER</span>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Quaerat et suscipit iste libero neque. Vitae quidem ducimus
                  voluptatibus nemo cum odio ab enim nisi, itaque, libero fuga
                  veritatis culpa quis!
                </p>
                <button>Get Started</button>
              </Col>
              <Col span={12} xs={24}
                sm={24}
                md={12}
                lg={12}>
                <img
                  src="https://preview.colorlib.com/theme/foundation/images/hero_2_no-text.jpg"
                  alt=""
                  width={500}
                  height={400}
                />
                 <h2>How to Invest In Investing Company</h2>
                <span>JANUARY 18, 2019 BY JAMES COOPER</span>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Quaerat et suscipit iste libero neque. Vitae quidem ducimus
                  voluptatibus nemo cum odio ab enim nisi, itaque, libero fuga
                  veritatis culpa quis!
                </p>
                <button>Get Started</button>
              </Col>
            </Row>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
