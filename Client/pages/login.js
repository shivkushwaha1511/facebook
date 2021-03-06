import Head from "next/head";
import { useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Link from "next/link";
import AuthForm from "../components/form/AuthForm";
import { useRouter } from "next/router";
import { UserContext } from "../context";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [state, setState] = useContext(UserContext);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      const { data } = await axios.post("/login", {
        email,
        password,
      });

      if (data.error) {
        setLoading(false);
        toast.error(data.error);
      } else {
        //updating context
        setState(data);

        //Save in local storage
        window.localStorage.setItem("auth", JSON.stringify(data));
        router.push("/dashboard");
      }
    } catch (err) {
      toast.error(err.response);
      console.log(err);
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <link rel="stylesheet" href="/css/form.css" />
      </Head>
      <div className="container-fluid">
        <div className="row py-4">
          <div
            className="col-md-4 my-4 offset-md-4 bg-white shadow-lg"
            style={{ padding: "0", borderRadius: "10px 10px 10px 10px" }}
          >
            <div
              className="bg-primary form_top"
              style={{ borderRadius: "10px 10px 0 0" }}
            ></div>
            <div className="text-center display-4 fw-bold pt-1">Login</div>
            <AuthForm
              handleSubmit={handleSubmit}
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              loading={loading}
              page={"login"}
            />

            <div className="row">
              <div className="col">
                <p className="text-center">
                  Not yet registered?
                  <Link href="/signup">
                    <a className="text-primary fw-bold">Register</a>
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
