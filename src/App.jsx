import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import confetti from 'canvas-confetti';
import { PRODUCTS } from './data/products';

export default function App() {
  const [phase, setPhase] = useState(1); // 1: Stack, 2: Spread, 3: Detail
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [selectedCardIndex, setSelectedCardIndex] = useState(0);
  const [cartCount, setCartCount] = useState(0);
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [toast, setToast] = useState({ visible: false, title: '', sub: '', img: '' });
  const [isScrolled, setIsScrolled] = useState(false);

  const cardsRef = useRef([]);
  const autoCycleTimerRef = useRef(null);
  const touchStartRef = useRef({ x: 0, y: 0 });
  const isScrollDebouncedRef = useRef(false);

  // Nav scroll monitor
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Format INR Currency
  const formatINR = (val) => '₹' + val.toLocaleString('en-IN');

  // GSAP 3D Transformations based on Phase
  useEffect(() => {
    const width = window.innerWidth;
    const isMobile = width <= 768;
    const isTablet = width <= 1024 && width > 768;

    if (phase === 1) {
      // PHASE 1: STACKED HERO CARD
      // 1 product card centered, 2 more stacked slightly behind it (offset & rotated a few degrees)
      const total = PRODUCTS.length;
      PRODUCTS.forEach((_, idx) => {
        const card = cardsRef.current[idx];
        if (!card) return;

        let offset = (idx - activeCardIndex + total) % total;

        if (offset === 0) {
          gsap.to(card, {
            x: 0,
            y: 0,
            z: 0,
            rotationZ: 0,
            rotationY: 0,
            scale: 1.25,
            opacity: 1,
            zIndex: 10,
            filter: 'brightness(1)',
            boxShadow: '0 35px 70px -15px rgba(18, 42, 46, 0.38), 0 15px 25px -5px rgba(18, 42, 46, 0.15)',
            duration: 0.65,
            ease: 'power3.out'
          });
        } else if (offset === 1) {
          gsap.to(card, {
            x: 26,
            y: 16,
            z: -50,
            rotationZ: 4.5,
            rotationY: -2,
            scale: 1.18,
            opacity: 0.92,
            zIndex: 8,
            filter: 'brightness(0.96)',
            boxShadow: '0 25px 50px -15px rgba(18, 42, 46, 0.25)',
            duration: 0.65,
            ease: 'power3.out'
          });
        } else if (offset === 2) {
          gsap.to(card, {
            x: 52,
            y: 32,
            z: -100,
            rotationZ: 9,
            rotationY: -4,
            scale: 1.10,
            opacity: 0.82,
            zIndex: 6,
            filter: 'brightness(0.92)',
            boxShadow: '0 20px 40px -15px rgba(18, 42, 46, 0.2)',
            duration: 0.65,
            ease: 'power3.out'
          });
        } else {
          gsap.to(card, {
            x: 65,
            y: 42,
            z: -160,
            rotationZ: 12,
            rotationY: -5,
            scale: 1.02,
            opacity: 0,
            zIndex: 1,
            duration: 0.5,
            ease: 'power3.out'
          });
        }
      });
    } else if (phase === 2) {
      // PHASE 2: SPREAD ARC
      // Spread out into a horizontal arc of 7 cards with CLEAR VIEW and visible gap between each card
      let xStep, cardScale;
      if (isMobile) {
        xStep = Math.max(55, Math.min(80, (width - 30) / 6.2));
        cardScale = 0.72;
      } else if (isTablet) {
        xStep = Math.max(125, Math.min(155, (width - 60) / 6.8));
        cardScale = 0.82;
      } else {
        // Desktop: generous spacing with clear visible gap between each card (~30px gap)
        xStep = Math.max(195, Math.min(235, (width - 120) / 6.6));
        cardScale = 0.88;
      }

      // Elegant, gentle tilt and curvature so all cards stay clearly legible
      const rotations = [-10, -6.5, -3, 0, 3, 6.5, 10];
      const yOffsets = [28, 14, 3, 0, 3, 14, 28];
      const zIndices = [10, 12, 14, 16, 14, 12, 10];
      const centerIdx = 3;

      PRODUCTS.forEach((_, idx) => {
        const card = cardsRef.current[idx];
        if (!card) return;

        const delta = idx - centerIdx;
        const xPos = delta * xStep;
        const yPos = yOffsets[idx];
        const rot = rotations[idx];
        const zIdx = zIndices[idx];

        gsap.to(card, {
          x: xPos,
          y: yPos,
          z: 0,
          rotationZ: rot,
          rotationY: delta * 1.5,
          scale: cardScale,
          opacity: 1,
          zIndex: zIdx,
          filter: 'brightness(1)',
          boxShadow: '0 20px 45px -10px rgba(14, 38, 43, 0.28)',
          duration: 0.85,
          delay: Math.abs(delta) * 0.04,
          ease: 'power3.out'
        });
      });
    } else if (phase === 3) {
      // PHASE 3: PRODUCT DETAIL VIEW
      // Card flies to the left and scales up, with other cards stacked behind it
      const isMobileDetail = width <= 1024;

      PRODUCTS.forEach((_, idx) => {
        const card = cardsRef.current[idx];
        if (!card) return;

        if (idx === selectedCardIndex) {
          const targetX = isMobileDetail ? 0 : -270;
          const targetY = isMobileDetail ? -20 : 0;
          const targetScale = isMobileDetail ? 1.08 : 1.28;

          gsap.to(card, {
            x: targetX,
            y: targetY,
            z: 80,
            rotationZ: 0,
            rotationY: isMobileDetail ? 0 : 4,
            scale: targetScale,
            opacity: 1,
            zIndex: 50,
            filter: 'brightness(1)',
            boxShadow: '0 45px 85px -15px rgba(10, 28, 32, 0.45)',
            duration: 0.85,
            ease: 'power3.out'
          });
        } else {
          const stackRank = (idx - selectedCardIndex + PRODUCTS.length) % PRODUCTS.length;
          const stackX = isMobileDetail ? (stackRank * 14) : (-270 + stackRank * 24);
          const stackY = isMobileDetail ? (-20 + stackRank * 8) : (stackRank * 12);
          const stackRot = stackRank * 3;
          const stackScale = Math.max(0.75, 1.15 - stackRank * 0.06);
          const stackOpacity = Math.max(0, 0.65 - stackRank * 0.12);

          gsap.to(card, {
            x: stackX,
            y: stackY,
            z: -stackRank * 40,
            rotationZ: stackRot,
            rotationY: -4,
            scale: stackScale,
            opacity: stackOpacity,
            zIndex: 30 - stackRank,
            filter: 'brightness(0.92)',
            boxShadow: '0 20px 40px -15px rgba(15, 38, 42, 0.25)',
            duration: 0.85,
            ease: 'power3.out'
          });
        }
      });
    }
  }, [phase, activeCardIndex, selectedCardIndex]);

  // Phase 1 Auto-cycle timer
  useEffect(() => {
    if (phase === 1) {
      autoCycleTimerRef.current = setInterval(() => {
        setActiveCardIndex((prev) => (prev + 1) % PRODUCTS.length);
      }, 4500);
    } else {
      if (autoCycleTimerRef.current) clearInterval(autoCycleTimerRef.current);
    }
    return () => {
      if (autoCycleTimerRef.current) clearInterval(autoCycleTimerRef.current);
    };
  }, [phase]);

  // Mouse Wheel scroll transitions between Phase 1 and 2
  useEffect(() => {
    const handleWheel = (e) => {
      if (isScrollDebouncedRef.current) return;
      if (phase === 1 && e.deltaY > 35) {
        isScrollDebouncedRef.current = true;
        setPhase(2);
        setTimeout(() => { isScrollDebouncedRef.current = false; }, 900);
      } else if (phase === 2 && e.deltaY < -35) {
        isScrollDebouncedRef.current = true;
        setPhase(1);
        setTimeout(() => { isScrollDebouncedRef.current = false; }, 900);
      }
    };
    window.addEventListener('wheel', handleWheel, { passive: true });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [phase]);

  // Card Click Interaction
  const handleCardClick = (idx) => {
    if (phase === 1) {
      if (idx === activeCardIndex) {
        setPhase(2);
      } else {
        setActiveCardIndex(idx);
      }
    } else if (phase === 2) {
      setSelectedCardIndex(idx);
      setPhase(3);
    }
  };

  // Phase 2 Hover without zooming/scaling bigger
  const handleCardHover = (idx, isHovering) => {
    if (phase !== 2) return;
    const card = cardsRef.current[idx];
    if (!card) return;

    const width = window.innerWidth;
    const isMobile = width <= 768;
    const isTablet = width <= 1024 && width > 768;
    const cardScale = isMobile ? 0.72 : (isTablet ? 0.82 : 0.88);

    const rotations = [-10, -6.5, -3, 0, 3, 6.5, 10];
    const yOffsets = [28, 14, 3, 0, 3, 14, 28];
    const zIndices = [10, 12, 14, 16, 14, 12, 10];

    if (isHovering) {
      // Gently lift and straighten WITHOUT scaling up bigger or zooming image
      gsap.to(card, {
        y: yOffsets[idx] - 20,
        rotationZ: 0,
        scale: cardScale,
        zIndex: 90,
        boxShadow: '0 28px 55px -10px rgba(10, 30, 35, 0.36)',
        duration: 0.35,
        ease: 'power2.out'
      });
    } else {
      // Return smoothly to original arc orientation
      gsap.to(card, {
        y: yOffsets[idx],
        rotationZ: rotations[idx],
        scale: cardScale,
        zIndex: zIndices[idx],
        boxShadow: '0 20px 45px -10px rgba(14, 38, 43, 0.28)',
        duration: 0.35,
        ease: 'power2.out'
      });
    }
  };

  // Add to Cart handler
  const handleAddToCart = () => {
    setCartCount((c) => c + 1);
    setIsAddedToCart(true);

    if (typeof confetti === 'function') {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.75 },
        colors: ['#c5a059', '#ecd69a', '#9CC5CC', '#111416', '#ffffff']
      });
    }

    const currentProduct = PRODUCTS[selectedCardIndex];
    setToast({
      visible: true,
      title: `${currentProduct.name} Added!`,
      sub: `${formatINR(currentProduct.price)} reserved in your vault`,
      img: currentProduct.image
    });

    setTimeout(() => {
      setToast((t) => ({ ...t, visible: false }));
    }, 3200);

    setTimeout(() => {
      setIsAddedToCart(false);
    }, 3200);
  };

  // Touch Swipe handlers
  const handleTouchStart = (e) => {
    touchStartRef.current = {
      x: e.changedTouches[0].screenX,
      y: e.changedTouches[0].screenY
    };
  };

  const handleTouchEnd = (e) => {
    const endX = e.changedTouches[0].screenX;
    const endY = e.changedTouches[0].screenY;
    const diffX = endX - touchStartRef.current.x;
    const diffY = endY - touchStartRef.current.y;

    if (phase === 1) {
      if (Math.abs(diffX) > 40) {
        if (diffX < 0) {
          setActiveCardIndex((prev) => (prev + 1) % PRODUCTS.length);
        } else {
          setActiveCardIndex((prev) => (prev - 1 + PRODUCTS.length) % PRODUCTS.length);
        }
      } else if (diffY < -50) {
        setPhase(2);
      }
    }
  };

  const activeProduct = PRODUCTS[activeCardIndex];
  const selectedProduct = PRODUCTS[selectedCardIndex];

  return (
    <div id="showcaseApp">
      {/* Top Luxury Navigation */}
      <header className={`luxe-nav ${isScrolled ? 'scrolled' : ''}`}>
        <div className="brand-mark" onClick={() => setPhase(1)}>
          <span className="brand-title">VÉLANTE</span>
          <span className="brand-sub">Haute Joaillerie • Paris & Bombay</span>
        </div>

        <nav className="nav-phase-indicators" aria-label="Showcase Phases">
          <button
            className={`phase-pill ${phase === 1 ? 'active' : ''}`}
            onClick={() => setPhase(1)}
          >
            Hero Stack
          </button>
          <button
            className={`phase-pill ${phase === 2 ? 'active' : ''}`}
            onClick={() => setPhase(2)}
          >
            Spread Arc
          </button>
          <button
            className={`phase-pill ${phase === 3 ? 'active' : ''}`}
            onClick={() => setPhase(3)}
          >
            Piece Details
          </button>
        </nav>

        <div className="nav-actions">
          <button
            className="nav-action-btn"
            onClick={() => {
              setToast({
                visible: true,
                title: cartCount === 0 ? 'Luxury Vault Empty' : `${cartCount} Bespoke Pieces`,
                sub: cartCount === 0 ? 'Explore pieces to reserve' : 'Proceed to White-Glove Checkout',
                img: selectedProduct.image
              });
              setTimeout(() => setToast((t) => ({ ...t, visible: false })), 3000);
            }}
            title="Shopping Bag"
            aria-label="Shopping Bag"
          >
            <span>🛒</span>
            <span className={`cart-count-badge ${cartCount > 0 ? 'bump' : ''}`}>{cartCount}</span>
          </button>
        </div>
      </header>

      {/* Main 3-Phase Stage */}
      <main className={`showcase-stage is-phase-${phase}`}>
        {/* PHASE 1: Tiny Uppercase Category Label */}
        {phase === 1 && (
          <div className="phase-1">
            <div className="hero-category-label">
              {activeProduct.category} • {activeProduct.heroTag}
            </div>
          </div>
        )}

        {/* PHASE 2: Spread Header */}
        <div
          className="spread-header"
          style={{
            opacity: phase === 2 ? 1 : 0,
            transform: phase === 2 ? 'translateY(0)' : 'translateY(-20px)',
            pointerEvents: phase === 2 ? 'all' : 'none'
          }}
        >
          <span className="spread-sub">The Ultimate</span>
          <h1 className="spread-title">COLLECTIONS</h1>
        </div>

        {/* Return to Stack Button when in Phase 2 */}
        {phase === 2 && (
          <button
            className="return-to-stack-btn"
            onClick={() => setPhase(1)}
          >
            <span>↑</span> Stack View
          </button>
        )}

        {/* PHASE 3: Dark Back Button at Top Left */}
        {phase === 3 && (
          <button
            className="back-btn"
            onClick={() => setPhase(2)}
          >
            <span className="back-arrow">←</span> Back to Collections
          </button>
        )}

        {/* 3D CARDS DECK CONTAINER */}
        <div
          className="cards-deck-container"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onMouseEnter={() => {
            if (autoCycleTimerRef.current) clearInterval(autoCycleTimerRef.current);
          }}
          onMouseLeave={() => {
            if (phase === 1) {
              autoCycleTimerRef.current = setInterval(() => {
                setActiveCardIndex((prev) => (prev + 1) % PRODUCTS.length);
              }, 4500);
            }
          }}
        >
          {PRODUCTS.map((product, idx) => (
            <div
              key={product.id}
              ref={(el) => (cardsRef.current[idx] = el)}
              className="luxe-card"
              onClick={() => handleCardClick(idx)}
              onMouseEnter={() => handleCardHover(idx, true)}
              onMouseLeave={() => handleCardHover(idx, false)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleCardClick(idx);
                }
              }}
            >
              <div className="card-top-chip">
                <span className="card-num">0{product.id}</span>
                <span className="card-sparkle-icon">✦</span>
              </div>

              <div className="card-img-wrap">
                <img src={product.image} alt={product.name} className="card-img" />
              </div>

              {/* Bottom dark gradient overlay with italic serif name and price */}
              <div className="card-overlay">
                <h3 className="card-product-name">{product.name}</h3>
                <div className="card-product-price">
                  <span className="currency">₹</span>
                  <span>{product.price.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* PHASE 1 CONTROLS: Pagination dots & Cycle Buttons */}
        {phase === 1 && (
          <div className="phase-1-controls">
            <div className="pagination-bar" role="tablist">
              {PRODUCTS.map((_, idx) => (
                <button
                  key={idx}
                  className={`dot-btn ${idx === activeCardIndex ? 'active' : ''}`}
                  onClick={() => setActiveCardIndex(idx)}
                  aria-label={`Go to piece 0${idx + 1}`}
                />
              ))}
            </div>

            <div className="stack-arrow-btns">
              <button
                className="stack-nav-btn"
                onClick={() => {
                  setActiveCardIndex((prev) => (prev - 1 + PRODUCTS.length) % PRODUCTS.length);
                }}
                aria-label="Previous Piece"
              >
                ←
              </button>
              <button
                className="stack-nav-btn"
                onClick={() => {
                  setActiveCardIndex((prev) => (prev + 1) % PRODUCTS.length);
                }}
                aria-label="Next Piece"
              >
                →
              </button>
            </div>

            <button
              className="phase-1-cta-btn"
              onClick={() => setPhase(2)}
            >
              <span>Explore All 7 Pieces</span>
              <span className="arrow-icon">↓</span>
            </button>
          </div>
        )}

        {/* PHASE 2 HINT TEXT: "Click a card to view details" */}
        {phase === 2 && (
          <div className="phase-2-hint">
            <span className="hint-sparkle">✦</span>
            <span>Click a card to view details</span>
            <span className="hint-sparkle">✦</span>
          </div>
        )}

        {/* PHASE 3: PRODUCT DETAIL PANEL */}
        {phase === 3 && (
          <div className="phase-3-panel">
            <div className="phase-3-left-stage" />

            <div className="phase-3-details">
              <h2 className="detail-title">{selectedProduct.name}</h2>

              <div className="detail-price-row">
                <span className="detail-price">{formatINR(selectedProduct.price)}</span>
              </div>

              {/* BLACK ADD TO CART BUTTON */}
              <button
                className={`add-to-cart-btn ${isAddedToCart ? 'added' : ''}`}
                onClick={handleAddToCart}
                id="addToCartBtn"
              >
                {isAddedToCart ? (
                  <>
                    <span>✓</span>
                    <span>Added to Cart!</span>
                  </>
                ) : (
                  <>
                    <span className="cart-icon">🛒</span>
                    <span className="cart-text">ADD TO CART</span>
                  </>
                )}
              </button>

              {/* PREVIOUS & NEXT PIECE BUTTONS */}
              <div className="detail-carousel-nav">
                <button
                  className="detail-nav-btn"
                  onClick={() => {
                    const prevIdx = (selectedCardIndex - 1 + PRODUCTS.length) % PRODUCTS.length;
                    setSelectedCardIndex(prevIdx);
                    setIsAddedToCart(false);
                  }}
                  aria-label="Previous Piece"
                >
                  <span className="nav-arrow">←</span>
                  <span>Previous</span>
                </button>
                <button
                  className="detail-nav-btn"
                  onClick={() => {
                    const nextIdx = (selectedCardIndex + 1) % PRODUCTS.length;
                    setSelectedCardIndex(nextIdx);
                    setIsAddedToCart(false);
                  }}
                  aria-label="Next Piece"
                >
                  <span>Next</span>
                  <span className="nav-arrow">→</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Cart Toast Notification */}
      <div className={`cart-toast ${toast.visible ? 'visible' : ''}`}>
        {toast.img && <img src={toast.img} alt="Preview" className="toast-img" />}
        <div className="toast-info">
          <span className="toast-title">{toast.title}</span>
          <span className="toast-sub">{toast.sub}</span>
        </div>
      </div>
    </div>
  );
}
