import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="h-full">
          <ul className="flex gap-16 justify-evenly items-center h-full">
            <li className="font-medium"><Link to='/home'>Home</Link></li>
            <li className="font-medium"><Link to='/list'>List</Link></li>
          </ul>
        </nav>
    )
};

export default Navbar;