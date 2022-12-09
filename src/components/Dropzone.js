import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

export default function MyDropzone({
  options = {},
  onChange = () => {},
  value = null,
}) {
  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the files
    onChange(acceptedFiles);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    ...options,
  });

  return (
    <div
      className="border rounded relative cursor-pointer p-2"
      {...getRootProps()}
    >
      <div className="relative rounded overflow-hidden h-64">
        {value && (
          <img
            src={value instanceof File ? URL.createObjectURL(value) : null}
            className="absolute top-0 left-0 w-full h-full object-contain"
          />
        )}
      </div>
      <input {...getInputProps()} />
      <div className="absolute top-0 left-0 w-full h-full rounded bg-black bg-opacity-50 opacity-0 hover:opacity-100 text-white flex justify-center items-center transition duration-500">
        {isDragActive ? <p>Drop disini</p> : <p>Klik atau drop file disini</p>}
      </div>
    </div>
  );
}
