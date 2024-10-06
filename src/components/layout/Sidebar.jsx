import { Menu } from "lucide-react";

const Sidebar = () => (
    <div className="w-64 bg-gray-100 p-4 border-r border-gray-200 h-screen fixed">
      <div className="flex items-center mb-4">
        <Menu className="w-5 h-5 mr-2"/>
        <h1 className="text-lg font-semibold">Workspace</h1>
      </div>
      <nav>
        {/* Navigation links */}
      </nav>
    </div>
);

export default Sidebar;