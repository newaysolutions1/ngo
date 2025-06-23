"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import FileSaver from "file-saver";
import {
  Users, Clock3, DollarSign, Megaphone, ArrowUpRight, ArrowDownRight,
  Eye, Check, X, Download as DownloadIcon,
} from "lucide-react";
import {
  BarChart, Bar, LineChart, Line, ResponsiveContainer,
  CartesianGrid, XAxis, YAxis, Tooltip,
} from "recharts";

const summary = [
  { label: "Total Students", value: 156, change: 12, icon: Users, trendUp: true },
  { label: "Pending Apps", value: 23, change: -5, icon: Clock3, trendUp: false },
  { label: "Funds Raised", value: "$45,000", change: 20, icon: DollarSign, trendUp: true },
  { label: "Active Campaigns", value: 8, change: 2, icon: Megaphone, trendUp: true },
];
const appsData = [{ month: "Jan", apps: 40 }, { month: "Feb", apps: 25 }, { month: "Mar", apps: 50 }, { month: "Apr", apps: 45 }];
const donationsData = [{ month: "Jan", amount: 4000 }, { month: "Feb", amount: 3000 }, { month: "Mar", amount: 5000 }, { month: "Apr", amount: 4500 }];
const statusChip = { pending: "bg-yellow-100 text-yellow-800", approved: "bg-green-100 text-green-700", rejected: "bg-red-100 text-red-700" };

const StatCard = ({ label, value, change, icon: Icon, trendUp }) => (
  <div className="flex flex-col justify-between rounded-xl bg-white p-6 shadow-sm">
    <div className="flex items-center gap-2 text-sm font-medium text-gray-500">{label}<Icon size={16} /></div>
    <div className="mt-4 flex items-center justify-between">
      <span className="text-3xl font-bold text-gray-900">{value}</span>
      <span className={`flex items-center gap-1 text-sm ${trendUp ? "text-green-600" : "text-red-600"}`}>
        {trendUp ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}{trendUp && "+"}{change}%
      </span>
    </div>
  </div>
);
const ChartCard = ({ title, children }) => (
  <div className="rounded-xl bg-white p-4 shadow-sm"><h2 className="mb-2 text-sm font-semibold text-gray-700">{title}</h2>{children}</div>
);

