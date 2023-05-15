import { Container } from "@mantine/core";
import React from "react";
import { useLogoutAccountMutation } from "../redux/api/authApi";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../redux/features/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { ImSpinner9 } from "react-icons/im";
import Cookies from "js-cookie";
import { setSearchTerm } from "../redux/features/contactSlice";

const Header = () => {
  const token = Cookies.get("token");
  const user = JSON.parse(Cookies.get("user"));
  const [logoutAccount, { isLoading }] = useLogoutAccountMutation();
  const dispatch = useDispatch();
  const searchTerm = useSelector((state) => state.contact.searchTerm);
  const navigate = useNavigate();
  const logoutHandler = async () => {
    const { data } = await logoutAccount(token);
    console.log(data);
    if (data?.success) {
      dispatch(removeUser());
      navigate("/login");
    }
  };
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <h1 className="normal-case text-xl cursor-pointer">React Contact</h1>
      </div>
      <div className="flex-none gap-2">
        <div className="form-control">
          <input
            type="text"
            placeholder="Search"
            className="input input-bordered"
            value={searchTerm}
            onChange={(e) => dispatch(setSearchTerm(e.target.value))}
          />
        </div>
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img src="https://i.pinimg.com/474x/6f/6b/bb/6f6bbb16aec97391aefe120ec5a4e6a2.jpg" />
            </div>
          </label>
          <ul
            tabIndex={0}
            className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
          >
            <li>
              <a className="justify-between">{user.name}</a>
            </li>
            <li>
              <Link to="/forgot">Change Password</Link>
            </li>
            <li>
              <button onClick={logoutHandler}>
                {isLoading ? (
                  <ImSpinner9 className="animate-spin mx-auto" />
                ) : (
                  "Logout"
                )}
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
