import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <Link to="/">All</Link>
      <Link to="/?todos=active">active</Link>
      <Link to="/?todos=completed">completed</Link>
    </nav>
  );
};

export default Navbar;