const DonationsTable = ({ rows = [] }) => (
  <section className="rounded-xl bg-white p-4 shadow-sm mt-6">
    <h2 className="mb-4 text-sm font-semibold text-gray-700">Recent Donations</h2>

    {rows.length === 0 ? (
      <p className="py-10 text-center text-gray-500">No donations yet</p>
    ) : (
      <div className="overflow-x-auto">
        <table className="w-full min-w-[450px] divide-y divide-gray-200 text-sm">
          <thead>
            <tr className="text-left text-gray-600">
              <th className="py-2">Name</th>
              <th className="py-2">Email</th>
              <th className="py-2">Phone</th>
              <th className="py-2 ">Amount (₹)</th>
              {/* <th className="py-2">Status</th> */}
              <th className="py-2">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {rows.map((d) => (
              <tr key={d._id} className="whitespace-nowrap">
                <td className="py-2 font-medium">{d.name}</td>
                <td className="py-2 text-gray-700">{d.email}</td>
                <td className="py-2 text-gray-700">{d.phone}</td>
                <td className="py-2 ">{d.amount.toLocaleString()}</td>
               
                <td className="py-2 text-gray-600">
                  {new Date(d.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )}
  </section>
);

export default function AdminDashboard() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [updating, setUpdating] = useState(false);
  const [videoURL, setVideoURL] = useState("");
  const [donations, setDonations] = useState([]);

useEffect(() => { loadStudents(); loadDonations(); }, []);

const loadDonations = async () => {
  try {
    const { data } = await axios.get("http://localhost:8000/api/donates");
    setDonations(data.data);
  } catch (e) {
    console.error("Failed to load donations", e);
  }
};


  useEffect(() => { loadStudents(); }, []);
  const loadStudents = async () => {
    try {
      const { data } = await axios.get("http://localhost:8000/api/students");
      setStudents(data.data);
    } catch (e) { console.error(e); } finally { setLoading(false); }
  };

  const openProfile = async (id) => {
    try {
      const { data } = await axios.get(`http://localhost:8000/api/students/${id}`);
      setSelected({ ...data.data });
    } catch (e) { console.error(e); }
  };

  const changeStatus = async (id, newStatus) => {
    try {
      // 1. server पर PATCH call
      const { data } = await axios.put(
        `http://localhost:8000/api/students/status/${id}`,
        { status: newStatus }
      );
  
      // 2. success → local state sync
      setStudents(prev =>
        prev.map(s => (s._id === id ? { ...s, status: newStatus } : s))
      );
      setSelected(p => ({ ...p, status: newStatus }));
    } catch (err) {
      console.error(err);
      alert("Status update failed");
      loadStudents(); // fallback re-fetch
    }
  };
  
  const handleSaveChanges = async () => {
    const fd = new FormData();
    const fields = ["name", "email", "phone", "address", "age", "gender", "institution", "course", "year", "performanceScore", "challange", "goal", "status", "video"];
    fields.forEach(key => fd.append(key, selected[key] ?? ""));

    (selected.support || []).forEach((val, i) => fd.append(`support[${i}]`, val));
    (selected.communicationMode || []).forEach((val, i) => fd.append(`communicationMode[${i}]`, val));

    if (selected.resumeFile) fd.append("resume", selected.resumeFile);
    if (selected.identityFile) fd.append("identity", selected.identityFile);
    if (selected.certificateFile) fd.append("certificate", selected.certificateFile);

    setUpdating(true);
    try {
      const { data } = await axios.put(`http://localhost:8000/api/students/${selected._id}`, fd, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      setStudents((prev) => prev.map(s => s._id === data.data._id ? data.data : s));
      setSelected(data.data);
      alert("Profile updated");
    } catch (e) {
      console.error(e);
      alert("Update failed");
    } finally {
      setUpdating(false);
    }
  };

  const downloadDoc = async (filename) => {
    // prepend the folder you store files in
    const full = `students/${filename}`;        // <- add “students/”
    const url  = `http://localhost:8000/api/download?filename=${full}`;
  
    try {
      const res = await axios.get(url, { responseType: "blob" });
      FileSaver.saveAs(new Blob([res.data]), `${filename}.pdf`);
    } catch (e) {
      alert("Download error");
      console.error(e);
    }
  };
  

  const closeModal = () => { setSelected(null); setVideoURL(""); };

  const input = (label, key) => (
    <div className="flex flex-col text-sm">
      <label className="text-gray-600">{label}</label>
      <input
        className="border p-1 rounded"
        value={selected[key] || ""}
        onChange={(e) => setSelected(p => ({ ...p, [key]: e.target.value }))}
      />
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <h1 className="mb-6 text-2xl font-bold">Admin Dashboard</h1>

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {summary.map((s) => <StatCard key={s.label} {...s} />)}
      </section>

      <section className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <ChartCard title="New Applications">
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={appsData}><CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="month" /><YAxis /><Tooltip />
              <Bar dataKey="apps" fill="#00BD7D" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
        <ChartCard title="Donations Trend">
          <ResponsiveContainer width="90%" height={260}>
            <LineChart data={donationsData}><CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="month" /><YAxis /><Tooltip />
              <Line type="monotone" dataKey="amount" stroke="#00BD7D" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
      </section>

      <section className="mt-6 rounded-xl bg-white p-4 shadow-sm">
        <h2 className="mb-4 text-sm font-semibold text-gray-700">Student Applications</h2>
        {loading ? (
          <p className="text-center py-10 text-gray-500">Loading…</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px] divide-y divide-gray-200 text-sm">
              <thead>
                <tr className="text-left text-gray-600">
                  <th className="py-2">Name</th><th className="py-2">Email</th>
                  <th className="py-2">Status</th><th className="py-2">Date</th><th className="py-2">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {students.map(s => (
                  <tr key={s._id} className="whitespace-nowrap">
                    <td className="py-2 font-medium">{s.name}</td>
                    <td className="py-2 text-gray-700">{s.email}</td>
                    <td className="py-2"><span className={`rounded-md px-2 py-0.5 text-xs ${statusChip[s.status]}`}>{s.status}</span></td>
                    <td className="py-2 text-gray-600">{new Date(s.createdAt).toLocaleDateString()}</td>
                    <td className="py-2">
                      <button onClick={() => openProfile(s._id)} className="flex items-center gap-1 rounded-md border px-2 py-1 text-xs hover:bg-gray-100"><Eye size={14} /> View</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        
      </section>
      <DonationsTable rows={donations} />


      {/* Modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-xl rounded-xl bg-white p-6 shadow-lg max-h-[95vh] overflow-y-auto">
            <div className="flex justify-between mb-4">
              <h3 className="text-lg font-semibold">Edit Profile</h3>
              <button onClick={closeModal} className="text-gray-500 hover:text-gray-700"><X size={20} /></button>
            </div>

            {/* Basic Fields */}
            {input("Name", "name")}
            {input("Email", "email")}
            {input("Phone", "phone")}
            {input("Address", "address")}
            {input("Age", "age")}
            {input("Gender", "gender")}
            {input("Institution", "institution")}
            {input("Course", "course")}
            {input("Year", "year")}
            {input("Performance", "performanceScore")}
            {input("Challenge", "challange")}
            {input("Goal", "goal")}

            {/* Files */}
            <h4 className="mt-4 font-semibold">Documents</h4>
            {["resume", "identity", "certificate"].map(key => (
              <div key={key} className="flex items-center gap-2 mt-2">
                {selected[key] && <button onClick={() => downloadDoc(selected[key])} className="text-blue-600 text-sm underline"><DownloadIcon size={14} /> {key}</button>}
                <input type="file" onChange={e => setSelected(p => ({ ...p, [`${key}File`]: e.target.files[0] }))} />
              </div>
            ))}

            {/* Video */}
            <h4 className="mt-4 font-semibold">Video</h4>
            {selected.video ? (
              <div className="mt-2">
                <iframe src={selected.video.replace("watch?v=", "embed/")} className="w-full aspect-video" allowFullScreen title="video" />
              </div>
            ) : (
              <input type="url" className="mt-2 border p-1 rounded w-full" placeholder="YouTube/Vimeo link" value={selected.video || ""} onChange={(e) => setSelected(p => ({ ...p, video: e.target.value }))} />
            )}

            {/* Buttons */}
            <div className="mt-6 space-y-2">
              {selected.status === "pending" && (
                <div className="flex gap-2">
                  <button onClick={() => changeStatus(selected._id, "approved")} className="flex-1 py-2 bg-green-100 text-green-700 rounded-md hover:bg-green-200"><Check size={16} /> Approve</button>
                  <button onClick={() => changeStatus(selected._id, "rejected")} className="flex-1 py-2 bg-red-100 text-red-700 rounded-md hover:bg-red-200"><X size={16} /> Reject</button>
                </div>
              )}
              <button onClick={handleSaveChanges} disabled={updating} className="w-full mt-2 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50">
                {updating ? "Saving…" : "Save All Changes"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
