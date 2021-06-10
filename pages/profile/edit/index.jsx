import React, { useState } from "react";
import Link from "next/dist/client/link";
import HeadComponent from "../../../components/Head";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { useRouter } from "next/router";
import { setUser } from "../../../redux/actions/userActions";

function index() {
  const user = useSelector((state) => state.user);

  const [userName, setUserName] = useState(user.user.userName);
  const [email, setEmail] = useState(user.user.email);
  const [firstName, setFirstName] = useState(user.user.firstName);
  const [lastName, setLastName] = useState(user.user.lastName);
  const [isShowError, setIsShowError] = useState(false);

  const router = useRouter();
  const dispatch = useDispatch();

  const handleClick = async () => {
    try {
      setIsShowError(false);
      const response = await axios.patch(
        "http://localhost:3001/users",
        {
          userName,
          email,
          firstName,
          lastName,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
            "Content-type": "application/json",
          },
        }
      );
      dispatch(setUser(response.data));
      router.push("/profile");
    } catch (error) {
      console.log(error.message);
      setIsShowError(true);
    }
  };

  return (
    <div>
      <HeadComponent title="Edit profile" />
      <Link href="/profile">
        <a className="text-blue-500">Back</a>
      </Link>
      <h2 className="text-2xl">Edit profile</h2>
      {isShowError && (
        <p className="text-red-500">Oops... something went wrong!</p>
      )}
      <div className="mt-4">
        <form className="w-1/2" onSubmit={(e) => e.preventDefault()}>
          <div className="flex flex-col justify-start items-start my-4">
            <label htmlFor="username" className="mb-2">
              Username
            </label>
            <input
              type="text"
              placeholder="Username"
              name="username"
              id="username"
              className="border rounded-sm px-2 w-full focus:border-blue-900"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
          <div className="flex flex-col justify-start items-start">
            <label htmlFor="email" className="mb-2">
              Email
            </label>
            <input
              type="email"
              placeholder="example@mail.com"
              name="email"
              id="email"
              className="border rounded-sm px-2 w-full focus:border-blue-900"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex flex-col justify-start items-start my-4">
            <label htmlFor="firstname" className="mb-2">
              First name
            </label>
            <input
              type="text"
              placeholder="Michael"
              name="firstname"
              id="firstname"
              className="border rounded-sm px-2 w-full focus:border-blue-900"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="flex flex-col justify-start items-start my-4">
            <label htmlFor="lastname" className="mb-2">
              Last name
            </label>
            <input
              type="text"
              placeholder="Scott"
              name="lastname"
              id="lastname"
              className="border rounded-sm px-2 w-full focus:border-blue-900"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div className="flex flex-col justify-start items-start">
            <button
              className="w-1/4 rounded-md shadow text-white hover:text-blue-500 hover:bg-white transition py-1 mt-2 bg-blue-500"
              onClick={handleClick}
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default index;
