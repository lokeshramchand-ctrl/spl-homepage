export default function Industries() {
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
}