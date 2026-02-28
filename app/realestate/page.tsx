'use client';

import type { StaticImageData } from 'next/image';
import { useTheme } from 'next-themes';

// Import GIFs and images
import firstAnimation from '../assets/Gifs/AI-RealEstate/first animation.gif';
import mainpage from '../assets/Gifs/AI-RealEstate/mainpage.gif';
import leftsidebar from '../assets/Gifs/AI-RealEstate/leftsidebar.gif';
import rightsidebar from '../assets/Gifs/AI-RealEstate/rightsidebar.gif';
import darkmode from '../assets/Gifs/AI-RealEstate/darkmode.png';
import lightmode from '../assets/Gifs/AI-RealEstate/lightmode.png';

interface ImageBlockProps {
  caption: string;
  imageAlt: string;
  imageSrc: StaticImageData;
}

const portfolioBlocks: ImageBlockProps[] = [
  { 
    caption: "MULTIMODAL SEARCH WITH THE ABILITY TO GIVE FOLLOW-UP QUERIES", 
    imageAlt: "Multimodal search animation",
    imageSrc: firstAnimation
  },
  { 
    caption: "MAIN PAGE WITH REAL ESTATE LISTINGS AND SEARCH INTERFACE", 
    imageAlt: "Main page interface",
    imageSrc: mainpage
  },
  { 
    caption: "LEFT SIDEBAR NAVIGATION AND FILTER OPTIONS", 
    imageAlt: "Left sidebar navigation",
    imageSrc: leftsidebar
  },
  { 
    caption: "RIGHT SIDEBAR WITH PROPERTY DETAILS AND PREFERENCES", 
    imageAlt: "Right sidebar details",
    imageSrc: rightsidebar
  },
];

