import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { useOutletContext } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import MiniButton from "../components/MiniButton";
import TextInput from "../components/TextInput";
import useService from "../service";

const MySwal = withReactContent(Swal);

export default function Setting() {
  const { setPageTitle, setActivePage, setBreadcrumb, _headerButton } =
    useOutletContext();
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      hall_name: "",
    },
  });
  const { service } = useService({});
  const _form = useRef();

  const getData = () => {
    service((_service, controller) =>
      _service.get("/setting", { signal: controller.signal })
    )
      .then((response) => {
        const settings = {};
        for (let item of response.data || []) {
          settings[item.key] = item.value;
        }

        reset(settings);
      })
      .catch(() => {});
  };

  const proceed = ({ hall_name }) => {
    const settings = [
      {
        key: "hall_name",
        value: hall_name,
      },
    ];

    service((_service, controller) =>
      _service.post(
        "/setting",
        { settings },
        {
          signal: controller.signal,
        }
      )
    )
      .then(() => {
        MySwal.fire("Berhasil", "Pengaturan telah disimpan", "success");
      })
      .catch(() => {
        MySwal.fire(
          "Ups!",
          "Sepertinya terjadi kesalahan saat menyimpan",
          "error"
        );
      });
  };

  useEffect(() => {
    setPageTitle("Pengaturan");
    setActivePage("setting");
    setBreadcrumb([
      {
        label: "Home",
        path: "/",
      },
      {
        label: "Pengaturan",
      },
    ]);

    getData();
  }, []);

  useEffect(() => {
    _headerButton.current = (
      <MiniButton type="button" onClick={() => _form.current?.click()}>
        Simpan
      </MiniButton>
    );
  }, [_form.current]);

  return (
    <div className="flex">
      <div className="flex-1">
        <form onSubmit={handleSubmit(proceed)}>
          <TextInput
            label="Nama Gedung"
            type="text"
            {...register("hall_name", { required: true })}
          />
          <button type="submit" ref={_form} className="hidden"></button>
        </form>
      </div>
    </div>
  );
}
