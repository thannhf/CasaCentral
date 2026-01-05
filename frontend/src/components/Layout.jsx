import React, { useContext, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import UserDetailContext from "../context/userDetailContext";
import { useMutation } from "@tanstack/react-query";
import { createUser } from "../utils/api";
import useFavourites from "../hooks/useFavourites";
import useBookings from "../hooks/useBookings";

const Layout = () => {
  useFavourites();
  useBookings();

  const { isAuthenticated, user, getAccessTokenWithPopup } = useAuth0();
  const { setUserDetails } = useContext(UserDetailContext);
  const { mutate } = useMutation({
    mutationKey: [user?.email],
    mutationFn: (token) => createUser(user?.email, token),
  });

  useEffect(() => {
    const getTokenAndRegister = async () => {
      const res = await getAccessTokenWithPopup({
        audience: "http://localhost:8000",
        scope: "opendid profile email",
      });
      localStorage.setItem("access_token", res);
      setUserDetails((prev) => ({ ...prev, token: res }));
      // console.log(res);
      mutate(res);
    };

    isAuthenticated && getTokenAndRegister();
  }, [isAuthenticated]);

  return (
    <>
      <div>
        <Header />
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default Layout;
