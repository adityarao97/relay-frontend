import React from 'react';
import { Link } from 'react-router-dom';

export const Navbar = () => {
  return (
    <nav className="bg-black p-4">
      <ul className="flex justify-between text-white">
        <li><Link to="/">Configuration</Link></li>
        <li><Link to="/status">Status</Link></li>
        <li><Link to="/action">Action</Link></li>
      </ul>
    </nav>
  );
};