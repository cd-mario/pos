import { FaBell, FaSignOutAlt, FaUserCircle } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const AddProduct = () => {
    const [philippineTime, setPhilippineTime] = useState("");
    const [image, setImage] = useState(null);
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
        name: "",
        category: "",
        price: "",
        quantity: "",
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


    const handleConfirmSave = async () => {
        try {
            const form = new FormData();

            form.append("name", formData.name);
            form.append("category", formData.category);
            form.append("price", formData.price);
            form.append("quantity", formData.quantity);

            if (image) {
                form.append("image", image);
            }

            const res = await axios.post(
                "http://localhost:8000/api/products",
                form
            );

            toast.success("Product added successfully!");

            console.log("SUCCESS:", res.data);

            setShowModal(false);

            setFormData({
                name: "",
                category: "",
                price: "",
                quantity: ""
            });

            setImage(null);

        } catch (error) {
            console.error("ERROR:", error.response?.data || error.message);

            toast.error("Failed to add product ❌");
        }
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
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="bolts, screw, nuts"
                                />
                            </div>

                            <div className="form-group">
                                <label>Media</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => setImage(e.target.files[0])}
                                />
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
                            <div><strong>Title:</strong> {formData.name}</div>
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
                                onClick={handleConfirmSave}
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
