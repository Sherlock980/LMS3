import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';

function Footer() {
  return (
    <div>
        <footer className="page-footer font-small blue pt-4 bg-light">
            <div className="container-fluid text-center text-md-left">
                <div className="row justify-content-center">
                <div className="col-md-6 mb-md-0 mb-3">
                    <h5 className="text-uppercase">Follow us on Social Media</h5>
                    <ul className="list-unstyled">
                    <li>
                        <a href="#!">
                            <FontAwesomeIcon icon={faFacebookF} /> Facebook
                        </a>
                    </li>
                    <li>
                        <a href="#!">
                            <FontAwesomeIcon icon={faTwitter} /> Twitter
                        </a>
                    </li>
                    <li>
                        <a href="#!">
                            <FontAwesomeIcon icon={faInstagram} /> Instagram
                        </a>
                    </li>
                    </ul>
                </div>
                </div>
            </div>
            <div className="text-center py-3">
                © 2024: Blizzard Snowboarding League
            </div>
        </footer>
    </div>
  )
}

export default Footer
