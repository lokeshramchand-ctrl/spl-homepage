"use client";

import React, { useState } from 'react';
import { 
  Menu, 
  X, 
  ArrowRight, 
  BarChart3, 
  Zap, 
  BrainCircuit, 
  MessageSquare, 
  ChevronDown, 
  ChevronUp,
  Star,
  Users
} from 'lucide-react';

// --- CSS Styles (Vanilla CSS) ---
const styles = `
  :root {
    --bg-dark: #09090b;
    --bg-card: #18181b;
    --bg-card-hover: #27272a;
    --text-primary: #ffffff;
    --text-secondary: #a1a1aa;
    --accent-teal: #14b8a6;
    --accent-blue: #3b82f6;
    --border-color: #27272a;
    --font-sans: system-ui, -apple-system, sans-serif;
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: var(--font-sans);
    background-color: #fafafa;
    color: #18181b;
    line-height: 1.5;
  }

  /* Utilities */
  .container {
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 1rem;
  }

  .btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0.75rem 1.5rem;
    border-radius: 9999px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
    border: none;
    font-size: 1rem;
  }

  .btn-primary {
    background-color: #fff;
    color: #09090b;
  }

  .btn-primary:hover {
    background-color: #e4e4e7;
  }

  .btn-link {
    background: none;
    color: #18181b;
    padding: 0;
    font-weight: 600;
  }

  .btn-link:hover {
    gap: 0.75rem;
  }

  .section-padding {
    padding: 6rem 0;
  }

  /* Navigation */
  .navbar {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 1000;
    background-color: rgba(0, 0, 0, 0.8);
    backdrop-filter: blur(12px);
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }

  .nav-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 80px;
  }

  .logo {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: white;
    font-weight: 700;
    font-size: 1.25rem;
    cursor: pointer;
  }

  .nav-links {
    display: none;
  }

  .nav-links a {
    color: #d4d4d8;
    text-decoration: none;
    padding: 0.5rem 0.75rem;
    border-radius: 0.375rem;
    font-size: 0.875rem;
    font-weight: 500;
    transition: color 0.2s;
  }

  .nav-links a:hover, .nav-links a.active {
    color: var(--accent-teal);
  }

  .mobile-menu-btn {
    background: none;
    border: none;
    color: #a1a1aa;
    cursor: pointer;
    display: flex;
  }

  @media (min-width: 768px) {
    .nav-links {
      display: flex;
      gap: 2rem;
    }
    .mobile-menu-btn {
      display: none;
    }
  }

  /* Hero Section */
  .hero {
    background-color: var(--bg-dark);
    padding-top: 8rem;
    padding-bottom: 5rem;
    position: relative;
    overflow: hidden;
    color: white;
  }

  .hero-bg-glow {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    height: 100%;
    pointer-events: none;
  }

  .glow-blob {
    position: absolute;
    border-radius: 50%;
    filter: blur(100px);
    opacity: 0.2;
    width: 24rem;
    height: 24rem;
  }
  .glow-1 { background-color: var(--accent-teal); top: 5rem; left: 2rem; }
  .glow-2 { background-color: var(--accent-blue); top: 10rem; right: 2rem; }

  .hero-content {
    position: relative;
    text-align: center;
    max-width: 800px;
    margin: 0 auto;
  }

  @media (min-width: 1024px) {
    .hero-content {
      text-align: left;
      margin: 0;
    }
    .hero {
      padding-top: 12rem;
      padding-bottom: 8rem;
    }
  }

  .badge {
    display: inline-flex;
    align-items: center;
    padding: 0.25rem 0.75rem;
    background: rgba(39, 39, 42, 0.5);
    border: 1px solid #3f3f46;
    border-radius: 9999px;
    font-size: 0.875rem;
    color: #d4d4d8;
    margin-bottom: 2rem;
    backdrop-filter: blur(4px);
  }

  .badge-dot {
    width: 0.5rem;
    height: 0.5rem;
    background-color: var(--accent-teal);
    border-radius: 50%;
    margin-right: 0.5rem;
  }

  .hero-title {
    font-size: 3rem;
    font-weight: 800;
    line-height: 1.1;
    margin-bottom: 1.5rem;
  }

  @media (min-width: 768px) {
    .hero-title { font-size: 3.75rem; }
  }
  @media (min-width: 1024px) {
    .hero-title { font-size: 4.5rem; }
  }

  .text-gradient {
    background: linear-gradient(to right, var(--accent-teal), var(--accent-blue));
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }

  .hero-desc {
    font-size: 1.125rem;
    color: #a1a1aa;
    margin-bottom: 2.5rem;
    line-height: 1.75;
    max-width: 40rem;
  }

  .hero-actions {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: center;
  }

  @media (min-width: 640px) {
    .hero-actions {
      flex-direction: row;
      justify-content: center;
    }
  }
  @media (min-width: 1024px) {
    .hero-actions {
      justify-content: flex-start;
    }
  }

  .trust-badge {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.5rem 1.5rem;
  }

  .avatars {
    display: flex;
  }

  .avatar {
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    background-color: #3f3f46;
    border: 2px solid var(--bg-dark);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: -0.5rem;
    color: white;
    font-size: 0.75rem;
  }
  .avatar:first-child { margin-left: 0; }

  .rating-stars {
    display: flex;
    color: #eab308;
    font-size: 0.75rem;
  }

  .rating-text {
    font-size: 0.75rem;
    color: #a1a1aa;
    display: flex;
    flex-direction: column;
  }

  /* Stats Section */
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
  }

  /* Features Section */
  .features-section {
    background-color: #fafafa;
    padding: 6rem 0;
  }

  .features-header {
    text-align: center;
    max-width: 42rem;
    margin: 0 auto 4rem auto;
  }

  .features-grid {
    display: grid;
    gap: 1.5rem;
    grid-template-columns: 1fr;
  }

  @media (min-width: 768px) {
    .features-grid { grid-template-columns: repeat(2, 1fr); }
  }
  @media (min-width: 1024px) {
    .features-grid { grid-template-columns: repeat(4, 1fr); }
  }

  .feature-card {
    background: white;
    padding: 1.5rem;
    border-radius: 1rem;
    border: 1px solid #f4f4f5;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    transition: box-shadow 0.2s;
  }

  .feature-card:hover {
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  }

  .feature-icon-wrapper {
    width: 3rem;
    height: 3rem;
    border-radius: 0.75rem;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1.5rem;
  }

  .bg-pink { background-color: #fdf2f8; color: #ec4899; }
  .bg-green { background-color: #f0fdf4; color: #22c55e; }
  .bg-blue { background-color: #eff6ff; color: #3b82f6; }
  .bg-purple { background-color: #faf5ff; color: #a855f7; }

  .feature-title {
    font-size: 1.125rem;
    font-weight: 600;
    color: #18181b;
    margin-bottom: 0.75rem;
  }

  /* Industries Section */
  .industries-section {
    background-color: #18181b;
    padding: 6rem 0;
    position: relative;
    overflow: hidden;
    text-align: center;
  }

  .industries-bg {
    position: absolute;
    inset: 0;
    background-image: url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop');
    background-size: cover;
    background-position: center;
    opacity: 0.1;
  }

  .industries-content {
    position: relative;
    z-index: 10;
  }

  .industry-list {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    max-width: 42rem;
    margin: 3rem auto 0 auto;
  }

  .industry-item {
    font-size: 1.5rem;
    font-weight: 500;
    cursor: pointer;
    transition: color 0.2s;
    color: #52525b;
  }

  .industry-item:hover { color: #d4d4d8; }
  .industry-item.active { color: white; }

  @media (min-width: 768px) {
    .industry-item { font-size: 1.875rem; }
  }

  /* FAQ Section */
  .faq-section {
    background: white;
    padding: 6rem 0;
  }

  .faq-grid {
    display: grid;
    gap: 4rem;
  }

  @media (min-width: 1024px) {
    .faq-grid { grid-template-columns: 1fr 1fr; }
  }

  .faq-item {
    border-bottom: 1px solid #e4e4e7;
    padding-bottom: 1rem;
    margin-bottom: 1rem;
  }

  .faq-button {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-align: left;
    background: none;
    border: none;
    cursor: pointer;
    font-size: 1rem;
    font-weight: 500;
    color: #18181b;
  }

  .faq-answer {
    margin-top: 0.5rem;
    font-size: 0.875rem;
    color: #71717a;
    line-height: 1.6;
    animation: fadeIn 0.3s ease-in;
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-5px); }
    to { opacity: 1; transform: translateY(0); }
  }

  /* Footer */
  .footer {
    background-color: #09090b;
    color: white;
    padding-top: 5rem;
    padding-bottom: 2.5rem;
  }

  .footer-cta {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 5rem;
    gap: 1.5rem;
  }

  @media (min-width: 768px) {
    .footer-cta {
      flex-direction: row;
      align-items: center;
    }
  }

  .footer-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
    border-top: 1px solid #27272a;
    padding-top: 2.5rem;
    margin-bottom: 4rem;
  }

  @media (min-width: 768px) {
    .footer-grid { grid-template-columns: repeat(4, 1fr); }
  }

  .footer-col h3 {
    font-size: 0.875rem;
    font-weight: 600;
    color: #d4d4d8;
    margin-bottom: 1rem;
  }

  .footer-col ul {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .footer-col a {
    color: #71717a;
    text-decoration: none;
    font-size: 0.875rem;
    transition: color 0.2s;
  }

  .footer-col a:hover { color: white; }

  .footer-bottom {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid #18181b;
    padding-top: 2rem;
    gap: 1rem;
  }

  @media (min-width: 768px) {
    .footer-bottom { flex-direction: row; }
  }

  .footer-links {
    display: flex;
    gap: 1.5rem;
    font-size: 0.75rem;
    color: #52525b;
  }
`;

