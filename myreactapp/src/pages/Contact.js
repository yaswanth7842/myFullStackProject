import { useState } from "react";
import "./Contact.css";

function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message sent");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="contact-container">
      <div className="contact-wrapper">

        <h3 className="contact-text">
          “Feel free to contact me if you have any questions, ideas, or collaboration opportunities.
          I’m always open to learning, improving, and working on meaningful projects.
          I’ll try to respond as soon as possible.”
        </h3>

        <form className="contact-card" onSubmit={handleSubmit}>
          <h2>Contact Me</h2>

          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <textarea
            name="message"
            placeholder="Your Message"
            value={form.message}
            onChange={handleChange}
            required
          ></textarea>

          <button type="submit">Send</button>
        </form>

      </div>
    </div>
  );
}

export default Contact;
