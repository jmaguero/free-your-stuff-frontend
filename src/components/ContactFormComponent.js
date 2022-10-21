
export const ContactFormComponent = ({ handleSubmit, message, handleMessageChange }) => {
  return (
    <form className="flex flex-col mx-auto mt-20 align-self-center border-solid border-2 border-spacing-4 border-light-green text-dark-green font-extrabold" onSubmit={handleSubmit}>
      <label className="p-4 m-2 font-extrabold justify-around">Contact the giver</label>
      <textarea className="p-4 m-2 border-solid border-2 border-spacing-4 border-light-green" type="text" value={message} onChange={handleMessageChange} placeholder="Your Message" />
      <button className="p-2 m-2 border-solid border-2 border-spacing-4 border-light-green" type="submit">Send Message</button>
    </form>
  )
}

export default ContactFormComponent


