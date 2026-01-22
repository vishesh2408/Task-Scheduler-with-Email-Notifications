import './App.css'
import TaskDashboard from './TaskDashboard'
import Header from './components/Header';

function App() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 flex flex-col font-sans selection:bg-blue-500/30">
      <Header />
      <main className="flex-1 w-full flex flex-col relative overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[100px]"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-600/10 rounded-full blur-[100px]"></div>
        </div>

        <div className="relative z-10 w-full h-full">
          <TaskDashboard />
        </div>
      </main>
    </div>
  );
}

export default App