// --- Components ---

const Navigation = ({ activePage, navigateTo }: { activePage: string, navigateTo: (page: string) => void }) => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Home', id: 'home' },
    { name: 'About', id: 'about' },
    { name: 'Services', id: 'services' },
    { name: 'Blog', id: 'blog' },
    { name: 'Contact', id: 'contact' },
  ];

  return (
    <nav className="navbar">
      <div className="container">
        <div className="nav-content">
          <div className="logo" onClick={() => navigateTo('home')}>
            <Star size={32} fill="white" />
            <span>AutoBiz.ai</span>
          </div>

          <div className="nav-links">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={`#${link.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  navigateTo(link.id);
                }}
                className={activePage === link.id ? 'active' : ''}
              >
                {link.name}
              </a>
            ))}
          </div>

          <button className="mobile-menu-btn" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu inline style for simplicity in Vanilla */}
      {isOpen && (
        <div style={{ backgroundColor: '#18181b', padding: '1rem', borderTop: '1px solid #27272a' }} className="md:hidden">
           {navLinks.map((link) => (
              <a
                key={link.name}
                href={`#${link.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  navigateTo(link.id);
                  setIsOpen(false);
                }}
                style={{ display: 'block', padding: '0.75rem', color: activePage === link.id ? '#14b8a6' : '#d4d4d8', textDecoration: 'none' }}
              >
                {link.name}
              </a>
            ))}
        </div>
      )}
    </nav>
  );
};

