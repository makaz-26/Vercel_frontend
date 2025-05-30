import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const WithdrawHistory = () => {
  const [withdrawData, setWithdrawData] = useState({
    loading: true,
    transactions: [],
    error: "",
  });

  useEffect(() => {
    const fetchWithdrawHistory = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/transactions/allWithdraw`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );

        if (response.status === 200) {
          console.log("Withdraw History data", response.data);
          setWithdrawData({
            loading: false,
            transactions: response.data.transactions || [],
            error: "",
          });
        }
      } catch (error) {
        console.error("Error fetching withdraw history", error?.message);
        setWithdrawData({
          loading: false,
          transactions: [],
          error: error?.message || "Error fetching withdraw history",
        });
      }
    };

    fetchWithdrawHistory();
  }, []);

  const { loading, transactions, error } = withdrawData;

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-2xl font-bold">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-2xl font-bold text-red-600">{error}</div>
      </div>
    );
  }

  if (transactions.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-2xl font-bold">No withdraw history found.</div>
      </div>
    );
  }

  return (
    <div className="p-4">
      {transactions.map((itm, idx) => (
        <div
          key={idx}
          className="flex bg-white flex-col p-4 rounded-3xl mt-4 shadow-lg"
        >
          <div className="flex justify-between bg-[#13B8A7] text-white rounded-2xl p-4">
            <div>Withdraw</div>
            <span>{itm.status}</span>
          </div>
          <hr className="mt-4 border-[#13B8A7]" />
          <InfoRow label="Balance" value={itm.amount} />
          <InfoRow label="Type" value={itm.type} />
          <InfoRow label="Tax" value={itm.tax} />
          <InfoRow label="Time" value={new Date(itm.completedAt).toLocaleString()} />
          <InfoRow label="Order number" value={itm.orderNumber} />
        </div>
      ))}
    </div>
  );
};

// Reusable row component
const InfoRow = ({ label, value }) => (
  <div className="flex justify-between p-2">
    <div className="font-medium">{label}</div>
    <span>{value}</span>
  </div>
);

export default WithdrawHistory;
