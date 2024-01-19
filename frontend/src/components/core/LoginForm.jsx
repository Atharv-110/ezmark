import { useState } from "react";

const LoginForm = ({
  type,
  setType,
  role,
  login,
  setLogin,
  handleLogin,
  register,
  setRegister,
  handleRegistration,
}) => {
  return (
    <div className="w-full md:w-[600px] mx-auto bg-white p-8 rounded-lg shadow-lg text-primary-black font-medium">
      <p className="flex-center">
        {role === "student" ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1}
            stroke="currentColor"
            className="w-12"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1}
            stroke="currentColor"
            className="w-12"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0 0 12 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75Z"
            />
          </svg>
        )}
      </p>
      {type === "login" ? (
        <>
          <h1 className="text-xl capitalize font-medium text-center mb-4">
            {role} Login
          </h1>
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <label>
              <span>Email</span>

              <input
                id="email"
                name="email"
                type="email"
                value={login.email}
                onChange={(e) => setLogin({ ...login, email: e.target.value })}
                placeholder="Enter your email"
                required
                className="form_input"
              />
            </label>

            <label>
              <span>Password</span>
              <input
                value={login.password}
                onChange={(e) =>
                  setLogin({ ...login, password: e.target.value })
                }
                type="password"
                placeholder="Enter your Password"
                required
                className="form_input"
              />
            </label>
            <button className="underline text-right text-sm text-gray-darker hover:text-primary-black transition-effect">
              Forgot Password?
            </button>

            <button type="submit" className="btn mt-2 bg-primary-black">
              Login
            </button>
            <div className="flex-center gap-1">
              <h1>Don&apos;t have an account ?</h1>
              <button onClick={() => setType("signup")} className="underline">
                Create account
              </button>
            </div>
          </form>
        </>
      ) : (
        <>
          <h1 className="text-xl capitalize font-medium text-center mb-4">
            {role} Registration
          </h1>
          <form onSubmit={handleRegistration} className="flex flex-col gap-4">
            <label>
              <span>Name</span>
              <input
                id="name"
                name="name"
                type="text"
                value={register.name}
                onChange={(e) =>
                  setRegister({ ...register, name: e.target.value })
                }
                placeholder="Enter your name"
                required
                className="form_input"
              />
            </label>
            <label>
              <span>Email</span>

              <input
                id="email"
                name="email"
                type="email"
                value={register.email}
                onChange={(e) =>
                  setRegister({ ...register, email: e.target.value })
                }
                placeholder="Enter your email"
                required
                className="form_input"
              />
            </label>
            <label>
              <span>Mobile Number</span>

              <input
                id="mobileNum"
                name="mobileNum"
                type="number"
                value={register.mobile_number}
                onChange={(e) =>
                  setRegister({ ...register, mobile_number: e.target.value })
                }
                placeholder="Enter your mobile number"
                required
                className="form_input"
              />
            </label>
            <div className="md:flex gap-6 justify-between items-center mb-3">
              <label className="w-1/2">
                <span>Password</span>
                <input
                  value={register.password}
                  onChange={(e) =>
                    setRegister({ ...register, password: e.target.value })
                  }
                  type="password"
                  placeholder="Enter your Password"
                  required
                  className="form_input"
                />
              </label>
              <label className="w-1/2">
                <span>Confirm Password</span>
                <input
                  value={register.password2}
                  onChange={(e) =>
                    setRegister({ ...register, password2: e.target.value })
                  }
                  type="password"
                  placeholder="Enter your Password"
                  required
                  className="form_input"
                />
              </label>
            </div>
            <button type="submit" className="btn bg-primary-black">
              Register
            </button>
            <div className="flex-center gap-1">
              <h1>Already have an account ? </h1>
              <button
                onClick={() => setType("login")}
                className="underline text-right text-primary-black"
              >
                Login
              </button>
            </div>
          </form>
        </>
      )}
    </div>
  );
};

export default LoginForm;
