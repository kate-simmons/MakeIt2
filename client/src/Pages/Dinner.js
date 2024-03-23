import { useState } from "react";
import style from "../Styles/Home.module.css";
import { useOrderValue } from "../Contexts/OrderContext";
import Card from "../Components/Card";
import { Circles } from "react-loader-spinner";
function Dinner() {
  const { search, setSearch } = useState();
  const { Products, isLoading } = useOrderValue();

  if (!Products.dinner) {
    return (
      <div className={style.spinnerDiv}>
        <Circles color="#6e62e1" />
      </div>
    );
  }
  return (
    <div>
      <p className="font-semibold text-3xl text-center border border-gray-100 w-[150px] p-2 mx-auto my-8 rounded-lg shadow-lg">
        Dinner
      </p>
      <div className="w-6/12 mx-auto mb-8">
        <input
          placeholder="Search dinner..."
          className={`${style.input} w-[100%] shadow-xl`}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className={style.cardsContainer}>
        {Products.dinner.map((item, index) => (
          <Card product={item} key={index} search={search} item="dinner" />
        ))}
      </div>
    </div>
  );
}

export default Dinner;
