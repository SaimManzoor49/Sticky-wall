import React, { useState } from "react";
import logo from "../../assets/logo.png";
import bg from "../../assets/bg.webp";
import { Link } from "react-router-dom";
import { BsFacebook, BsGoogle, BsTwitter } from "react-icons/bs";


const initialState = {
  email: "",
  password: ""
}

export default function Signup() {
  const [state,setState] = useState(initialState)

  const handleChange = (e) => {
    const {name,value} = e.target

    setState(s=>({...s,[name]:value}))

    console.log(state)

  };
  return (
    <>
      <div
        className="container d-flex justify-content-center align-items-center  "
        style={{ minHeight: "100vh" }}
      >
        <img
          src={bg}
          alt="bg"
          width={"100%"}
          height={"100%"}
          className="position-absolute"
        />

        <div className="row w-100   " style={{ minHeight: "85vh", zIndex: 2 }}>
          <div className="col-5 bggr shadow-lg  text-white  flex-center align-items-center gap-4  d-none d-md-flex ">
            <div className="d-flex  align-items-center ">
              <img src={logo} alt="logo" width={55} height={55} />
              <h1 className="ms-2">Sticky-Wall</h1>
            </div>
            <div className="text-start">
              <h6 className="">Social Logins</h6>
            </div>
            <div className="">
              <div className="">
                <button
                  type="button"
                  className="btn btn-secondary px-2 px-lg-5 w-100 border-0 facebook"
                >
                  Continue With Facebook
                </button>
              </div>
              <div className="my-3">
                <button
                  type="button"
                  className="btn btn-secondary px-2 px-lg-5 w-100 border-0 twitter"
                >
                  Continue With Twitter
                </button>
              </div>
              <div className="">
                <button
                  type="button"
                  className="btn btn-secondary px-2 px-lg-5 w-100 border-0 google"
                >
                  Continue With Google
                </button>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-7 bg-light   flex-center ">
            <div className=" d-flex flex-column align-items-center">
              <h1>Signup to your account</h1>
              <div className="d-md-none">
                <button className="btn btn-transparent"> <BsFacebook  size={'40px'} className="color-facebook"  /> </button>
                <button className="btn btn-transparent"> <BsTwitter  size={'40px'} className="color-twitter" /> </button>
                <button className="btn btn-transparent"> <BsGoogle  size={'40px'} className="color-google" /> </button>
              </div>
              <div className="mt-3">
                <h6>
                  Already have an account?<Link to={""} className="ms-1" >Login</Link>{" "}
                </h6>
              </div>

              <input
                type="email"
                placeholder="Email address"
                className="form-control form-control-lg my-3 w-75"
                onChange={handleChange}
              />

              <input
                type="text"
                placeholder="Password"
                className="form-control mb-3 form-control-lg w-75"
                onChange={handleChange}
              />
            </div>
            <div className="d-flex justify-content-start ps-2 ps-md-5">
              <div className="form-check  ms-5 ">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="flexCheckDefault"
                />
                <label className="form-check-label" htmlFor="flexCheckDefault">
                  Remember meh!!
                </label>
              </div>
              {/* <Link to="">Forget Password</Link> */}
            </div>
            <div className="text-center mt-3">

            <button className="btn btn-outline-success w-75 btn-lg border-2"><span className="fw-bold">Register Now</span></button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
