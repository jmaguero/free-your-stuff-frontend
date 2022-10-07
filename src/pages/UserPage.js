import { useState } from 'react';
import { useDispatch, useSelector } from "react-redux"
import { NavLink } from 'react-router-dom';
import { selectUser, selectToken } from '../store/user/selectors';
import { updateUser } from '../store/user/thunks';

export const UserPage = () => {
  const [toggle, setToggle] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const token = useSelector(selectToken);

  const [editUser, setEditUser] = useState({
    name: user && user.name,
    lastname: user && user.lastname,
    email: user && user.email
  })

  const handleSubmit = e => {
    e.preventDefault();
    setToggle(!toggle)
    dispatch(updateUser(editUser))
  }

  if (!user) return <div>Loading</div>


  if (!token) {
    return <div>You must be logged in to see this pages
      <NavLink to="/login">Login</NavLink>
    </div>
  }

  return (
    <div>
      {!toggle ?
        <div>
          <h2>{user.name}</h2>
          <h2>{user.lastname}</h2>
          <h2>{user.email}</h2>
          <h2>{user.giverRating}</h2>
          <h2>{user.receiverRating}</h2>
          <button onClick={() => setToggle(!toggle)}>Modify Profile</button>
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
    </div>)
}
