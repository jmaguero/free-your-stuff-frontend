import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'

export const MapComponent = ({ lat, long }) => {
  return (
    <MapContainer center={[`${lat}`, `${long}`]} zoom={13} scrollWheelZoom={false} style={{ height: "30em", width: "40%" }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[`${lat}`, `${long}`]}>
      </Marker>
    </MapContainer>

  )
}
