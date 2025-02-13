import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import topImage from "../assets/topImage.png";
import shoes from "../assets/shoes.png";
import electronics from "../assets/electronics.png";
import clothes from "../assets/clothes.png";
import cars from "../assets/cars.png";
import houses from "../assets/houses.png";
import toys from "../assets/toys.png";
import kitchen from "../assets/kitchen.png";
import supplements from "../assets/supplements.png";
import books from "../assets/books.png";
import Footer from './Footer';
import { Link } from 'react-router-dom';

function Home() {
    const navigate = useNavigate();

    const handleCategoryClick = (category: string) => {
        navigate(`/category?category=${category}`);
    };

    return (
        <div className='bg-white'>
            <Header />
            
            <div className="flex top-0 w-full justify-evenly items-center text-white">
                <img className="w-11/12 justify-evenly items-center" src={topImage} alt='top image' />
            </div>
            <div className="w-11/12  h-max mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-0 bg-slate-100 -mt-40 mb-5">
                <div className="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl" onClick={() => handleCategoryClick('shoes')}>
                    <img className="w-lvw" src={shoes} alt='Shoes' />
                    
                    <div className="px-6 py-4">
                        <h1 className='font-semibold text-lg inline-block hover:text-indigo-600 transition duration-500 ease-in-out'>Shoes</h1>
                        <h1 className='text-gray-500 text-sm'>Nike Running Shoes</h1>
                    </div>
                </div>

                <div className="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl" onClick={() => handleCategoryClick("electronics")}>
                    <img className="w-lvw" src={electronics} alt='Electronics' />
                    <div className="px-6 py-4">
                        <h1 className='font-semibold text-lg inline-block hover:text-indigo-600 transition duration-500 ease-in-out'>Electronics</h1>
                        <h1 className='text-gray-500 text-sm'>Electronics Gadgets</h1>
                    </div>
                </div>

                <div className="w-72 h-90 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl" onClick={() => handleCategoryClick('clothes')}>
                    <img className="w-lvw" src={clothes} alt='Clothes' />
                    <div className="px-6 py-4">
                        <h1 className='font-semibold text-lg inline-block hover:text-indigo-600 transition duration-500 ease-in-out'>Clothes</h1>
                        <h1 className='text-gray-500 text-sm'>Men's, Women's</h1>
                    </div>
                </div>

                <div className="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl" onClick={() => handleCategoryClick('supplements')}>
                    <img className="w-lvw" src={supplements} alt='Supplements' />
                    <div className="px-6 py-4">
                        <h1 className='font-semibold text-lg inline-block hover:text-indigo-600 transition duration-500 ease-in-out'>Supplements</h1>
                        <h1 className='text-gray-500 text-sm'>Protein, creatine, plumpy nuts...</h1>
                    </div>
                </div>

                <div className="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl" onClick={() => handleCategoryClick('houses')}>
                    <img className="w-lvw" src={houses} alt='Houses' />
                    <div className="px-6 py-4">
                        <h1 className='font-semibold text-lg inline-block hover:text-indigo-600 transition duration-500 ease-in-out'>Houses</h1>
                        <h1 className='text-gray-500 text-sm'>A place to rest</h1>
                    </div>
                </div>

                <div className="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl" onClick={() => handleCategoryClick('cars')}>
                    <img className="w-lvw" src={cars} alt='Cars' />
                    <div className="px-6 py-4">
                        <h1 className='font-semibold text-lg inline-block hover:text-indigo-600 transition duration-500 ease-in-out'>Cars</h1>
                        <h1 className='text-gray-500 text-sm'>Travel wherever you want</h1>
                    </div>
                </div>

                <div className="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl" onClick={() => handleCategoryClick('kitchen')}>
                    <img className="w-lvw" src={kitchen} alt='Kitchen' />
                    <div className="px-6 py-4">
                        <h1 className='font-semibold text-lg inline-block hover:text-indigo-600 transition duration-500 ease-in-out'>Kitchen</h1>
                        <h1 className='text-gray-500 text-sm'>Make delicious meals</h1>
                    </div>
                </div>

                <div className="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl" onClick={() => handleCategoryClick('toys')}>
                    <img className="w-lvw" src={toys} alt='Toys' />
                    <div className="px-6 py-4">
                        <h1 className='font-semibold text-lg inline-block hover:text-indigo-600 transition duration-500 ease-in-out'>Toys</h1>
                        <h1 className='text-gray-500 text-sm'>Have fun</h1>
                    </div>
                </div>

                <div className="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl" onClick={() => handleCategoryClick('books')}>
                    <img className="w-lvw" src={books} alt='Books' />
                    <div className="px-6 py-4">
                        <h1 className='font-semibold text-lg inline-block hover:text-indigo-600 transition duration-500 ease-in-out'>Books</h1>
                        <h1 className='text-gray-500 text-sm'>Increase your knowledge</h1>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}

export default Home;