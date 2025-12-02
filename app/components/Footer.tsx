import { ArrowRight, Star } from 'lucide-react';

export default function Footer() {
  return (
    <footer id="footer">
    <div className="footer">
      <div className="container">
        {/* Link Grid */}
        <div className="footer-grid">
          {/* Column 1 */}
          <div className="footer-col">
            <h3>Product</h3>
            <ul>
              <li><a href="#">Products Overview</a></li>
              <li><a href="#">Models Overview</a></li>
              <li><a href="#">Search</a></li>
              <li><a href="#">Generate</a></li>
              <li><a href="#">Embed</a></li>
              <li><a href="#">Pricing</a></li>
            </ul>
            
            <h3 style={{marginTop: '2rem'}}>Social</h3>
            <ul>
             {/* <li><a href="#" style={{display:'flex', alignItems:'center', gap:'0.5rem'}}><Linkedin size={16}/> LinkedIn</a></li> */}
              {/* <li><a href="#" style={{display:'flex', alignItems:'center', gap:'0.5rem'}}><Youtube size={16}/> Youtube</a></li> */}
            </ul>
          </div>

          {/* Column 2 */}
          <div className="footer-col">
            <h3>For Developers</h3>
            <ul>
              <li><a href="#">Sample Apps</a></li>
              <li><a href="#">Developer Hub</a></li>
              <li><a href="#">API Docs</a></li>
              <li><a href="#">SDKs</a></li>
              <li><a href="#">Discord</a></li>
              <li><a href="#">Status</a></li>
            </ul>

            <h3 style={{marginTop: '2rem'}}>Research</h3>
            <ul>
               <li><a href="#">Enterprise</a></li>
               <li><a href="#">Security</a></li>
            </ul>
          </div>

          {/* Column 3 */}
          <div className="footer-col">
            <h3>Solutions</h3>
            <ul>
              <li><a href="#">Advertising</a></li>
              <li><a href="#">Automotive</a></li>
              <li><a href="#">Government & Security</a></li>
              <li><a href="#">Media & Entertainment</a></li>
            </ul>

            <h3 style={{marginTop: '2rem'}}>Company</h3>
            <ul>
              <li><a href="#">About Us</a></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">Blog</a></li>
            </ul>
          </div>

          {/* Column 4 */}
          <div className="footer-col">
            <h3>Legal</h3>
            <ul>
              <li><a href="#">Terms of Use</a></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Trust Center</a></li>
              <li><a href="#">Website Terms</a></li>
            </ul>

            <div className="footer-badge">
              AICPA<br/>SOC
            </div>
          </div>
        </div>

        {/* Huge Brand Section */}
        <div className="footer-brand-section">
          {/* Abstract Graphic representing the dog/blocks from reference */}
          <div className="brand-graphic">
             <div className="bg-row" style={{marginLeft:'20px'}}><div className="pixel"></div></div>
             <div className="bg-row" style={{marginLeft:'10px'}}><div className="pixel"></div><div className="pixel"></div></div>
             <div className="bg-row"><div className="pixel"></div><div className="pixel"></div><div className="pixel"></div><div className="pixel"></div></div>
             <div className="bg-row" style={{marginLeft:'10px'}}><div className="pixel"></div><div className="pixel"></div><div className="pixel"></div></div>
             <div className="bg-row" style={{marginLeft:'20px'}}><div className="pixel"></div><div className="pixel"></div></div>
          </div>
          
          <h1 className="footer-huge-text">New Genre</h1>
        </div>

        <div className="copyright">
          © 2021 - 2025 New Genre, Inc. All Rights Reserved
        </div>
      </div>
    </div>
    </footer>
  );
};