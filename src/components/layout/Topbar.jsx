import { Search } from "lucide-react";

const Topbar = () => (
    <div
        className="flex items-center justify-between p-4 border-b border-gray-200 fixed top-0 left-64 right-0 bg-white">
      <div className="flex items-center">
        <input
            type="text"
            placeholder="Search"
            className="bg-gray-100 px-3 py-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <Search className="w-5 h-5 text-gray-500 ml-2"/>
      </div>
    </div>
);

export default Topbar;