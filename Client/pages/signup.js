import Head from "next/head";
import { useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Modal } from "antd";
import Link from "next/link";
import AuthForm from "../components/form/AuthForm";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [ok, setOk] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      const { data } = await axios.post("/signup", {
        name,
        email,
        password,
      });

      if (data.error) {
        setLoading(false);
        toast.error(data.error);
      } else {
        setOk(data.ok);
        setName("");
        setEmail("");
        setPassword("");
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
      toast.error(err.response.data);
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
            <div className="text-center display-4 fw-bold pt-1">SignUp</div>
            <AuthForm
              handleSubmit={handleSubmit}
              name={name}
              setName={setName}
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              loading={loading}
            />

            <div className="row">
              <div className="col">
                <p className="text-center">
                  Already registered?
                  <Link href="/login">
                    <a className="text-primary fw-bold">Login</a>
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>

        <Modal
          title="Congragulations!"
          visible={ok}
          onCancel={() => setOk(false)}
          footer={null}
        >
          <p className="fs-5">You have successfully registered.</p>
          <Link href="/login">
            <a className="btn btn-primary text-white fw-bold fs-5">Login</a>
          </Link>
        </Modal>
      </div>
    </>
  );
};

export default SignUp;
