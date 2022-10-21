import { useState } from 'react'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { ProductGridComponent } from '../components'
import { selectSearchResult } from '../store/product/selectors'

export const ResultsPage = () => {
  const searchResult = useSelector(selectSearchResult)
  const [mapToggle, setMapToggle] = useState(false)

  if (!searchResult) {
    return (<div>No search results, please enter a different search</div>)
  }

  return (
    <div className="w-max m-auto flex flex-col place-items-center mt-4">
      <button className="p-4 m-4 border-solid border-2 border-spacing-4 border-light-green text-dark-green font-extrabold" onClick={() => setMapToggle(!mapToggle)}>{!mapToggle ? "Show Results on map" : "Show Results Grid"}</button>
      {mapToggle ?
        <MapContainer center={[`${searchResult[0].lat}`, `${searchResult[0].long}`]} zoom={15} scrollWheelZoom={false} style={{ width: "1200px", height: "800px" }}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {searchResult && searchResult.map(p => {
            return (<Marker key={p.id} position={[`${p.lat + (Math.random() * 0.02)}`, `${p.long + (Math.random() * 0.02)}`]}>
              <Popup>
                <NavLink to={`/product/${p.id}`}>
                  <img src={p.imgUrl} alt={p.name} style={{ height: "200px", width: "200px" }} />
                </NavLink>
                <NavLink to={`/product/${p.id}`}>
                  <p>{p.name}</p>
                </NavLink>
                <p>Condition: {p.condition}</p>
                <p>Description: {p.description}</p>
              </Popup>
            </Marker>)
          })}
        </MapContainer>
        :
        <div className="grid grid-cols-3 place-items-center">
          {searchResult.map(p => <ProductGridComponent key={p.id} id={p.id} imgUrl={p.imgUrl} name={p.name} description={p.description} />)}
        </div>}

    </div>
  )
}