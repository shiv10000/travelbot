import React from 'react'
import { NavLink } from 'react-router-dom'
import './Navbar.css';

const Navbar = () => {
    
  return (
    <div>
      <nav>
        <h2>TourGenie</h2>
        <NavLink className={(e)=>{return e.isActive?"red": "" }} to="/"><li>Home</li></NavLink>
        <NavLink className={(e)=>{return e.isActive?"red": "" }} to="/content"><li>Content</li></NavLink>
        <NavLink className={(e)=>{return e.isActive?"red": "" }} to="/translate"><li>Translate</li></NavLink>
        <NavLink className={(e)=>{return e.isActive?"red": "" }} to="/cost"><li>Cost</li></NavLink>
      </nav>
    </div>
  )
}

export default Navbar