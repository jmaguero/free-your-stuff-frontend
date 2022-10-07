import React, { useState } from 'react';
import { useDispatch } from "react-redux"


export const CreateProductPage = () => {
  const [formInput, setFormInput] = useState({ title: "", description: "", imgUrl: "", postCode: "", condition: "", categoryId: "" })

  const encodeImageFileAsURL = (element) => {
    let file = element.files[0];
    let reader = new FileReader();
    reader.onloadend = function () {
      setFormInput({ ...formInput, imgUrl: reader.result })
    }
    //dont delete this next line!
    reader.readAsDataURL(file);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Sent")
  }


  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Title</label>
        <input type="text" value={formInput.title} onChange={(e) => setFormInput({ ...formInput, title: e.target.value })} placeholder="Title" />
        <label>Condition</label>
        <select>
          <option value="good">Good</option>
          <option defaultValue value="regular">Regular</option>
          <option value="bad">Bad</option>
        </select>
        <label>Upload a picture</label>
        <input type="file" onChange={(e) => encodeImageFileAsURL(e.target)} />
        <label>Picture preview</label>
        <img src={formInput.imgUrl} alt={formInput.title} />
        <label>Description</label>
        <textarea type="text" value={formInput.description} onChange={(e) => setFormInput({ ...formInput, description: e.target.value })} placeholder="Product description" />
        <label>Postcode</label>
        <input type="text" value={formInput.postCode} onChange={(e) => setFormInput({ ...formInput, postCode: e.target.value })} placeholder="Postcode" />
        <p>None of your private information will be shown to any other user</p>
        <button type="submit">Post it</button>
      </form>
    </div >
  )
}
