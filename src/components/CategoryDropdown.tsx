import React, { useState } from 'react';
import { ChevronDownIcon } from "@heroicons/react/20/solid";
const CategoryDropdown = () => {
    const allCategories = [
        "Category A",
        "Category B",
        "Category C",
        "Category D",
        "Category E",
        "Category F",
        "Category G",
        "Category H",
    ];

    const [clicked, setClicked] = useState(false);
    const [showAll, setShowAll] = useState(false);

    const handleCategorySelect = (category) => {
        console.log("Selected Category:", category);
        // Add your category selection logic here
    };

    const toggleDropdown = () => {
        setClicked((prev) => !prev);
    };

    const toggleShowAll = () => {
        setShowAll((prev) => !prev);
    };

    return (
        <div className="relative">
            <div className="flex items-center justify-between p-2 cursor-pointer" onClick={toggleDropdown}>
                <span>Select Category</span>
                <ChevronDownIcon className="h-5 w-5 text-gray-400" />
            </div>

            {clicked && (
                <div className="absolute bg-white w-52 mt-2 border border-gray-300 rounded shadow-lg">
                    <ul className={`text-center border-t overflow-hidden transition-max-height duration-300 ease-in-out ${showAll ? 'max-h-60' : 'max-h-16'}`}>
                        {allCategories.slice(0, showAll ? allCategories.length : 4).map((category) => (
                            <li
                                key={category}
                                className="py-2 border-b shadow-md rounded-sm hover:bg-fuchsia-900 hover:border-slate-300 cursor-pointer"
                                onClick={() => handleCategorySelect(category)}
                            >
                                {category}
                            </li>
                        ))}
                        {allCategories.length > 4 && (
                            <li
                                className="py-2 border-b shadow-md rounded-sm hover:bg-fuchsia-900 hover:border-slate-300 cursor-pointer"
                                onClick={toggleShowAll}
                            >
                                {showAll ? "Show Less" : "More"}
                            </li>
                        )}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default CategoryDropdown;