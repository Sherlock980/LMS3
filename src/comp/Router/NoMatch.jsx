import React from 'react';
import { Link } from 'react-router-dom';

const NoMatch = () => {
  return (
    <div className="container mt-5 pt-5">
      <section className='NoMatch'>
        <h1>404 - Not Found!</h1>
        <p>Sorry, the page you are looking for does not exist.</p>
        <p>You can always go back to the <Link to="/" className='social-link'>Homepage</Link>.</p>
      </section>
    </div>
  );
};

export default NoMatch;
