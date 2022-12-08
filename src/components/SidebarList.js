import { Link } from "react-router-dom";

export default function SidebarList({
  children,
  icon: Icon,
  active = false,
  ...props
}) {
  return (
    <Link
      className={
        "p-3 rounded mx-5 mb-4 flex items-center mukta border border-transparent " +
        (active
          ? "bg-primary text-white"
          : "bg-white text-gray-600 hover:border-gray-300")
      }
      {...props}
    >
      <Icon className="w-8 text-center" />
      <span className="mt-1">{children}</span>
    </Link>
  );
}
