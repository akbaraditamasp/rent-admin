export default function MiniButton({ children, ...props }) {
  return (
    <button
      className="py-2 px-5 rounded bg-gray-700 hover:bg-gray-800 text-white font-bold"
      {...props}
    >
      {children}
    </button>
  );
}
