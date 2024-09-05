import { Link } from "react-router-dom";
import { useAccountStore } from "../../store/account";
import "./MainNavigation.css";

export default function MainNavigation() {
  const { isLoggedIn } = useAccountStore();
  return (
    <header>
      <h1 className="logo">FakeStore</h1>
      <nav>
        <input placeholder="Search..." />
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          {isLoggedIn && (
            <li>
              <Link to="/account/logout">Logout</Link>
            </li>
          )}
          {!isLoggedIn && (
            <li>
              <Link to="/account/login">Login</Link>
            </li>
          )}
          <li>
            <Link>About</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
