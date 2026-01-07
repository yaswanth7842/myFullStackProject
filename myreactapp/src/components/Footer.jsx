import { Link } from "react-router-dom";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        {/* Left */}
        <div className="footer-brand">
          <svg
            width="157"
            height="40"
            viewBox="0 0 157 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M47.904 28.28q-1.54 0-2.744-.644..."
              fill="#000"
            />
            <path
              d="m8.75 11.3 6.75 3.884..."
              stroke="#4F39F6"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          <p className="footer-desc">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s.
          </p>
        </div>

        {/* Right */}
        <div className="footer-links">
          <div>
            <h2>Company</h2>
            <ul>
              <li><Link to="#">Home</Link></li>
              <li><Link to="/about.jsx">About us</Link></li>
              <li><Link to="/contact.jsx">Contact us</Link></li>
              <li><Link to="/TermsAndConditions.jsx">Privacy policy</Link></li>
            </ul>
          </div>

          <div>
            <h2>Get in touch</h2>
            <p>+1-212-456-7890</p>
            <p>contact@example.com</p>
          </div>
        </div>
      </div>

      <p className="footer-bottom">
        © 2024 <a href="https://prebuiltui.com">PrebuiltUI</a>. All Rights Reserved.
      </p>
    </footer>
  );
}