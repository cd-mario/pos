import { FaBell, FaSignOutAlt, FaUserCircle } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaSearch, FaSortAlphaDown, FaSortAlphaUp } from "react-icons/fa";

const Inventory = () => {
    const [philippineTime, setPhilippineTime] = useState("");

    // MODAL STATES
    const [selectedItem, setSelectedItem] = useState(null);
    const [editedItem, setEditedItem] = useState(null);
    const [showViewModal, setShowViewModal] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

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

    // SAMPLE DATA (replace with API later)
    const [items, setItems] = useState([
        { id: 1001, product: "Tubes", available: 2, price: 200 },
        { id: 1002, product: "Bolts", available: 50, price: 300 },
    ]);

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
        setEditedItem({ ...editedItem, [name]: value });
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
                            <input type="text" placeholder="Search products..." />
                        </div>

                        <button className="sort-btn">
                            <FaSortAlphaDown />
                            <span>A–Z</span>
                        </button>

                        <button className="sort-btn">
                            <FaSortAlphaUp />
                            <span>Z–A</span>
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
                                    {items.map((item) => (
                                        <tr key={item.id}>
                                            <th>{item.id}</th>
                                            <td>{item.product}</td>
                                            <td>{item.available}</td>
                                            <td>{item.price}</td>
                                            <td>
                                                <button
                                                    className="btn btn-sm btn-outline-secondary"
                                                    style={{ marginRight: "10px" }}
                                                    onClick={() => handleView(item)}
                                                >
                                                    View
                                                </button>
                                                <button class="btn btn-sm btn-outline-danger">Delete</button>
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
                <div className="modal-overlay" onClick={() => setShowViewModal(false)}>
                    <div className="modal-card" onClick={(e) => e.stopPropagation()}>

                        <h3>Inventory Item</h3>

                        <div className="modal-content">
                            <div>
                                <strong>ID:</strong>{" "}
                                {selectedItem.id}
                            </div>

                            <div>
                                <strong>Product:</strong>{" "}
                                {isEditing ? (
                                    <input
                                        name="product"
                                        value={editedItem.product}
                                        onChange={handleEditChange}
                                    />
                                ) : (
                                    selectedItem.product
                                )}
                            </div>

                            <div>
                                <strong>Available:</strong>{" "}
                                {isEditing ? (
                                    <input
                                        name="available"
                                        value={editedItem.available}
                                        onChange={handleEditChange}
                                    />
                                ) : (
                                    selectedItem.available
                                )}
                            </div>

                            <div>
                                <strong>Price:</strong>{" "}
                                {isEditing ? (
                                    <input
                                        name="price"
                                        value={editedItem.price}
                                        onChange={handleEditChange}
                                    />
                                ) : (
                                    selectedItem.price
                                )}
                            </div>
                        </div>

                        <div className="modal-actions">

                            {!isEditing ? (
                                <>
                                    <button
                                        className="btn btn-dark"
                                        onClick={() => setIsEditing(true)}
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
                                        Back
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
        </>
    );
};

export default Inventory;
