import React from 'react';
import { Link } from 'react-router-dom';
import "../styles/ErrorPage.css";

function ErrorPage() {
  return (
    <div className="error-page">
      <div className="card-error-page">
        <h1 className="error-code">404</h1>
        <h2 className="error-message">Page Not Found</h2>
        <p className="error-description">
          Oops! The page you are looking for doesn't exist or has been moved.
        </p>
        <Link to="/home" className="go-home">
          Go Back Home
        </Link>
      </div>
    </div>
  );
}

export default ErrorPage;
