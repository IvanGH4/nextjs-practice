import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/actions/userActions";
import { useRouter } from "next/router";
import Link from "next/link";
import styles from "../../styles/Posts.module.css";
import HeadComponent from "../../components/Head";

function Register() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [isShowError, setIsShowError] = useState(false);

  const dispatch = useDispatch();
  const router = useRouter();

  const handleClick = async () => {
    try {
      setIsShowError(false);
      const response = await axios.post(
        "http://localhost:3001/users",
        {
          userName,
          email,
          firstName,
          lastName,
          password,
        },
        {
          headers: {
            "Content-type": "application/json",
          },
        }
      );
      dispatch(setUser(response.data));
      router.push("/");
    } catch (error) {
      console.log(error.message);
      setIsShowError(true);
    }
  };

  return (
    <div>
      <HeadComponent title="Register" />
      <h2 className="text-2xl font-bold tracking-wider mb-4 text-center">
        Register
      </h2>
      {isShowError && (
        <div>
          <p>User or password incorrect</p>
        </div>
      )}
      <div className="flex flex-col items-center justify-center">
        <form onSubmit={(e) => e.preventDefault()} className="w-1/2">
          <div className="flex flex-col justify-start items-start mb-2">
            <label htmlFor="user" className="mb-1">
              Email
            </label>
            <input
              type="email"
              id="user"
              name="user"
              placeholder="example@mail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border focus:border-blue-900 rounded-sm px-2 w-full"
            />
          </div>
          <div className="flex flex-col justify-start items-start mb-2">
            <label htmlFor="username" className="mb-1">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="MGScott72"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="border focus:border-blue-900 rounded-sm px-2 w-full"
            />
          </div>
          <div className="flex flex-col justify-start items-start mb-2">
            <label htmlFor="firstname" className="mb-1">
              First name
            </label>
            <input
              type="text"
              id="firstname"
              name="firstname"
              placeholder="Michael"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="border focus:border-blue-900 rounded-sm px-2 w-full"
            />
          </div>
          <div className="flex flex-col justify-start items-start mb-2">
            <label htmlFor="lastname" className="mb-1">
              Last name
            </label>
            <input
              type="text"
              id="firstname"
              name="firstname"
              placeholder="Scott"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="border focus:border-blue-900 rounded-sm px-2 w-full"
            />
          </div>
          <div className={styles.formControl}>
            <label htmlFor="password" className="mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border focus:border-blue-900 rounded-sm px-2 w-full"
            />
          </div>
          <div className={styles.formControl}>
            <button
              className="bg-blue-700 w-1/4 py-1 rounded text-white hover:text-blue-700 hover:bg-white transition shadow"
              onClick={handleClick}
            >
              Register
            </button>
            <Link href="/login">
              <a className="text-blue-500">Already have an account? Log in</a>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
