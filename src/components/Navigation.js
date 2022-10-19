import styled from "styled-components"
import logo from "@/../../public/logo.png"
import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { selectToken } from "../store/user/selectors"
import { logOut } from "../store/user/slice"
import { Link } from "react-router-dom"
import searchIcon from "@/../../public/assets/searchIcon.png";
import { getProducts } from "../store/product/thunks"
import { selectSearchResult } from "../store/product/selectors"
import { NavLink } from "react-router-dom"

export const Navigation = () => {

  const [open, setOpen] = useState(false);
  const [toggleSearchResults, setToggleSearchResults] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const dispatch = useDispatch()
  const searchResult = useSelector(selectSearchResult)

  const token = useSelector(selectToken)

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Search term: ", searchTerm)
    //Will redirect to the results page when user press enter or click the button.
  }

  //will trigger a thunk everytime searchTerm changes.
  useEffect(() => {
    dispatch(getProducts(searchTerm));
  }, [searchTerm])


  return (
    <Nav>
      <Logo href="/" className="">
        <img className="flex shrink" src={logo} alt="Free your stuff logo" />
      </Logo>
      <div className="px-8">
        <form className="flex" onSubmit={handleSearch} onClick={() => setToggleSearchResults(!toggleSearchResults)}>
          <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Introduce a search term" />
          <button type="submit"><img src={searchIcon} alt="Search" style={{ height: "15px" }} /></button>
        </form>
        {toggleSearchResults ? <div style={{ backgroundColor: "#E3EECD", display: "flex", flexDirection: "column", position: "absolute", width: "228px" }}>
          {searchResult ? <NavLink to={`/results/${searchTerm}`} key={"searchResults"} onClick={() => setToggleSearchResults(!toggleSearchResults)}>Results Page</NavLink> : null}
          {searchResult?.map((p, index) => {
            if (index < 6) { return <div onClick={() => setToggleSearchResults(!toggleSearchResults)}><img style={{ height: "20px" }} src={p.imgUrl} alt={p.name} /><NavLink to={`/product/${p.id}`} key={p.id}>{p.name}</NavLink></div> }
          })}

        </div> : null}
      </div>
      <Hamburger onClick={() => setOpen(!open)}>
        <span />
        <span />
        <span />
      </Hamburger>
      <Menu open={open}>
        <MenuLink to="/product/post">Post product!</MenuLink>
        {token ? <MenuLink to="/me">My Profile</MenuLink> : null}
        {token ? <MenuLink to="/me/inbox">Inbox</MenuLink> : null}
        {token
          ? <MenuLink to="/login"><button onClick={() => dispatch(logOut())}>Logout</button></MenuLink>
          : <MenuLink to="/login">Login</MenuLink>}
      </Menu>
    </Nav>
  )
}

const MenuLink = styled(Link)`
  padding: 1rem 2rem;
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  color: #408E61;
  transition: all 0.3s ease-in;
  font-size: 1rem;
  font-weight: 800;
  &:hover {
    color: #9CC094;
  }
`

const Nav = styled.div`
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #E3EECD;

`

const Logo = styled.a`
  padding: 1rem 0;
  color: #408E61;
  text-decoration: none;
  font-weight: 800;
  font-size: 1.7rem;

  span {
    font-weight: 300;
    font-size: 1.3rem;
  }
`

const Hamburger = styled.div`
  display: none;
  flex-direction: column;
  cursor: pointer;
  span {
    height: 2px;
    width: 25px;
    background-color: #408E61;
    margin-bottom: 4px;
    border-radius: 5px;
  }

  @media (max-width: 780px) {
    display: flex;

  }
`

const Menu = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;

  @media (max-width: 780px) {
    overflow: hidden;
    flex-direction: column;

    width: 90%;
    max-width: 90%;
    max-height: ${({ open }) => open ? "300px" : "0"};
    transition: max-height 0.3s ease-in;
  }
`
