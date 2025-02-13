import React, { useState, useEffect } from 'react';

const SearchComponent: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [data, setData] = useState<any[]>([]); // Use a specific type if your product structure is known
    const [filteredData, setFilteredData] = useState<any[]>([]); // Start with an empty array
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const response = await fetch('http://localhost:5000/product/allProducts'); // Fetch all products
                if (!response.ok) {
                    throw new Error('Failed to fetch products');
                }
                const result = await response.json();
                setData(result); // Set all products
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An unknown error occurred');
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    useEffect(() => {
        // Filter products whenever the search term changes
        if (searchTerm) {
            const filtered = data.filter(item =>
                item.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredData(filtered);
        } else {
            setFilteredData([]); // Clear filtered data if the search term is empty
        }
    }, [searchTerm, data]); // Depend on searchTerm and data

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    return (
        <div>
            <h1>Search Products</h1>
            <input 
                type="text" 
                placeholder="Search by name..." 
                value={searchTerm} 
                onChange={handleSearchChange} 
            />
            {loading && <p>Loading...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <div id="results" style={{ marginTop: '20px' }}>
                {filteredData.length > 0 ? (
                    filteredData.map((item) => (
                        <div key={item._id}>{item.name}</div> // Use _id as the key
                    ))
                ) : (
                    searchTerm && <div>No results found</div> // Only show if searchTerm is not empty
                )}
            </div>
        </div>
    );
};

export default SearchComponent;