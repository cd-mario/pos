import { FaBell, FaSignOutAlt, FaUserCircle } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaSearch, FaSortAlphaDown } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";
const Pos = () => {
  const [philippineTime, setPhilippineTime] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [showQtyModal, setShowQtyModal] = useState(false);
  const [selectedForCart, setSelectedForCart] = useState(null);
  const [inputQty, setInputQty] = useState(1);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); 

  const [cart, setCart] = useState([]);

  // 🔥 RECEIPT MODAL
  const [showReceipt, setShowReceipt] = useState(false);

  useEffect(() => {
  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/products");

      setProducts(res.data);
      setLoading(false);

    } catch (error) {
      console.error("Error fetching products:", error);
      setLoading(false);
    }
  };

  fetchProducts();
}, []);

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

    const confirmAddToCart = () => {
      if (!selectedForCart || inputQty <= 0) return;

      // optional: prevent exceeding stock
      if (inputQty > selectedForCart.quantity) {
        toast.error("Not enough stock!");
        return;
      }

      setCart((prev) => {
        const existing = prev.find(
          (item) => item._id === selectedForCart._id
        );

        if (existing) {
          return prev.map((item) =>
            item._id === selectedForCart._id
              ? { ...item, qty: item.qty + Number(inputQty) }
              : item
          );
        }

        return [
          ...prev,
          { ...selectedForCart, qty: Number(inputQty) }
        ];
      });

  setShowQtyModal(false);
  setSelectedForCart(null);
};

    const handleRemove = (id) => {
      setCart((prev) => prev.filter((item) => item._id !== id));
    };

  const subtotal = cart.reduce((sum, item) => sum + item.qty * item.price, 0);

  const filteredProducts = products.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category?.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                <button className="sort-btn">
                  <FaSortAlphaDown />
                  <span>A–Z</span>
                </button>

                <NavLink to="/addproduct"><button className="btn btn-primary">Add more product</button></NavLink>
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
                  {filteredProducts.map((item) => (
                    <div key={item._id} className="product-card">

                      {/* ✅ ALWAYS render this */}
                      <div className="card-image">
                        {item.image ? (
                          <img
                            src={`http://localhost:8000/${item.image}`}
                            alt={item.name}
                          />
                        ) : (
                          <div className="no-image">
                            No Image
                          </div>
                        )}
                      </div>

                      <div className="card-top">
                        <span className="product-id">#{item._id.slice(-5)}</span>

                        <span className={`stock ${item.quantity < 5 ? "low" : ""}`}>
                          {item.quantity} in stock
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
                            onClick={() => {
                              setSelectedForCart(item);
                              setInputQty(1);
                              setShowQtyModal(true);
                            }}
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
                          onClick={() => handleRemove(item._id)}
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
                Checkout
              </button>

            </div>
          </div>
        </div>
      </div>

      {/* RECEIPT MODAL */}
{showReceipt && (
  <div className="modal-overlay" onClick={() => setShowReceipt(false)}>
    <div
      className="modal-card receipt-card"
      onClick={(e) => e.stopPropagation()}
    >

      <div className="receipt">

        {/* HEADER */}
        <div className="receipt-header">
          <h4>Tire Center POS</h4>
          <p>Official Receipt</p>
          <p>{new Date().toLocaleString()}</p>
        </div>

        <div className="divider">--------------------------------</div>

        {/* ITEMS */}
        <div className="receipt-items">
          {cart.map((item) => (
            <div key={item._id} className="receipt-row">

              <div className="left">
                <span className="name">{item.name}</span>
                <span className="qty">
                  {item.qty} × ₱{item.price}
                </span>
              </div>

              <div className="right">
                ₱{item.qty * item.price}
              </div>

            </div>
          ))}
        </div>

        <div className="divider">--------------------------------</div>

        {/* TOTALS (FIXED ALIGNMENT) */}
        <div className="receipt-totals">

          <div className="total-row">
            <span>Subtotal</span>
            <span>₱{subtotal}</span>
          </div>

          <div className="total-row grand-total">
            <span>Total</span>
            <span>₱{subtotal}</span>
          </div>

        </div>

        <div className="divider">--------------------------------</div>

      </div>

      {/* ACTIONS */}
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
      {loading ? (
        <div className="loading">
          <div className="spinner"></div>
          <p>Loading products...</p>
        </div>
      ) : (
        <div className="product-grid">
          {/* map here */}
        </div>
      )}

      {showModal && selectedProduct && (
  <div className="modal-overlay" onClick={() => setShowModal(false)}>
    <div className="modal-card" onClick={(e) => e.stopPropagation()}>

      <h3>Product Details</h3>

      <div className="modal-content">

        {/* IMAGE FIRST (better UX) */}
        {selectedProduct?.image && (
          <div style={{ marginBottom: "15px", textAlign: "center" }}>
            <img
              src={`http://localhost:8000/${selectedProduct.image}`}
              alt="product"
              style={{
                width: "100%",
                maxWidth: "250px",
                height: "200px",
                objectFit: "cover",
                borderRadius: "10px",
                border: "1px solid #ddd"
              }}
            />
          </div>
        )}

        {/* DETAILS */}
        <div><strong>ID:</strong> {selectedProduct._id}</div>
        <div><strong>Product:</strong> {selectedProduct.name}</div>
        <div><strong>Category:</strong> {selectedProduct.category}</div>
        <div><strong>Price:</strong> ₱{selectedProduct.price}</div>
        <div><strong>Stock:</strong> {selectedProduct.quantity}</div>

      </div>

      <div className="modal-actions">
        <button
          className="btn-primary"
          onClick={() => setShowModal(false)}
        >
          Close
        </button>
      </div>

    </div>
  </div>
)}

    {showQtyModal && selectedForCart && (
      <div
        className="modal-overlay"
        onClick={() => setShowQtyModal(false)}
      >
        <div
          className="modal-card"
          onClick={(e) => e.stopPropagation()}
          style={{ maxWidth: "400px" }}
        >
          <h3>Add to Cart</h3>

          <div className="modal-content">

            <div style={{ marginBottom: "10px" }}>
              <strong>{selectedForCart.name}</strong>
            </div>

            <div style={{ marginBottom: "10px" }}>
              Price: ₱{selectedForCart.price}
            </div>

            <div style={{ marginBottom: "10px" }}>
              Stock: {selectedForCart.quantity}
            </div>

            {/* INPUT */}
            <div style={{ marginTop: "15px" }}>
              <label>Quantity</label>
              <input
                type="number"
                min="1"
                max={selectedForCart.quantity}
                value={inputQty}
                onChange={(e) => setInputQty(e.target.value)}
                style={{
                  width: "100%",
                  padding: "8px",
                  marginTop: "5px"
                }}
              />
            </div>

          </div>

          <div className="modal-actions">
            <button
              className="btn-secondary"
              onClick={() => setShowQtyModal(false)}
            >
              Cancel
            </button>

            <button
              className="btn-primary"
              onClick={confirmAddToCart}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    )}
    </>
  );
};

export default Pos;
