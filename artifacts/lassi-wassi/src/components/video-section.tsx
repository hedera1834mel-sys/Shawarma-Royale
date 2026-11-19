import { ArrowRight } from 'lucide-react';

export default function VideoSection() {
  return (
    <section className="video-spotlight-section" id="video" aria-labelledby="video-spotlight-title" data-reveal>
      <div className="section-wrap video-spotlight-wrap">
        {/* Left Side: Brand Story & Craft Context */}
        <div className="video-spotlight-text">
          <span className="eyebrow">
            The Craft In Motion
          </span>
          <h2 className="section-title" id="video-spotlight-title">
            Slow grilled. <em>Carved to perfection.</em>
          </h2>
          <p className="video-spotlight-copy">
            Watch the spit turn, the spices sizzle, and the tender cuts carved fresh for every order. Since 2014, our craft has been about one thing, flavour that doesn't compromise.
          </p>

          <div className="video-feature-list">
            <div className="video-feature-item">
              <span className="feature-bullet">•</span>
              <div>
                <strong>Authentic Spit Roasting</strong>
                <p>Marinated for 12 hours with authentic Mediterranean spice blend</p>
              </div>
            </div>
            <div className="video-feature-item">
              <span className="feature-bullet">•</span>
              <div>
                <strong>Carved Fresh to Order</strong>
                <p>Juicy, piping hot and served in soft Khubz with garlic toum</p>
              </div>
            </div>
          </div>

          <div className="video-cta-group">
            <a className="button-primary" href="/menu" data-testid="video-menu-cta">
              Explore Our Menu <ArrowRight size={15} />
            </a>
            <a className="button-outline" href="#outlets" data-testid="video-outlets-cta">
              Find Nearest Outlet
            </a>
          </div>
        </div>

        {/* Right Side: Responsive Media Frame (Compact, Balanced with Burger Visual) */}
        <div className="video-player-container">
          <div className="video-frame-outer">
            <img
              src="/images/menu/zinger-burger.jpg"
              alt="Lassi Wassi authentic crispy chicken burger"
              className="media-element"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
