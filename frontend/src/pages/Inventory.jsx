import { FaBell, FaSignOutAlt, FaUserCircle } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaSearch, FaSortAlphaDown, FaSortAlphaUp } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";


const Inventory = () => {
    const [philippineTime, setPhilippineTime] = useState("");
    const [searchTerm, setSearchTerm] = useState("");

    // MODAL STATES
    const [selectedItem, setSelectedItem] = useState(null);
    const [editedItem, setEditedItem] = useState(null);
    const [showViewModal, setShowViewModal] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteId, setDeleteId] = useState(null);

    const handleDeleteClick = (id) => {
        setDeleteId(id);
        setShowDeleteModal(true);
    };

    const confirmDelete = async () => {
    try {
            await axios.delete(`http://localhost:8000/api/products/${deleteId}`);

            setItems((prev) => prev.filter(item => item._id !== deleteId));

            toast.success("Product deleted🗑️");

            setShowDeleteModal(false);
            setDeleteId(null);

        } catch (error) {
            console.error(error);
            toast.error("Failed to delete product ❌");
        }
    };

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

    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    // OPEN VIEW MODAL
    const handleView = (item) => {
        setSelectedItem(item);
        setEditedItem(item);
        setShowViewModal(true);
        setIsEditing(false);
    };

    // HANDLE EDIT CHANGE
        const handleEditChange = (e) => {
            const { name, value } = e.target;

            setEditedItem({
                ...editedItem,
                [name]: value
            });
        };
    // OPEN CONFIRM MODAL
    const handleSaveEdit = () => {
        setShowConfirmModal(true);
    };

    // CONFIRM UPDATE
    const confirmUpdate = () => {
        setItems((prev) =>
            prev.map((it) =>
                it.id === editedItem.id ? editedItem : it
            )
        );

        setShowConfirmModal(false);
        setShowViewModal(false);
        setIsEditing(false);
    };

    useEffect(() => {
    const fetchProducts = async () => {
            try {
                const res = await axios.get("http://localhost:8000/api/products");

                setItems(res.data);
                setLoading(false);

            } catch (error) {
                console.error("Failed to fetch products:", error);
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const filteredItems = items.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item._id.toLowerCase().includes(searchTerm.toLowerCase())
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
                        <h4>Inventory</h4>
                        <div className="time">{philippineTime}</div>
                    </div>

                    <hr />

                    <div className="search-wrapper">
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

                    </div>

                    <div className="inventory-wrapper">
                        <div className="table-card">
                            <table className="table table-custom mb-0">
                                <thead className="table-dark">
                                    <tr>
                                        <th>ID</th>
                                        <th>Product</th>
                                        <th>Available</th>
                                        <th>Price (₱)</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {filteredItems.map((item) => (
                                        <tr key={item._id}>
                                            <td>{item._id.slice(-5)}</td>
                                            <td>{item.name}</td>
                                            <td>{item.quantity}</td>
                                            <td>₱{item.price}</td>
                                            <td>
                                                <button
                                                    style={{marginRight: '10px'}}
                                                    className="btn btn-sm btn-outline-secondary"
                                                    onClick={() => handleView(item)}
                                                >
                                                    View
                                                </button>
                                                    <button
                                                            className="btn btn-sm btn-outline-danger"
                                                            onClick={() => handleDeleteClick(item._id)}
                                                        >
                                                            Delete
                                                    </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            {/* ================= VIEW / EDIT MODAL ================= */}
            {showViewModal && selectedItem && (
                <div
                    className="modal-overlay"
                    onClick={() => setShowViewModal(false)}
                >
                    <div
                        className="modal-card"
                        onClick={(e) => e.stopPropagation()}
                    >

                        <h3>Inventory Item</h3>

                        <div className="modal-content">

                            {/* ID */}
                            <div>
                                <strong>ID:</strong> {selectedItem._id}
                            </div>

                            {/* NAME */}
                            <div>
                                <strong>Product Name:</strong>{" "}
                                {isEditing ? (
                                    <input
                                        name="name"
                                        value={editedItem.name}
                                        onChange={handleEditChange}
                                    />
                                ) : (
                                    selectedItem.name
                                )}
                            </div>

                            {/* CATEGORY */}
                            <div>
                                <strong>Category:</strong>{" "}
                                {selectedItem.category}
                            </div>

                            {/* QUANTITY */}
                            <div>
                                <strong>Quantity:</strong>{" "}
                                {isEditing ? (
                                    <input
                                        name="quantity"
                                        type="number"
                                        value={editedItem.quantity}
                                        onChange={handleEditChange}
                                    />
                                ) : (
                                    selectedItem.quantity
                                )}
                            </div>

                            {/* PRICE */}
                            <div>
                                <strong>Price:</strong>{" "}
                                {isEditing ? (
                                    <input
                                        name="price"
                                        type="number"
                                        value={editedItem.price}
                                        onChange={handleEditChange}
                                    />
                                ) : (
                                    `₱${selectedItem.price}`
                                )}
                            </div>

                            {/* IMAGE (optional but good UX) */}
                            {selectedItem.image && (
                                <div style={{ marginTop: "10px" }}>
                                    <strong>Image:</strong>
                                    <br />
                                    <img
                                        src={`http://localhost:8000/${selectedItem.image}`}
                                        alt="product"
                                        style={{
                                            width: "100%",
                                            maxHeight: "200px",
                                            objectFit: "cover",
                                            marginTop: "8px",
                                            borderRadius: "8px"
                                        }}
                                    />
                                </div>
                            )}

                        </div>

                        {/* ACTIONS */}
                        <div className="modal-actions">

                            {!isEditing ? (
                                <>
                                    <button
                                        className="btn btn-dark"
                                        onClick={() => {
                                            setEditedItem(selectedItem); // 🔥 important fix
                                            setIsEditing(true);
                                        }}
                                    >
                                        Edit
                                    </button>

                                    <button
                                        className="btn-secondary"
                                        onClick={() => setShowViewModal(false)}
                                    >
                                        Back
                                    </button>
                                </>
                            ) : (
                                <>
                                    <button
                                        className="btn btn-primary"
                                        onClick={handleSaveEdit}
                                    >
                                        Save
                                    </button>

                                    <button
                                        className="btn-secondary"
                                        onClick={() => setIsEditing(false)}
                                    >
                                        Cancel
                                    </button>
                                </>
                            )}

                        </div>
                    </div>
                </div>
            )}

            {/* ================= CONFIRM MODAL ================= */}
            {showConfirmModal && (
                <div className="modal-overlay" onClick={() => setShowConfirmModal(false)}>
                    <div className="modal-card" onClick={(e) => e.stopPropagation()}>

                        <h3>Confirm Update</h3>
                        <p>Are you sure you want to save changes?</p>

                        <div className="modal-actions">
                            <button
                                className="btn-secondary"
                                onClick={() => setShowConfirmModal(false)}
                            >
                                Back
                            </button>

                            <button
                                className="btn-primary"
                                onClick={confirmUpdate}
                            >
                                Confirm
                            </button>
                        </div>

                    </div>
                </div>
            )}

            {showDeleteModal && (
    <div
        className="modal-overlay"
        onClick={() => setShowDeleteModal(false)}
    >
        <div
            className="modal-card"
            onClick={(e) => e.stopPropagation()}
        >
            <h3>Confirm Delete</h3>
            <p>Are you sure you want to delete this product?</p>

            <div className="modal-actions">
                <button
                    className="btn-secondary"
                    onClick={() => setShowDeleteModal(false)}
                >
                    Cancel
                </button>

                <button
                    className="btn btn-danger"
                    onClick={confirmDelete}
                >
                    Delete
                </button>
            </div>
        </div>
    </div>
)}
        </>
    );
};

export default Inventory;
