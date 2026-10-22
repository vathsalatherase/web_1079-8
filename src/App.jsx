
import { useMemo, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useNavigate
} from "react-router-dom";
import "./App.css";

const phones = [
  {
    id: 1,
    brand: "Apple",
    name: "iPhone 16",
    specs: "128 GB | Advanced Camera",
    price: 79900,
    oldPrice: 89900,
    offer: "SPECIAL OFFER",
    color: "pink",
    image: "/images/apple.jpg"
  },
  {
    id: 2,
    brand: "Samsung",
    name: "Galaxy S24",
    specs: "256 GB | AMOLED Display",
    price: 69999,
    oldPrice: 79999,
    offer: "BEST SELLER",
    color: "blue",
    image: "/images/samsung-2.jpg"
  },
  {
    id: 3,
    brand: "Google",
    name: "Google Pixel",
    specs: "128 GB | Smart Camera",
    price: 59999,
    oldPrice: 69999,
    offer: "NEW ARRIVAL",
    color: "green",
    image: "/images/gphone.jpg"
  },
  {
    id: 4,
    brand: "OnePlus",
    name: "OnePlus 12R",
    specs: "256 GB | Fast Charging",
    price: 42999,
    oldPrice: 49999,
    offer: "GREAT VALUE",
    color: "orange",
    image: "/images/oneplus.jpg"
  }
];

const money = (value) =>
  "₹" + value.toLocaleString("en-IN");

// Navigation bar
function Header({ cartCount, openAuth }) {
  return (
    <header className="site-header">
      <Link className="logo" to="/">
        PHONE<span>PROMO</span>
      </Link>

      <nav>
        <Link to="/">Home</Link>
        <Link to="/phones">Phones</Link>
        <Link to="/offers">Offers</Link>

        <button
          className="account-btn"
          onClick={() => openAuth("signin")}
        >
          Sign In
        </button>

        <button
          className="account-btn signup-btn"
          onClick={() => openAuth("signup")}
        >
          Sign Up
        </button>

        <Link className="cart" to="/cart">
          🛒 Cart ({cartCount})
        </Link>
      </nav>
    </header>
  );
}

// Smartphone product card
function PhoneCard({ phone, addToCart, showDetails }) {
  const [imageError, setImageError] = useState(false);

  return (
    <article className="phone-card">
      <div className={`phone-image ${phone.color}`}>
        <span className="offer-tag">{phone.offer}</span>

        {!imageError ? (
          <img
            src={phone.image}
            alt={phone.name}
            className="product-photo"
            onError={() => setImageError(true)}
          />
        ) : (
          <span className="fallback-phone" aria-label={phone.name}>
            📱
          </span>
        )}
      </div>

      <div className="card-content">
        <p className="brand">{phone.brand}</p>
        <h3>{phone.name}</h3>
        <p className="specs">{phone.specs}</p>

        <p className="price-line">
          <strong>{money(phone.price)}</strong>{" "}
          <del>{money(phone.oldPrice)}</del>
        </p>

        <div className="actions">
          <button
            className="add"
            onClick={() => addToCart(phone)}
          >
            Add to Cart
          </button>

          <button
            className="details"
            onClick={() => showDetails(phone)}
          >
            Details
          </button>
        </div>
      </div>
    </article>
  );
}

