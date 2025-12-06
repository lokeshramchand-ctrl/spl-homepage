import { ArrowRight } from 'lucide-react';

export default function StatsSection() {
  return (
    <div className="stats-section">
      <div className="container">
        <div className="stats-intro-grid">
          <div>
            <h2 className="section-title">
              How can we help <br /> your business
            </h2>
          </div>
          <div>
            <p className="text-muted">
             SPL Systems has been at the forefront of digital transformation for over 10 years, delivering innovative software solutions that drive business growth and operational efficiency.
            </p>
            <p className="text-muted">
             Our expertise spans from comprehensive examination management systems to complex digitization projects, ensuring quality and confidentiality in every engagement.
            </p>
            {/* <button className="btn btn-link">
              Learn More <ArrowRight size={16} style={{marginLeft:'0.5rem'}} />
            </button> */}
          </div>
        </div>

        <div className="stats-cards">
          {[
            { value: '10+', label: 'Years of Experience' },
            { value: '200+', label: 'Projects Delivered' },
            { value: '99%', label: 'Client Satisfaction' }
          ].map((stat, idx) => (
            <div key={idx} className="stat-card">
              <div className="stat-value">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}