export default function ProjectPage() {
  const { resolvedTheme } = useTheme();
  const heroPreview = resolvedTheme === 'light' ? lightmode : darkmode;

  return (
    <>
      <div className="container">

        {/* Hero Section */}
        <section className="hero">
          <div className="heroLogo">
            <div className="heroPreviewWrap">
              <img
                src={heroPreview.src}
                alt={resolvedTheme === 'light' ? 'Real estate light mode preview' : 'Real estate dark mode preview'}
                className="heroPreview"
                loading="eager"
                decoding="sync"
              />
            </div>
          </div>
        </section>

        {/* Main Content Area */}
        <main className="mainContent">
          <div className="layoutGrid">
            
            {/* Left Sidebar */}
            <aside className="sidebar">
              <h1 className="projectTitle">Brain Technologies</h1>
              <p className="projectSubtitle">MULTIMODAL INTERACTION</p>
            </aside>

            {/* Right Content */}
            <div className="content">
              {/* Project Description */}
              <div className="descriptionBlock">
                <p className="descriptionText">
                  For 2 years, I prototyped new ways to engage with computer interfaces, 
                  mostly working with voice and AI. Brain was one of the first companies 
                  to explore the idea of multimodal, generative interfaces. My time working 
                  with the team has shaped many of the principles I design with now. 
                  Most of my work stayed in R&D but pieces of it have shipped and are now in the app store.
                </p>
                
                <div className="metaGrid">
                  <div className="metaItem">
                    <h4>ROLE</h4>
                    <p>Design Consultant</p>
                  </div>
                  <div className="metaItem">
                    <h4>COLLABORATORS</h4>
                    <p>Jerry Yue (CEO)<br/>Gleb Kuznetsov</p>
                  </div>
                  <div className="metaItem">
                    <h4>DURATION</h4>
                    <p>2020-2021</p>
                  </div>
                  <div className="metaItem">
                    <h4>TOOLS</h4>
                    <p>Figma<br/>Origami Studio</p>
                  </div>
                </div>

                <div className="actionLinks">
                  <a href="#" className="linkButton">MAIN WEBSITE <span className="arrow">›</span></a>
                  <a href="#" className="linkButton">NATURAL AI APP <span className="arrow">›</span></a>
                </div>
              </div>

              {/* Image Blocks */}
              <div className="imageGallery">
                {portfolioBlocks.map((block, index) => (
                  <div key={index} className="imageBlock">
                    <div className="imagePlaceholder">
                      <img
                        src={block.imageSrc.src}
                        alt={block.imageAlt}
                        className="projectImage"
                        loading="eager"
                        decoding="sync"
                      />
                    </div>
                    <p className="caption">{block.caption}</p>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </main>
      </div>


      {/* Embedded Vanilla CSS */}
      <style>{`
        /* Base container */
        .container {
          min-height: 100vh;
          background-color: var(--bg-main);
          color: var(--text-primary);
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
          padding-top: 80px; /* Account for fixed navbar */
          transition: background-color 0.4s ease, color 0.4s ease;
        }

        /* Header */
        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem 2rem;
          background-color: var(--bg-card);
          font-size: 0.85rem;
          border-bottom: 1px solid var(--border-color);
        }

        .headerCenter {
          display: flex;
          gap: 2rem;
          color: var(--text-secondary);
        }

        .closeButton {
          background: none;
          border: none;
          color: var(--text-primary);
          font-size: 1.2rem;
          cursor: pointer;
        }

        /* Hero Section */
        .hero {
          background: linear-gradient(180deg, var(--bg-card) 0%, var(--bg-main) 100%);
          min-height: 40vh;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 3rem 2rem;
          margin: 0;
        }

        .heroPreviewWrap {
          display: none;
          width: min(100%, 1080px);
          border: 1px solid var(--border-color);
          border-radius: 12px;
          overflow: hidden;
          background: var(--bg-card);
        }

        .heroPreview {
          width: 100%;
          height: auto;
          display: block;
          object-fit: cover;
        }

        /* Layout Grid */
        .mainContent {
          padding: 2rem 2rem 0 2rem;
          max-width: 1400px;
          margin: 0 auto;
        }

        .layoutGrid {
          display: grid;
          grid-template-columns: 250px 1fr;
          gap: 3rem;
        }

        /* Sidebar */
        .sidebar {
          position: sticky;
          top: 100px;
        }

        .projectTitle {
          font-size: 1rem;
          font-weight: 500;
          margin: 0 0 0.25rem 0;
          color: var(--text-primary);
        }

        .projectSubtitle {
          font-size: 0.75rem;
          color: var(--text-secondary);
          letter-spacing: 0.05em;
          margin: 0;
        }

        /* Content Area */
        .descriptionBlock {
          margin-bottom: 3rem;
        }

        .descriptionText {
          font-size: 1.1rem;
          line-height: 1.6;
          max-width: 900px;
          margin-bottom: 2.5rem;
          color: var(--text-secondary);
        }

        .metaGrid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 2rem;
          margin-bottom: 2.5rem;
          font-size: 0.85rem;
        }

        .metaItem h4 {
          font-size: 0.7rem;
          color: var(--text-muted);
          letter-spacing: 0.05em;
          margin: 0 0 0.5rem 0;
          text-transform: uppercase;
        }

        .metaItem p {
          margin: 0;
          line-height: 1.4;
          color: var(--text-primary);
        }

        /* Action Links */
        .actionLinks {
          display: flex;
          gap: 1px;
          background-color: var(--border-color);
        }

        .linkButton {
          flex: 1;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.5rem 2rem;
          background-color: var(--bg-card);
          color: var(--text-primary);
          text-decoration: none;
          font-size: 0.85rem;
          letter-spacing: 0.05em;
          transition: background-color 0.2s ease;
        }

        .linkButton:hover {
          background-color: var(--bg-card-hover);
        }

        .arrow {
          font-size: 1.2rem;
          color: var(--text-secondary);
        }

        /* Image Gallery */
        .imageGallery {
          display: flex;
          flex-direction: column;
          gap: 3rem;
          padding-bottom: 4rem;
        }

        .imageBlock {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .imagePlaceholder {
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          border-radius: 8px;
          width: 100%;
          overflow: hidden;
          transition: border-color 0.3s ease, box-shadow 0.3s ease;
          position: relative;
        }

        .imagePlaceholder:hover {
          border-color: var(--text-secondary);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
        }

        .projectImage {
          width: 100%;
          height: auto;
          display: block;
          object-fit: cover;
        }

        .caption {
          font-size: 0.75rem;
          color: var(--text-secondary);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin: 0;
          padding: 0 0.5rem;
        }

        /* Responsive adjustments */
        @media (max-width: 1024px) {
          .layoutGrid {
            grid-template-columns: 1fr;
          }
          
          .sidebar {
            position: static;
            margin-bottom: 2rem;
          }
          
          .metaGrid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (min-width: 1025px) {
          .heroPreviewWrap {
            display: block;
          }
        }

        @media (max-width: 600px) {
          .headerCenter {
            display: none; /* Hide on mobile to save space */
          }

          .metaGrid {
            grid-template-columns: 1fr;
          }
          
          .actionLinks {
            flex-direction: column;
          }
        }
      `}</style>
    </>
  );
}