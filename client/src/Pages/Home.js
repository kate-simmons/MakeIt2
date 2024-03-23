import { useEffect, useState } from "react";
import style from "../Styles/Home.module.css";
import FilterComp from "../Components/Filter";
import Card from "../Components/Card";
import { useOrderValue } from "../Contexts/OrderContext";
import { Circles } from "react-loader-spinner";
import Carousel from "../Components/Carousel";

function Home() {
  const { Products, isLoading } = useOrderValue(); // states from orderContext
  const [FilterCategory, setFilterCategory] = useState([]);
  const [search, setSearch] = useState("");

  return (
    <>
      <div className={style.homePage}>
        <Carousel />
        <div className="w-6/12 mx-auto mb-8">
          <input
            placeholder="Search..."
            className={`${style.input} w-[100%] shadow-xl`}
            // onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="bg-gray-200  rounded-xl">
          <div className={style.cardsContainer}>
            {Products.snacks ? (
              Products.snacks.map((item, index) => (
                <Card
                  product={item}
                  key={index}
                  search={search}
                  item="snacks"
                />
              ))
            ) : (
              <div className={style.spinnerDiv}>
                <Circles color="#6e62e1" />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
