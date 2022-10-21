import React from 'react'
import { NavLink } from 'react-router-dom'

export const ProductGridComponent = ({ id, imgUrl, name, description }) => {
  return (
    <NavLink className="flex flex-col m-2 h-96 w-72 rounded-md border-2 border-light-green text-dark-green bg-light-green alig" style={{ padding: "1.2em" }} to={`/product/${id}`}>
      <div className='self-center'>
        <img className="h-40 w-auto rounded-lg shadow-lg" src={imgUrl} alt={name} />
      </div>
      <div className="mt-4"><h2 className="p-2 text-2xl font-extrabold">{name}</h2>
        <p className="p-2 text-lg font-extrabold">Description:</p>
        <p className="p-2 font-bold">{description}</p>
      </div>
    </NavLink>
  )
}
