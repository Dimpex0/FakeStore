import { Link } from "react-router-dom";
import { useAccountStore } from "../../store/account";

export default function MainNavigation() {
  const { isLoggedIn } = useAccountStore();
  return (
    <header>
      {isLoggedIn && <p>Logged in</p>}
      <nav></nav>
    </header>
  );
}
