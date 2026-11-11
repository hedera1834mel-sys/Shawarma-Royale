import { useEffect, useState, useMemo } from 'react';
import { ArrowLeft, ArrowUpRight, Flame, Leaf, Search, ShoppingBag } from 'lucide-react';
import { SiWhatsapp } from 'react-icons/si';
import { Instagram, MapPin } from 'lucide-react';
import logoImg from '../assets/logo.png';
import { MENU_CATEGORIES, type MenuItem } from '../data/menu';

const orderUrl = (service: 'swiggy' | 'zomato') =>
  `https://www.${service}.com/search?query=${encodeURIComponent('Lassi Wassi Pune')}`;

export default function MenuPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [dietFilter, setDietFilter] = useState<'all' | 'veg' | 'non-veg'>('all');

  // Scroll to top on page mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    document.title = 'Full Digital Menu | Lassi Wassi - The Original Shawarma Pune';
  }, []);

  const filteredCategories = useMemo(() => {
    return MENU_CATEGORIES.map((cat) => {
      // If a specific category tab is selected and not 'all', check match
      if (selectedCategory !== 'all' && cat.id !== selectedCategory) {
        return null;
      }

      const matchingItems = cat.items.filter((item) => {
        // Diet filter
        if (dietFilter === 'veg' && !item.isVeg) return false;
        if (dietFilter === 'non-veg' && item.isVeg) return false;

        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase().trim();
          const matchesName = item.name.toLowerCase().includes(q);
          const matchesDesc = item.description.toLowerCase().includes(q);
          const matchesCat = item.category.toLowerCase().includes(q);
          const matchesTag = item.tag?.toLowerCase().includes(q);
          return matchesName || matchesDesc || matchesCat || matchesTag;
        }

        return true;
      });

      if (matchingItems.length === 0) return null;

      return {
        ...cat,
        items: matchingItems,
      };
    }).filter(Boolean) as typeof MENU_CATEGORIES;
  }, [selectedCategory, searchQuery, dietFilter]);

  const totalVisibleItems = useMemo(() => {
    return filteredCategories.reduce((sum, cat) => sum + cat.items.length, 0);
  }, [filteredCategories]);

  const handleCategoryClick = (catId: string) => {
    setSelectedCategory(catId);
    if (catId !== 'all') {
      const el = document.getElementById(catId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <div className="site-shell menu-page-shell">
      {/* Consistent Sticky Header */}
      <header className="site-header" data-testid="site-header">
        <div className="nav-inner">
          <a className="brand-logo-link" href="/" aria-label="Lassi Wassi home">
            <img
              src={logoImg}
              alt="Lassi Wassi - The Original Shawarma - Estd. 2014"
              className="brand-logo"
            />
          </a>

          <div className="menu-header-actions">
            <a href="/" className="back-home-button" aria-label="Back to Homepage">
              <ArrowLeft size={16} /> <span>Back to Home</span>
            </a>
            <a
              className="button-primary nav-cta"
              href={orderUrl('swiggy')}
              target="_blank"
              rel="noreferrer"
            >
              Order Online <ArrowRightIcon size={14} />
            </a>
          </div>
        </div>
      </header>

      {/* Menu Hero Banner */}
      <section className="menu-hero-banner">
        <div className="section-wrap">
          <div className="menu-hero-badge">
            <span>Estd. 2014 · Pune</span>
            <span className="badge-divider">•</span>
            <span>12 Signature Categories</span>
          </div>
          <h1 className="menu-hero-title">Our Digital <em>Menu.</em></h1>
          <p className="menu-hero-subtitle">
            Authentic spit-roasted shawarmas, loaded charcoal platters, gourmet burgers, and rich, creamy Pune lassis made fresh every single day.
          </p>

          {/* Search and Filters Bar */}
          <div className="menu-search-filter-card">
            <div className="search-input-wrap">
              <Search className="search-icon" size={18} />
              <input
                type="text"
                placeholder="Search shawarma, burger, lassi, peri peri..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="menu-search-input"
                aria-label="Search menu items"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="search-clear-btn"
                  aria-label="Clear search"
                >
                  ✕
                </button>
              )}
            </div>

            <div className="diet-filter-group">
              <button
                type="button"
                className={`diet-pill ${dietFilter === 'all' ? 'active' : ''}`}
                onClick={() => setDietFilter('all')}
              >
                All Dishes
              </button>
              <button
                type="button"
                className={`diet-pill veg ${dietFilter === 'veg' ? 'active' : ''}`}
                onClick={() => setDietFilter('veg')}
              >
                <Leaf size={13} className="text-emerald-500" /> Pure Veg
              </button>
              <button
                type="button"
                className={`diet-pill non-veg ${dietFilter === 'non-veg' ? 'active' : ''}`}
                onClick={() => setDietFilter('non-veg')}
              >
                <Flame size={13} className="text-red-500" /> Non-Veg
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Sticky Category Quick-Jump Bar */}
      <nav className="category-sticky-bar" aria-label="Menu category navigation">
        <div className="section-wrap">
          <div className="category-pills-track">
            <button
              type="button"
              className={`cat-pill ${selectedCategory === 'all' ? 'active' : ''}`}
              onClick={() => handleCategoryClick('all')}
            >
              All Categories ({MENU_CATEGORIES.length})
            </button>
            {MENU_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                className={`cat-pill ${selectedCategory === cat.id ? 'active' : ''}`}
                onClick={() => handleCategoryClick(cat.id)}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Menu Categories & Items List */}
      <main className="menu-content-area">
        <div className="section-wrap">
          {filteredCategories.length === 0 ? (
            <div className="empty-menu-notice">
              <h3>No items found</h3>
              <p>We couldn't find any dishes matching "{searchQuery}". Try searching for shawarma, burger, or lassi.</p>
              <button
                type="button"
                className="button-primary"
                onClick={() => {
                  setSearchQuery('');
                  setDietFilter('all');
                  setSelectedCategory('all');
                }}
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="menu-sections-container">
              <div className="menu-results-count">
                Showing <strong>{totalVisibleItems} items</strong> across{' '}
                <strong>{filteredCategories.length} categories</strong>
              </div>

              {filteredCategories.map((category, catIdx) => (
                <section
                  key={category.id}
                  id={category.id}
                  className="category-showcase-section"
                  aria-labelledby={`heading-${category.id}`}
                >
                  <div className="category-showcase-header">
                    <div className="cat-header-left">
                      <span className="cat-index">0{catIdx + 1} // CATEGORY</span>
                      <h2 id={`heading-${category.id}`} className="category-showcase-title">
                        {category.name}
                      </h2>
                      <p className="category-showcase-tagline">{category.tagline}</p>
                    </div>
                    <div className="cat-header-badge">
                      <span>{category.items.length} Items</span>
                    </div>
                  </div>

                  <div className="menu-grid">
                    {category.items.map((item) => (
                      <MenuProductCard key={item.id} item={item} />
                    ))}
                  </div>
                </section>
              ))}
            </div>
          )}

          {/* Quick Order Banner */}
          <div className="menu-order-strip">
            <div className="strip-content">
              <h3>Ready to order fresh from the grill?</h3>
              <p>Get piping-hot shawarmas and chilled lassis delivered right to your doorstep across Pune.</p>
            </div>
            <div className="strip-buttons">
              <a
                href={orderUrl('swiggy')}
                target="_blank"
                rel="noreferrer"
                className="button-primary"
              >
                <ShoppingBag size={15} /> Order on Swiggy <ArrowUpRight size={14} />
              </a>
              <a
                href={orderUrl('zomato')}
                target="_blank"
                rel="noreferrer"
                className="button-light"
              >
                Order on Zomato <ArrowUpRight size={14} />
              </a>
            </div>
          </div>
        </div>
      </main>

      {/* Consistent Footer */}
      <footer className="footer" id="contact" data-testid="footer">
        <div className="section-wrap footer-main">
          <div className="footer-brand">
            <a className="brand-logo-link footer-brand-logo" href="/" aria-label="Lassi Wassi home">
              <img
                src={logoImg}
                alt="Lassi Wassi - The Original Shawarma - Estd. 2014"
                className="brand-logo footer-logo-img"
              />
            </a>
            <p>“When it comes to shawarma, only the best will do.”</p>
            <div className="footer-socials">
              <a
                className="social-link"
                href="https://www.instagram.com/lassiwassiofficial/"
                target="_blank"
                rel="noreferrer"
                aria-label="Lassi Wassi on Instagram"
              >
                <Instagram size={15} />
              </a>
              <a
                className="social-link"
                href="https://wa.me/?text=Hi%20Lassi%20Wassi%2C%20I%27d%20like%20to%20order"
                target="_blank"
                rel="noreferrer"
                aria-label="Contact Lassi Wassi on WhatsApp"
              >
                <SiWhatsapp size={15} />
              </a>
              <a
                className="social-link"
                href={orderUrl('swiggy')}
                target="_blank"
                rel="noreferrer"
                aria-label="Order Lassi Wassi on Swiggy"
              >
                S
              </a>
              <a
                className="social-link"
                href={orderUrl('zomato')}
                target="_blank"
                rel="noreferrer"
                aria-label="Order Lassi Wassi on Zomato"
              >
                Z
              </a>
            </div>
          </div>

          <div className="footer-column">
            <h3>Quick Links</h3>
            <a href="/">Home</a>
            <a href="/menu">Full Menu</a>
            <a href="/#about">Our Story</a>
            <a href="/#outlets">Outlets</a>
            <a href="/#reviews">Reviews</a>
          </div>

          <div className="footer-column">
            <h3>Order Online</h3>
            <a href={orderUrl('swiggy')} target="_blank" rel="noreferrer">
              Swiggy Delivery <ArrowUpRight size={11} />
            </a>
            <a href={orderUrl('zomato')} target="_blank" rel="noreferrer">
              Zomato Delivery <ArrowUpRight size={11} />
            </a>
            <a href="https://www.instagram.com/lassiwassiofficial/" target="_blank" rel="noreferrer">
              Instagram Updates <ArrowUpRight size={11} />
            </a>
          </div>

          <div className="footer-column">
            <h3>Pune Outlets</h3>
            <p>Kothrud · Sinhgad Road<br />Katraj · Bavdhan</p>
            <a
              href="https://www.google.com/maps/search/?api=1&query=Lassi+Wassi+Pune"
              target="_blank"
              rel="noreferrer"
            >
              <MapPin size={12} style={{ display: 'inline', marginRight: 4 }} /> Find Outlets on Maps
            </a>
          </div>
        </div>

        <div className="section-wrap footer-bottom">
          <span>© {new Date().getFullYear()} Lassi Wassi · Pune. Estd. 2014. All rights reserved.</span>
          <a href="/" className="back-to-home-link">
            ← Back to Homepage
          </a>
        </div>
      </footer>
    </div>
  );
}

