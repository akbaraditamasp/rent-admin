import { Fragment, useEffect, useRef, useState } from "react";
import { useCookies } from "react-cookie";
import { Helmet } from "react-helmet-async";
import { FaBuilding } from "react-icons/fa";
import { FiAnchor, FiHome, FiLogOut, FiSettings } from "react-icons/fi";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import SidebarList from "./SidebarList";

const MySwal = withReactContent(Swal);

export default function Layout() {
  const [pageTitle, setPageTitle] = useState("");
  const [activePage, setActivePage] = useState("");
  const [breadcrumb, setBreadcrumb] = useState([]);
  const [cookies, setCookies, removeCookies] = useCookies(["token"]);
  const navigate = useNavigate();
  const [mounted, setMounted] = useState(false);
  const _headerButton = useRef(null);

  const location = useLocation();

  const logout = () => {
    MySwal.fire({
      title: "Kamu yakin?",
      text: "Kamu akan logout dari akun ini",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, Lanjutkan!",
      cancelButtonText: "Batal",
    }).then((res) => {
      if (res.isConfirmed) {
        removeCookies("token", {
          path: "/",
          maxAge: 0,
        });
      }
    });
  };

  const menus = [
    {
      label: "Dashboard",
      icon: FiHome,
      path: "/",
      activeMark: "dashboard",
    },
    {
      label: "Gedung",
      icon: FiAnchor,
      path: "/building",
      activeMark: "building",
    },
    {
      label: "Pengaturan",
      icon: FiSettings,
      path: "/setting",
      activeMark: "setting",
    },
    {
      label: "Log Out",
      icon: FiLogOut,
      path: "/",
      onClick: (e) => {
        e.preventDefault();
        logout();
      },
    },
  ];

  useEffect(() => {
    if (!cookies.token) {
      navigate("/login", { replace: true });
    }
    setMounted(true);
  }, [cookies]);

  useEffect(() => {
    setPageTitle("");
    setActivePage("");
    setBreadcrumb([]);
    _headerButton.current = null;
  }, [location]);

  if (!mounted) return null;

  return (
    <Fragment>
      <Helmet>
        <title>{pageTitle}</title>
      </Helmet>
      <div className="w-full overflow-x-hidden flex min-h-screen bg-white">
        <div className="lg:w-64 xl:w-72" />
        <div className="lg:w-64 xl:w-72 bg-white flex-shrink-0 fixed top-0 left-0 h-screen z-20">
          <div className="montserrat font-bold text-center flex items-center text-2xl p-5 px-8 h-24">
            <FaBuilding className="mr-2" />
            RentHall
          </div>
          <div className="flex flex-col mt-10">
            {menus.map(({ icon, activeMark, path, label, ...props }, index) => (
              <SidebarList
                icon={icon}
                active={activePage === activeMark}
                to={path}
                key={`${index}`}
                {...props}
              >
                {label}
              </SidebarList>
            ))}
          </div>
        </div>
        <div className="flex flex-col flex-1">
          <div className="h-24"></div>
          <div className="h-24 z-10 flex pt-5 px-8 fixed top-0 left-0 right-0 lg:ml-64 xl:ml-72 bg-white">
            <div className="flex-1">
              <div className="text-3xl font-bold montserrat">{pageTitle}</div>
              <ul className="text-gray-600 text-sm mt-1">
                {breadcrumb.map((item, index) => (
                  <li className="breadcrumb" key={`${index}`}>
                    {item.path ? (
                      <Link to={item.path}>{item.label}</Link>
                    ) : (
                      item.label
                    )}
                  </li>
                ))}
              </ul>
            </div>
            <div>{_headerButton.current}</div>
          </div>
          <div className="flex-1 p-8">
            <Outlet
              context={{
                pageTitle,
                setPageTitle,
                activePage,
                setActivePage,
                breadcrumb,
                setBreadcrumb,
                _headerButton,
              }}
            />
          </div>
        </div>
      </div>
    </Fragment>
  );
}
