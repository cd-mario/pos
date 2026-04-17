import { FaBell, FaSignOutAlt, FaUserCircle } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
const Forecasting = () => {

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
                    <h4>Analytics</h4>
                    <div className="time">{philippineTime}</div>
                </div>
                <hr />

                <div style={{textAlign: 'center', marginTop: '100px'}}>
                <h5 class="fw-bold">Feature not available yet :(</h5>
                <p>This feature is currently not available.</p>
                <NavLink to="/"><button class="btn btn-primary">Home</button></NavLink>
            </div>
        </div>
    </div>
     );
}
 
export default Forecasting;