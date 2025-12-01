import { ArrowRight, Star } from 'lucide-react';

export default function Footer() {
  return (
    <div className="footer">
      <div className="container">
        <div className="footer-cta">
          <h2 className="section-title" style={{color:'white', marginBottom:0}}>Let's Build The <br /> Future Together</h2>
          <button className="btn btn-primary">
            Get in Touch <ArrowRight size={16} style={{marginLeft:'0.5rem'}} />
          </button>
        </div>

        <div className="footer-grid">
          <div className="footer-col">
            <h3>Product</h3>
            <ul>
              <li><a href="#">AI Business</a></li>
              <li><a href="#">Business Transformation</a></li>
              <li><a href="#">Community</a></li>
              <li><a href="#">Pricing</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h3>Resources</h3>
            <ul>
              <li><a href="#">Help Center</a></li>
              <li><a href="#">Community</a></li>
              <li><a href="#">API Documentation</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h3>Support</h3>
            <ul>
              <li><a href="#">Support Center</a></li>
              <li><a href="#">FAQs</a></li>
              <li><a href="#">Troubleshooting</a></li>
              <li><a href="#">Feedback</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h3>Social Media</h3>
            <ul>
              <li><a href="#">Instagram</a></li>
              <li><a href="#">X</a></li>
              <li><a href="#">LinkedIn</a></li>
              <li><a href="#">Facebook</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="logo">
             <Star size={32} fill="white" />
             <span>AutoBiz</span>
          </div>
          <div className="footer-links">
            <span>© AutoBiz 2024</span>
            <span>Privacy Policy</span>
            <span>Terms Condition</span>
          </div>
        </div>
      </div>
    </div>
  );
}