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
              At AutoBiz, we warmly invite you to arrange an in-depth consultation designed to thoroughly examine the intricacies of your business.
            </p>
            <p className="text-muted">
              Our team of highly experienced professionals is committed to delivering tailored advice that addresses your distinct needs and ambitions.
            </p>
            <button className="btn btn-link">
              Learn More <ArrowRight size={16} style={{marginLeft:'0.5rem'}} />
            </button>
          </div>
        </div>

        <div className="stats-cards">
          {[
            { value: '100%', label: 'Strategies for Business Growth and Market Expansion' },
            { value: '90%', label: 'Global Corporations and Multinational Enterprises' },
            { value: '10k', label: 'Companies collaborate to achieve goals and innovate' }
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