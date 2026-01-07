import "./Contact.css";


function Contact() {
  return (
    <div className="contact-container">
      <span className="contact-badge">Reach Out To Us</span>

      <h1 className="contact-title">
        We'd love to Hear From You.
      </h1>

      <p className="contact-text">
        Or just reach out manually to{" "}
        <a href="mailto:contact@prebuiltui.com" className="contact-link">
          contact@prebuiltui.com
        </a>
      </p>

      <div className="contact-grid">
        {/* Email */}
        <div className="contact-card">
          <div className="icon-wrapper">
            <svg width="24" height="24" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M21 4.125H3A1.125 1.125 0 0 0 1.875 5.25V18a1.875 1.875 0 0 0 1.875 1.875h16.5A1.875 1.875 0 0 0 22.125 18V5.25A1.125 1.125 0 0 0 21 4.125m-2.892 2.25L12 11.974 5.892 6.375z"
              />
            </svg>
          </div>
          <p className="card-title">Email Support</p>
          <p className="card-text">Our team can respond in real time.</p>
          <a href="mailto:contact@prebuiltui.com" className="contact-link">
            contact@prebuiltui.com
          </a>
        </div>

        {/* Office */}
        <div className="contact-card">
          <div className="icon-wrapper">
            <svg width="24" height="24" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.875 19.125H21.75V9.309h-3.75V4.809H3.75v14.316H2.25v2.25h20.625z"
              />
            </svg>
          </div>
          <p className="card-title">Visit Our Office</p>
          <p className="card-text">Visit our location in real life.</p>
          <span className="contact-link">
            221b Elementary Avenue, NY
          </span>
        </div>

        {/* Phone */}
        <div className="contact-card">
          <div className="icon-wrapper">
            <svg width="21" height="21" viewBox="0 0 21 21">
              <path
                fill="currentColor"
                d="m19 13.513-4.415-1.98a1.87 1.87 0 0 0-1.886.243l-2.091 1.781c-1.22-.66-2.478-1.91-3.14-3.113l1.787-2.125a1.88 1.88 0 0 0 .148-1.782L7.488 2A1.88 1.88 0 0 0 5.539.89"
              />
            </svg>
          </div>
          <p className="card-title">Call Us Directly</p>
          <p className="card-text">Available during working hours.</p>
          <span className="contact-link">
            (+1) 234 - 4567 - 789
          </span>
        </div>
      </div>
    </div>
  );
}


export default Contact;
