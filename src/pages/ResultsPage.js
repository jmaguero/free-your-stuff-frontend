import { useState } from 'react'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import { useSelector } from 'react-redux'
import { ProductGridComponent } from '../components'
import { selectSearchResult } from '../store/product/selectors'
import { Container } from '../styled'

export const ResultsPage = () => {
  const searchResult = useSelector(selectSearchResult)
  const [mapToggle, setMapToggle] = useState(false)
  return (
    <Container>
      <button onClick={() => setMapToggle(!mapToggle)}>{!mapToggle ? "Show Results on map" : "Show Results Grid"}</button>
      {mapToggle ?
        <MapContainer center={[`${searchResult[0].lat}`, `${searchResult[0].long}`]} zoom={15} scrollWheelZoom={false} style={{ width: "1200px", height: "800px" }}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {searchResult.map(p => {
            return (<Marker key={p.id} position={[`${p.lat + (Math.random() * 0.02)}`, `${p.long + (Math.random() * 0.02)}`]}>
              <Popup>
                <img src={p.imgUrl} alt={p.name} style={{ height: "200px", width: "200px" }} />
                <p>{p.name}</p>
                <p>Condition: {p.condition}</p>
              </Popup>
            </Marker>)
          })}
        </MapContainer>
        :
        <div style={{ width: "80%", display: "flex", flexWrap: "wrap", justifyContent: "space-around" }}>
          {searchResult.map(p => <ProductGridComponent key={p.id} id={p.id} imgUrl={p.imgUrl} name={p.name} description={p.description} />)}
        </div>}

    </Container>
  )
}