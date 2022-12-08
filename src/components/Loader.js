import { createContext, useRef, useState } from "react";
import { FaBuilding } from "react-icons/fa";

export const LoadingContext = createContext();

export default function Loader({ children }) {
  const [loading, setLoading] = useState(false);
  const _cancel = useRef(() => {});

  return (
    <LoadingContext.Provider value={{ loading, setLoading, _cancel }}>
      {children}

      {loading && (
        <div className="w-full h-full fixed z-50 top-0 left-0 bg-black bg-opacity-50 flex-col flex items-center justify-center text-white">
          <div className="w-20 h-20 bg-white bg-opacity-50 relative rounded-full overflow-hidden flex justify-center items-center mt-20">
            <div className="bottom-0 left-0 absolute w-full h-12 bg-primary fill"></div>
            <FaBuilding size={40} className="text-white relative" />
          </div>
          Tunggu...
          <button
            type="button"
            onClick={_cancel.current}
            className="px-5 py-3 rounded border border-white mt-20 text-sm"
          >
            Batal
          </button>
        </div>
      )}
    </LoadingContext.Provider>
  );
}
