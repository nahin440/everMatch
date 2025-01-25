import  { useEffect, useState } from 'react';
import axios from 'axios';

const Favourites = () => {
    const [favourites, setFavourites] = useState([]);

    // Fetch favourites on component mount
    useEffect(() => {
        const fetchFavourites = async () => {
            try {
                const response = await axios.get('http://localhost:5000/favourites'); // Replace with your backend URL
                setFavourites(response.data);
            } catch (error) {
                console.error('Error fetching favourites:', error);
            }
        };

        fetchFavourites();
    }, []);

    // Handle delete operation
    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/favourites/${id}`); // Replace with your backend URL
            setFavourites(favourites.filter((item) => item._id !== id));
        } catch (error) {
            console.error('Error deleting favourite:', error);
        }
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Favourites Biodata</h1>
            <table className="table-auto border-collapse w-full border border-gray-300">
                <thead>
                    <tr className="bg-gray-100 border-b">
                        <th className="border border-gray-300 px-4 py-2">Name</th>
                        <th className="border border-gray-300 px-4 py-2">Biodata ID</th>
                        <th className="border border-gray-300 px-4 py-2">Permanent Division</th>
                        <th className="border border-gray-300 px-4 py-2">Occupation</th>
                        <th className="border border-gray-300 px-4 py-2">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {favourites.map((favourite) => (
                        <tr key={favourite._id} className="hover:bg-gray-50">
                            <td className="border border-gray-300 px-4 py-2">{favourite.name}</td>
                            <td className="border border-gray-300 px-4 py-2">{favourite.biodataId}</td>
                            <td className="border border-gray-300 px-4 py-2">{favourite.PermanentDivision || 'N/A'}</td>
                            <td className="border border-gray-300 px-4 py-2">{favourite.Occupation}</td>
                            <td className="border border-gray-300 px-4 py-2">
                                <button
                                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                                    onClick={() => handleDelete(favourite._id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Favourites;
