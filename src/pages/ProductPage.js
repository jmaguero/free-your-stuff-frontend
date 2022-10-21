import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux"
import { useParams } from 'react-router-dom';
import { selectProduct } from '../store/product/selectors';
import { getProduct } from '../store/product/thunks';
import { ContactFormComponent, MapComponent, ProductComponent } from '../components';
import { postMessage } from "../store/user/thunks"

export const ProductPage = () => {
  const [message, setMessage] = useState(undefined)
  const params = useParams()
  const { id } = params;
  const dispatch = useDispatch()
  const product = useSelector(selectProduct);


  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(postMessage(""))
    setMessage("")
  }


  useEffect(() => {
    dispatch(getProduct(id))
  }, [])



  if (!product) {
    return <div>Loading...</div>
  }

  return (
    <div className="flex flex-col w-full mt-10">
      <div className="flex flex-row w-full place-content-center">
        <ProductComponent imgUrl={product.imgUrl} name={product.name} description={product.description} lat={product.lat} long={product.long} />
        <MapComponent lat={product.lat} long={product.long} />
      </div >
      <ContactFormComponent handleSubmit={handleSubmit} message={message} handleMessageChange={(e) => setMessage(e.target.value)} />
    </div >
  )
}
