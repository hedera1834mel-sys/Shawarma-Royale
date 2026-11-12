import { useEffect, useRef, useState } from 'react';
import { ArrowDown, ArrowRight, ArrowUpRight, BookOpen, ChevronRight, Instagram, MapPin, Menu as MenuIcon, Sparkles, UtensilsCrossed, X } from 'lucide-react';
import { SiWhatsapp, SiSwiggy, SiZomato } from 'react-icons/si';
import logoImg from '../assets/logo.png';
import VideoSection from '../components/video-section';

const orderUrl = (service: 'swiggy' | 'zomato') =>
  `https://www.${service}.com/search?query=${encodeURIComponent('Lassi Wassi Pune')}`;

const photos = {
  logo: logoImg,
  hero: '/images/hero-shawarma.jpg',
  platter: '/images/food-platter.jpg',
  burger: '/images/chicken-burger.jpg?v=2',
  chicken: '/images/grilled-chicken.jpg?v=2',
  roll: '/images/hero-shawarma.jpg',
  fries: '/images/food-platter.jpg',
  drink: '/images/mango-lassi.jpg?v=2',
};

const outletData = [
  { title: 'Kothrud', note: 'Find your neighbourhood favourite.', search: 'Lassi Wassi Kothrud Pune' },
  { title: 'Sinhgad Road', note: 'A proper shawarma, close to home.', search: 'Lassi Wassi Sinhgad Road Pune' },
  { title: 'Katraj', note: 'Fresh off the grill, just around the corner.', search: 'Lassi Wassi Katraj Pune' },
  { title: 'Bavdhan', note: 'Your next craving is closer than you think.', search: 'Lassi Wassi Bavdhan Pune' },
];

const galleryItems = [
  { title: 'Shawarma rolls', image: photos.hero, alt: 'Toasted chicken shawarma rolls filled with grilled chicken and greens' },
  { title: 'Grilled chicken', image: photos.chicken, alt: 'Juicy chargrilled chicken tikka with lemon and herbs' },
  { title: 'Loaded burgers', image: photos.burger, alt: 'Crispy chicken burger with cheese and lettuce' },
  { title: 'Mango lassi', image: photos.drink, alt: 'Cold mango lassi with a saffron and pistachio garnish' },
  { title: 'Shawarma platter', image: photos.platter, alt: 'A generous platter of grilled chicken, flatbread, greens and sauce' },
  { title: 'Made to share', image: photos.hero, alt: 'Freshly made shawarma wraps ready to share' },
];

const navItems = [
  ['Home', '/#home'],
  ['About Us', '/#about'],
  ['Menu', '/menu'],
  ['Our Outlets', '/#outlets'],
  ['Contact', '/#contact'],
];

const menuHighlights = [
  { label: 'Signature Shawarmas', count: 'Classic, Peri Peri & Loaded' },
  { label: 'Open Platters', count: 'With Khubz, Dips & Fries' },
  { label: 'Gourmet Burgers', count: 'Grilled & Crispy Patties' },
  { label: 'Charcoal Grills', count: 'Smoky Tikka & Skewers' },
  { label: 'Thick Lassis', count: 'Sweet, Mango & Dry Fruit' },
  { label: 'Loaded Fries & Combos', count: 'Great for Sharing' },
];

