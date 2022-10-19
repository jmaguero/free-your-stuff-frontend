import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux"
import { getCategories } from '../store/category/thunks';
import { selectCategories } from "../store/category/selectors"
import { postProduct } from "../store/product/thunks"
import { selectToken } from '../store/user/selectors';
import { useNavigate, NavLink } from 'react-router-dom';
import { selectProduct } from '../store/product/selectors';
import { updateProduct } from '../store/product/slice';


export const CreateProductPage = () => {
  const [formInput, setFormInput] = useState({ name: "", description: "", imgUrl: "", lat: "", long: "", condition: "regular", categoryId: "" })
  const [postCode, setPostCode] = useState("")
  const [city, setCity] = useState("")
  const [country, setCountry] = useState("")

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const categories = useSelector(selectCategories)
  const token = useSelector(selectToken)
  const product = useSelector(selectProduct);

  useEffect(() => {
    dispatch(getCategories())
    dispatch(updateProduct(null))
  }, [])

  const getGeolocation = async () => {

    const response = await fetch(`https://api.geoapify.com/v1/geocode/search?postcode=${postCode}&city=${city}&country=${country}&limit=1&format=json&apiKey=${process.env.REACT_APP_GEOAPIFY_API_KEY}`);
    const data = await response.json();
    const { lat, lon } = data.results[0]
    setFormInput({ ...formInput, lat: lat, long: lon })
    //TODO add navigation to new product
    //TODO clean inputs after submitting
  }

  if (postCode && city && country) {
    getGeolocation()
  }

  const uploadImg = async (e) => {
    const files = e.target.files
    const data = new FormData()
    data.append("file", files[0])
    data.append('upload_preset', "fstuff");

    //post request to Cloudinary, remember to change to your own link
    const res = await fetch("https://api.cloudinary.com/v1_1/dpnaiv0f4/image/upload", {
      method: "POST",
      body: data
    })
    const file = await res.json()
    setFormInput({ ...formInput, imgUrl: file.url }) //put the url in local state, next step you can send it to the backend
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(postProduct(formInput))

    setTimeout(() => {
      if (product) {
        navigate(`/product/${product.id}`);
      }
    }, 2000);


  }

  if (!token) {
    return <div>You must be logged in to see this pages
      <NavLink to="/login">Login</NavLink>
    </div>
  }


  return (
    <div className="flex justify-center rounded-md border-2 border-light-green text-dark-green bg-light-green text-xl font-bold p-4">
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column" }}>
        <label className="my-2">Title</label>
        <input className="mb-2 px-2" type="text" value={formInput.name} onChange={(e) => setFormInput({ ...formInput, name: e.target.value })} placeholder="name" required />
        <label className="my-2">Condition</label>
        <select className="my-2 mb-2 px-2" value={formInput.condition} onChange={(e) => setFormInput({ ...formInput, condition: e.target.value })} required>
          <option value="good">Good</option>
          <option defaultValue value="regular">Regular</option>
          <option value="bad">Bad</option>
        </select>
        <label className="my-2">Category</label>
        <select className="my-2 mb-2 px-2" value={formInput.categoryId} onChange={(e) => setFormInput({ ...formInput, categoryId: e.target.value })} required >
          <option defaultValue value=""></option>
          {categories && categories.map(c => <option key={c.id} value={c.id}>{c.title}</option>)}
        </select>
        <label className="my-2">Upload a picture</label>
        <input className="mb-2 px-2" type="file" onChange={(e) => uploadImg(e)} required />
        <label className="my-2">Picture preview</label>
        <img src={formInput.imgUrl} alt={formInput.title} required style={{ width: "300px" }} />
        <label className="my-2">Description</label>
        <textarea type="text" value={formInput.description} onChange={(e) => setFormInput({ ...formInput, description: e.target.value })} placeholder="Product description" required />
        <label className="my-2">Postcode</label>
        <input className="mb-2 px-2" type="text" value={postCode} onChange={(e) => setPostCode(e.target.value)} placeholder="Postcode" required />
        <label className="my-2">City</label>
        <input className="mb-2 px-2" type="text" value={city} onChange={(e) => setCity(e.target.value)} placeholder="City" required />
        <label className="my-2">Country</label>
        <input className="mb-2 px-2" type="text" value={country} onChange={(e) => setCountry(e.target.value)} placeholder="City" required />
        <p>None of your private information will be shown to any other user</p>
        <button className="bg-med-green border-2 border-spacing-10 border-dark-blue border-solid text-dark-blue" type="submit">Post it</button>
      </form>
    </div >
  )
}
