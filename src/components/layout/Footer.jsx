import { FaCat, FaInstagram, FaTwitter, FaFacebook } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-pink-50 py-10 px-4 text-center">
            <div className="container mx-auto max-w-6xl">
                <div className="flex flex-col items-center space-y-6">
                    {/* Logo atau Judul */}
                    <div className="flex items-center space-x-2 text-2xl font-bold text-pink-600">
                        <FaCat className="text-3xl text-pink-400 animate-bounce" />
                        <span>Pawfect Shelter</span>
                    </div>

                    {/* Deskripsi Singkat */}


                    {/* Social Media Links */}
                    <div className="flex space-x-6 text-pink-500">
                        <a
                            href="#"
                            className="hover:text-pink-700 transition transform hover:scale-110"
                        >
                            <FaInstagram className="text-2xl" />
                        </a>
                        <a
                            href="#"
                            className="hover:text-pink-700 transition transform hover:scale-110"
                        >
                            <FaTwitter className="text-2xl" />
                        </a>
                        <a
                            href="#"
                            className="hover:text-pink-700 transition transform hover:scale-110"
                        >
                            <FaFacebook className="text-2xl" />
                        </a>
                    </div>

                    {/* Copyright */}
                    <div className="flex items-center space-x-2 text-gray-500">
                        <span>&copy; 2024 Pawfect Shelter</span>
                        <span>All Rights Reserved</span>
                    </div>

                    {/* Navigation Links */}

                </div>
            </div>

            {/* Cute Background Pattern */}

        </footer>
    );
};

export default Footer;