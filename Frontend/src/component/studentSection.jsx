import React, { useState } from "react";

export default function StudentSection() {
  const [activeTab, setActiveTab] = useState("overview");
  const [amountRaised, setAmountRaised] = useState(7200);

  const financialData = [
    { label: "Tuition", amount: 8000 },
    { label: "Medical Equipment", amount: 2000 },
    { label: "Living Expenses", amount: 1500 },
    { label: "Books & Materials", amount: 500 },
  ];

  const tabs = [
    "Overview",
    "Financial Needs",
    "Authenticity",
    "Goals & Updates",
  ];

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <img
            src="https://via.placeholder.com/150"
            alt="student"
            className="w-32 h-32 rounded-full object-cover"
          />
          <div>
            <h2 className="text-2xl font-bold">Maria Rodriguez</h2>
            <p className="mt-2 text-sm text-gray-600">
              I am the first in my family pursuing higher education. My dream is
              to become a doctor and return to my rural hometown where medical
              care is scarce.
            </p>
            <div className="mt-4 flex items-center gap-4">
              <span className="text-red-600 font-bold text-xl">
                ${amountRaised}
              </span>
              <button className="bg-red-600 text-white px-4 py-2 rounded">
                Support Maria
              </button>
            </div>
          </div>
        </div>

        <div className="mt-6 border-b">
          <ul className="flex gap-4">
            {tabs.map((tab) => (
              <li
                key={tab}
                className={`cursor-pointer px-4 py-2 font-medium text-sm border-b-2 transition ${
                  activeTab === tab.toLowerCase()
                    ? "border-red-600 text-red-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
                onClick={() => setActiveTab(tab.toLowerCase())}
              >
                {tab}
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-6">
          {activeTab === "overview" && (
            <div className="text-gray-600 text-sm">
              <p>Age: 24</p>
              <p>Gender: Female</p>
              <p>University: Federal University of Rio de Janeiro</p>
              <p>Year: 4th Year</p>
            </div>
          )}

          {activeTab === "financial needs" && (
            <div className="space-y-4">
              {financialData.map((item, i) => (
                <div key={i} className="flex justify-between items-center">
                  <span>{item.label}</span>
                  <span className="font-semibold">
                    ${item.amount.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          )}

          {activeTab === "authenticity" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                "ID Verification",
                "University Enrollment",
                "Merit Certificate",
                "Service Record",
              ].map((label) => (
                <div
                  key={label}
                  className="flex justify-between items-center p-3 border rounded"
                >
                  <span>{label}</span>
                  <span className="text-green-500">✔</span>
                </div>
              ))}
            </div>
          )}

          {activeTab === "goals & updates" && (
            <div>
              <div className="bg-gray-100 p-4 rounded mb-4 text-center text-sm">
                Video player placeholder
              </div>
              <div className="text-sm text-gray-700 space-y-2">
                <p>
                  <strong>2025-01-05:</strong> Completed my clinical rotation in
                  pediatrics with honors.
                </p>
                <p>
                  <strong>2025-01-03:</strong> Participated in a mission to
                  provide medical care in the Amazon region.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
