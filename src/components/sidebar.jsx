import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="flex flex-row shadow-md bg-white">
      <ul className="flex flex-row gap-3 p-2">
        <li className="text-sm font-semibold p-2 hover:text-indigo-700">
          <NavLink
            className={({ isActive }) => isActive && "text-indigo-700"}
            to={"/"}
          >
            Trends
          </NavLink>
        </li>
        <li className="text-sm font-semibold p-2 hover:text-indigo-700">
          <NavLink
            className={({ isActive }) => isActive && "text-indigo-700"}
            to={"/geo"}
          >
            HeatMap
          </NavLink>
        </li>
      </ul>
    </div>
  );
}
