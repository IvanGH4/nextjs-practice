import React, { useState } from "react";
import styles from "../../styles/Posts.module.css";
import axios from "axios";
import { setUser } from "../../redux/actions/userActions";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import Link from "next/link";
import HeadComponent from "../../components/Head";

function index() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isShowError, setIsShowError] = useState(false);

  const dispatch = useDispatch();
  const router = useRouter();

  const handleClick = async () => {
    try {
      const response = await axios.post(
        process.env.NEXT_PUBLIC_API_URL + "/tokens",
        {
          user: username,
          password,
        },
        {
          headers: {
            "Content-type": "application/json",
          },
        }
      );
      dispatch(setUser(response.data));
      setIsShowError(false);
      router.push("/");
    } catch (error) {
      console.log(error.message);
      setIsShowError(true);
    }
  };

  return (
    <div>
      <HeadComponent title="Log in" />
      <h2 className="text-2xl font-bold tracking-wider mb-4 text-center">
        Log in
      </h2>
      {isShowError && (
        <div>
          <p>User or password incorrect</p>
        </div>
      )}
      <div className="flex flex-col items-center justify-center">
        <form onSubmit={(e) => e.preventDefault()} className="w-1/2">
          <div className="flex flex-col justify-start items-start mb-2">
            <label htmlFor="user" className="mb-1 text-gray-100">
              Email or Username
            </label>
            <input
              type="text"
              id="user"
              name="user"
              placeholder="example@mail.com"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="border-b-2 border-blue-700 bg-transparent focus:ring-2 focus:ring-blue-900 rounded-sm px-2 py-1 w-full"
            />
          </div>
          <div className={styles.formControl}>
            <label htmlFor="password" className="mb-1 text-gray-100">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border-b-2 border-blue-700 bg-transparent focus:ring-2 focus:ring-blue-900 rounded-sm px-2 py-1 w-full"
            />
          </div>
          <div className={styles.formControl}>
            <button
              className="bg-blue-700 w-1/4 py-1 rounded text-white hover:text-blue-700 hover:bg-white transition shadow"
              onClick={handleClick}
            >
              Log In
            </button>
            <Link href="/register">
              <a className="text-blue-500">Don't have an account? Register</a>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default index;
