import { FaBell, FaSignOutAlt, FaUserCircle } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import products from '../assets/products.jpg'
import forecasts from '../assets/forecasts.jpg'
import { useEffect, useState } from "react";
const Home = () => {
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
                <li><NavLink to="products">Products</NavLink></li>
                <li><NavLink to="pos">Point of sale</NavLink></li>
                <li><NavLink to="forecasting">Forecasting</NavLink></li>
                <li><NavLink to="/analytics">Analytics</NavLink></li>
            </ul>
        </div>
        <div className="main">
            <div className="title-wrapper">
                <h4>Dashboard</h4>
                <div className="time">{philippineTime}</div>
            </div>
            <hr />
            <div className="wrapper">
                <div className="info1">
                    <div class="card" style={{width: '100%', height: '48vh', marginRight: '1rem'}}>
                        <img src={products} height={200} class="card-img-top" />
                        <div class="card-body">
                            <h5 class="card-title">Add product</h5>
                            <p class="card-text" style={{fontSize: '0.9rem'}}>Start by adding a product and a few key details.</p>
                            <NavLink to="/products"><button href="#" class="btn btn-dark">Add product</button></NavLink>
                        </div>
                </div>
                    <div class="card" style={{width: '100%', height: '48vh'}}>
                        <img src={forecasts} height={200} class="card-img-top" />
                        <div class="card-body">
                            <h5 class="card-title">Forecasting</h5>
                            <p class="card-text" style={{fontSize: '0.9rem'}}>Get insights in the Prophet forecasting engine.</p>
                            <NavLink to="/forecasting"><button href="#" class="btn btn-outline-secondary">See forecasts</button></NavLink>
                        </div>
                </div>
                </div>
                <div className="info2 mt-3">
                    <div className="metadata">
                                        <h5>Analytics</h5>  
                                            <div className="pos-meta mt-3">
                        <div className="d-flex justify-content-between mb-2">
                            <span className="text-muted">Total Sales:</span>
                            <span className="fw-semibold">₱50,</span>
                        </div>

                        <div className="d-flex justify-content-between mb-2">
                            <span className="text-muted">Transactions:</span>
                            <span className="fw-semibold">1,248</span>
                        </div>

                        <div className="d-flex justify-content-between mb-2">
                            <span className="text-muted">Revenue:</span>
                            <span className="fw-semibold">₱58,420</span>
                        </div>
                                <div className="d-flex justify-content-between">
                            <span className="text-muted">Net sales:</span>
                            <span className="fw-semibold">₱6, 200</span>
                        </div>
                    </div>
                        <NavLink to="/analytics"><button class="btn btn-primary mt-3">see analytics</button></NavLink>
                    </div>
                </div>
            </div>
        </div>
    </div>
     );
}
 
export default Home;