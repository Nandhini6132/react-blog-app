import React from "react";
import { Link } from "react-router-dom";
import Avatar from "@mui/material/Avatar";


const Header = ({ active, setActive, user,handleLogout }) => {
  const userId = user?.uid;
  const userName = user?.displayName;
  console.log(userId);
  // console.log(user?.displayName)
  return (
    <>
      <nav class="navbar navbar-expand-lg bg-dark  text-light">
        <div class="container-fluid text-light">
          <a class="navbar-brand  text-light" href="#">
            Navbar
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNavDropdown">
            <ul class="navbar-nav" style={{ gap: "20px" }}>
              <li class="nav-item" onClick={() => setActive("home")}>
                <Link
                  to="/"
                  class={`nav-link ${
                    active === "home" ? "active" : ""
                  }  text-light`}
                  href="#"
                >
                  Home
                </Link>
              </li>
              <li class="nav-item" onClick={() => setActive("create")}>
                <Link
                  to="/create"
                  class={`nav-link ${
                    active === "create" ? "active" : ""
                  }  text-light`}
                  href="#"
                >
                  Create
                </Link>
              </li>
              <li class="nav-item" onClick={() => setActive("about")}>
                <Link
                  to="/about"
                  class={`nav-link ${
                    active === "about" ? "active" : ""
                  }  text-light`}
                  href="#"
                >
                  About
                </Link>
              </li>
            </ul>

            <ul class="navbar-nav ms-auto">
              {user ? (
                <>
                  {user?.photoURL ? (
                    <Avatar src={user.photoURL}></Avatar>
                  ) : (
                    <Avatar>N</Avatar>
                  )}{" "}
                  <div className="d-flex align-items-center ms-3">
                    {user.displayName}
                  </div>
                </>
              ) : (
                <li class="nav-item " onClick={() => setActive("login")}>
                  <Link
                    to="/auth"
                    class={`nav-link ${
                      active === "login" ? "active" : ""
                    }  text-light`}
                    href="#"
                  >
                    Login
                  </Link>
                </li>
              )}

             {user===null?'': <li class="nav-item ms-5" onClick={handleLogout}>
                <Link  className="nav-link text-light">Logout</Link>
              </li>}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
