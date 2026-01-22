import React, { useState, useRef, useEffect } from "react";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const dropdownRef = useRef(null);
  const backendUrl = import.meta.env.VITE_BACKEND_URI || "http://localhost:5000";

  useEffect(() => {
    if (open) {
      fetchNotifications();
    }
    // eslint-disable-next-line
  }, [open, backendUrl]);

  const fetchNotifications = () => {
    setLoading(true);
    fetch(`${backendUrl}/api/notifications`)
      .then(res => {
        if (!res.ok) {
          setNotifications([]);
          throw new Error("Failed to fetch notifications");
        }
        return res.json();
      })
      .then(data => setNotifications(data))
      .catch(() => setNotifications([]))
      .finally(() => setLoading(false));
  };

  const markAsRead = async (id) => {
    await fetch(`${backendUrl}/api/notifications/${id}/read`, { method: "PATCH" });
    fetchNotifications();
  };

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  return (
    // Changed bg-blue-600 to bg-slate-900 for a modern dashboard feel
    // Removed mb-6 inside the component (margins usually belong to the parent layout, but kept standard spacing)
    <header className="bg-slate-900 border-b border-slate-800 text-white shadow-lg z-50 relative">
      {/* Fixed Alignment:
        - Removed 'max-w-3xl mx-auto' (which was centering everything).
        - Added 'w-full px-6' to span the full width.
        - Added 'justify-between' to push logo to left and actions to right.
      */}
      <nav className="w-full px-4 md:px-6 py-4 flex items-center justify-between mx-auto max-w-7xl">

        {/* Left Side: Interactive Logo & Title */}
        <div className="flex items-center gap-3 group cursor-pointer select-none">
          {/* Custom Logo (No IMG tag) */}
          <div className="relative w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20 transition-transform duration-300 group-hover:scale-105 group-hover:rotate-3">
            <div className="absolute inset-0 bg-blue-400 opacity-0 group-hover:opacity-20 rounded-xl transition-opacity duration-300"></div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
          </div>

          {/* Text Branding */}
          <div className="flex flex-col">
            <span className="text-xl font-bold tracking-tight leading-none group-hover:text-blue-400 transition-colors duration-300">
              Task<span className="text-blue-500">Flow</span>
            </span>
            <span className="text-[10px] uppercase tracking-widest text-slate-400 font-semibold mt-0.5 group-hover:text-slate-300 transition-colors">
              Scheduler Dashboard
            </span>
          </div>
        </div>

        {/* Right Side: Interactive Actions */}
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="h-6 w-px bg-slate-800 hidden sm:block"></div>

          <div className="relative" ref={dropdownRef}>
            <button
              className="relative p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-full transition-all"
              onClick={() => setOpen((v) => !v)}
            >
              <span className="absolute top-2 right-2.5 w-2 h-2 bg-blue-500 rounded-full ring-2 ring-slate-900 animate-pulse"></span>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>
            </button>
            {open && (
              <div className="absolute right-0 mt-2 w-80 max-h-96 overflow-y-auto bg-slate-900 border border-slate-700 rounded-xl shadow-2xl z-50 animate-fade-in p-2">
                <div className="px-3 py-2 border-b border-slate-800 text-sm font-bold text-slate-200">Notifications</div>
                {loading ? (
                  <div className="p-4 text-center text-slate-400 text-sm">Loading...</div>
                ) : notifications.length === 0 ? (
                  <div className="p-4 text-center text-slate-400 text-sm">No notifications</div>
                ) : (
                  notifications.map((n) => (
                    <button
                      key={n._id}
                      className={`w-full text-left px-4 py-3 border-b border-slate-800 last:border-b-0 text-slate-200 text-sm transition-colors ${n.read ? "opacity-60" : "font-semibold hover:bg-blue-900/30"}`}
                      onClick={() => !n.read && markAsRead(n._id)}
                      tabIndex={0}
                    >
                      <div>{n.message}</div>
                      <div className="text-xs text-slate-500 mt-1 flex justify-between">
                        <span>{n.type.charAt(0).toUpperCase() + n.type.slice(1)}</span>
                        <span>{new Date(n.createdAt).toLocaleString()}</span>
                      </div>
                    </button>
                  ))
                )}
              </div>
            )}
          </div>


        </div>
      </nav>
    </header>
  );
}
