import {useState} from "react";
import {Search} from "lucide-react";
import SearchResultModal from "../pages/SearchResultModal";
import api from "../services/api.js";

const TaskSearch = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [showModal, setShowModal] = useState(false);

    const handleSearch = async (e) => {
        const query = e.target.value;
        setSearchQuery(query);

        if (query.length >= 2) {
            try {
                const response = await api.get(`/tasks/search`, {
                    params: {content: query},
                });
                setSearchResults(Array.isArray(response.data) ? response.data : []);
                setShowModal(true);
            } catch (error) {
                console.error("Error fetching search results", error);
                setShowModal(false);
            }
        } else {
            setShowModal(false);
        }
    };

    return (
        <div className="relative">
            <input
                type="text"
                value={searchQuery}
                onChange={handleSearch}
                placeholder="Search"
                className="bg-gray-100 px-3 py-2 pl-10 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search className="w-5 h-5 text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2"/>
            {showModal && <SearchResultModal results={searchResults}/>}
        </div>
    );
};

export default TaskSearch;