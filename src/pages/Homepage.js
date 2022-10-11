
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
    <Container>
      <NavLink to="/product/post"><button style={{ height: "4em", width: "12em", fontSize: "1em", backgroundColor: "green" }}>Post a product</button></NavLink>
      <div style={{ width: "80%", display: "flex", flexWrap: "wrap", justifyContent: "space-around" }}>
        {products.map(p => <ProductGridComponent key={p.id} id={p.id} imgUrl={p.imgUrl} name={p.name} description={p.description} />)}
      </div>
    </Container>
  )
}