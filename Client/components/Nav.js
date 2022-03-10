import Link from "next/link";
import { useRouter } from "next/router";
import { useContext } from "react";
import { UserContext } from "../context";
import { TeamOutlined, HomeOutlined } from "@ant-design/icons";

const Nav = () => {
  const [state, setState] = useContext(UserContext);
  const router = useRouter();

  const handleLogout = () => {
    window.localStorage.removeItem("auth");
    setState(null);
    router.push("/login");
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-primary justify-content-between">
      <div className="container-fluid">
        <Link href="/">
          <a className="navbar-brand text-white fs-2 fw-bold">Facebook</a>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        {state && state.user && (
          <div
            className="collapse navbar-collapse justify-content-center"
            style={{ paddingLeft: "250px" }}
          >
            <div>
              <HomeOutlined
                className="fs-4 text-white"
                onClick={() => router.push("/dashboard")}
              />
              <TeamOutlined
                className="fs-4 text-white"
                onClick={() => router.push("/friends")}
                style={{ marginLeft: "100px" }}
              />
            </div>
          </div>
        )}

        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarNav"
        >
          <ul className="navbar-nav fs-5">
            {state ? (
              <>
                <li className="nav-item">
                  <Link href="/profile">
                    <a className="nav-link text-white">{state.user.name}</a>
                  </Link>
                </li>
                <li className="nav-item">
                  <button
                    className="btn text-white fs-5"
                    onClick={handleLogout}
                  >
                    LogOut
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link href="/signup">
                    <a className="nav-link text-white">SignUp</a>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href="/login">
                    <a className="nav-link text-white">Login</a>
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
