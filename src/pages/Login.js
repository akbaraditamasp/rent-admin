import { Fragment, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { FiLock, FiUser } from "react-icons/fi";
import Button from "../components/Button";
import TextInput from "../components/TextInput";
import useService from "../service";
import { useCookies } from "react-cookie";
import moment from "moment/moment";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { service: login } = useService({ with401: false });
  const { register, handleSubmit } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
  });
  const [cookies, setCookies] = useCookies(["token"]);
  const [fail, setFail] = useState(false);
  const navigate = useNavigate();
  const [mounted, setMounted] = useState(false);

  const proceed = ({ username, password }) => {
    login((_service, controller) =>
      _service.get("/auth/login", {
        params: { username, password },
        signal: controller.signal,
      })
    )
      .then((response) => {
        setCookies("token", response.data.token, {
          path: "/",
          maxAge: 60 * 60 * 24,
        });
      })
      .catch(() => {
        setFail(true);
      });
  };

  useEffect(() => {
    if (cookies.token) {
      navigate("/", { replace: true });
    }
    setMounted(true);
  }, [cookies]);

  if (!mounted) return null;

  return (
    <Fragment>
      <Helmet>
        <title>Login</title>
      </Helmet>
      <div className="bg-white flex flex-col lg:flex-row min-h-screen">
        <div className="h-64 lg:h-screen py-8 sticky w-full lg:w-1/2 flex-shrink-0 bg-primary"></div>
        <div className="flex-1 lg:h-screen overflow-y-auto flex flex-col items-center justify-center p-8">
          <div className="text-3xl montserrat font-bold text-center">
            Selamat Datang
          </div>
          <div className="text-center w-full lg:w-3/4">
            Ini adalah halaman admin panel penyewaan gedung. Silahkan masuk ke
            akun admin untuk melanjutkan.
          </div>
          <form
            className="w-full lg:w-8/12 my-10"
            onSubmit={handleSubmit(proceed)}
          >
            {fail && (
              <div className="py-3 px-5 bg-red-200 border border-red-300 text-center text-red-700 mb-5 rounded">
                Username atau password salah
              </div>
            )}
            <TextInput
              type="text"
              placeholder="Username"
              containerClassName="mb-4"
              left={<FiUser />}
              {...register("username", { required: true })}
            />
            <TextInput
              type="password"
              placeholder="Password"
              containerClassName="mb-4"
              left={<FiLock />}
              {...register("password", { required: true })}
            />
            <Button type="submit">Login</Button>
          </form>
        </div>
      </div>
    </Fragment>
  );
}
