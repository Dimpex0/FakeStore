import { Outlet } from "react-router-dom";

export default function RootElements() {
  return (
    <div>
      <h1>Root</h1>
      <Outlet />
    </div>
  );
}
