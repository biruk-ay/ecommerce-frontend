import React, { useState, useEffect } from 'react';

const PriceSlider = () => {
    const [products, setProducts] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);
    const [price, setPrice] = useState(100); // Default price to max to show all products initially
    const [isPriceSelected, setIsPriceSelected] = useState(false); // Track if a price is selected

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost:5000/product/category/cars');
                const data = await response.json();
                setProducts(data);
                setFilteredItems(data); // Show all products initially
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchProducts();
    }, []);

    useEffect(() => {
        if (isPriceSelected) {
            const filtered = products.filter(product => product.price <= price);
            setFilteredItems(filtered);
        } else {
            setFilteredItems(products); // Show all products if no price is selected
        }
    }, [price, products, isPriceSelected]);

    const handleSliderChange = (event) => {
        const selectedPrice = event.target.value;
        setPrice(selectedPrice);
        setIsPriceSelected(selectedPrice < 100); // Assuming 100 is the maximum price
    };

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Adjust Price</h2>
            <input
                type="range"
                min="0"
                max="100" // Adjust according to your price range
                value={price}
                onChange={handleSliderChange}
                className="w-full"
            />
            <p className="mt-2">Selected Price: ${price}</p>

            <h3 className="text-xl font-bold mt-4">Items:</h3>
            <ul>
                {filteredItems.map((item) => (
                    <li key={item.id} className="border-b py-2">
                        {item.name} - ${item.price}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PriceSlider;