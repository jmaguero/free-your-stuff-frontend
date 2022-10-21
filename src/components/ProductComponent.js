
export const ProductComponent = ({ imgUrl, name, description }) => {
  return (
    <div className="flex flex-row m-2 rounded-md border-2 border-light-green text-dark-green bg-light-green" style={{ padding: "1.2em" }}>
      <img className="p-2" src={imgUrl} alt={name} width="320px" />
      <div className="flex-column">
        <h2 className="p-2 text-2xl font-extrabold">{name}</h2>
        <p className="p-2 text-lg font-extrabold">Description:</p>
        <p className="p-2 font-bold">{description}</p>
      </div>
    </div>
  )
}