function MenuProductCard({ item }: { item: MenuItem }) {
  const [imgSrc, setImgSrc] = useState(item.image);

  return (
    <article className="food-card" data-testid={`menu-card-${item.id}`}>
      <div className="food-image">
        <img
          src={imgSrc}
          alt={item.name}
          loading="lazy"
          onError={() => {
            if (imgSrc !== item.fallbackImage) {
              setImgSrc(item.fallbackImage);
            }
          }}
        />
        {item.tag && <span className="food-tag">{item.tag}</span>}
        <span className={`diet-indicator ${item.isVeg ? 'veg' : 'non-veg'}`} title={item.isVeg ? 'Pure Veg' : 'Non-Veg'}>
          <span className="diet-dot" />
        </span>
      </div>

      <div className="food-info">
        <div className="food-head">
          <h3>{item.name}</h3>
          <span className="food-price">₹{item.price}</span>
        </div>
        <p>{item.description}</p>
        <a
          className="food-order"
          href={orderUrl('swiggy')}
          target="_blank"
          rel="noreferrer"
          aria-label={`Order ${item.name} on Swiggy`}
        >
          <span>Order on Swiggy</span>
          <span aria-hidden="true">↗</span>
        </a>
      </div>
    </article>
  );
}

function ArrowRightIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}
