import React, { useState } from 'react';
import { BuildingOffice2Icon, MagnifyingGlassIcon, ChevronDownIcon } from '@heroicons/react/24/solid';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    
    let Links = [
        { name: 'Home', link: '/' },
        { name: 'Accommodation', link: '/accommodation', dropdown: true }, // Dropdown option
        { name: 'Reviews', link: '/reviews' },
    ];

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState('Accommodation'); // Default display text

    const handleSelectOption = (option) => {
        setSelectedOption(option);
        setDropdownOpen(false); // Close dropdown after selection
    };

    const handleLoginClick = () => {
        navigate('/login'); // Redirect to login page
    };

    return (
        <div className='shadow-md w-full fixed top-0 left-0'>
            <div className='md:px-12 py-4 px-8 md:flex justify-between items-center bg-navColor'>
                
                {/* Logo Section */}
                <div className='flex cursor-pointer text-xl items-center gap-2'>
                    <BuildingOffice2Icon className='h-8 w-10 cursor-pointer' />
                    <span className='font-bold text-xl'>RentPal</span>    
                </div>

                {/* Search Bar */}
                <div className='flex flex-grow md:mx-8 relative'>
                    <input
                        type='text'
                        placeholder='Search...'
                        className='border:none rounded-full py-2 px-4 pr-12 w-full focus:outline-none focus:border-black' 
                    />
                    <MagnifyingGlassIcon className='h-5 w-5 text-gray-500 absolute right-3 top-1/2 transform -translate-y-1/2' /> 
                </div>

                <div className='flex items-center justify-end gap-4'>
                    <ul className='md:flex items-center'>
                        {Links.map(link => (
                            <li
                                key={link.name}
                                className='relative font-semibold md:ml-8 text-xl hover:underline gap-2'
                                onMouseEnter={() => link.dropdown && setDropdownOpen(true)}
                                onMouseLeave={() => link.dropdown && setDropdownOpen(false)}
                            >
                                <a href={link.link} className='flex items-center'>
                                    {link.dropdown ? selectedOption : link.name} {/* Display selected option */}
                                    {link.dropdown && <ChevronDownIcon className='h-5 w-5 ml-1' />}
                                </a>

                                {/* Dropdown Menu */}
                                {link.dropdown && dropdownOpen && (
                                    <ul className='absolute top-full left-0 mt-2 bg-white shadow-lg rounded-lg py-2 w-48'>
                                        <li className='px-4 py-2 hover:bg-gray-200 cursor-pointer' onClick={() => handleSelectOption('PGs')}>
                                            PGs
                                        </li>
                                        <li className='px-4 py-2 hover:bg-gray-200 cursor-pointer' onClick={() => handleSelectOption('Hotels')}>
                                            Hotels
                                        </li>
                                        <li className='px-4 py-2 hover:bg-gray-200 cursor-pointer' onClick={() => handleSelectOption('Hostels')}>
                                            Hostels
                                        </li>
                                        <li className='px-4 py-2 hover:bg-gray-200 cursor-pointer' onClick={() => handleSelectOption('Apartments')}>
                                            Apartments
                                        </li>
                                        <li className='px-4 py-2 hover:bg-gray-200 cursor-pointer' onClick={() => handleSelectOption('Guest Houses')}>
                                            Guest Houses
                                        </li>
                                        <li className='px-4 py-2 hover:bg-gray-200 cursor-pointer' onClick={() => handleSelectOption('Homestays')}>
                                            Homestays
                                        </li>
                                        <li className='px-4 py-2 hover:bg-gray-200 cursor-pointer' onClick={() => handleSelectOption('Bed & Breakfasts')}>
                                            Bed & Breakfasts
                                        </li>
                                        <li className='px-4 py-2 hover:bg-gray-200 cursor-pointer' onClick={() => handleSelectOption('Resorts')}>
                                            Resorts
                                        </li>
                                        <li className='px-4 py-2 hover:bg-gray-200 cursor-pointer' onClick={() => handleSelectOption('Motels')}>
                                            Motels
                                        </li>
                                        <li className='px-4 py-2 hover:bg-gray-200 cursor-pointer' onClick={() => handleSelectOption('Serviced Apartments')}>
                                            Serviced Apartments
                                        </li>
                                    </ul>
                                )}
                            </li>
                        ))}
                    </ul>

                    <button 
                        onClick={handleLoginClick} 
                        className='bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600'>
                        Login
                    </button>
                    <button className='bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600'>
                        Sign Up
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
