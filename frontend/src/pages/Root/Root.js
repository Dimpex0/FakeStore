import { Outlet } from "react-router-dom";
import MainNavigation from "../../elements/MainNavigation/MainNavigation";

export default function RootElements() {
  return (
    <div>
      <MainNavigation />
      <Outlet />
    </div>
  );
}
