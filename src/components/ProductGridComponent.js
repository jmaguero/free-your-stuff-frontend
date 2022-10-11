import React from 'react'
import { NavLink } from 'react-router-dom'

export const ProductGridComponent = ({ id, imgUrl, name, description }) => {
  return (
    <NavLink style={{ padding: "1.2em" }} to={`/product/${id}`}>
      <img src={imgUrl} alt={name} width="320px" />
      <h2>{name}</h2>
      <p>{description}</p>
    </NavLink>
  )
}
