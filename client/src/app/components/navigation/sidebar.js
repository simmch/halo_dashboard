import React, { Component, useState, useEffect } from 'react';
import { Link, withRouter, Redirect } from 'react-router-dom';
import { Collapse, Dropdown } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Trans } from 'react-i18next';
import { logout } from '../../actions/auth/auth';

const Sidebar = (props) => {
  const { auth } = props;

  const logoutUser = (e) => {
    e.preventDefault();
    logout();
  }

  const [menuState, setMenuState] = useState({});

  const toggleMenuState = (menuPath) => {
    if (menuState[menuPath]) {
      setMenuState({ [menuPath]: false });
    } else if (Object.keys(menuState).length === 0) {
      setMenuState({ [menuPath]: true });
    } else {
      Object.keys(menuState).forEach((i) => {
        setMenuState({ [i]: false });
      });
      setMenuState({ [menuPath]: true });
    }
  };

  const onRouteChanged = () => {
    document.querySelector("#sidebar").classList.remove("active");
    Object.keys(menuState).forEach((i) => {
      setMenuState({ [i]: false });
    });

    const dropdownPaths = [
      { path: "/apps", state: "appsMenuOpen" },
      { path: "/basic-ui", state: "basicUiMenuOpen" },
      { path: "/advanced-ui", state: "advancedUiMenuOpen" },
      { path: "/form-elements", state: "formElementsMenuOpen" },
      { path: "/tables", state: "tablesMenuOpen" },
      { path: "/maps", state: "mapsMenuOpen" },
      { path: "/icons", state: "iconsMenuOpen" },
      { path: "/charts", state: "chartsMenuOpen" },
      { path: "/user-pages", state: "userPagesMenuOpen" },
      { path: "/error-pages", state: "errorPagesMenuOpen" },
      { path: "/general-pages", state: "generalPagesMenuOpen" },
      { path: "/ecommerce", state: "ecommercePagesMenuOpen" },
      { path: "/editors", state: "editorsMenuOpen" },
    ];

    dropdownPaths.forEach((obj) => {
      if (isPathActive(obj.path)) {
        setMenuState({ [obj.state]: true });
      }
    });
  };

  const isPathActive = (path) => {
    return props.location.pathname.startsWith(path);
  };

  useEffect(() => {
    if (auth.user) {
      onRouteChanged();
      // add class 'hover-open' to sidebar navitem while hover in sidebar-icon-only menu
      const body = document.querySelector("body");
      document.querySelectorAll(".sidebar .nav-item").forEach((el) => {
        el.addEventListener("mouseover", function () {
          if (body.classList.contains("sidebar-icon-only")) {
            el.classList.add("hover-open");
          }
        });
        el.addEventListener("mouseout", function () {
          if (body.classList.contains("sidebar-icon-only")) {
            el.classList.remove("hover-open");
          }
        });
      });
    }

  }, []);

  useEffect((prevProps) => {
    if (auth.user) {
      if (props.location.pathname !== props.history.location.pathname) {
        onRouteChanged();
      }
    }

  }, []);



  return auth.user === null ? (
    <div></div>
  ) : (
      <nav className="sidebar sidebar-offcanvas" id="sidebar">
        <div className="sidebar-brand-wrapper d-none d-lg-flex align-items-center justify-content-center fixed-top">
          <a className="sidebar-brand brand-logo" href="/dashboard">
            <img src={require("../../../assets/images/halo_logo.png")} alt="logo" />
          </a>
          <a className="sidebar-brand brand-logo-mini" href="/dashboard">
            <img
              src={require("../../../assets/images/halo_logo.png")}
              alt="logo"
            />
          </a>
        </div>
        <ul className="nav">
          <li className="nav-item profile">
            <div className="profile-desc">
              <div className="profile-name">
                <h5 className="mb-0 font-weight-normal">
                  <Trans>{auth.user.name}</Trans>
                </h5>
                <span>
                  <Trans>Admin</Trans>
                </span>
              </div>
            </div>
          </li>
          <li className="nav-item nav-category">
            <span className="nav-link">
              <Trans>Navigation</Trans>
            </span>
          </li>
          <li
            className={
              isPathActive("/dashboard")
                ? "nav-item menu-items active"
                : "nav-item menu-items"
            }
          >
            <Link className="nav-link" to="/dashboard">
              <span className="menu-icon">
                <i className="mdi mdi-speedometer"></i>
              </span>
              <span className="menu-title">
                <Trans>Dashboard</Trans>
              </span>
            </Link>
          </li>
          <li
            className={
              isPathActive("/upload")
                ? "nav-item menu-items active"
                : "nav-item menu-items"
            }
          >
            <Link className="nav-link" to="/upload">
              <span className="menu-icon">
                <i className="mdi mdi-upload"></i>
              </span>
              <span className="menu-title">Upload</span>
            </Link>
          </li>
          <li
            className={
              isPathActive("/download")
                ? "nav-item menu-items active"
                : "nav-item menu-items"
            }
          >

            <Link className="nav-link" to="/download">
              <span className="menu-icon">
                <i className="mdi mdi-download"></i>
              </span>
              <span className="menu-title">
                <Trans>Download</Trans>
              </span>
            </Link>
          </li>
          <li
            className={
              isPathActive("/employees")
                ? "nav-item menu-items active"
                : "nav-item menu-items"
            }
          >
            <Link className="nav-link" to="/employees">
              <span className="menu-icon">
                <i className="mdi mdi-account-multiple"></i>
              </span>
              <span className="menu-title">
                <Trans>Employees</Trans>
              </span>
            </Link>
          </li>
        </ul>
      </nav>
    );
};


const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(withRouter(Sidebar));