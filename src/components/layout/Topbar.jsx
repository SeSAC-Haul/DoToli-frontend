import {User} from "lucide-react";
import TaskSearch from "../TaskSearch";

const Topbar = () => (
    <div className="flex items-center justify-end p-4 border-b border-gray-200 fixed top-0 left-64 right-0 bg-white">
        <div className="flex items-center space-x-4">
            <div className="relative">
                <TaskSearch/>
            </div>
            <button
                className="bg-gray-200 p-2 rounded-full hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <User className="w-5 h-5 text-gray-700"/>
            </button>
        </div>
    </div>
);

export default Topbar;