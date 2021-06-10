import React from "react";
import { useSelector } from "react-redux";
import withAuth from "../../HOC/withAuth";
import Link from "next/dist/client/link";

function index() {
  const user = useSelector((state) => state.user);

  return (
    <section>
      <h2 className="text-3xl tracking-wider mb-4">You personal information</h2>
      <div>
        <h4 className="text-xl font-bold tracking-wider mb-2">First name</h4>
        <p className="mb-2">{user.user.firstName}</p>
        <h4 className="text-xl font-bold tracking-wider mb-2">Last name</h4>
        <p className="mb-2">{user.user.lastName}</p>
        <h4 className="text-xl font-bold tracking-wider mb-2">Email</h4>
        <p className="mb-2">{user.user.email}</p>
        <h4 className="text-xl font-bold tracking-wider mb-2">Username</h4>
        <p className="mb-2">{user.user.userName}</p>
        <h4 className="text-xl font-bold tracking-wider mb-2">You joined</h4>
        <p className="mb-2">{user.user.createdAt}</p>
      </div>
      <Link href="/profile/edit">
        <a className="text-blue-500 px-2 rounded py-1 text-xl border border-blue-500 hover:bg-blue-500 hover:text-white transition">
          Edit profile
        </a>
      </Link>
    </section>
  );
}

export default withAuth(index);
