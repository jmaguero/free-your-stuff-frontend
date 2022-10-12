import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux"
import { NavLink } from 'react-router-dom';
import { selectUser, selectToken, selectUserProducts } from '../store/user/selectors';
import { updateUser, getUserProducts, deleteProduct, updateUserProduct } from '../store/user/thunks';
import moment from "moment"


export const UserPage = () => {
  const [toggle, setToggle] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const token = useSelector(selectToken);
  const userProducts = useSelector(selectUserProducts);

  //TODO fix bug. When toggle modify user opens, it doesn't show values and breaks when refreshing.
  const [editUser, setEditUser] = useState({
    name: user?.name || "",
    lastname: user?.lastname || "",
    email: user?.email || ""
  })

  useEffect(() => {
    dispatch(getUserProducts())
  }, [])


  const handleSubmit = e => {
    e.preventDefault();
    setToggle(!toggle)
    dispatch(updateUser(editUser))
  }

  const handleProduct = (param, type) => {

    switch (type) {
      case "availability":
        dispatch(updateUserProduct(param));
        break;
      case "delete":
        dispatch(deleteProduct(param));
        break;
      default: console.log("No matching case")
    }
  }

  if (!user || !userProducts) return <div>Loading</div>


  if (!token) {
    return <div>You must be logged in to see this pages
      <NavLink to="/login">Login</NavLink>
    </div>
  }

  return (
    <div style={{ display: "flex", margin: "2em", justifyContent: "space-evenly", alignContent: "center" }}>
      <div>
        {user && !toggle ?
          <div>
            <h2>{user.name}</h2>
            <h2>{user.lastname}</h2>
            <h2>{user.email}</h2>
            <h2>{user.giverRating}</h2>
            <h2>{user.receiverRating}</h2>
            <button onClick={() => setToggle(!toggle)}>Edit Profile</button>
          </div>
          :
          <div>
            <form onSubmit={handleSubmit}>
              <input value={editUser.name} onChange={(e) => setEditUser({ ...editUser, name: e.target.value })} />
              <input value={editUser.lastname} onChange={(e) => setEditUser({ ...editUser, lastname: e.target.value })} />
              <input value={editUser.email} onChange={(e) => setEditUser({ ...editUser, email: e.target.value })} />
              <h2>{user.giverRating}</h2>
              <h2>{user.receiverRating}</h2>
              <button type='submit'>Modify Profile</button>
            </form>
          </div>
        }
      </div>
      <div>
        <h2>User's products</h2>
        <table>
          <thead>
            <tr>
              <th>Picture</th>
              <th>Product</th>
              <th>Post date</th>
              <th>Availability</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {userProducts.map(p => {
              return (<tr key={p.id}>

                <td><NavLink to={`/product/${p.id}`}><img src={p.imgUrl} alt={p.name} style={{ width: "60px", height: "60px" }} /></NavLink></td>
                <td><NavLink to={`/product/${p.id}`}>{p.name}</NavLink></td>
                <td>{moment(p.createdAt).format('L')}</td>
                <td><button onClick={() => handleProduct({ ...p, isAvailable: !p.isAvailable }, "availability")}> {p.isAvailable ? "Set not available" : "Set available"}</button>
                </td>
                <td><button onClick={() => handleProduct(p.id, "delete")}>Delete</button></td>
              </tr>)
            })}
          </tbody>
        </table>
      </div>
    </div>)
}
