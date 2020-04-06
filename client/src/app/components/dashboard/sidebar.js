import React, { Component, useState, useEffect } from "react";
import { Link, withRouter, useHistory, useLocation } from "react-router-dom";
import { Collapse, Dropdown } from "react-bootstrap";
import { Trans } from "react-i18next";

const Sidebar = (props) => {
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
  }, []);

  useEffect((prevProps) => {
    console.log(props);
    if (props.location.pathname !== props.history.location.pathname) {
      onRouteChanged();
    }
  }, []);

  return (
    <nav className="sidebar sidebar-offcanvas" id="sidebar">
      <div className="sidebar-brand-wrapper d-none d-lg-flex align-items-center justify-content-center fixed-top">
        <a className="sidebar-brand brand-logo" href="index.html">
          <img src={require("../../../assets/images/logo.svg")} alt="logo" />
        </a>
        <a className="sidebar-brand brand-logo-mini" href="index.html">
          <img
            src={require("../../../assets/images/logo-mini.svg")}
            alt="logo"
          />
        </a>
      </div>
      <ul className="nav">
        <li className="nav-item profile">
          <div className="profile-desc">
            <div className="profile-pic">
              <div className="count-indicator">
                <img
                  className="img-xs rounded-circle "
                  src={require("../../../assets/images/faces/face15.jpg")}
                  alt="profile"
                />
                <span className="count bg-success"></span>
              </div>
              <div className="profile-name">
                <h5 className="mb-0 font-weight-normal">
                  <Trans>Henry Klein</Trans>
                </h5>
                <span>
                  <Trans>Gold Member</Trans>
                </span>
              </div>
            </div>
            <Dropdown alignRight>
              <Dropdown.Toggle as="a" className="cursor-pointer no-caret">
                <i className="mdi mdi-dots-vertical"></i>
              </Dropdown.Toggle>
              <Dropdown.Menu className="sidebar-dropdown preview-list">
                <a
                  href="!#"
                  className="dropdown-item preview-item"
                  onClick={(evt) => evt.preventDefault()}
                >
                  <div className="preview-thumbnail">
                    <div className="preview-icon bg-dark rounded-circle">
                      <i className="mdi mdi-settings text-primary"></i>
                    </div>
                  </div>
                  <div className="preview-item-content">
                    <p className="preview-subject ellipsis mb-1 text-small">
                      <Trans>Account settings</Trans>
                    </p>
                  </div>
                </a>
                <div className="dropdown-divider"></div>
                <a
                  href="!#"
                  className="dropdown-item preview-item"
                  onClick={(evt) => evt.preventDefault()}
                >
                  <div className="preview-thumbnail">
                    <div className="preview-icon bg-dark rounded-circle">
                      <i className="mdi mdi-onepassword  text-info"></i>
                    </div>
                  </div>
                  <div className="preview-item-content">
                    <p className="preview-subject ellipsis mb-1 text-small">
                      <Trans>Change Password</Trans>
                    </p>
                  </div>
                </a>
                <div className="dropdown-divider"></div>
                <a
                  href="!#"
                  className="dropdown-item preview-item"
                  onClick={(evt) => evt.preventDefault()}
                >
                  <div className="preview-thumbnail">
                    <div className="preview-icon bg-dark rounded-circle">
                      <i className="mdi mdi-calendar-today text-success"></i>
                    </div>
                  </div>
                  <div className="preview-item-content">
                    <p className="preview-subject ellipsis mb-1 text-small">
                      <Trans>To-do list</Trans>
                    </p>
                  </div>
                </a>
              </Dropdown.Menu>
            </Dropdown>
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
            isPathActive("/layout/RtlLayout")
              ? "nav-item menu-items active"
              : "nav-item menu-items"
          }
        >
          <Link className="nav-link" to="/layout/RtlLayout">
            <span className="menu-icon">
              <i className="mdi mdi-translate"></i>
            </span>
            <span className="menu-title">RTL</span>
          </Link>
        </li>
        <li
          className={
            isPathActive("/apps")
              ? "nav-item menu-items active"
              : "nav-item menu-items"
          }
        >
          <div
            className={
              menuState.appsMenuOpen ? "nav-link menu-expanded" : "nav-link"
            }
            onClick={() => toggleMenuState("appsMenuOpen")}
            data-toggle="collapse"
          >
            <span className="menu-icon">
              <i className="mdi mdi-cart-arrow-down"></i>
            </span>
            <span className="menu-title">
              <Trans>Apps</Trans>
            </span>
            <i className="menu-arrow"></i>
          </div>
          <Collapse in={menuState.appsMenuOpen}>
            <div>
              <ul className="nav flex-column sub-menu">
                <li className="nav-item">
                  {" "}
                  <Link
                    className={
                      isPathActive("/apps/kanban-board")
                        ? "nav-link active"
                        : "nav-link"
                    }
                    to="/apps/kanban-board"
                  >
                    <Trans>Kanban Board</Trans>
                  </Link>
                </li>
                <li className="nav-item">
                  {" "}
                  <Link
                    className={
                      isPathActive("/apps/todo-list")
                        ? "nav-link active"
                        : "nav-link"
                    }
                    to="/apps/todo-list"
                  >
                    <Trans>Todo List</Trans>
                  </Link>
                </li>
                <li className="nav-item">
                  {" "}
                  <Link
                    className={
                      isPathActive("/apps/tickets")
                        ? "nav-link active"
                        : "nav-link"
                    }
                    to="/apps/tickets"
                  >
                    <Trans>Tickets</Trans>
                  </Link>
                </li>
                <li className="nav-item">
                  {" "}
                  <Link
                    className={
                      isPathActive("/apps/chats")
                        ? "nav-link active"
                        : "nav-link"
                    }
                    to="/apps/chats"
                  >
                    <Trans>Chats</Trans>
                  </Link>
                </li>
                <li className="nav-item">
                  {" "}
                  <Link
                    className={
                      isPathActive("/apps/email")
                        ? "nav-link active"
                        : "nav-link"
                    }
                    to="/apps/email"
                  >
                    <Trans>E-mail</Trans>
                  </Link>
                </li>
                <li className="nav-item">
                  {" "}
                  <Link
                    className={
                      isPathActive("/apps/calendar")
                        ? "nav-link active"
                        : "nav-link"
                    }
                    to="/apps/calendar"
                  >
                    <Trans>Calendar</Trans>
                  </Link>
                </li>
                <li className="nav-item">
                  {" "}
                  <Link
                    className={
                      isPathActive("/apps/gallery")
                        ? "nav-link active"
                        : "nav-link"
                    }
                    to="/apps/gallery"
                  >
                    <Trans>Gallery</Trans>
                  </Link>
                </li>
              </ul>
            </div>
          </Collapse>
        </li>
        <li
          className={
            isPathActive("/widgets")
              ? "nav-item menu-items active"
              : "nav-item menu-items"
          }
        >
          <Link className="nav-link" to="/widgets">
            <span className="menu-icon">
              <i className="mdi mdi-texture"></i>
            </span>
            <span className="menu-title">
              <Trans>Widgets</Trans>
            </span>
          </Link>
        </li>
        <li
          className={
            isPathActive("/basic-ui")
              ? "nav-item menu-items active"
              : "nav-item menu-items"
          }
        >
          <div
            className={
              menuState.basicUiMenuOpen ? "nav-link menu-expanded" : "nav-link"
            }
            onClick={() => toggleMenuState("basicUiMenuOpen")}
            data-toggle="collapse"
          >
            <span className="menu-icon">
              <i className="mdi mdi-laptop"></i>
            </span>
            <span className="menu-title">
              <Trans>Basic UI Elements</Trans>
            </span>
            <i className="menu-arrow"></i>
          </div>
          <Collapse in={menuState.basicUiMenuOpen}>
            <div>
              <ul className="nav flex-column sub-menu">
                <li className="nav-item">
                  {" "}
                  <Link
                    className={
                      isPathActive("/basic-ui/accordions")
                        ? "nav-link active"
                        : "nav-link"
                    }
                    to="/basic-ui/accordions"
                  >
                    <Trans>Accordions</Trans>
                  </Link>
                </li>
                <li className="nav-item">
                  {" "}
                  <Link
                    className={
                      isPathActive("/basic-ui/buttons")
                        ? "nav-link active"
                        : "nav-link"
                    }
                    to="/basic-ui/buttons"
                  >
                    <Trans>Buttons</Trans>
                  </Link>
                </li>
                <li className="nav-item">
                  {" "}
                  <Link
                    className={
                      isPathActive("/basic-ui/badges")
                        ? "nav-link active"
                        : "nav-link"
                    }
                    to="/basic-ui/badges"
                  >
                    <Trans>Badges</Trans>
                  </Link>
                </li>
                <li className="nav-item">
                  {" "}
                  <Link
                    className={
                      isPathActive("/basic-ui/breadcrumbs")
                        ? "nav-link active"
                        : "nav-link"
                    }
                    to="/basic-ui/breadcrumbs"
                  >
                    <Trans>Breadcrumbs</Trans>
                  </Link>
                </li>
                <li className="nav-item">
                  {" "}
                  <Link
                    className={
                      isPathActive("/basic-ui/dropdowns")
                        ? "nav-link active"
                        : "nav-link"
                    }
                    to="/basic-ui/dropdowns"
                  >
                    <Trans>Dropdowns</Trans>
                  </Link>
                </li>
                <li className="nav-item">
                  {" "}
                  <Link
                    className={
                      isPathActive("/basic-ui/modals")
                        ? "nav-link active"
                        : "nav-link"
                    }
                    to="/basic-ui/modals"
                  >
                    <Trans>Modals</Trans>
                  </Link>
                </li>
                <li className="nav-item">
                  {" "}
                  <Link
                    className={
                      isPathActive("/basic-ui/progressbar")
                        ? "nav-link active"
                        : "nav-link"
                    }
                    to="/basic-ui/progressbar"
                  >
                    <Trans>Progress bar</Trans>
                  </Link>
                </li>
                <li className="nav-item">
                  {" "}
                  <Link
                    className={
                      isPathActive("/basic-ui/pagination")
                        ? "nav-link active"
                        : "nav-link"
                    }
                    to="/basic-ui/pagination"
                  >
                    <Trans>Pagination</Trans>
                  </Link>
                </li>
                <li className="nav-item">
                  {" "}
                  <Link
                    className={
                      isPathActive("/basic-ui/tabs")
                        ? "nav-link active"
                        : "nav-link"
                    }
                    to="/basic-ui/tabs"
                  >
                    <Trans>Tabs</Trans>
                  </Link>
                </li>
                <li className="nav-item">
                  {" "}
                  <Link
                    className={
                      isPathActive("/basic-ui/typography")
                        ? "nav-link active"
                        : "nav-link"
                    }
                    to="/basic-ui/typography"
                  >
                    <Trans>Typography</Trans>
                  </Link>
                </li>
                <li className="nav-item">
                  {" "}
                  <Link
                    className={
                      isPathActive("/basic-ui/tooltips")
                        ? "nav-link active"
                        : "nav-link"
                    }
                    to="/basic-ui/tooltips"
                  >
                    <Trans>Tooltips</Trans>
                  </Link>
                </li>
                <li className="nav-item">
                  {" "}
                  <Link
                    className={
                      isPathActive("/basic-ui/popups")
                        ? "nav-link active"
                        : "nav-link"
                    }
                    to="/basic-ui/popups"
                  >
                    <Trans>Popups</Trans>
                  </Link>
                </li>
              </ul>
            </div>
          </Collapse>
        </li>
        <li
          className={
            isPathActive("/advanced-ui")
              ? "nav-item menu-items active"
              : "nav-item menu-items"
          }
        >
          <div
            className={
              menuState.advancedUiMenuOpen
                ? "nav-link menu-expanded"
                : "nav-link"
            }
            onClick={() => toggleMenuState("advancedUiMenuOpen")}
            data-toggle="collapse"
          >
            <span className="menu-icon">
              <i className="mdi mdi-settings"></i>
            </span>
            <span className="menu-title">
              <Trans>Advanced UI</Trans>
            </span>
            <i className="menu-arrow"></i>
          </div>
          <Collapse in={menuState.advancedUiMenuOpen}>
            <div>
              <ul className="nav flex-column sub-menu">
                <li className="nav-item">
                  {" "}
                  <Link
                    className={
                      isPathActive("/advanced-ui/dragula")
                        ? "nav-link active"
                        : "nav-link"
                    }
                    to="/advanced-ui/dragula"
                  >
                    <Trans>Dragula</Trans>
                  </Link>
                </li>
                <li className="nav-item">
                  {" "}
                  <Link
                    className={
                      isPathActive("/advanced-ui/clipboard")
                        ? "nav-link active"
                        : "nav-link"
                    }
                    to="/advanced-ui/clipboard"
                  >
                    <Trans>Clipboard</Trans>
                  </Link>
                </li>
                <li className="nav-item">
                  {" "}
                  <Link
                    className={
                      isPathActive("/advanced-ui/context-menu")
                        ? "nav-link active"
                        : "nav-link"
                    }
                    to="/advanced-ui/context-menu"
                  >
                    <Trans>Context menu</Trans>
                  </Link>
                </li>
                <li className="nav-item">
                  {" "}
                  <Link
                    className={
                      isPathActive("/advanced-ui/sliders")
                        ? "nav-link active"
                        : "nav-link"
                    }
                    to="/advanced-ui/sliders"
                  >
                    <Trans>Sliders</Trans>
                  </Link>
                </li>
                <li className="nav-item">
                  {" "}
                  <Link
                    className={
                      isPathActive("/advanced-ui/carousel")
                        ? "nav-link active"
                        : "nav-link"
                    }
                    to="/advanced-ui/carousel"
                  >
                    <Trans>Carousel</Trans>
                  </Link>
                </li>
                <li className="nav-item">
                  {" "}
                  <Link
                    className={
                      isPathActive("/advanced-ui/loaders")
                        ? "nav-link active"
                        : "nav-link"
                    }
                    to="/advanced-ui/loaders"
                  >
                    <Trans>Loaders</Trans>
                  </Link>
                </li>
                <li className="nav-item">
                  {" "}
                  <Link
                    className={
                      isPathActive("/advanced-ui/tree-view")
                        ? "nav-link active"
                        : "nav-link"
                    }
                    to="/advanced-ui/tree-view"
                  >
                    <Trans>Tree View</Trans>
                  </Link>
                </li>
              </ul>
            </div>
          </Collapse>
        </li>
        <li
          className={
            isPathActive("/form-elements")
              ? "nav-item menu-items active"
              : "nav-item menu-items"
          }
        >
          <div
            className={
              menuState.formElementsMenuOpen
                ? "nav-link menu-expanded"
                : "nav-link"
            }
            onClick={() => toggleMenuState("formElementsMenuOpen")}
            data-toggle="collapse"
          >
            <span className="menu-icon">
              <i className="mdi mdi-playlist-play"></i>
            </span>
            <span className="menu-title">
              <Trans>Form Elements</Trans>
            </span>
            <i className="menu-arrow"></i>
          </div>
          <Collapse in={menuState.formElementsMenuOpen}>
            <div>
              <ul className="nav flex-column sub-menu">
                <li className="nav-item">
                  {" "}
                  <Link
                    className={
                      isPathActive("/form-elements/basic-elements")
                        ? "nav-link active"
                        : "nav-link"
                    }
                    to="/form-elements/basic-elements"
                  >
                    <Trans>Basic Elements</Trans>
                  </Link>
                </li>
                <li className="nav-item">
                  {" "}
                  <Link
                    className={
                      isPathActive("/form-elements/advanced-elements")
                        ? "nav-link active"
                        : "nav-link"
                    }
                    to="/form-elements/advanced-elements"
                  >
                    <Trans>Advanced Elements</Trans>
                  </Link>
                </li>
                <li className="nav-item">
                  {" "}
                  <Link
                    className={
                      isPathActive("/form-elements/validation")
                        ? "nav-link active"
                        : "nav-link"
                    }
                    to="/form-elements/validation"
                  >
                    <Trans>Validation</Trans>
                  </Link>
                </li>
                <li className="nav-item">
                  {" "}
                  <Link
                    className={
                      isPathActive("/form-elements/wizard")
                        ? "nav-link active"
                        : "nav-link"
                    }
                    to="/form-elements/wizard"
                  >
                    <Trans>Wizard</Trans>
                  </Link>
                </li>
              </ul>
            </div>
          </Collapse>
        </li>
        <li
          className={
            isPathActive("/tables")
              ? "nav-item menu-items active"
              : "nav-item menu-items"
          }
        >
          <div
            className={
              menuState.tablesMenuOpen ? "nav-link menu-expanded" : "nav-link"
            }
            onClick={() => toggleMenuState("tablesMenuOpen")}
            data-toggle="collapse"
          >
            <span className="menu-icon">
              <i className="mdi mdi-table-large"></i>
            </span>
            <span className="menu-title">
              <Trans>Tables</Trans>
            </span>
            <i className="menu-arrow"></i>
          </div>
          <Collapse in={menuState.tablesMenuOpen}>
            <div>
              <ul className="nav flex-column sub-menu">
                <li className="nav-item">
                  {" "}
                  <Link
                    className={
                      isPathActive("/tables/basic-table")
                        ? "nav-link active"
                        : "nav-link"
                    }
                    to="/tables/basic-table"
                  >
                    <Trans>Basic Table</Trans>
                  </Link>
                </li>
                <li className="nav-item">
                  {" "}
                  <Link
                    className={
                      isPathActive("/tables/data-table")
                        ? "nav-link active"
                        : "nav-link"
                    }
                    to="/tables/data-table"
                  >
                    <Trans>Data Table</Trans>
                  </Link>
                </li>
                <li className="nav-item">
                  {" "}
                  <Link
                    className={
                      isPathActive("/tables/react-table")
                        ? "nav-link active"
                        : "nav-link"
                    }
                    to="/tables/react-table"
                  >
                    <Trans>React Table</Trans>
                  </Link>
                </li>
                <li className="nav-item">
                  {" "}
                  <Link
                    className={
                      isPathActive("/tables/sortable-table")
                        ? "nav-link active"
                        : "nav-link"
                    }
                    to="/tables/sortable-table"
                  >
                    <Trans>Sortable Table</Trans>
                  </Link>
                </li>
              </ul>
            </div>
          </Collapse>
        </li>
        <li
          className={
            isPathActive("/editors")
              ? "nav-item menu-items active"
              : "nav-item menu-items"
          }
        >
          <div
            className={
              menuState.editorsMenuOpen ? "nav-link menu-expanded" : "nav-link"
            }
            onClick={() => toggleMenuState("editorsMenuOpen")}
            data-toggle="collapse"
          >
            <span className="menu-icon">
              <i className="mdi mdi-format-text"></i>
            </span>
            <span className="menu-title">
              <Trans>Editors</Trans>
            </span>
            <i className="menu-arrow"></i>
          </div>
          <Collapse in={menuState.editorsMenuOpen}>
            <div>
              <ul className="nav flex-column sub-menu">
                <li className="nav-item">
                  {" "}
                  <Link
                    className={
                      isPathActive("/editors/text-editors")
                        ? "nav-link active"
                        : "nav-link"
                    }
                    to="/editors/text-editors"
                  >
                    <Trans>Text Editors</Trans>
                  </Link>
                </li>
                <li className="nav-item">
                  {" "}
                  <Link
                    className={
                      isPathActive("/editors/code-editor")
                        ? "nav-link active"
                        : "nav-link"
                    }
                    to="/editors/code-editor"
                  >
                    <Trans>Code Editor</Trans>
                  </Link>
                </li>
              </ul>
            </div>
          </Collapse>
        </li>
        <li
          className={
            isPathActive("/charts")
              ? "nav-item menu-items active"
              : "nav-item menu-items"
          }
        >
          <div
            className={
              menuState.chartsMenuOpen ? "nav-link menu-expanded" : "nav-link"
            }
            onClick={() => toggleMenuState("chartsMenuOpen")}
            data-toggle="collapse"
          >
            <span className="menu-icon">
              <i className="mdi mdi-chart-bar"></i>
            </span>
            <span className="menu-title">
              <Trans>Charts</Trans>
            </span>
            <i className="menu-arrow"></i>
          </div>
          <Collapse in={menuState.chartsMenuOpen}>
            <div>
              <ul className="nav flex-column sub-menu">
                <li className="nav-item">
                  {" "}
                  <Link
                    className={
                      isPathActive("/charts/chart-js")
                        ? "nav-link active"
                        : "nav-link"
                    }
                    to="/charts/chart-js"
                  >
                    <Trans>Chart Js</Trans>
                  </Link>
                </li>
                <li className="nav-item">
                  {" "}
                  <Link
                    className={
                      isPathActive("/charts/c3-chart")
                        ? "nav-link active"
                        : "nav-link"
                    }
                    to="/charts/c3-chart"
                  >
                    <Trans>C3 Charts</Trans>
                  </Link>
                </li>
                <li className="nav-item">
                  {" "}
                  <Link
                    className={
                      isPathActive("/charts/chartist")
                        ? "nav-link active"
                        : "nav-link"
                    }
                    to="/charts/chartist"
                  >
                    <Trans>Chartist</Trans>
                  </Link>
                </li>
                <li className="nav-item">
                  {" "}
                  <Link
                    className={
                      isPathActive("/charts/google-charts")
                        ? "nav-link active"
                        : "nav-link"
                    }
                    to="/charts/google-charts"
                  >
                    <Trans>Google Charts</Trans>
                  </Link>
                </li>
                <li className="nav-item">
                  {" "}
                  <Link
                    className={
                      isPathActive("/charts/sparkline-charts")
                        ? "nav-link active"
                        : "nav-link"
                    }
                    to="/charts/sparkline-charts"
                  >
                    <Trans>Sparkline Charts</Trans>
                  </Link>
                </li>
                <li className="nav-item">
                  {" "}
                  <Link
                    className={
                      isPathActive("/charts/guage-chart")
                        ? "nav-link active"
                        : "nav-link"
                    }
                    to="/charts/guage-chart"
                  >
                    <Trans>Guage Chart</Trans>
                  </Link>
                </li>
              </ul>
            </div>
          </Collapse>
        </li>
        <li
          className={
            isPathActive("/maps")
              ? "nav-item menu-items active"
              : "nav-item menu-items"
          }
        >
          <div
            className={
              menuState.mapsMenuOpen ? "nav-link menu-expanded" : "nav-link"
            }
            onClick={() => toggleMenuState("mapsMenuOpen")}
            data-toggle="collapse"
          >
            <span className="menu-icon">
              <i className="mdi mdi-map-marker-radius"></i>
            </span>
            <span className="menu-title">
              <Trans>Maps</Trans>
            </span>
            <i className="menu-arrow"></i>
          </div>
          <Collapse in={menuState.mapsMenuOpen}>
            <div>
              <ul className="nav flex-column sub-menu">
                <li className="nav-item">
                  {" "}
                  <Link
                    className={
                      isPathActive("/maps/vector-map")
                        ? "nav-link active"
                        : "nav-link"
                    }
                    to="/maps/vector-map"
                  >
                    <Trans>Vector Maps</Trans>
                  </Link>
                </li>
                <li className="nav-item">
                  {" "}
                  <Link
                    className={
                      isPathActive("/maps/simple-map")
                        ? "nav-link active"
                        : "nav-link"
                    }
                    to="/maps/simple-map"
                  >
                    <Trans>Simple Maps</Trans>
                  </Link>
                </li>
              </ul>
            </div>
          </Collapse>
        </li>
        <li
          className={
            isPathActive("/notifications")
              ? "nav-item menu-items active"
              : "nav-item menu-items"
          }
        >
          <Link className="nav-link" to="/notifications">
            <span className="menu-icon">
              <i className="mdi mdi-bell-ring"></i>
            </span>
            <span className="menu-title">
              <Trans>Notifications</Trans>
            </span>
          </Link>
        </li>
        <li
          className={
            isPathActive("/icons")
              ? "nav-item menu-items active"
              : "nav-item menu-items"
          }
        >
          <div
            className={
              menuState.iconsMenuOpen ? "nav-link menu-expanded" : "nav-link"
            }
            onClick={() => toggleMenuState("iconsMenuOpen")}
            data-toggle="collapse"
          >
            <span className="menu-icon">
              <i className="mdi mdi-contacts"></i>
            </span>
            <span className="menu-title">
              <Trans>Icons</Trans>
            </span>
            <i className="mdi mdi-contacts menu-arrow"></i>
          </div>
          <Collapse in={menuState.iconsMenuOpen}>
            <div>
              <ul className="nav flex-column sub-menu">
                <li className="nav-item">
                  {" "}
                  <Link
                    className={
                      isPathActive("/icons/mdi")
                        ? "nav-link active"
                        : "nav-link"
                    }
                    to="/icons/mdi"
                  >
                    <Trans>Material</Trans>
                  </Link>
                </li>
                <li className="nav-item">
                  {" "}
                  <Link
                    className={
                      isPathActive("/icons/flag-icons")
                        ? "nav-link active"
                        : "nav-link"
                    }
                    to="/icons/flag-icons"
                  >
                    <Trans>Flag icons</Trans>
                  </Link>
                </li>
                <li className="nav-item">
                  {" "}
                  <Link
                    className={
                      isPathActive("/icons/font-awesome")
                        ? "nav-link active"
                        : "nav-link"
                    }
                    to="/icons/font-awesome"
                  >
                    <Trans>Font Awesome</Trans>
                  </Link>
                </li>
                <li className="nav-item">
                  {" "}
                  <Link
                    className={
                      isPathActive("/icons/simple-line")
                        ? "nav-link active"
                        : "nav-link"
                    }
                    to="/icons/simple-line"
                  >
                    <Trans>Simple Line Icons</Trans>
                  </Link>
                </li>
                <li className="nav-item">
                  {" "}
                  <Link
                    className={
                      isPathActive("/icons/themify")
                        ? "nav-link active"
                        : "nav-link"
                    }
                    to="/icons/themify"
                  >
                    <Trans>Themify</Trans>
                  </Link>
                </li>
                <li className="nav-item">
                  {" "}
                  <Link
                    className={
                      isPathActive("/icons/typicons")
                        ? "nav-link active"
                        : "nav-link"
                    }
                    to="/icons/typicons"
                  >
                    <Trans>Typicons</Trans>
                  </Link>
                </li>
              </ul>
            </div>
          </Collapse>
        </li>
        <li
          className={
            isPathActive("/user-pages")
              ? "nav-item menu-items active"
              : "nav-item menu-items"
          }
        >
          <div
            className={
              menuState.userPagesMenuOpen
                ? "nav-link menu-expanded"
                : "nav-link"
            }
            onClick={() => toggleMenuState("userPagesMenuOpen")}
            data-toggle="collapse"
          >
            <span className="menu-icon">
              <i className="mdi mdi-security"></i>
            </span>
            <span className="menu-title">
              <Trans>User Pages</Trans>
            </span>
            <i className="menu-arrow"></i>
          </div>
          <Collapse in={menuState.userPagesMenuOpen}>
            <div>
              <ul className="nav flex-column sub-menu">
                <li className="nav-item">
                  {" "}
                  <Link
                    className={
                      isPathActive("/user-pages/login-1")
                        ? "nav-link active"
                        : "nav-link"
                    }
                    to="/user-pages/login-1"
                  >
                    <Trans>Login</Trans>
                  </Link>
                </li>
                <li className="nav-item">
                  {" "}
                  <Link
                    className={
                      isPathActive("/user-pages/login-2")
                        ? "nav-link active"
                        : "nav-link"
                    }
                    to="/user-pages/login-2"
                  >
                    <Trans>Login 2</Trans>
                  </Link>
                </li>
                <li className="nav-item">
                  {" "}
                  <Link
                    className={
                      isPathActive("/user-pages/register-1")
                        ? "nav-link active"
                        : "nav-link"
                    }
                    to="/user-pages/register-1"
                  >
                    <Trans>Register</Trans>
                  </Link>
                </li>
                <li className="nav-item">
                  {" "}
                  <Link
                    className={
                      isPathActive("/user-pages/register-2")
                        ? "nav-link active"
                        : "nav-link"
                    }
                    to="/user-pages/register-2"
                  >
                    <Trans>Register 2</Trans>
                  </Link>
                </li>
                <li className="nav-item">
                  {" "}
                  <Link
                    className={
                      isPathActive("/user-pages/lockscreen")
                        ? "nav-link active"
                        : "nav-link"
                    }
                    to="/user-pages/lockscreen"
                  >
                    <Trans>Lockscreen</Trans>
                  </Link>
                </li>
              </ul>
            </div>
          </Collapse>
        </li>
        <li className="nav-item nav-category">
          <span className="nav-link">
            <Trans>More</Trans>
          </span>
        </li>
        <li
          className={
            isPathActive("/error-pages")
              ? "nav-item menu-items active"
              : "nav-item menu-items"
          }
        >
          <div
            className={
              menuState.errorPagesMenuOpen
                ? "nav-link menu-expanded"
                : "nav-link"
            }
            onClick={() => toggleMenuState("errorPagesMenuOpen")}
            data-toggle="collapse"
          >
            <span className="menu-icon">
              <i className="mdi mdi-lock"></i>
            </span>
            <span className="menu-title">
              <Trans>Error Pages</Trans>
            </span>
            <i className="menu-arrow"></i>
          </div>
          <Collapse in={menuState.errorPagesMenuOpen}>
            <div>
              <ul className="nav flex-column sub-menu">
                <li className="nav-item">
                  {" "}
                  <Link
                    className={
                      isPathActive("/error-pages/error-404")
                        ? "nav-link active"
                        : "nav-link"
                    }
                    to="/error-pages/error-404"
                  >
                    404
                  </Link>
                </li>
                <li className="nav-item">
                  {" "}
                  <Link
                    className={
                      isPathActive("/error-pages/error-500")
                        ? "nav-link active"
                        : "nav-link"
                    }
                    to="/error-pages/error-500"
                  >
                    500
                  </Link>
                </li>
              </ul>
            </div>
          </Collapse>
        </li>
        <li
          className={
            isPathActive("/general-pages")
              ? "nav-item menu-items active"
              : "nav-item menu-items"
          }
        >
          <div
            className={
              menuState.generalPagesMenuOpen
                ? "nav-link menu-expanded"
                : "nav-link"
            }
            onClick={() => toggleMenuState("generalPagesMenuOpen")}
            data-toggle="collapse"
          >
            <span className="menu-icon">
              <i className="mdi mdi-earth"></i>
            </span>
            <span className="menu-title">
              <Trans>General Pages</Trans>
            </span>
            <i className="menu-arrow"></i>
          </div>
          <Collapse in={menuState.generalPagesMenuOpen}>
            <div>
              <ul className="nav flex-column sub-menu">
                <li className="nav-item">
                  {" "}
                  <Link
                    className={
                      isPathActive("/general-pages/blank-page")
                        ? "nav-link active"
                        : "nav-link"
                    }
                    to="/general-pages/blank-page"
                  >
                    <Trans>Blank Page</Trans>
                  </Link>
                </li>
                <li className="nav-item">
                  {" "}
                  <Link
                    className={
                      isPathActive("/general-pages/landing-page")
                        ? "nav-link active"
                        : "nav-link"
                    }
                    to="/general-pages/landing-page"
                  >
                    <Trans>Landing Page</Trans>
                  </Link>
                </li>
                <li className="nav-item">
                  {" "}
                  <Link
                    className={
                      isPathActive("/general-pages/profile")
                        ? "nav-link active"
                        : "nav-link"
                    }
                    to="/general-pages/profile"
                  >
                    <Trans>Profile</Trans>
                  </Link>
                </li>
                <li className="nav-item">
                  {" "}
                  <Link
                    className={
                      isPathActive("/general-pages/faq-1")
                        ? "nav-link active"
                        : "nav-link"
                    }
                    to="/general-pages/faq-1"
                  >
                    <Trans>FAQ</Trans>
                  </Link>
                </li>
                <li className="nav-item">
                  {" "}
                  <Link
                    className={
                      isPathActive("/general-pages/faq-2")
                        ? "nav-link active"
                        : "nav-link"
                    }
                    to="/general-pages/faq-2"
                  >
                    <Trans>FAQ 2</Trans>
                  </Link>
                </li>
                <li className="nav-item">
                  {" "}
                  <Link
                    className={
                      isPathActive("/general-pages/news-grid")
                        ? "nav-link active"
                        : "nav-link"
                    }
                    to="/general-pages/news-grid"
                  >
                    <Trans>News Grid</Trans>
                  </Link>
                </li>
                <li className="nav-item">
                  {" "}
                  <Link
                    className={
                      isPathActive("/general-pages/timeline")
                        ? "nav-link active"
                        : "nav-link"
                    }
                    to="/general-pages/timeline"
                  >
                    <Trans>Timeline</Trans>
                  </Link>
                </li>
                <li className="nav-item">
                  {" "}
                  <Link
                    className={
                      isPathActive("/general-pages/search-results")
                        ? "nav-link active"
                        : "nav-link"
                    }
                    to="/general-pages/search-results"
                  >
                    <Trans>Search Results</Trans>
                  </Link>
                </li>
                <li className="nav-item">
                  {" "}
                  <Link
                    className={
                      isPathActive("/general-pages/portfolio")
                        ? "nav-link active"
                        : "nav-link"
                    }
                    to="/general-pages/portfolio"
                  >
                    <Trans>Portfolio</Trans>
                  </Link>
                </li>
                <li className="nav-item">
                  {" "}
                  <Link
                    className={
                      isPathActive("/general-pages/user-listing")
                        ? "nav-link active"
                        : "nav-link"
                    }
                    to="/general-pages/user-listing"
                  >
                    <Trans>User Listing</Trans>
                  </Link>
                </li>
              </ul>
            </div>
          </Collapse>
        </li>
        <li
          className={
            isPathActive("/ecommerce")
              ? "nav-item menu-items active"
              : "nav-item menu-items"
          }
        >
          <div
            className={
              menuState.ecommercePagesMenuOpen
                ? "nav-link menu-expanded"
                : "nav-link"
            }
            onClick={() => toggleMenuState("ecommercePagesMenuOpen")}
            data-toggle="collapse"
          >
            <span className="menu-icon">
              <i className="mdi mdi-medical-bag"></i>
            </span>
            <span className="menu-title">
              <Trans>E-commerce</Trans>
            </span>
            <i className="menu-arrow"></i>
          </div>
          <Collapse in={menuState.ecommercePagesMenuOpen}>
            <div>
              <ul className="nav flex-column sub-menu">
                <li className="nav-item">
                  {" "}
                  <Link
                    className={
                      isPathActive("/ecommerce/invoice")
                        ? "nav-link active"
                        : "nav-link"
                    }
                    to="/ecommerce/invoice"
                  >
                    <Trans>Invoice</Trans>
                  </Link>
                </li>
                <li className="nav-item">
                  {" "}
                  <Link
                    className={
                      isPathActive("/ecommerce/pricing")
                        ? "nav-link active"
                        : "nav-link"
                    }
                    to="/ecommerce/pricing"
                  >
                    <Trans>Pricing</Trans>
                  </Link>
                </li>
                <li className="nav-item">
                  {" "}
                  <Link
                    className={
                      isPathActive("/ecommerce/product-catalogue")
                        ? "nav-link active"
                        : "nav-link"
                    }
                    to="/ecommerce/product-catalogue"
                  >
                    <Trans>Product Catalogue</Trans>
                  </Link>
                </li>
                <li className="nav-item">
                  {" "}
                  <Link
                    className={
                      isPathActive("/ecommerce/project-list")
                        ? "nav-link active"
                        : "nav-link"
                    }
                    to="/ecommerce/project-list"
                  >
                    <Trans>Project List</Trans>
                  </Link>
                </li>
                <li className="nav-item">
                  {" "}
                  <Link
                    className={
                      isPathActive("/ecommerce/orders")
                        ? "nav-link active"
                        : "nav-link"
                    }
                    to="/ecommerce/orders"
                  >
                    Orders
                  </Link>
                </li>
              </ul>
            </div>
          </Collapse>
        </li>
        <li className="nav-item menu-items">
          <a
            className="nav-link"
            href="http://bootstrapdash.com/demo/corona/react/documentation/documentation.html"
            rel="noopener noreferrer"
            target="_blank"
          >
            <span className="menu-icon">
              <i className="mdi mdi-file-document-box"></i>
            </span>
            <span className="menu-title">
              <Trans>Documentation</Trans>
            </span>
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default withRouter(Sidebar);
