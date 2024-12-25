const ContactRequest = () => {
  return (
    <div className="contact">
      <form>
        <label>Your Full Name</label>
        <input type="text" name="name" className="name"/>
        <label>Your Email</label>
        <input type="text" name='email' />
        <label>Your Phone Number</label>
        <input type="text" name="phoneNumber" />
        <label>Your Message</label>
        <textarea name="message" className="message"></textarea>
        <button>SEND</button>
      </form>
    </div>
  );
};

export default ContactRequest;
