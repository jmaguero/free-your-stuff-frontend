import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { ProductGridComponent } from '../components'
import { selectSearchResult } from '../store/product/selectors'
import { Container } from '../styled'

export const ResultsPage = () => {
  const searchResult = useSelector(selectSearchResult)
  return (
    <Container>
      <NavLink to="/product/post"><button style={{ height: "4em", width: "12em", fontSize: "1em", backgroundColor: "green" }}>Post a product</button></NavLink>
      <div style={{ width: "80%", display: "flex", flexWrap: "wrap", justifyContent: "space-around" }}>
        {searchResult.map(p => <ProductGridComponent key={p.id} id={p.id} imgUrl={p.imgUrl} name={p.name} description={p.description} />)}
      </div>
    </Container>
  )
}