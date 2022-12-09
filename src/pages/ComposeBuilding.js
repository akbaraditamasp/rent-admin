import { useEffect } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { FaRegPlusSquare, FaTimes } from "react-icons/fa";
import { useOutletContext } from "react-router-dom";
import MyDropzone from "../components/Dropzone";
import TextInput from "../components/TextInput";

export default function ComposeBuilding({ edit = false }) {
  const { setPageTitle, setActivePage, setBreadcrumb } = useOutletContext();
  const { control, register } = useForm({
    defaultValues: {
      name: "",
      address: "",
      pic: null,
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "facilities",
  });

  useEffect(() => {
    setPageTitle((edit ? "Sunting" : "Tambah") + " Gedung");
    setActivePage("building");
    setBreadcrumb([
      {
        label: "Home",
        path: "/",
      },
      {
        label: "Gedung",
        path: "/building",
      },
      {
        label: (edit ? "Sunting" : "Tambah") + " Gedung",
      },
    ]);
  }, []);

  return (
    <form>
      <div className="flex">
        <div className="flex-1">
          <TextInput
            label="Nama Gedung"
            type="text"
            containerClassName="mb-4"
          />
          <TextInput label="Alamat" type="text" containerClassName="mb-4" />
          <div className="mb-1 text-sm">Fasilitas</div>
          <div className="border rounded overflow-hidden">
            {fields.map((field, index) => (
              <div
                className="flex items-center border-b relative m-2"
                key={field.id}
              >
                <input
                  type="text"
                  placeholder="Masukkan fasilitas"
                  className="bg-transparent px-1 py-4 text-sm w-full pr-10"
                  {...register(`facilities.${index}`)}
                />
                <button
                  type="button"
                  className="absolute text-gray-400 top-0 right-0 h-full w-10 flex justify-center items-center"
                  onClick={() => {
                    remove(index);
                  }}
                >
                  <FaTimes />
                </button>
              </div>
            ))}
            <div className="p-2">
              <button
                type="button"
                onClick={() => {
                  append("");
                }}
                className="py-3 text-sm w-full rounded bg-gray-100 text-center flex justify-center items-center"
              >
                <FaRegPlusSquare className="mr-2" /> Tambah
              </button>
            </div>
          </div>
        </div>
        <div className="flex-1 ml-10">
          <div className="mb-1 text-sm">Gambar</div>
          <Controller
            control={control}
            name="pic"
            render={({ field: { value, onChange } }) => (
              <MyDropzone
                options={{
                  accept: { "image/*": [".jpeg", ".png", ".jpg"] },
                }}
                onChange={(files) => onChange(files[0])}
                value={value}
              />
            )}
          />
        </div>
      </div>
    </form>
  );
}
