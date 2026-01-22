import React, { useEffect, useState } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

const API_URL = "/api/tasks";

export default function TaskDashboard() {
  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState({ title: "", description: "", dueDate: "", emails: "" });
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState("upcoming");
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(setTasks);
  }, []);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const [editingId, setEditingId] = useState(null);

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);

    // Parse emails string to array for backend
    const payload = {
      ...form,
      emails: form.emails.split(',').map(e => e.trim()).filter(e => e)
    };

    const url = editingId ? `${API_URL}/${editingId}` : API_URL;
    const method = editingId ? "PUT" : "POST";

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    setForm({ title: "", description: "", dueDate: "", emails: "" });
    setEditingId(null);

    const res = await fetch(API_URL);
    setTasks(await res.json());
    setLoading(false);
  };

  const handleEdit = (task) => {
    // Populate form with task data
    const emailString = Array.isArray(task.emails)
      ? task.emails.map(e => (typeof e === 'string' ? e : e.email)).join(', ')
      : '';

    setForm({
      title: task.title,
      description: task.description || "",
      dueDate: task.dueDate ? new Date(task.dueDate).toISOString().slice(0, 16) : "",
      emails: emailString
    });
    setEditingId(task._id);
  };

  const handleDelete = async (task) => {
    if (!window.confirm(`Are you sure you want to delete "${task.title}"?`)) return;

    try {
      await fetch(`${API_URL}/${task._id}`, { method: "DELETE" });
      setTasks(tasks.filter(t => t._id !== task._id));
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
  };

  // Categorize tasks
  const upcoming = tasks.filter(t => t.status === "upcoming");
  const completed = tasks.filter(t => t.status === "completed");
  const missed = tasks.filter(t => t.status === "missed");

  const tabList = [
    { key: "upcoming", label: "Upcoming", color: "text-blue-400" },
    { key: "completed", label: "Completed", color: "text-emerald-400" },
    { key: "missed", label: "Missed", color: "text-rose-400" },
  ];

  const getTabTasks = () => {
    switch (tab) {
      case "completed": return completed;
      case "missed": return missed;
      default: return upcoming;
    }
  };

  /* Pagination Logic */
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  useEffect(() => {
    setCurrentPage(1);
  }, [tab, search]);

  const filteredTasks = getTabTasks().filter(task =>
    task.title.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredTasks.length / itemsPerPage);
  const paginatedTasks = filteredTasks.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="w-full h-full px-4 md:px-8 py-8 flex flex-col lg:flex-row gap-8 items-start max-w-7xl mx-auto">
      {/* Form on the left */}
      <div className="w-full lg:flex-[1.2] lg:min-w-[340px] xl:max-w-md h-auto flex z-10">
        <div className="w-full h-full flex items-stretch">
          <TaskForm form={form} onChange={handleChange} onSubmit={handleSubmit} loading={loading} />
        </div>
      </div>

      {/* Tabs and search for task categories on the right */}
      <div className="w-full lg:flex-[2] h-full flex flex-col gap-4 bg-slate-950/30 backdrop-blur-md border border-slate-800/50 rounded-2xl shadow-2xl p-4 sm:p-6 z-0">
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-4">
          <div className="flex gap-2">
            {tabList.map(t => (
              <button
                key={t.key}
                className={`px-4 py-2 rounded-xl font-bold text-sm transition-all border-b-2 focus:outline-none ${tab === t.key ? `${t.color} border-blue-500 bg-slate-800/80` : 'text-slate-400 border-transparent hover:bg-slate-800/40'}`}
                onClick={() => setTab(t.key)}
              >
                {t.label}
              </button>
            ))}
          </div>
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by title..."
            className="ml-auto w-full sm:w-64 px-4 py-2 rounded-xl bg-slate-800 border border-slate-700 text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-sm"
          />
        </div>
        <div className="flex-1 h-full min-h-[500px] flex flex-col justify-between">
          <TaskList tasks={paginatedTasks} onDelete={handleDelete} onEdit={handleEdit} />

          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-6 pt-4 border-t border-slate-800/50">
              <span className="text-xs font-medium text-slate-500">
                Page {currentPage} of {totalPages}
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-800 text-slate-300 text-xs font-bold hover:bg-slate-700/80 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  Previous
                </button>
                <div className="flex gap-1">
                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i + 1}
                      onClick={() => handlePageChange(i + 1)}
                      className={`w-7 h-7 rounded-lg text-xs font-bold transition-all ${currentPage === i + 1
                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25'
                        : 'bg-slate-800 text-slate-400 hover:bg-slate-700 border border-slate-700'
                        }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-800 text-slate-300 text-xs font-bold hover:bg-slate-700/80 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
