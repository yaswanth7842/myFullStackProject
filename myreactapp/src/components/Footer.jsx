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
              d="M47.904 28.28q-1.54 0-2.744-.644a4.2 4.2 0 0 1-1.694-1.806 5.16 5.16 0 0 1-.632-2.59q0-1.54.632-2.59a4.2 4.2 0 0 1 1.694-1.806q1.204-.644 2.744-.644 1.57 0 2.756.644a4.18 4.18 0 0 1 1.694 1.806q.632 1.05.632 2.59 0 1.54-.632 2.59a4.2 4.2 0 0 1-1.694 1.806q-1.186.644-2.756.644zm0-2.38q.8 0 1.344-.308a2.08 2.08 0 0 0 .84-.88q.308-.616.308-1.372 0-.8-.308-1.384a2.08 2.08 0 0 0-.84-.88q-.544-.308-1.344-.308-.74 0-1.296.308a2.1 2.1 0 0 0-.852.88q-.308.584-.308 1.384 0 .756.308 1.372a2.1 2.1 0 0 0 .852.88q.556.308 1.296.308z"
              fill="#000"
            />
            <path
              d="m8.75 11.3 6.75 3.884v7.768L8.75 26.83v-7.768L2 15.184v-7.768L8.75 3.532v7.768Z"
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