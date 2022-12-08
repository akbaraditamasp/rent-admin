import { useEffect } from "react";
import { useOutletContext } from "react-router-dom";

export default function Dashboard() {
  const { setPageTitle, setActivePage, setBreadcrumb } = useOutletContext();

  useEffect(() => {
    setPageTitle("Dashboard");
    setActivePage("dashboard");
    setBreadcrumb([
      {
        label: "Home",
        path: "/",
      },
      {
        label: "Dashboard",
      },
    ]);
  }, []);
}
