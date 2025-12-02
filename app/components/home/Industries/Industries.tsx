"use client";

import { useEffect } from "react";
import { initMenuHover } from "./Industries_GSAP";

export default function Industries() {

  useEffect(() => {
    initMenuHover();
  }, []);

  return (
    <>
      <section className="cloneable">
    <div className="out">
    <div className="page">
      <div className="main">
        <div className="main-col">
          <div className="main-img__list">
            <div className="main-img__item"><img src="https://cdn.prod.website-files.com/67684bfc3496e563bea11dc0/676882d4c39ce9e70bcb9745_tobias-reich-AwqQch2wAmM-unsplash.avif" loading="lazy"  alt="" className="image"/></div>
            <div className="main-img__item"><img src="https://cdn.prod.website-files.com/67684bfc3496e563bea11dc0/676882d4fad20ba1fac1a107_massimiliano-morosinotto-oJmVzkVStoo-unsplash.avif" loading="lazy" sizes="224px"  alt="" className="image"/></div>
            <div className="main-img__item"><img src="https://cdn.prod.website-files.com/67684bfc3496e563bea11dc0/676882d4244a70cbb10a6403_karsten-winegeart-9CTqIV6kPQ0-unsplash.avif" loading="lazy" sizes="224px" alt="" className="image"/></div>
            <div className="main-img__item"><img src="https://cdn.prod.website-files.com/67684bfc3496e563bea11dc0/676882d4be32396ee62f4946_lucas-marcomini-cVBz9q1T_9M-unsplash.avif" loading="lazy" sizes="224px" alt="" className="image"/></div>
            <div className="main-img__item"><img src="https://cdn.prod.website-files.com/67684bfc3496e563bea11dc0/676882d42880b4fc111df2bc_sergey-pesterev-i-P1lmY_e1w-unsplash.avif" loading="lazy" alt="" className="image"/></div>
          </div>
        </div>
        <div  className="main-col">
          <ul className="main-title__list">
            <li className="main-title__item"><button className="button">
                <h2 className="main-title">Eclipse Lodge</h2>
              </button></li>
            <li className="main-title__item"><button className="button">
                <h2 className="main-title">Serenity Peaks</h2>
              </button></li>
            <li className="main-title__item"><button className="button">
                <h2 className="main-title">The Celestial Inn</h2>
              </button></li>
            <li className="main-title__item"><button className="button">
                <h2 className="main-title">Aurora Heights Hotel</h2>
              </button></li>
            <li className="main-title__item"><button className="button">
                <h2 className="main-title">Golden Sands Retreat</h2>
              </button></li>
          </ul>
        </div>
      </div>
      <div className="overlay-wrap">
        <div className="overlay-item">
          <div className="overlay-hero">
            <div data-overlay="text-target" className="overlay-title__wrap"></div>
            <div data-overlay="img-target" className="overlay-img__wrap"></div>
          </div>
          <div className="overlay-row">
              <div className="overlay-col col-left">
                <div className="overlay-col__img"><img src="https://cdn.prod.website-files.com/67684bfc3496e563bea11dc0/676882d42e09d4366787f302_tobias-reich-VltYe88rkt8-unsplash.avif" loading="lazy" alt="" className  ="image"/></div>
            </div>
            <div className="overlay-col col-right"> 
              <div className="overlay-col__img"><img src="https://cdn.prod.website-files.com/67684bfc3496e563bea11dc0/676882d41f2900efdbe4c20d_tobias-reich-wr6m4OOZZtw-unsplash.avif" loading="lazy" alt="" className="image"/></div>
              <p className="paragraph">A sophisticated getaway with modern architecture and unforgettable sunsets, where every moment feels timeless.</p>
            </div>
          </div>
        </div>
        <div className="overlay-item">
          <div className="overlay-hero">
            <div data-overlay="text-target" className="overlay-title__wrap"></div>
            <div data-overlay="img-target" className="overlay-img__wrap"></div>
          </div>
          <div className="overlay-row">
            <div className="overlay-col col-left">
              <div className="overlay-col__img"><img src="https://cdn.prod.website-files.com/67684bfc3496e563bea11dc0/6768a24ba580bdb31f092521_eberhard-grossgasteiger-UclnVUmf5aQ-unsplash.jpg" loading="lazy" alt="" className="image"/></div>
            </div>
            <div className="overlay-col col-right">
              <div className="overlay-col__img"><img src="https://cdn.prod.website-files.com/67684bfc3496e563bea11dc0/6768a2c0717640eb150afb88_filippo-fFh53mf_6iE-unsplash.jpg" loading="lazy" alt="" className="image"/></div>
              <p className="paragraph">Tucked among towering peaks and serene valleys, this haven offers a peaceful escape from the noise of the world.</p>
            </div>
          </div>
        </div>
        <div className="overlay-item">
          <div className="overlay-hero">
            <div data-overlay="text-target" className="overlay-title__wrap"></div>
            <div data-overlay="img-target" className="overlay-img__wrap"></div>
          </div>
          <div className="overlay-row">
            <div className="overlay-col col-left">
              <div className="overlay-col__img"><img src="https://cdn.prod.website-files.com/67684bfc3496e563bea11dc0/6768b1abc8db3718aca6b42a_karsten-winegeart-VTzcKDm7Sug-unsplash.jpg" loading="lazy" alt="" className="image"/></div>
            </div>
            <div className="overlay-col col-right">
              <div className="overlay-col__img"><img src="https://cdn.prod.website-files.com/67684bfc3496e563bea11dc0/6768b1fbdc6bc1ff5504e024_karsten-winegeart-EqMRa0cgEiI-unsplash.jpg" loading="lazy" alt="" className="image"/></div>
              <p className="paragraph">A sanctuary above the clouds, offering celestial views and unmatched tranquility for dreamers and stargazers alike.</p>
            </div>
          </div>
        </div>
        <div className="overlay-item">
          <div className="overlay-hero">
            <div data-overlay="text-target" className="overlay-title__wrap"></div>
            <div data-overlay="img-target" className="overlay-img__wrap"></div>
          </div>
          <div className="overlay-row">
            <div className="overlay-col col-left">
              <div className="overlay-col__img"><img src="https://cdn.prod.website-files.com/67684bfc3496e563bea11dc0/6768b1aba580bdb31f116524_lisha-riabinina-08P8Hzja_Yk-unsplash.jpg" loading="lazy" alt="" className="image"/></div>
            </div>
            <div className="overlay-col col-right">
              <div className="overlay-col__img"><img src="https://cdn.prod.website-files.com/67684bfc3496e563bea11dc0/6768b1abc8db3718aca6b405_laszlo-bajnoczi-tThY14QmOYE-unsplash.jpg" loading="lazy" alt="" className="image"/></div>
              <p className="paragraph">Nestled in the heart of nature, this retreat is the perfect place to watch the northern lights dance across the sky.</p>
            </div>
          </div>
        </div>
        <div className="overlay-item">
          <div className="overlay-hero">
            <div data-overlay="text-target" className="overlay-title__wrap"></div>
            <div data-overlay="img-target" className="overlay-img__wrap"></div>
          </div>
          <div className="overlay-row">
            <div className="overlay-col col-left">
              <div className="overlay-col__img"><img src="https://cdn.prod.website-files.com/67684bfc3496e563bea11dc0/6768b1ab95b4aee14bc0aadf_toa-heftiba-hi0Fml1Xj_E-unsplash.jpg" loading="lazy" alt="" className="image"/></div>
            </div>
            <div className="overlay-col col-right">
              <div className="overlay-col__img"><img src="https://cdn.prod.website-files.com/67684bfc3496e563bea11dc0/6768b1ab27d120c7e32f8578_maria-orlova-b37mDyPzdJM-unsplash.jpg" loading="lazy"  alt="" className="image"/></div>
              <p className="paragraph">Feel the warmth of the sun and the embrace of golden shores, where luxury meets the serenity of the sea.</p>
            </div>
          </div>
        </div>
        <div className="overlay-nav"><button data-overlay="close" className="button text">
            <p data-overlay="nav-item" className="text-reg">Back to list</p>
          </button>
          <p data-overlay="nav-item" className="text-reg">Scroll to explore</p>
        </div>
      </div>
    </div>
    </div>
  </section>
    </>
  );
}
