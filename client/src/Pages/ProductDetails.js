import { useParams } from "react-router-dom";
import { useOrderValue } from "../Contexts/OrderContext";
import { Circles } from "react-loader-spinner";
import style from "../Styles/Home.module.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useValue } from "../Contexts/AuthContext";
import { useState } from "react";

function ProductDetails() {
  const { Products, addToCart } = useOrderValue();
  const { item, id } = useParams();
  const { SignedIn } = useValue();
  const navigate = useNavigate();
  let ingreds = [];
  const product = Products[item]?.find((i) => i.id === id);
  const list = Object.keys(product.ingredients).map((key, k) => {
    const arr = product.ingredients[key];
    ingreds = [...ingreds, ...arr];
    return arr;
  });

  const obj = {};
  for (let i in ingreds) {
    obj[i] = false;
  }

  const [checkboxes, setCheckboxes] = useState(obj);
  const [packet, setPacket] = useState(false);

  const handleCheck = (e, index) => {
    setCheckboxes({ ...checkboxes, [index]: !checkboxes[index] });
  };

  const handlePacket = () => {
    if (packet) setPacket(false);
    else setPacket(true);
  };

  const handleSelectall = (e) => {
    for (let i in ingreds) {
      if (e.target.checked) obj[i] = true;
      else obj[i] = false;
    }
    setCheckboxes(obj);
  };

  const handleSubmit = async (e, id) => {
    e.preventDefault();
    if (!SignedIn) {
      navigate("/signin");
    } else {
      let data = { id: id, type: item, selected: [], packet: false };
      if (packet) {
        data.packet = true;
      }
      for (let i in ingreds) {
        if (checkboxes[i]) {
          data.selected = [...data.selected, ingreds[i]];
        }
      }
      // console.log(data);
      await addToCart(data);
      toast.success("Item added to cart");
    }
  };

  if (product) {
    return (
      <div className="poppins">
        <header className="grid grid-cols-2">
          <div className="flex flex-col items-center justify-center">
            <p className="font-bold text-[35px] ">{product.name}</p>
            <p className="font-medium text-gray-500">{product.subcategory}</p>
            <p className="mt-10 text-2xl">Rs. {product.price}</p>
          </div>
          <div className="">
            <img
              src={product.image}
              className="w-[700px]"
              style={{ maxHeight: "500px" }}
            />
          </div>
        </header>
        <section>
          <div className="w-10/12 mx-auto mt-10">
            <p className="font-semibold text-lg flex gap-2 items-center mb-4">
              <img
                src="https://cdn-icons-png.flaticon.com/128/9862/9862064.png"
                className="w-[40px]"
              />
              Ingredients:
            </p>
            <ul className="ml-16 gap-16 list-disc">
              {Object.keys(product.ingredients).map((i, key) => (
                <li>
                  <p className="font-semibold">{i}</p>

                  {product.ingredients[i].map((ing, index) => (
                    <p className="text-sm flex gap-2">
                      <img
                        src="https://cdn-icons-png.flaticon.com/128/13554/13554816.png"
                        className="w-[30px]"
                      />
                      {ing}
                    </p>
                  ))}
                </li>
              ))}
            </ul>
          </div>
          <div className="w-10/12 mx-auto my-12">
            <p className="font-semibold text-lg flex gap-2 items-center mb-4">
              <img
                src="https://cdn-icons-png.flaticon.com/128/1041/1041373.png"
                className="w-[40px]"
              />
              Steps:
            </p>
            <ul className="ml-16 gap-16 list-disc">
              {Object.keys(product.steps).map((i, key) => (
                <li>
                  <p className="font-semibold">{i}</p>

                  {product.steps[i].map((ing, index) => (
                    <p className="text-sm flex gap-2">
                      <img
                        src="https://cdn-icons-png.flaticon.com/128/13554/13554816.png"
                        className="w-[30px]"
                      />
                      {ing}
                    </p>
                  ))}
                </li>
              ))}
            </ul>
          </div>

          {/* checkouts */}
        </section>
        <form onSubmit={(e) => handleSubmit(e, product.id)}>
          <div className="w-5/12 mx-auto px-10 py-2 rounded-xl bg-gray-200 ">
            <div className="flex items-center mb-4 border-b border-dashed border-gray-700 pb-2">
              <input
                id={`selectall`}
                type="checkbox"
                name="selectall"
                value="selectall"
                onChange={handleSelectall}
                className="w-[16px] h-[20px] text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500  focus:ring-2 "
              />
              <label for={`selectall`} className="ms-2 text-md font-semibold ">
                Select All Ingredients
              </label>
            </div>
            {ingreds.map((ing, index) => (
              <div className="flex items-center mb-4">
                <input
                  id={`default-checkbox${index}`}
                  type="checkbox"
                  name={`input${index}`}
                  onClick={(e) => handleCheck(e, index)}
                  value={ing}
                  className="w-[16px] h-[20px] text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500  focus:ring-2 "
                />
                <label
                  for={`default-checkbox${index}`}
                  className="ms-2 text-sm font-medium "
                >
                  {ing}
                </label>
              </div>
            ))}
            <div className="flex items-center mb-4 border-t border-dashed border-gray-700 pt-2">
              <input
                id={`productpacket`}
                type="checkbox"
                name="productpacket"
                value="productpacket"
                onChange={handlePacket}
                className="w-[16px] h-[20px] text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500  focus:ring-2 "
              />
              <label
                for={`productpacket`}
                className="ms-2 text-sm font-semibold "
              >
                {product.name} packet (1 serving)
              </label>
            </div>
          </div>
          <div className="flex justify-center my-10 ">
            <button
              type="submit"
              className="bg-custom-color text-white px-6 py-3 rounded-xl shadow-xl font-semibold hover:scale-[1.05] border hover:border-purple-900 ease-in duration-200"
            >
              Add to Cart
            </button>
          </div>
        </form>
      </div>
    );
  } else {
    return (
      <div className={style.spinnerDiv}>
        <Circles color="#6e62e1" />
      </div>
    );
  }
}

export default ProductDetails;
