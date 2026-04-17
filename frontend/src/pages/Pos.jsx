import { FaBell, FaSignOutAlt, FaUserCircle } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaSearch, FaSortAlphaDown } from "react-icons/fa";

const Pos = () => {
  const [philippineTime, setPhilippineTime] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [cart, setCart] = useState([]);

  // 🔥 RECEIPT MODAL
  const [showReceipt, setShowReceipt] = useState(false);

  const [products] = useState([
    { id: 1001, name: "Hammer", price: 250, qty: 12 },
    { id: 1002, name: "Screwdriver", price: 120, qty: 30 },
    { id: 1003, name: "Wrench", price: 180, qty: 15 },
    { id: 1004, name: "Drill", price: 1500, qty: 5 },
    { id: 1005, name: "Tape Measure", price: 90, qty: 20 },
    { id: 1006, name: "Pliers", price: 140, qty: 18 },
    { id: 1007, name: "Socket Set", price: 850, qty: 7 },
    { id: 1008, name: "Angle Grinder", price: 2200, qty: 4 },
    { id: 1009, name: "Level Tool", price: 160, qty: 10 },
    { id: 1010, name: "Chainsaw", price: 3200, qty: 3 },
  ]);

  useEffect(() => {
    const updateTime = () => {
      const time = new Date().toLocaleTimeString("en-PH", {
        timeZone: "Asia/Manila",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });

      setPhilippineTime(time);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleView = (item) => {
    setSelectedProduct(item);
    setShowModal(true);
  };

  const handleAdd = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);

      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, qty: item.qty + 1 }
            : item
        );
      }

      return [...prev, { ...product, qty: 1 }];
    });
  };

  const handleRemove = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const subtotal = cart.reduce((sum, item) => sum + item.qty * item.price, 0);

  return (
    <>
      <div id="grid">
        <nav className="nav-flex">
          <p className="logo">Tire Center POS</p>

          <div className="icon-flex">
            <button className="icon-btn"><FaBell /></button>
            <button className="icon-btn"><FaSignOutAlt /></button>

            <div className="user-display">
              <FaUserCircle className="user-icon" />
              <h5>User</h5>
            </div>
          </div>
        </nav>

        <div className="sidebar">
          <ul>
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/products">Products</NavLink></li>
            <li><NavLink to="/pos">Point of sale</NavLink></li>
            <li><NavLink to="/forecasting">Forecasting</NavLink></li>
            <li><NavLink to="/analytics">Analytics</NavLink></li>
          </ul>
        </div>

        <div className="main">
          <div className="title-wrapper">
            <h4>Point of sale</h4>
            <div className="time">{philippineTime}</div>
          </div>

          <hr />

          <div className="pos-container" style={{ display: "flex", gap: "20px" }}>
            
            {/* LEFT */}
            <div className="items-wrapper" style={{ flex: 1 }}>

              <div className="search-wrapper2">
                <div className="search-box">
                  <FaSearch className="search-icon" />
                  <input type="text" placeholder="Search products..." />
                </div>

                <button className="sort-btn">
                  <FaSortAlphaDown />
                  <span>A–Z</span>
                </button>
              </div>

              <div className="category-wrapper">
                <ul className="tools">
                  {["All", "Hand tools", "Power tools", "Measuring tools", "Engine tools", "Maintenance tools"].map((cat) => (
                    <li
                      key={cat}
                      className={activeCategory === cat ? "active" : ""}
                      onClick={() => setActiveCategory(cat)}
                    >
                      {cat}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="product-grid">
                {products.map((item) => (
                  <div key={item.id} className="product-card">

                    <div className="card-top">
                      <span className="product-id">#{item.id}</span>
                      <span className={`stock ${item.qty < 5 ? "low" : ""}`}>
                        {item.qty} in stock
                      </span>
                    </div>

                    <h4 className="product-title">{item.name}</h4>

                    <div className="card-bottom">
                      <span className="price">₱{item.price}</span>

                      <div className="actions">
                        <button
                          className="btn-view"
                          onClick={() => handleView(item)}
                        >
                          View
                        </button>

                        <button
                          className="btn-add"
                          onClick={() => handleAdd(item)}
                        >
                          Add
                        </button>
                      </div>
                    </div>

                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT - TRANSACTION */}
            <div className="transaction-wrapper">

              <h4>Transaction</h4>

              <div className="receipt-list">
                {cart.length === 0 ? (
                  <p className="empty">No items yet</p>
                ) : (
                  cart.map((item) => (
                    <div key={item.id} className="receipt-item">

                      <div className="receipt-info">
                        <span className="r-name">{item.name}</span>
                        <span className="r-qty">
                          {item.qty} × ₱{item.price}
                        </span>
                      </div>

                      <div className="receipt-actions">
                        <span className="r-total">
                          ₱{item.qty * item.price}
                        </span>

                        <button
                          className="btn-remove"
                          onClick={() => handleRemove(item.id)}
                        >
                          ✕
                        </button>
                      </div>

                    </div>
                  ))
                )}
              </div>

              <div className="receipt-summary">
                <div>
                  <span>Subtotal</span>
                  <span>₱{subtotal}</span>
                </div>

                <div className="total">
                  <span>Total</span>
                  <span>₱{subtotal}</span>
                </div>
              </div>

              <button
                className="btn-confirm"
                onClick={() => setShowReceipt(true)}
                disabled={cart.length === 0}
              >
                Confirm
              </button>

            </div>
          </div>
        </div>
      </div>

      {/* PRODUCT MODAL */}
      {showModal && selectedProduct && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <h3>Product Details</h3>

            <div className="modal-content">
              <div><strong>ID:</strong> {selectedProduct.id}</div>
              <div><strong>Product:</strong> {selectedProduct.name}</div>
              <div><strong>Price:</strong> ₱{selectedProduct.price}</div>
              <div><strong>Quantity:</strong> {selectedProduct.qty}</div>
            </div>

            <div className="modal-actions">
              <button className="btn-primary" onClick={() => setShowModal(false)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* RECEIPT MODAL */}
      {showReceipt && (
        <div className="modal-overlay" onClick={() => setShowReceipt(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>

            <h3>Receipt</h3>

            <div className="modal-content">
              {cart.map((item) => (
                <div key={item.id}>
                  {item.name} ({item.qty}) — ₱{item.qty * item.price}
                </div>
              ))}
            </div>

            <hr />

            <div className="modal-content">
              <div><strong>Subtotal:</strong> ₱{subtotal}</div>
              <div><strong>Total:</strong> ₱{subtotal}</div>
            </div>

            <div className="modal-actions">
              <button
                className="btn-secondary"
                onClick={() => setShowReceipt(false)}
              >
                Back
              </button>

              <button
                className="btn-primary"
                onClick={() => {
                  alert("Transaction Complete!");
                  setCart([]);
                  setShowReceipt(false);
                }}
              >
                Complete
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
};

export default Pos;
