import { FaBell, FaSignOutAlt, FaUserCircle } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";

const AddProduct = () => {
    const [philippineTime, setPhilippineTime] = useState("");

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

    const [formData, setFormData] = useState({
        title: "",
        category: "",
        price: "",
        quantity: "",
        variants: "",
    });

    const [showModal, setShowModal] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setShowModal(true);
    };

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
                        <h4>Add product</h4>
                        <div className="time">{philippineTime}</div>
                    </div>

                    <hr />

                    <div className="add-product-wrapper mb-3">
                        <h3>Add Product</h3>
                        <hr />

                        <form className="product-form" onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Product title</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    placeholder="bolts, screw, nuts"
                                />
                            </div>

                            <div className="form-group">
                                <label>Media</label>
                                <input type="file" accept="image/*" />
                                <small>Accepts product image (optional)</small>
                            </div>

                            <div className="form-group">
                                <label>Category</label>
                                <select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                >
                                    <option value="">Select product category</option>
                                    <option>Hand Tools</option>
                                    <option>Power Tools</option>
                                    <option>Electrical Supplies</option>
                                    <option>Plumbing Supplies</option>
                                    <option>Paints & Coatings</option>
                                    <option>Construction Materials</option>
                                    <option>Fasteners & Screws</option>
                                    <option>Safety Equipment</option>
                                    <option>Garden Tools</option>
                                    <option>Adhesives & Sealants</option>
                                </select>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label>Price</label>
                                    <input
                                        type="number"
                                        name="price"
                                        value={formData.price}
                                        onChange={handleChange}
                                        placeholder="₱0.00"
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Quantity</label>
                                    <input
                                        type="number"
                                        name="quantity"
                                        value={formData.quantity}
                                        onChange={handleChange}
                                        placeholder="0"
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Variants</label>
                                <input
                                    type="text"
                                    name="variants"
                                    value={formData.variants}
                                    onChange={handleChange}
                                    placeholder="Size, color, dimension..."
                                />
                            </div>

                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <button type="submit" className="submit-btn">
                                    Save product
                                </button>

                                <NavLink to="/products">
                                    <button type="button" className="btn btn-outline-dark">
                                        Back
                                    </button>
                                </NavLink>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            {/* MODAL */}
            {showModal && (
                <div
                    className="modal-overlay"
                    onClick={() => setShowModal(false)}
                >
                    <div
                        className="modal-card"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h3>Confirm Product</h3>
                        <p className="modal-sub">
                            Review details before saving
                        </p>

                        <div className="modal-content">
                            <div><strong>Title:</strong> {formData.title}</div>
                            <div><strong>Category:</strong> {formData.category}</div>
                            <div><strong>Price:</strong> ₱{formData.price}</div>
                            <div><strong>Quantity:</strong> {formData.quantity}</div>
                            <div><strong>Variants:</strong> {formData.variants}</div>
                        </div>

                        <div className="modal-actions">
                            <button
                                className="btn-secondary"
                                onClick={() => setShowModal(false)}
                            >
                                Cancel
                            </button>

                            <button
                                className="btn-primary"
                                onClick={() => {
                                    console.log("Saved:", formData);
                                    setShowModal(false);
                                }}
                            >
                                Confirm Save
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default AddProduct;
