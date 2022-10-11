
export const ContactFormComponent = ({ handleSubmit, name, handleNameChange, message, handleMessageChange }) => {
  return (
    <form onSubmit={handleSubmit}>
      <label>Name</label>
      <input type="text" value={name} onChange={handleNameChange} placeholder="Name" />
      <label>Message</label>
      <textarea type="text" value={message} onChange={handleMessageChange} placeholder="Your Message" />
      <button type="submit">Send Message</button>
    </form>
  )
}

export default ContactFormComponent


