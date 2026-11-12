import { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';

export default function VideoSection() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;
    if (!video || !container) return;

    // Check user preferences for data-saver and reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isDataSaver = (navigator as unknown as { connection?: { saveData?: boolean } })?.connection?.saveData === true;

    if (prefersReducedMotion || isDataSaver) {
      // Keep poster without auto-playing
      return;
    }

    // IntersectionObserver to auto-play when visible and pause when outside viewport
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.25) {
            video
              .play()
              .then(() => setIsPlaying(true))
              .catch(() => {
                // Autoplay policy or low power mode fallback
                setIsPlaying(false);
              });
          } else if (!entry.isIntersecting || entry.intersectionRatio < 0.1) {
            video.pause();
            setIsPlaying(false);
          }
        });
      },
      {
        root: null,
        threshold: [0, 0.15, 0.35, 0.6],
        rootMargin: '60px 0px 60px 0px',
      }
    );

    observer.observe(container);

    // Visibility change handler (tab switch)
    const handleVisibility = () => {
      if (document.hidden) {
        video.pause();
        setIsPlaying(false);
      } else if (container) {
        const rect = container.getBoundingClientRect();
        const inView = rect.top < window.innerHeight && rect.bottom > 0;
        if (inView) {
          video.play().then(() => setIsPlaying(true)).catch(() => {});
        }
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, []);

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

        {/* Right Side: Responsive Video Frame (Clean, uninterrupted view) */}
        <div className="video-player-container" ref={containerRef}>
          <div className="video-frame-outer">
            {/* Clean Video Element without badge or audio overlays */}
            <video
              ref={videoRef}
              className="video-element"
              poster="/video/video-poster.jpg"
              preload="metadata"
              muted
              loop
              autoPlay
              playsInline
              controls={false}
              aria-label="Lassi Wassi authentic chicken shawarma spit roasting and preparation"
            >
              <source src="/video/video.webm" type="video/webm" />
              <source src="/video/video.mp4" type="video/mp4" />
              Your browser does not support HTML5 video playback.
            </video>
          </div>
        </div>
      </div>
    </section>
  );
}