// Product collection with search, filtering and sorting
function PhoneCollection({ addToCart, showDetails }) {
  const [search, setSearch] = useState("");
  const [brand, setBrand] = useState("all");
  const [sort, setSort] = useState("default");

  const filteredPhones = useMemo(() => {
    let result = phones.filter(
      (phone) =>
        (
          phone.name.toLowerCase().includes(search.toLowerCase()) ||
          phone.brand.toLowerCase().includes(search.toLowerCase())
        ) &&
        (brand === "all" || phone.brand === brand)
    );

    if (sort === "low") {
      result.sort((a, b) => a.price - b.price);
    }

    if (sort === "high") {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [search, brand, sort]);

  return (
    <section className="collection" id="phones">
      <h2 className="section-title">
        Our <span>Phone Collection</span>
      </h2>

      <p className="description">
        Explore the latest smartphones at special prices!
      </p>

      <div className="controls">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search phones or brands..."
          aria-label="Search phones"
        />

        <select
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          aria-label="Filter by brand"
        >
          <option value="all">All Brands</option>
          <option value="Apple">Apple</option>
          <option value="Samsung">Samsung</option>
          <option value="Google">Google</option>
          <option value="OnePlus">OnePlus</option>
        </select>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          aria-label="Sort by price"
        >
          <option value="default">Featured Phones</option>
          <option value="low">Price: Low to High</option>
          <option value="high">Price: High to Low</option>
        </select>
      </div>

      {filteredPhones.length > 0 ? (
        <div className="products">
          {filteredPhones.map((phone) => (
            <PhoneCard
              key={phone.id}
              phone={phone}
              addToCart={addToCart}
              showDetails={showDetails}
            />
          ))}
        </div>
      ) : (
        <p className="empty-message">
          No phones found. Please try another search!
        </p>
      )}
    </section>
  );
}

// Benefits section
function Benefits() {
  return (
    <section className="benefits" id="offers">
      <div className="benefit">
        <div className="emoji">🚚</div>
        <h3>Free Delivery</h3>
        <p>Enjoy free standard delivery on eligible orders.</p>
      </div>

      <div className="benefit">
        <div className="emoji">🎁</div>
        <h3>Special Offers</h3>
        <p>Discover exciting deals on selected smartphones.</p>
      </div>

      <div className="benefit">
        <div className="emoji">💬</div>
        <h3>Customer Support</h3>
        <p>Compare phone features and choose your ideal device.</p>
      </div>
    </section>
  );
}

// Home page
function Home({ addToCart, showDetails }) {
  const navigate = useNavigate();
  const [heroImageError, setHeroImageError] = useState(false);

  return (
    <>
      <section className="hero" id="home">
        <div className="hero-content">
          <h4>THE SMARTPHONE SALE</h4>

          <h1>
            Your Style.
            <br />
            <span>Your Phone.</span>
          </h1>

          <p>
            Discover stunning smartphones, vibrant colours,
            amazing cameras and exciting promotional deals.
            Find your perfect phone at PhonePromo!
          </p>

          <button
            className="shop-btn"
            onClick={() => navigate("/phones")}
          >
            Explore Deals ↓
          </button>
        </div>

        {!heroImageError && (
          <img
            className="hero-image"
            src="/images/apple.jpg"
            alt="Smartphone"
            onError={() => setHeroImageError(true)}
          />
        )}
      </section>

      <main>
        <PhoneCollection
          addToCart={addToCart}
          showDetails={showDetails}
        />
        <Benefits />
      </main>
    </>
  );
}

// Sign-in and sign-up modal
function AuthModal({ mode, close, switchMode, notify }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: ""
  });

  if (!mode) return null;

  const signup = mode === "signup";

  function submit(e) {
    e.preventDefault();

    if (signup && !/^[A-Za-z ]+$/.test(form.name.trim())) {
      return notify("Please enter a valid name.");
    }

    if (signup && !/^\d{10}$/.test(form.phone)) {
      return notify("Enter exactly 10 digits for your phone number.");
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      return notify("Please enter a valid email address.");
    }

    if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(form.password)
    ) {
      return notify(
        "Password needs uppercase, lowercase, a number and 8 characters."
      );
    }

    notify(
      signup
        ? `Welcome to PhonePromo, ${form.name}! Demo sign-up successful.`
        : "Sign-in form is valid. Account verification requires a backend."
    );

    setForm({
      name: "",
      email: "",
      phone: "",
      password: ""
    });

    close();
  }

  return (
    <div
      className="overlay"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) close();
      }}
    >
      <section
        className="auth-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="authTitle"
      >
        <button
          className="close-modal"
          onClick={close}
          aria-label="Close"
        >
          ×
        </button>

        <h2 id="authTitle">
          {signup ? "Create Account" : "Welcome Back!"}
        </h2>

        <p className="form-description">
          {signup
            ? "Fill in the details to join PhonePromo."
            : "Sign in to your PhonePromo account."}
        </p>

        <form onSubmit={submit} className="auth-form">
          {signup && (
            <>
              <label>Full Name *</label>
              <input
                value={form.name}
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
                placeholder="Enter your full name"
                pattern="[A-Za-z ]+"
                title="Use letters and spaces only"
                required
              />
            </>
          )}

          <label>Email Address *</label>
          <input
            type="email"
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
            placeholder="Enter your email"
            required
          />

          {signup && (
            <>
              <label>Phone Number *</label>
              <input
                type="tel"
                value={form.phone}
                onChange={(e) =>
                  setForm({ ...form, phone: e.target.value })
                }
                placeholder="10-digit phone number"
                inputMode="numeric"
                pattern="[0-9]{10}"
                maxLength={10}
                required
              />
            </>
          )}

          <label>Password *</label>
          <input
            type="password"
            value={form.password}
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
            placeholder="At least 8 characters"
            minLength={8}
            required
          />

          <button className="submit-account" type="submit">
            {signup ? "Create Account" : "Sign In"}
          </button>
        </form>

        <p className="switch-form">
          {signup
            ? "Already have an account?"
            : "Don't have an account?"}{" "}
          <button
            onClick={() => switchMode(signup ? "signin" : "signup")}
          >
            {signup ? "Sign In" : "Sign Up"}
          </button>
        </p>
      </section>
    </div>
  );
}

