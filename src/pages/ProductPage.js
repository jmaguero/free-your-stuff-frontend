import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux"
import { useParams } from 'react-router-dom';
import { selectProduct } from '../store/product/selectors';
import { getProduct } from '../store/product/thunks';
import { ContactFormComponent, MapComponent, ProductComponent } from '../components';

export const ProductPage = () => {
  const [formInput, setFormInput] = useState({ name: "", message: "" })
  const params = useParams()
  const { id } = params;
  const dispatch = useDispatch()
  const product = useSelector(selectProduct);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Sent")
  }

  useEffect(() => {
    dispatch(getProduct(id))
  }, [])



  if (!product) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <ProductComponent imgUrl={product.imgUrl} name={product.name} description={product.description} lat={product.lat} long={product.long} />

        <ContactFormComponent handleSubmit={handleSubmit} name={formInput.name} handleNameChange={(e) => setFormInput({ ...formInput, name: e.target.value })} message={formInput.message} handleMessageChange={(e) => setFormInput({ ...formInput, message: e.target.value })} />
      </div>
      <div>
        <MapComponent lat={product.lat} long={product.long} />
      </div>
    </div>
  )
}
