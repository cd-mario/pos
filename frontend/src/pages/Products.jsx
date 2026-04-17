import { FaBell, FaSignOutAlt, FaUserCircle } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import products2 from "../assets/products2.jpg"
const Products = () => {
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
    
            updateTime(); // run immediately
            const interval = setInterval(updateTime, 1000);
    
            return () => clearInterval(interval);
        }, []);
    return ( 
    <div id="grid">
        <nav className="nav-flex">
            <p className="logo">Tire Center POS</p>

            <div className="icon-flex">
            <button className="icon-btn">
                <FaBell />
            </button>

            <button className="icon-btn">
                <FaSignOutAlt />
            </button>

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
                <h4>Products</h4>
                <div className="time">{philippineTime}</div>
            </div>
            <hr />
            <div className="product-wrapper">
                <div className="add-product-container">
                    <div>
                        <h5 className="fw-bold">Add your products</h5>
                        <p className="small">Start by stocking your hardware with products your customer demands.</p>
                        <NavLink to="/addproduct"><button className="btn btn-dark btn-sm small">+ Add product</button></NavLink>
                        <hr />
                        <h6>See inventory</h6>
                        <p className="small">Click the inventory for more product info.</p>
                        <NavLink to="/inventory"><button className="btn btn-outline-secondary btn-sm small">Inventory</button></NavLink>
                    </div>
                    <img src={products2} width="300" style={{borderRadius: '0.6rem'}}/>
                </div>
            </div>
        </div>
    </div>
     );
}
 
export default Products;