// Shopping cart page
function CartPage({ cart, removeFromCart }) {
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <main className="page-content">
      <h2 className="section-title">
        Your <span>Shopping Cart</span>
      </h2>

      {cart.length === 0 ? (
        <p className="empty-message">
          Your cart is empty. Visit the Phones page to add a smartphone.
        </p>
      ) : (
        <>
          <div className="cart-list">
            {cart.map((item, index) => (
              <div
                className="cart-row"
                key={`${item.id}-${index}`}
              >
                <div>
                  <strong>{item.name}</strong>
                  <p>{item.brand}</p>
                </div>

                <strong>{money(item.price)}</strong>

                <button
                  className="details"
                  onClick={() => removeFromCart(index)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <h3 className="cart-total">Total: {money(total)}</h3>

          <p className="description">
            This is a demonstration cart; checkout is not connected
            to a payment service.
          </p>
        </>
      )}
    </main>
  );
}

// Main application
function AppContent() {
  const [cart, setCart] = useState([]);
  const [authMode, setAuthMode] = useState(null);
  const [notice, setNotice] = useState("");

  function notify(message) {
    setNotice(message);
    window.setTimeout(() => setNotice(""), 3000);
  }

  function addToCart(phone) {
    setCart((current) => [...current, phone]);
    notify(`${phone.name} added to your cart!`);
  }

  function showDetails(phone) {
    notify(
      `${phone.name} | ${phone.brand} | ${money(phone.price)} | ${phone.specs}`
    );
  }

  return (
    <>
      <Header
        cartCount={cart.length}
        openAuth={setAuthMode}
      />

      <Routes>
        <Route
          path="/"
          element={
            <Home
              addToCart={addToCart}
              showDetails={showDetails}
            />
          }
        />

        <Route
          path="/phones"
          element={
            <main>
              <PhoneCollection
                addToCart={addToCart}
                showDetails={showDetails}
              />
            </main>
          }
        />

        <Route
          path="/offers"
          element={
            <main className="page-content">
              <h2 className="section-title">
                Special <span>Offers</span>
              </h2>
              <p className="description">
                Explore savings on selected smartphones and enjoy
                eligible free delivery.
              </p>
              <Benefits />
            </main>
          }
        />

        <Route
          path="/cart"
          element={
            <CartPage
              cart={cart}
              removeFromCart={(index) =>
                setCart((current) =>
                  current.filter((_, i) => i !== index)
                )
              }
            />
          }
        />

        <Route
          path="*"
          element={
            <main className="page-content">
              <h2>Page not found</h2>
              <Link to="/">Return Home</Link>
            </main>
          }
        />
      </Routes>

      <footer>
        <h3>PHONEPROMO</h3>
        <p>Your Style. Your Phone. Your Deal.</p>
        <p>Ex. No. 09 – Modern User Interface Design Using ReactJS</p>
      </footer>

      <AuthModal
        mode={authMode}
        close={() => setAuthMode(null)}
        switchMode={setAuthMode}
        notify={notify}
      />

      {notice && (
        <div className="notice" role="status">
          {notice}
        </div>
      )}
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
