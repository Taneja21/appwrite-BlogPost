import React from "react";
import { Logo } from "../index";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../features/authSlice";
import authService from "../../appwrite/auth";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const userData = useSelector((state) => state.auth.userData);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const navItems = [
    { name: "Home", slug: "/", active: authStatus },
    { name: "All Posts", slug: "/all-posts", active: authStatus },
    { name: "Add Post", slug: "/add-post", active: authStatus },
  ];

  const logOuthandler = () => {
    authService.logout().then(() => {
      dispatch(logout());
      navigate("/");
    });
  };

  return (
    <header className="flex justify-between items-center p-4 bg-gray-100 shadow-md">
      <div className="flex items-center">
        <div className="h-10 w-10"></div>
        <Link to="/">
          <Logo />
        </Link>
      </div>
      <nav>
        <ul className="flex space-x-4">
          {navItems.map((item) =>
            item.active ? (
              <li key={item.name}>
                <button
                  onClick={() => navigate(item.slug)}
                  className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-700"
                >
                  {item.name}
                </button>
              </li>
            ) : null
          )}
        </ul>
      </nav>
      <div className="flex space-x-4">
        {authStatus ? null : (
          <button
            className="px-4 py-2 rounded bg-green-500 text-white hover:bg-green-700"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        )}

        {authStatus ? null : (
          <button
            className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-700"
            onClick={() => navigate("/signup")}
          >
            Signup
          </button>
        )}
        {authStatus ? (
          <p className="px-4 py-2 text-lg font-bold">
            Welcome {userData.name}!
          </p>
        ) : null}
        {authStatus ? (
          <button
            className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-700"
            onClick={logOuthandler}
          >
            Logout
          </button>
        ) : null}
      </div>
    </header>
  );
}

export default Header;
