import { ArrowRight } from 'lucide-react';
const styles = `
.stats-section {
  background: white;
  padding: 6rem 0;
}

.stats-intro-grid {
  display: grid;
  gap: 4rem;
}

@media (min-width: 1024px) {
  .stats-intro-grid {
    grid-template-columns: 1fr 1fr;
  }
}

.section-title {
  font-size: 2.25rem;
  font-weight: 700;
  color: #18181b;
  line-height: 1.2;
  margin-bottom: 1.5rem;
  text-align: left;
}

.text-muted {
  color: #52525b;
  line-height: 1.75;
  margin-bottom: 1.5rem;
}

.stats-cards {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  margin-top: 5rem;
  padding-top: 2.5rem;
  border-top: 1px solid #e4e4e7;
}

@media (min-width: 768px) {
  .stats-cards {
    grid-template-columns: repeat(3, 1fr);
  }
}

.stat-card {
  padding: 1rem;
}

.stat-value {
  font-size: 2.25rem;
  font-weight: 700;
  color: #18181b;
  margin-bottom: 0.5rem;
}

.stat-label {
  font-size: 0.875rem;
  color: #71717a;
  line-height: 1.5;
  text-align: left;
}

`;
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