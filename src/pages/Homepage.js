import styled from "styled-components"
import { useDispatch, useSelector } from "react-redux"
import { getProducts } from "../store/product/thunks";
import { selectProducts } from "../store/product/selectors";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";

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
    <Container style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <NavLink to="/product/post"><button style={{ height: "4em", width: "12em", fontSize: "1em", backgroundColor: "green" }}>Post a product</button></NavLink>
      <div style={{ width: "80%", display: "flex", flexWrap: "wrap", justifyContent: "space-around" }}>{products.map(p => {
        return <div key={p.id} style={{ padding: "1.2em" }} >
          <NavLink to={`/product/${p.id}`}>
            <img src={p.imgUrl} alt={p.name} width="320px" />
            <h2>{p.name}</h2>
            <p>{p.description}</p>
          </NavLink>
        </div>
      })}
      </div>
    </Container>
  )
}

const Container = styled.div`
  margin: 20px;
`