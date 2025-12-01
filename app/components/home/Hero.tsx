import { Users, Star } from 'lucide-react';

export default function Hero() {
  return (
    <div className="hero">
      <div className="container">
        <div className="hero-content">     
          <h1 className="hero-title" id="heroText">
           SPL Systems is a custom software studio engineering applications for tomorrow’s enterprises.<br />
          </h1>
          
          <p className="hero-desc">
            Discover cutting-edge AI solutions designed to elevate your business to new heights and drive sustainable growth in today's competitive landscape.
          </p>
          
          <div className="hero-actions">
            <button className="btn btn-primary">
              Our Work
            </button>
            
            
          </div>
        </div>
      </div>
    </div>
  );
}