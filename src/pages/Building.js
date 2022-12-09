import { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import MiniButton from "../components/MiniButton";
import Table from "../components/Table";
import useService from "../service";

export default function Building() {
  const { setPageTitle, setActivePage, setBreadcrumb, _headerButton } =
    useOutletContext();
  const { service } = useService({});
  const [data, setData] = useState([]);
  const [pageTotal, setPageTotal] = useState(0);
  const navigate = useNavigate();

  const getData = (page = 1) => {
    service((_service, controller) =>
      _service.get("/building", {
        signal: controller.signal,
        params: {
          limit: 10,
          page,
        },
      })
    )
      .then((response) => {
        setPageTotal(response.data.pageTotal);
        setData(response.data.rows);
      })
      .catch(() => {});
  };

  useEffect(() => {
    setPageTitle("Gedung");
    setActivePage("building");
    setBreadcrumb([
      {
        label: "Home",
        path: "/",
      },
      {
        label: "Gedung",
      },
    ]);
    getData();
  }, []);

  useEffect(() => {
    _headerButton.current = (
      <MiniButton onClick={() => navigate("/building/add")} type="button">
        Tambah
      </MiniButton>
    );
  }, []);

  return (
    <Table
      data={data}
      columns={[
        {
          label: "NO",
          increment: true,
          containerClassName: "w-10 text-center",
          className: "text-center",
        },
        {
          label: "NAMA GEDUNG",
          data: "name",
        },
        {
          label: "HARGA SEWA",
          data: "price",
        },
        {
          label: "ALAMAT",
          data: "address",
        },
      ]}
    />
  );
}
