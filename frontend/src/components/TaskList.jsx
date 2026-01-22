import React from "react";

export default function TaskList({ tasks, onDelete, onEdit }) {
  if (!tasks || tasks.length === 0) {
    return (
      <div className="w-full py-16 flex flex-col items-center justify-center bg-slate-900/30 border-2 border-dashed border-slate-800 rounded-3xl">
        <div className="w-20 h-20 bg-slate-800/50 rounded-2xl flex items-center justify-center text-slate-500 mb-5 shadow-inner">
          <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
        </div>
        <h3 className="text-slate-200 font-bold text-lg">Your queue is empty</h3>
        <p className="text-slate-500 text-sm mt-1">Ready to start something new? Add a task above.</p>
      </div>
    );
  }

  const getStatusConfig = (status) => {
    switch (status) {
      case "completed":
        return {
          classes: "bg-emerald-500/10 border-emerald-500/20 text-emerald-400",
          label: "Completed",
          icon: <path d="M5 13l4 4L19 7" />
        };
      case "missed":
        return {
          classes: "bg-rose-500/10 border-rose-500/20 text-rose-400",
          label: "Overdue",
          icon: <path d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        };
      default:
        return {
          classes: "bg-blue-500/10 border-blue-500/20 text-blue-400",
          label: "In Progress",
          icon: <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        };
    }
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
      {tasks.map((task) => {
        const config = getStatusConfig(task.status);
        return (
          <div
            key={task._id}
            className="group relative bg-slate-800/60 border border-slate-800 rounded-2xl p-6 hover:border-blue-500/50 transition-all duration-300 shadow-xl hover:shadow-blue-900/10 overflow-hidden"
          >
            {/* Background Accent Blur */}
            <div className="absolute -top-12 -right-12 w-24 h-24 bg-blue-600/5 blur-3xl rounded-full group-hover:bg-blue-600/10 transition-colors"></div>

            <div className="flex justify-between items-start mb-4 relative z-10">
              <div className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter flex items-center gap-1.5 border ${config.classes}`}>
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  {config.icon}
                </svg>
                {config.label}
              </div>

              <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="p-1.5 text-slate-500 hover:text-blue-400 hover:bg-blue-400/10 rounded-lg transition-all" onClick={() => onEdit && onEdit(task)}>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                </button>
                <button className="p-1.5 text-slate-500 hover:text-rose-400 hover:bg-rose-400/10 rounded-lg transition-all" onClick={() => onDelete && onDelete(task)}>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                </button>
              </div>
            </div>

            <div className="relative z-10 mb-6">
              <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors leading-tight mb-2">
                {task.title}
              </h3>
              <p className="text-sm text-slate-400 line-clamp-2 font-medium leading-relaxed">
                {task.description || "No description provided for this task."}
              </p>
            </div>

            <div className="pt-5 border-t border-slate-800/80 flex flex-col gap-4 relative z-10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center shadow-sm">
                    <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold text-slate-500 tracking-wider leading-none mb-1">Deadline</p>
                    <p className="text-xs text-slate-200 font-semibold">
                      {new Date(task.dueDate).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })}
                    </p>
                  </div>
                </div>

                <div className="flex -space-x-2">
                  {Array.isArray(task.emails) && task.emails.length > 0 ? (
                    task.emails.map((item, idx) => {
                      const email = typeof item === 'string' ? item : item.email;
                      const isSent = typeof item === 'object' ? item.isSend : false;
                      return (
                        <div
                          key={email + idx}
                          className={`w-7 h-7 rounded-full border-2 border-slate-900 flex items-center justify-center text-[10px] font-black text-white shadow-sm ${isSent ? 'bg-gradient-to-br from-emerald-500 to-green-600' : 'bg-gradient-to-br from-indigo-500 to-blue-600'
                            }`}
                          title={`${email} ${isSent ? '(Sent)' : ''}`}
                        >
                          {email.charAt(0).toUpperCase()}
                        </div>
                      );
                    })
                  ) : (
                    <div className="w-7 h-7 rounded-full border-2 border-slate-900 bg-linear-to-br from-indigo-500 to-blue-600 flex items-center justify-center text-[10px] font-black text-white shadow-sm" title="?">
                      ?
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
