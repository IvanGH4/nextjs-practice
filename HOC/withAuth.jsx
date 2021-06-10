import React from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

function withAuth(WrappedComponent) {
  return (props) => {
    const router = useRouter();

    const user = useSelector((state) => state.user);

    if (!user) {
      router.replace("/login");
      return null;
    }

    return <WrappedComponent {...props} />;
  };
}

export default withAuth;
