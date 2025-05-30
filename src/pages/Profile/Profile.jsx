import React, { useContext } from 'react';
import { UserDataContext } from '../../Context/UserContext';
import BalanceCard from '../../components/BalanceCard';
import History from '../../components/History';
import Services from '../../components/Services';
import Logout from '../../components/Logout';
import ProfileBalance from '../../components/ProfileBalance';
import ReferralCode from '../../components/ReferralCode';
import { useState } from 'react';
function Profile() {
  // const [url, seturl] = useState("")
  const { user } = useContext(UserDataContext);
  console.log("user",user._id)

  const handleAvatarUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("avatar", file); 

    try {
      const response = await fetch("http://localhost:3000/users/profile/avatar", {
        method: "POST",
        body: formData,
        headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`, 
      }, 
      });
      console.log(response)
      
      if (!response.ok) {
        throw new Error("Upload failed");
      }

      const data = await response.json();
      // seturl(data.avatar)
      console.log("Avatar uploaded successfully:", data);

      // Reload the page or refetch user context if needed
      window.location.reload(); 
    } catch (err) {
      console.error("Upload error:", err.message);
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className='flex justify-between items-center m-4'>
        <div className="relative w-20 h-20">
          {user.avatar ? (
            <img
              // src={user.avatarUrl}
              src={user.avatar}
              alt=""
              className="rounded-full w-20 h-20 object-cover border border-gray-300"
            />
          ) : (
            <div className="rounded-full bg-[#13B8A7] w-20 h-20 flex justify-center items-center text-white font-bold">
              {user.name?.[0] || "?"}
            </div>
          )}
          <label className="absolute bottom-0 right-0 bg-white rounded-full p-1 cursor-pointer shadow">
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={handleAvatarUpload}
            />
            <span className="text-xs">📷</span>
          </label>
        </div>

        <div className="flex flex-col items-start mt-4 ml-4">
          <h1 className="text-xl font-bold">+91 {user.mobileNumber}</h1>
          <h3 className="text-[#13B8A7]">#{user._id}</h3>
        </div>
      </div>

      <ProfileBalance />
      <History />
      <ReferralCode code={user.referralCode} />
      <Services />
      <Logout title="Log out" />
    </div>
  );
}

export default Profile;
