
import { useDispatch, useSelector } from "react-redux"
import { getProducts } from "../store/product/thunks";
import { selectProducts } from "../store/product/selectors";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { ProductGridComponent } from "../components";
import { Container } from "../styled";

export const Homepage = () => {
  const dispatch = useDispatch();
  const products = useSelector(selectProducts)

  useEffect(() => {
    dispatch(getProducts())
  }, [])

  if (!products) {
    return <div>Loading...</div>
  }


  return (
    <div className="w-max m-auto flex flex-col place-items-center">
      <NavLink className="my-6" to="/product/post">
        <button style={{ height: "4em", width: "12em", fontSize: "1em", backgroundColor: "green" }}>Post a product</button>
      </NavLink>
      <div className="grid grid-cols-3 place-items-center">
        {products.map(p => <ProductGridComponent key={p.id} id={p.id} imgUrl={p.imgUrl} name={p.name} description={p.description} />)}
      </div>
    </div>
  )
}