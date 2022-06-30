import React from 'react';
import { BsFacebook, BsTwitter, BsYoutube, BsGithub } from 'react-icons/bs';
const Footer = () => {
  return (
    <div className="container">
      <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
        <div className="col-md-4 d-flex align-items-center">
          <a
            href="/"
            className="mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1"
          >
            <img
              style={{ height: '50px', width: '50px', borderRadius: '10px' }}
              src="https://play-lh.googleusercontent.com/edmBVFMS9fhuZycs2I6jCO7vGxhH434upOADR2e3x5Wi_s6Et4vcFY0gYs0q_B0qFS8"
              alt=""
            />
          </a>
          <span className="text-muted">
            © 2022 Programming hero, Power-Hack
          </span>
        </div>

        <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
          <li className="ms-3">
            <a className="text-muted" href="#">
              <BsFacebook style={{ fontSize: '25px' }} />
            </a>
          </li>
          <li className="ms-3">
            <a className="text-muted" href="#">
              <BsTwitter style={{ fontSize: '25px' }} />
            </a>
          </li>
          <li className="ms-3">
            <a className="text-muted" href="#">
              <BsYoutube style={{ fontSize: '25px' }} />
            </a>
          </li>
          <li className="ms-3">
            <a className="text-muted" href="#">
              <BsGithub style={{ fontSize: '25px' }} />
            </a>
          </li>
        </ul>
      </footer>
    </div>
  );
};

export default Footer;
