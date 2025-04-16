import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="flex justify-between items-center p-4 bg-white outline-3 shadow">
      <h1 className="text-3xl text-black">Admin Dashboard</h1>
      <div className="flex items-center space-x-4">
        <input
          type="text"
          placeholder="Search..."
          className="border px-2 py-1 rounded"
        />
        
          <>
            <button className="px-4 py-1 border outline-2 outline-offset-2 outline-solid rounded bg-black text-white hover:opacity-50">Sign In</button>
            <button className="px-4 py-1 border rounded bg-black text-white hover:opacity-50">
              Sign Up
            </button>
          </>
       
          <div className="relative">
            <FaUserCircle
              size={32}
              className="cursor-pointer"
              onClick={() => setMenuOpen(!menuOpen)}
            />
            {menuOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white text-black outline-1 shadow rounded z-10">
                <button className="block px-4 py-2 hover:bg-gray-300 w-full text-left rounded space-y-2">
                  Profile
                </button>
                <button
                  className="block px-4 py-2 hover:bg-gray-300 w-full text-left rounded space-y-2"
                  onClick={() => (false)}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        
      </div>
    </nav>
  );
}
