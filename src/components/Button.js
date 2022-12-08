export default function Button({ children, ...props }) {
  return (
    <button
      className="h-12 rounded bg-gray-700 hover:bg-gray-800 w-full text-white font-bold"
      {...props}
    >
      {children}
    </button>
  );
}