export default function HomePage() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const heroBgRef = useRef<HTMLDivElement | null>(null);
  const heroContentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    document.title = 'Lassi Wassi | The Original Shawarma Pune';

    // Parallax scrolling effect for hero section
    let ticking = false;
    const bg = heroBgRef.current;
    const content = heroContentRef.current;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          // Apply subtle, high-performance parallax while hero is near viewport
          if (bg && scrollY < window.innerHeight * 1.4) {
            bg.style.transform = `translate3d(0, ${scrollY * 0.28}px, 0)`;
            if (content) {
              content.style.transform = `translate3d(0, ${scrollY * 0.1}px, 0)`;
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    if (!prefersReducedMotion) {
      window.addEventListener('scroll', onScroll, { passive: true });
    }

    if (
      !('IntersectionObserver' in window) ||
      prefersReducedMotion
    ) {
      return () => {
        if (!prefersReducedMotion) window.removeEventListener('scroll', onScroll);
      };
    }

    const observer = new IntersectionObserver((entries, activeObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          activeObserver.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -36px 0px', threshold: 0.12 });

    document.querySelectorAll('[data-reveal]').forEach((element) => observer.observe(element));
    return () => {
      window.removeEventListener('scroll', onScroll);
      observer.disconnect();
    };
  }, []);

  const closeMobileMenu = () => setMobileOpen(false);

  return (
    <div className="site-shell">
      {/* Site Header */}
      <header className="site-header" data-testid="site-header">
        <div className="nav-inner">
          <a className="brand-logo-link" href="/#home" aria-label="Lassi Wassi home" data-testid="brand-home">
            <img
              src={photos.logo}
              alt="Lassi Wassi - The Original Shawarma - Estd. 2014"
              className="brand-logo"
            />
          </a>
          <nav className={`nav-links${mobileOpen ? ' open' : ''}`} aria-label="Main navigation" data-testid="main-navigation">
            {navItems.map(([label, href]) => (
              <a
                key={label}
                href={href}
                onClick={closeMobileMenu}
                data-testid={`nav-${label.toLowerCase().replaceAll(' ', '-')}`}
                className={label === 'Menu' ? 'nav-link-highlight' : ''}
              >
                {label}
              </a>
            ))}
          </nav>
          <a className="button-primary nav-cta" href={orderUrl('swiggy')} target="_blank" rel="noreferrer" data-testid="nav-order-link">
            Order now <ArrowRight size={14} />
          </a>
          <button
            className="menu-toggle"
            type="button"
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((open) => !open)}
            data-testid="mobile-menu-toggle"
          >
            {mobileOpen ? <X size={21} /> : <MenuIcon size={21} />}
          </button>
        </div>
      </header>

      <main>
        {/* Unified Hero Section with Full Background & Parallax */}
        <section className="hero" id="home" aria-labelledby="hero-title" data-testid="hero-section">
          {/* Background Image Layer with Parallax Translation */}
          <div className="hero-bg-layer" ref={heroBgRef} aria-hidden="true">
            <img
              src={photos.hero}
              alt="Lassi Wassi Authentic Grilled Chicken Shawarma"
              className="hero-bg-image"
              loading="eager"
            />
            {/* Dark semi-transparent overlay (40-45% base, 55-60% gradient toward bottom) */}
            <div className="hero-overlay" />
          </div>

          {/* Foreground Hero Content Group (Lower position on mobile) */}
          <div className="hero-content" ref={heroContentRef}>
            <p className="hero-kicker">Pune's neighbourhood favourite · Since 2014</p>
            <h1 id="hero-title">Taste that <span>pulls you in.</span></h1>
            <p className="hero-copy">Fresh ingredients. Authentic flavours. Shawarma made to satisfy every craving.</p>
            <div className="hero-actions">
              <a className="button-primary" href={orderUrl('swiggy')} target="_blank" rel="noreferrer" data-testid="hero-order-swiggy">
                Order now <ArrowUpRight size={14} />
              </a>
              <a className="button-outline" href="/menu" data-testid="hero-menu-cta">
                Explore Menu <ArrowRight size={15} />
              </a>
            </div>
          </div>
          <div className="hero-note"><span /> A little spice. A lot of love.</div>
          <div className="hero-side-label">Pune, Maharashtra · Made fresh, every day</div>
        </section>

        {/* Ticker */}
        <div className="ticker" aria-label="Fresh off the grill, Pune since 2014, always worth the craving">
          <div className="ticker-inner">
            <span>Fresh off the grill</span>
            <span>Pune since 2014</span>
            <span>Always worth the craving</span>
            <span>Made for your kind of hungry</span>
          </div>
        </div>

        {/* About Us / Story Section (Placed immediately after hero content per requirement) */}
        <section className="story-section" id="about" aria-labelledby="story-title" data-testid="story-section" data-reveal>
          <div className="section-wrap story-grid">
            <div className="story-image">
              <img src={photos.platter} alt="A generous Lassi Wassi-style shawarma platter with grilled chicken, greens and flatbread" loading="lazy" />
              <div className="story-stamp">PUNE<br />PROUD<small>EST. 2014</small></div>
            </div>
            <div className="story-copy">
              <span className="eyebrow">A story with spice</span>
              <h2 id="story-title">Pune made.<br /><span>Pune loved.</span></h2>
              <blockquote>“Since 2014, we've been serving flavours that keep people coming back.”</blockquote>
              <p>It started with a simple idea: make the kind of food you tell your friends about. Since 2014, Lassi Wassi has grown alongside the city, serving up generous shawarma, a little comfort and a lot of flavour to the people who make Pune home.</p>
              <p>Today, we still believe the best meals are the ones that bring you back. Fresh from the grill, full of character, and always better shared.</p>
              <div className="story-signoff">Your local favourite, always</div>
            </div>
          </div>
        </section>

        {/* Streamlined Clean Homepage Menu Showcase (Placed immediately after About Us per requirement) */}
        <section className="menu-section home-menu-clean" id="menu" aria-labelledby="menu-title" data-testid="menu-section" data-reveal>
          <div className="section-wrap">
            <div className="home-menu-card">
              <div className="home-menu-content">
                <span className="eyebrow">The good stuff · 12 Signature Categories</span>
                <h2 className="section-title" id="menu-title">Find your <em>favourite.</em></h2>
                <p className="intro">
                  A dedicated menu for every kind of craving, featuring slow-grilled authentic shawarmas, gourmet burgers, charcoal tikkas, loaded platters and Pune's favourite thick lassi.
                </p>

                <div className="home-menu-highlights-grid">
                  {menuHighlights.map((item, index) => (
                    <div key={index} className="menu-pill-highlight">
                      <span className="pill-dot">•</span>
                      <div>
                        <strong>{item.label}</strong>
                        <small>{item.count}</small>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="home-menu-cta-row">
                  <a className="button-primary menu-main-cta" href="/menu" data-testid="explore-our-menu-btn">
                    <UtensilsCrossed size={16} /> Explore Our Menu <ArrowRight size={16} />
                  </a>
                  <a className="button-light-accent" href={orderUrl('zomato')} target="_blank" rel="noreferrer">
                    Order Delivery <ArrowUpRight size={14} />
                  </a>
                </div>
              </div>

              <div className="home-menu-visual">
                <div className="visual-badge">
                  <Sparkles size={16} className="text-amber-400" />
                  <span>12 Categories · 40+ Items</span>
                </div>
                <img
                  src={photos.platter}
                  alt="Lassi Wassi Shawarma and authentic grilled dishes"
                  className="visual-img"
                  loading="lazy"
                />
                <div className="visual-caption">
                  <span className="caption-tag">Digital Menu Available</span>
                  <a href="/menu" className="caption-link">
                    Open Digital Menu <ChevronRight size={14} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Video Section (Uses official user-uploaded video with muted autoplay, infinite loop & responsive optimization) */}
        <VideoSection />

        {/* Benefits Section */}
        <section className="benefits" aria-label="Why Lassi Wassi" data-reveal>
          <div className="section-wrap benefits-inner">
            <div className="benefits-lead">
              <span className="eyebrow">The LW way</span>
              <h2>Why does this shawarma hit different?</h2>
              <img className="benefits-photo" src={photos.hero} alt="Close-up of a freshly grilled shawarma with juicy chicken and crisp greens" loading="lazy" />
            </div>
            <div className="benefits-grid">
              <article className="benefit">
                <span className="benefit-mark" aria-hidden="true">01</span>
                <h3>Freshly prepared</h3>
                <p>Made fresh for the moment you are ready to eat.</p>
              </article>
              <article className="benefit">
                <span className="benefit-mark" aria-hidden="true">02</span>
                <h3>Premium ingredients</h3>
                <p>Good ingredients make every layer count.</p>
              </article>
              <article className="benefit">
                <span className="benefit-mark" aria-hidden="true">03</span>
                <h3>Authentic flavours</h3>
                <p>Bold, familiar flavours with a little Pune personality.</p>
              </article>
              <article className="benefit">
                <span className="benefit-mark" aria-hidden="true">04</span>
                <h3>Juicy chicken</h3>
                <p>Perfectly cooked chicken, full of flavour in every bite.</p>
              </article>
              <article className="benefit">
                <span className="benefit-mark" aria-hidden="true">05</span>
                <h3>Crispy textures</h3>
                <p>A little crunch to balance all that juicy goodness.</p>
              </article>
              <article className="benefit">
                <span className="benefit-mark" aria-hidden="true">06</span>
                <h3>Generous portions</h3>
                <p>Made to satisfy the craving, not just tease it.</p>
              </article>
              <article className="benefit">
                <span className="benefit-mark" aria-hidden="true">07</span>
                <h3>Consistent taste</h3>
                <p>The same familiar favourite, every time you come back.</p>
              </article>
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <section className="gallery-section" aria-labelledby="gallery-title" data-testid="food-gallery" data-reveal>
          <div className="section-wrap gallery-heading">
            <div>
              <span className="eyebrow">From the grill to the table</span>
              <h2 className="section-title" id="gallery-title">A feast for <em>the eyes.</em></h2>
            </div>
            <p>Shawarma rolls, smoky chicken, burgers, lassi and all the good stuff in between.</p>
          </div>
          <div className="food-rail" aria-label="Lassi Wassi food gallery">
            {galleryItems.map((item, index) => (
              <figure className="food-rail-card" key={`${item.title}-${index}`} data-testid={`gallery-card-${index + 1}`}>
                <img src={item.image} alt={item.alt} loading="lazy" />
                <figcaption><span>0{index + 1}</span>{item.title}</figcaption>
              </figure>
            ))}
          </div>
        </section>

        {/* Showcase Section */}
        <section className="showcase" aria-labelledby="showcase-title" data-testid="food-showcase" data-reveal>
          <div className="showcase-image">
            <img src={photos.hero} alt="Close-up of freshly grilled chicken shawarma wrapped with crisp greens and garlic sauce" loading="lazy" />
          </div>
          <div className="showcase-copy">
            <span className="eyebrow">Slow grilled. Fast gone.</span>
            <h2 id="showcase-title">The kind<br />you <span>think about.</span></h2>
            <p>That first bite. The smoky edge. The sauce that gets on your fingers. Some cravings just don't wait.</p>
            <div>
              <a className="button-primary" href="/menu" data-testid="showcase-menu-cta">
                Meet your match <ArrowRight size={15} />
              </a>
            </div>
          </div>
        </section>

        {/* Outlets Section */}
        <section className="outlets-section" id="outlets" aria-labelledby="outlets-title" data-testid="outlets-section" data-reveal>
          <div className="section-wrap">
            <div className="outlets-head">
              <div><span className="eyebrow">Around your corner</span><h2 className="section-title" id="outlets-title">Find us in <em>Pune.</em></h2></div>
              <p>Find your nearest Lassi Wassi in Pune. Tap a location for directions and order online for a shawarma at home.</p>
            </div>
            <div className="outlet-grid">
              {outletData.map((outlet, index) => (
                <article className="outlet-card" key={outlet.title} data-testid={`outlet-${outlet.title.toLowerCase().replaceAll(' ', '-')}`}>
                  <span className="outlet-number">0{index + 1} / PUNE</span>
                  <h3>{outlet.title}</h3>
                  <p>{outlet.note}<br />Sample location; address to be confirmed.</p>
                  <div className="outlet-actions">
                    <a className="outlet-map" href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(outlet.search)}`} target="_blank" rel="noreferrer" aria-label={`Search Google Maps for Lassi Wassi ${outlet.title}`} data-testid={`outlet-map-${outlet.title.toLowerCase().replaceAll(' ', '-')}`}>
                      <MapPin size={13} /> Find on map <span aria-hidden="true">↗</span>
                    </a>
                    <a className="outlet-order" href={orderUrl('swiggy')} target="_blank" rel="noreferrer" aria-label={`Order from the Lassi Wassi ${outlet.title} outlet`} data-testid={`outlet-order-${outlet.title.toLowerCase().replaceAll(' ', '-')}`}>Order now <ArrowUpRight size={13} /></a>
                  </div>
                </article>
              ))}
            </div>
            <div className="order-band">
              <div><h3>Hungry yet?</h3><p>Your next favourite shawarma is just one click away.</p></div>
              <div className="order-band-actions">
                <a className="button-primary" href={orderUrl('swiggy')} target="_blank" rel="noreferrer" data-testid="outlet-swiggy-cta">Order on Swiggy <ArrowUpRight size={14} /></a>
                <a className="button-outline" href={orderUrl('zomato')} target="_blank" rel="noreferrer" data-testid="outlet-zomato-cta">Order on Zomato <ArrowUpRight size={14} /></a>
              </div>
            </div>
          </div>
        </section>

        {/* Instagram Section */}
        <section className="instagram-section" aria-labelledby="instagram-title" data-testid="instagram-section" data-reveal>
          <div className="section-wrap">
            <div className="instagram-header">
              <div><span className="eyebrow">Follow the craving</span><h2 className="section-title" id="instagram-title">Follow the <em>craving.</em></h2><p>From the grill, from the neighbourhood, from your next craving.</p></div>
              <a className="instagram-link" href="https://www.instagram.com/lassiwassiofficial/" target="_blank" rel="noreferrer" data-testid="instagram-profile-link"><Instagram size={17} /> @lassiwassiofficial <ArrowUpRight size={14} /></a>
            </div>
            <div className="insta-grid">
              {[photos.hero, photos.platter, photos.burger, photos.chicken, photos.roll].map((photo, index) => (
                <a className="insta-item" href="https://www.instagram.com/lassiwassiofficial/" target="_blank" rel="noreferrer" key={photo + index} aria-label={`Visit Lassi Wassi official Instagram profile, food photo ${index + 1}`}>
                  <img src={photo} alt={['Grilled chicken shawarma wrapped with greens', 'Shawarma platter with flatbread and sauce', 'Fresh burger with lettuce and toasted bun', 'Grilled chicken prepared with Indian spices', 'Golden toasted shawarma roll'][index]} loading="lazy" />
                </a>
              ))}
            </div>
            <a className="button-primary instagram-cta" href="https://www.instagram.com/lassiwassiofficial/" target="_blank" rel="noreferrer" data-testid="instagram-follow-cta">Follow us on Instagram <ArrowUpRight size={14} /></a>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="footer" id="contact" data-testid="footer">
        <div className="section-wrap footer-main">
          <div className="footer-brand">
            <a className="brand-logo-link footer-brand-logo" href="/#home" aria-label="Lassi Wassi home">
              <img
                src={photos.logo}
                alt="Lassi Wassi - The Original Shawarma - Estd. 2014"
                className="brand-logo footer-logo-img"
              />
            </a>
            <p>“When it comes to shawarma, only the best will do.”</p>
            <div className="footer-socials">
              <a className="social-link" href="https://www.instagram.com/lassiwassiofficial/" target="_blank" rel="noreferrer" aria-label="Lassi Wassi on Instagram"><Instagram size={15} /></a>
              <a className="social-link" href="https://wa.me/?text=Hi%20Lassi%20Wassi%2C%20I%27d%20like%20to%20know%20more" target="_blank" rel="noreferrer" aria-label="Contact Lassi Wassi on WhatsApp"><SiWhatsapp size={15} /></a>
              <a className="social-link" href={orderUrl('swiggy')} target="_blank" rel="noreferrer" aria-label="Order Lassi Wassi on Swiggy" title="Order on Swiggy"><SiSwiggy size={16} /></a>
              <a className="social-link" href={orderUrl('zomato')} target="_blank" rel="noreferrer" aria-label="Order Lassi Wassi on Zomato" title="Order on Zomato"><SiZomato size={16} /></a>
            </div>
          </div>
          <div className="footer-column">
            <h3>Take a look</h3>
            <a href="/menu">Our menu</a>
            <a href="/#about">Our story</a>
            <a href="/#outlets">Find an outlet</a>
            <a href="/#contact">Contact</a>
          </div>
          <div className="footer-column">
            <h3>Order in</h3>
            <a href={orderUrl('swiggy')} target="_blank" rel="noreferrer">Find us on Swiggy <ArrowUpRight size={11} /></a>
            <a href={orderUrl('zomato')} target="_blank" rel="noreferrer">Find us on Zomato <ArrowUpRight size={11} /></a>
            <a href="https://www.instagram.com/lassiwassiofficial/" target="_blank" rel="noreferrer">Follow Instagram <ArrowUpRight size={11} /></a>
          </div>
          <div className="footer-column">
            <h3>Say hello</h3>
            <p>Pune, Maharashtra<br />India</p>
            <p>Kothrud · Sinhgad Road<br />Katraj · Bavdhan</p>
            <a href="https://www.google.com/maps/search/?api=1&query=Lassi+Wassi+Pune" target="_blank" rel="noreferrer">Search Lassi Wassi on Maps <ArrowUpRight size={11} /></a>
            <p>Outlet addresses and contact details to be confirmed.</p>
          </div>
        </div>
        <div className="section-wrap footer-bottom">
          <span>© {new Date().getFullYear()} Lassi Wassi · Pune. All good things reserved.</span>
          <span>Estd. 2014. The original Shawarma.</span>
          <a href="/#home" aria-label="Back to top">Back to top <ArrowDown size={11} style={{ transform: 'rotate(180deg)' }} /></a>
        </div>
      </footer>
    </div>
  );
}