const Hero = () => {
  return (
    <div className="hero">
      <div className="hero-bg-glow">
        <div className="glow-blob glow-1"></div>
        <div className="glow-blob glow-2"></div>
      </div>

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
};

const StatsSection = () => {
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
};

const Features = () => {
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
};

const Industries = () => {
  return (
    <div className="industries-section">
      <div className="industries-bg"></div>
      <div className="container industries-content">
        <h2 className="section-title" style={{color: 'white', marginBottom: '0.5rem'}}>What Industries</h2>
        <h2 className="section-title" style={{color: '#a1a1aa'}}>We Served</h2>

        <div className="industry-list">
          {['Logistics & Transportation', 'Food & Beverage', 'Agriculture & Plantation', 'Design & Creative', 'Information Technology'].map((item, idx) => (
            <div 
              key={idx} 
              className={`industry-item ${idx === 0 ? 'active' : ''}`}
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    { q: "What is the AutoBiz.ai?", a: "AutoBiz.ai is an innovative AI solution designed to assist your business in achieving significant growth." },
    { q: "How does Walawe work?", a: "Walawe works by integrating seamlessly with your existing data stack, analyzing patterns, and providing actionable insights." },
    { q: "Can Walawe improve customer service?", a: "Absolutely. Our AI chatbots and customer insight tools help you respond faster and more accurately to customer needs." },
    { q: "How can Walawe find new opportunities?", a: "By analyzing market trends and your internal data, our AI identifies gaps and potential areas for expansion." },
    { q: "What benefits does Walawe offer businesses?", a: "Increased efficiency, reduced operational costs, 24/7 customer support via AI, and data-driven strategic planning." }
  ];

  return (
    <div className="faq-section">
      <div className="container">
        <div className="faq-grid">
          <div>
            <h2 className="section-title">Frequently<br />Asked Question</h2>
            <p className="text-muted">Here are some frequently asked questions with answers to clarify doubts.</p>
          </div>
          <div>
            {faqs.map((faq, idx) => (
              <div key={idx} className="faq-item">
                <button 
                  className="faq-button"
                  onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                >
                  <span>{faq.q}</span>
                  {openIndex === idx ? <ChevronUp size={20} color="#a1a1aa" /> : <ChevronDown size={20} color="#a1a1aa" />}
                </button>
                {openIndex === idx && (
                  <div className="faq-answer">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const Footer = () => {
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
};

// --- Page Components ---

const HomePage = () => (
  <>
    <Hero />
    <StatsSection />
    <Features />
    <Industries />
    <FAQ />
  </>
);

const PlaceholderPage = ({ title }: { title: string }) => (
  <div style={{minHeight:'100vh', paddingTop:'10rem', textAlign:'center', backgroundColor:'#fafafa'}}>
    <div className="container">
      <h1 style={{fontSize:'2.5rem', fontWeight:'bold', color:'#18181b', marginBottom:'1rem'}}>{title}</h1>
      <p style={{color:'#52525b'}}>This is a placeholder for the {title} page.</p>
    </div>
  </div>
);

// --- Main App Component ---

export default function App() {
  const [activePage, setActivePage] = useState('home');

  const renderPage = () => {
    switch(activePage) {
      case 'home': return <HomePage />;
      case 'about': return <PlaceholderPage title="About Us" />;
      case 'services': return <PlaceholderPage title="Services" />;
      case 'blog': return <PlaceholderPage title="Blog" />;
      case 'contact': return <PlaceholderPage title="Contact" />;
      default: return <HomePage />;
    }
  };

  return (
    <>
      <style>{styles}</style>
      <div>
        <Navigation activePage={activePage} navigateTo={setActivePage} />
        <main>
          {renderPage()}
        </main>
        <Footer />
      </div>
    </>
  );
}