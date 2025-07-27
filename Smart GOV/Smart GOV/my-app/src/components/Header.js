import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "../styles/Header.css";
import { FaUserCircle } from 'react-icons/fa';
import axios from 'axios';

function Header() {
  const [data, setData] = useState(null); // State to store the JSON response
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = (e) => {
    e.stopPropagation(); // Prevents bubbling so dropdown stays open
    setIsDropdownOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!event.target.closest('.profile-dropdown')) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("authToken");
      if (!token) {
        console.error("No token found! Redirecting to login.");
        navigate("/user/login");
        return;
      }

      try {
        const response = await axios.get("http://localhost:5000/user/name", {
          headers: {
            Authorization: `${token}`, 
          },
        });
        setData(response.data); 
      } catch (error) {
        console.error("Error fetching data:", error);
        navigate("/user/login");
      }
    };

    fetchData();
  }, [navigate]); 

  const handleLogoutClick = () => {
    localStorage.clear();
    navigate("/user/login");
  };

  //Language translation
  useEffect(() => {
    const addGoogleTranslateScript = () => {
      if (!document.querySelector("script[src='https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit']")) {
        const script = document.createElement("script");
        script.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
        script.async = true;
        document.body.appendChild(script);
      }
    };
    window.googleTranslateElementInit = () => {
      if (!document.querySelector('#google_translate_element div')) {
        new window.google.translate.TranslateElement({
          pageLanguage: 'en',
          includedLanguages: 'en,hi,kn,te,ta',
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
        }, 'google_translate_element');
      }
    };

    addGoogleTranslateScript();

    return () => {
      // Cleanup any existing Google Translate elements
      const translateElement = document.querySelector('#google_translate_element');
      if (translateElement) {
        translateElement.innerHTML = '';
      }
    };
  }, []);
//end of multi-language

  return (
    <div>
      <header>
        <div className="navbar">
          <b><Link className="nav-links" to="/home">Home</Link></b>
          <b><Link className="nav-links" to="/about">About</Link></b>
          <b><Link className="nav-links" to="/handbook">Handbook</Link></b>
          <b><Link className="nav-links" to="/services">Services</Link></b>
          <b><Link className="nav-links" to="/feedback">Feedback</Link></b>
          <b><Link className="nav-links" to="/contact">Contact</Link></b>

          {/* multilanguage */}
          <div id="google_translate_element" className="translate-widget"></div>


          <div className={`profile-dropdown ${isDropdownOpen ? 'open' : ''}`}>
            <FaUserCircle className="profile-icon" onClick={toggleDropdown} />
            <div className="dropdown-menu">
              <p className="dropdown-text">
                Hi! {data && data.name ? data.name : "Guest"}
              </p>
              <button onClick={handleLogoutClick} className="logout-btn">Logout</button>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default Header;
