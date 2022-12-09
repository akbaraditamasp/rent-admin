import axios from "axios";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { LoadingContext } from "./components/Loader";
import { useCookies } from "react-cookie";

const _service = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL + "/api",
});

const MySwal = withReactContent(Swal);

const useService = ({ with401 = true }) => {
  const { setLoading, _cancel, loading } = useContext(LoadingContext);
  const navigate = useNavigate();
  const [cookies] = useCookies(["token"]);

  useEffect(() => {
    if (cookies.token) {
      _service.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${cookies.token}`;
    } else {
      _service.defaults.headers.common["Authorization"] = null;
    }
  }, [cookies]);

  return {
    loading,
    service: (request) =>
      new Promise((resolve, reject) => {
        const controller = new AbortController();
        _cancel.current = () => {
          controller.abort();
        };
        setLoading(true);
        request(_service, controller)
          .then((response) => {
            setLoading(false);
            resolve(response);
          })
          .catch((e) => {
            setLoading(false);
            if (e.response?.status === 401 && with401) {
              MySwal.fire(
                "Ups!",
                "Sepertinya sesi anda telah habis",
                "error"
              ).then((val) => {
                if (val.isConfirmed) {
                  navigate("/login");
                }
              });
            }
            reject(e);
          });
      }),
  };
};

export default useService;
