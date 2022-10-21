import styled from "styled-components"
import { Input, Title, LinkWord } from "../styled"
import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { login } from "../store/user/thunks"
import { selectToken } from "../store/user/selectors"

export const Login = () => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const token = useSelector(selectToken)

  useEffect(() => {
    if (token !== null) {
      navigate("/");
    }
  }, [token, navigate]);

  const submitForm = (e) => {
    e.preventDefault()
    dispatch(login(email, password))
  }

  return (
    <div style={{ textAlign: "center" }}>
      <Container>
        <h1 className="p-4 m-4 text-3xl text-dark-green font-extrabold">Login</h1>
        <form onSubmit={submitForm}>
          <Input
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <button className="p-4 m-4 border-solid border-2 border-spacing-4 border-light-green text-dark-green font-extrabold" type="submit">Login</button>
        </form>
        <p>
          Don't have an account yet? Click <a className="text-dark-green" href="/signup">here</a> to sign up
        </p>
      </Container>
    </div>
  )
}

const Container = styled.div`
  display: 'flex';
  flex-direction: 'column';
  margin: 15%;
`

const SubText = styled.p`
  text-align: center;
  color: #1E3163;
  padding: 20px 0px 5px 0px;
`;

