import React from 'react'
import { NavLink } from 'react-router-dom'

export const ProductGridComponent = ({ id, imgUrl, name, description }) => {
  return (
    <NavLink className="m-2 rounded-md border-2 border-light-green text-dark-green bg-light-green" style={{ padding: "1.2em" }} to={`/product/${id}`}>
      <img className="p-2" src={imgUrl} alt={name} width="320px" />
      <h2 className="p-2 text-2xl font-bold">{name}</h2>
      <p className="p-2 text-lg font-semibold">Description:</p>
      <p className="p-2">{description}</p>
    </NavLink>
  )
}
