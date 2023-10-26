import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../actions/auth';
import PropTypes from 'prop-types';


const Navabr = ({ auth:{ isAuthenticated, loading }, logout}) => {
    const authLinks = (
        <ul>
          <li>
            <Link to="/posts">Posts</Link>
          </li>
          <li>
            <Link to="/dashboard">
              <i className="fas fa-user" />{' '}
              <span className="hide-sm">Dashboard</span>
            </Link>
          </li>
          <li>
            <Link to="/login" onClick={logout}>
                <i className="fas fa-sign-out-alt" />{' '}
                <span className="hide-sm">Logout</span>
            </Link>
          </li>
        </ul>
      );
    
      const guestLinks = (
        <ul>
          <li>
            <Link to="/register">Register</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>
      );
    return (
        <nav className="navbar bg-dark">
            <h1>
                <Link to="/">
                    <i className="fas fa-code" /> Alauddin
                </Link>
            </h1>
            { !loading && (<Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>) }
        </nav>
    )
}
Navabr.propTypes = {
  //setAlert: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logout })(Navabr);