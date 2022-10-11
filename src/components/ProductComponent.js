
export const ProductComponent = ({ imgUrl, name, description }) => {
  return (
    <div>
      <h1>{name}</h1>
      <img src={imgUrl} alt={name} width="320px" />
      <h2>{name}</h2>
      <p>{description}</p>
    </div>
  )
}
