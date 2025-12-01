import { BarChart3, Zap, BrainCircuit, MessageSquare } from 'lucide-react';

export default function Features() {
  const features = [
    {
      icon: <BarChart3 size={24} />,
      bgClass: "bg-pink",
      title: "Data Analytics Deep Insights",
      desc: "Our team offers data analytics and insights for your business. We use tools to turn raw data into strategies."
    },
    {
      icon: <Zap size={24} />,
      bgClass: "bg-green",
      title: "Product Innovation",
      desc: "Our team offers data analytics and insights for your business. We use tools to turn raw data into strategies."
    },
    {
      icon: <BrainCircuit size={24} />,
      bgClass: "bg-blue",
      title: "AI Strategy Pro Consulting",
      desc: "Our team offers data analytics and insights for your business. We use tools to turn raw data into strategies."
    },
    {
      icon: <MessageSquare size={24} />,
      bgClass: "bg-purple",
      title: "Consultation AI Chatbots",
      desc: "Our team offers data analytics and insights for your business. We use tools to turn raw data into strategies."
    }
  ];

  return (
    <div className="features-section">
      <div className="container">
        <div className="features-header">
          <h2 className="section-title">AI-Powered Growth Bots</h2>
          <p className="text-muted">Harnessing the Power of AI for Unmatched Business Precision and Efficiency</p>
        </div>

        <div className="features-grid">
          {features.map((feature, idx) => (
            <div key={idx} className="feature-card">
              <div className={`feature-icon-wrapper ${feature.bgClass}`}>
                {feature.icon}
              </div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="text-muted" style={{fontSize: '0.875rem'}}>{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}