import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Pagination from '@mui/material/Pagination';
import { toast } from 'react-toastify';

function TeamList() {
  const [label, setLabel] = useState("1");
  const [currentPage, setCurrentPage] = useState(1);
  const [downlineData, setDownlineData] = useState({
    loading: true,
    downline: [],
    error: ""
  });

  const itemsPerPage = 10;

  useEffect(() => {
    const fetchDownlineData = async () => {
      try {
        setDownlineData({ loading: true, downline: [], error: "" });
        const token = localStorage.getItem("accessToken");

        const res = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/referral/downline-info/${label}`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        const users = res.data.users || [];
        console.log("Downline List",users)
        setDownlineData({
          loading: false,
          downline: users,
          error: ""
        });
      } catch (error) {
        console.error("err in fetching list",error);
        setDownlineData({
          loading: false,
          downline: [],
          error: error.response?.data?.message || "Failed to fetch team data"
        });
        toast.error("Failed to fetch team data");
      }
    };

    fetchDownlineData();
    setCurrentPage(1); // Reset pagination on level change
  }, [label]);

  const totalPages = Math.ceil(downlineData.downline.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = downlineData.downline.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (event, newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div>
      <div className='flex justify-center items-center bg-[#13B8A7] p-4 text-[15px] text-gray-700 font-semibold'>
        My Team
      </div>

      <div className="bg-white flex flex-col items-center justify-center p-4 rounded-3xl mt-4 shadow-lg">
        <select
          name="level"
          id="level"
          onChange={(e) => setLabel(e.target.value)}
          className='w-full p-2 rounded-3xl bg-[#13B8A7] text-white font-semibold'
        >
          {[...Array(10)].map((_, idx) => (
            <option key={idx + 1} value={idx + 1}>Level {idx + 1}</option>
          ))}
        </select>

        <div className='w-full mt-4'>
          <table className='w-full'>
            <thead className='bg-[#13B8A7] text-white'>
              <tr className='text-[15px] font-semibold'>
                <th className='p-2'>Joining Date</th>
                <th className='p-2'>User ID</th>
                <th className='p-2'>Mobile</th>
              </tr>
            </thead>
            <tbody>
              {downlineData.loading ? (
                <tr><td colSpan="3" className="p-4 text-center">Loading...</td></tr>
              ) : currentItems.length > 0 ? (
                currentItems.map((data, idx) => (
                  <tr key={idx} className='text-center'>
                    <td className='p-2'>{new Date(data.createdAt).toLocaleDateString()}</td>
                    <td className='p-2'>{data.referralCode}</td>
                    <td className='p-2'>{data.mobileNumber}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className='p-4 text-center text-gray-500'>No users in this level.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="mt-4">
          <Pagination
            count={totalPages}
            size="small"
            page={currentPage}
            onChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
}

export default TeamList;
