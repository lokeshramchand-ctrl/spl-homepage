import { Users, Star } from 'lucide-react';

export default function Hero() {
  return (
    <div className="hero">
      <div className="container">
        <div className="hero-content">
          <div className="badge">
            <span className="badge-dot"></span>
            Top AI for Grow Business
          </div>
          
          <h1 className="hero-title">
            Automate & <br />
            <span className="text-gradient">
              manage your business
            </span> <br />
            with ease
          </h1>
          
          <p className="hero-desc">
            Discover cutting-edge AI solutions designed to elevate your business to new heights and drive sustainable growth in today's competitive landscape.
          </p>
          
          <div className="hero-actions">
            <button className="btn btn-primary">
              Free Consultation
            </button>
            
            <div className="trust-badge">
              <div className="avatars">
                {[1,2,3].map(i => (
                  <div key={i} className="avatar">
                    <Users size={12}/>
                  </div>
                ))}
              </div>
              <div className="rating-text">
                <div className="rating-stars">
                  {[1,2,3,4,5].map(i => <Star key={i} size={12} fill="currentColor" />)}
                </div>
                <span>4.8 Trust Score</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}