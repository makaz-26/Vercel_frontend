import React, { useContext, useEffect, useState } from "react";
import { UserDataContext } from "../../Context/UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const UserProtectedWrapper = ({ children }) => {
  const token = localStorage.getItem("accessToken");

  const navigate = useNavigate();
  const { setUser } = useContext(UserDataContext);
  const [isLoading, setIsLoading] = useState(true);

  const refreshAccessToken = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/refresh-token`,
        {},
        { withCredentials: true }
      );
      const newAccessToken = response.data.accessToken;
      console.log("The new access token is", newAccessToken);
      localStorage.setItem("accessToken", newAccessToken);
      return newAccessToken;

    } catch (err) {
      console.error(
        "Failed to refresh access token:",
        err.response?.data || err.message
      );
      localStorage.removeItem("accessToken");
      return null;
    }
  
  };



  useEffect(() => {
    let didRefresh = false;

    const fetchProfile = async () => {
      try {
        let currentToken = localStorage.getItem("accessToken");

        if (!currentToken) {
          navigate("/login");
          return;
        }

        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/users/profile`,
          {
            headers: { Authorization: `Bearer ${currentToken}` },
            withCredentials: true,
          }
        );

        if (response.status === 200) {
          // setUser(response.data);
          console.log("User data:", response.data);
          setUser((prevUser) => {
            return {
              ...prevUser,
              ...response.data
            }
          })

          setIsLoading(false);
        }
      } catch (err) {
        console.error(
          "Profile fetch failed:",
          err.response?.data || err.message
        );

        if (err.response?.status === 401 && !didRefresh) {
          didRefresh = true;
          const newToken = await refreshAccessToken();
          if (newToken) {
            try {
              const retryResponse = await axios.get(
                `${import.meta.env.VITE_BASE_URL}/users/profile`,
                {
                  headers: { Authorization: `Bearer ${newToken}` },
                  withCredentials: true,
                }
              );
              if (retryResponse.status === 200) {
                setUser(retryResponse.data);
                setIsLoading(false);
                return;
              }
            } catch (retryErr) {
              // If retry fails, fall through to logout

            }
          }
        }
        localStorage.removeItem("accessToken");
        navigate("/login");
      }
    };

    fetchProfile();
   
  }, [token, navigate]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
};

export default UserProtectedWrapper;
