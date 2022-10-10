import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux"
import { useParams } from 'react-router-dom';
import { selectProduct } from '../store/product/selectors';
import { getProduct } from '../store/product/thunks';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'

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
      <div>
        <h1>{product.name}</h1>
        <img src={product.imgUrl} alt={product.name} width="320px" />
        <h2>{product.name}</h2>
        <p>{product.description}</p>
        <MapContainer center={[`${product.lat}`, `${product.long}`]} zoom={13} scrollWheelZoom={false} style={{ height: "400px", maxWidth: "400px" }}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[`${product.lat}`, `${product.long}`]}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        </MapContainer>
      </div>
      <form onSubmit={handleSubmit}>
        <label>Name</label>
        <input type="text" value={formInput.name} onChange={(e) => setFormInput({ ...formInput, name: e.target.value })} placeholder="Name" />
        <label>Message</label>
        <textarea type="text" value={formInput.message} onChange={(e) => setFormInput({ ...formInput, message: e.target.value })} placeholder="Your Message" />
        <button type="submit">Send Message</button>
      </form>
    </div >
  )
}
