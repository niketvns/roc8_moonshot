import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [formInput, setFormInput] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormInput((prev) => ({ ...prev, [name]: value }));
  };

  const signupHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        "https://data-visualization-api.ashug99578.repl.co/user/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formInput),
        }
      );
      const loginData = await res.json();
      if (loginData.token) {
        document.cookie = `token=${loginData.token}`;
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  useEffect(() => {
    const token = getCookie("token");
    if (token) {
      navigate("/");
    }
  }, []);

  return (
    <div
      className={
        "login-main pt-16 min-h-[90vh] flex justify-center items-center text-sociogram"
      }
    >
      <div className="login-form-card w-[90vw] xs:w-[400px] bg-secondary p-6 rounded-lg">
        <h1 className={"text-center text-3xl pb-4"}>Signup</h1>
        <form onSubmit={signupHandler} className={"flex flex-col gap-3"}>
          <label htmlFor="email" className={"flex flex-col"}>
            Username
            <input
              required
              type="text"
              name={"username"}
              id={"username"}
              placeholder={"johndoe"}
              className={
                "rounded-lg py-2 px-3 text-black bg-sociogram dark:bg-white border-2"
              }
              onChange={inputChangeHandler}
              value={formInput.username}
            />
          </label>
          <label htmlFor="password" className={"flex flex-col"}>
            Password
            <input
              required
              type="password"
              name={"password"}
              id={"password"}
              placeholder={"*******"}
              className={
                "rounded-lg py-2 px-3 text-black bg-sociogram dark:bg-white border-2"
              }
              onChange={inputChangeHandler}
              value={formInput.password}
            />
          </label>
          <label className="checkbox flex gap-2 items-center cursor-pointer select-none">
            <input
              type="checkbox"
              name="remember"
              id="remember"
              className={"w-4 h-4"}
            />
            Remember Me
          </label>
          <button
            type={"submit"}
            className={"bg-button p-3 rounded-lg text-white bg-blue-400"}
          >
            Submit
          </button>
        </form>
        <div className="signup mt-4 text-lg">
          Already have Account ?{" "}
          <Link to={"/login"} className={"text-indigo-400 hover:underline"}>
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
