import logo from "../assets/logo_frame.png";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="header">
      <Link to="/">
        <img src={logo} alt="Bet with Friends Logo" height="150px" />
      </Link>
    </div>
  );
};

export default Header;
