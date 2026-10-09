import { Link, useLocation } from "react-router-dom";
import taskdutyLogo from "../assets/taskduty-logo.png";
import avatar from "../assets/avatar.png";

function Navbar() {
  const { pathname } = useLocation();

  const isTasksList = pathname === "/tasks";
  const isTaskForm =
    pathname === "/tasks/new" || pathname.startsWith("/tasks/edit");

  return (
    <nav className="w-full bg-white border-b border-gray-200">
      <div className="max-w-5xl mx-auto flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4">
        {/* Logo */}
        <Link to="/" className="flex items-center shrink-0">
          <img
            src={taskdutyLogo}
            alt="TaskDuty"
            className="h-7 sm:h-10 w-auto"
          />
        </Link>

        {/* Navigation */}
        <div className="flex items-center gap-3 sm:gap-8">
          {!isTaskForm && (
            <Link
              to="/tasks/new"
              className="text-xs sm:text-sm font-medium text-gray-700 hover:text-[#6C4FF3] whitespace-nowrap"
            >
              New Task
            </Link>
          )}

          {!isTasksList && (
            <Link
              to="/tasks"
              className="text-xs sm:text-sm font-medium text-gray-700 hover:text-[#6C4FF3] whitespace-nowrap"
            >
              All Task
            </Link>
          )}

          {/* Login link */}
          <Link
            to="/login"
            className="text-xs sm:text-sm font-semibold text-[#6C4FF3] hover:text-[#5A3FE0] whitespace-nowrap"
          >
            Login
          </Link>

          {/* Avatar */}
          <Link to="/login" className="shrink-0">
            <img
              src={avatar}
              alt="Login"
              title="Log in to TaskDuty"
              className="h-8 w-8 sm:h-10 sm:w-10 rounded-full object-cover"
            />
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
