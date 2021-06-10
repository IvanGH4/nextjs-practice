import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/actions/userActions";

function Navbar() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const router = useRouter();

  return (
    <nav className="p-4 dark:bg-gray-700 flex items-center justify-between">
      <p className="text-gray-200">
        {user && `Welcome ${user.user.userName}!`}
      </p>
      <div className="flex justify-end items-center">
        <Link href="/">
          <a
            className={`mr-4 ${
              router.pathname === "/"
                ? "text-blue-400 border-b-2 border-blue-400"
                : "text-gray-300"
            }`}
          >
            Home
          </a>
        </Link>
        <Link href="/posts">
          <a
            className={`mr-4 ${
              router.pathname === "/posts"
                ? "text-blue-400 border-b-2 border-blue-400"
                : "text-gray-300"
            }`}
          >
            Create
          </a>
        </Link>
        {!user ? (
          <>
            <Link href="/login">
              <a
                className={`mr-4 ${
                  router.pathname === "/login"
                    ? "text-blue-400 border-b-2 border-blue-400"
                    : "text-gray-300"
                }`}
              >
                Login
              </a>
            </Link>
            <Link href="/register">
              <a
                className={`${
                  router.pathname === "/register"
                    ? "text-blue-400 border-b-2 border-blue-400"
                    : "text-gray-300"
                }`}
              >
                Register
              </a>
            </Link>
          </>
        ) : (
          <>
            <Link href="/profile">
              <a
                className={`mr-4 ${
                  router.pathname === "/register"
                    ? "text-blue-400 border-b-2 border-blue-400"
                    : "text-gray-300"
                }`}
              >
                Profile
              </a>
            </Link>
            <button
              onClick={() => dispatch(logout())}
              className="text-gray-300"
            >
              Log out
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
