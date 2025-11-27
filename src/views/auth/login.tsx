// import FC from react
import { type FC, useEffect, useState } from "react";

//import hook useNavigate from react router
import { useNavigate } from "react-router";

// import useAuthStore from auth store
import { useAuthStore } from "../../stores/auth";

//interface for validation errors
interface ValidationErrors {
  [key: string]: string;
}

const Login: FC = () => {
  //title page
  useEffect(() => {
    document.title = "Login - City Santri Kota Depok";
  }, []);

  // useNavigate hook for navigation
  const navigate = useNavigate();

  // define state for username, password and loading
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  //define state for errors
  const [errors, setErrors] = useState<ValidationErrors>({});

  // Destruct login function from useAuthStore
  const { login } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // set loading state to true
    setIsLoading(true);

    // call login function
    await login({ username, password })
      .then(() => {
        // reset loading state to false
        setIsLoading(false);

        // navigate to dashboard after successful login
        navigate("/admin/dashboard", { replace: true });
      })
      .catch((error) => {
        //set errors to state "errors"
        setErrors(error.response.data.errors);

        //reset loading state to false
        setIsLoading(false);
      });
  };

  return (
    <div
      className="relative min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('/images/2.jpg')" }}
    >
      <div className="absolute inset-0 bg-black/60"></div>
      <div className="bg-white bg-opacity-90 p-8 rounded-2xl shadow-lg w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-6">
            <div className="relative h-24 w-24 group">
              {/* Base shadow */}
              <div className="absolute inset-0 rounded-2xl bg-yellow-600 translate-y-2"></div>

              {/* Main logo card */}
              <div className="relative h-full w-full rounded-2xl bg-gradient-to-br from-yellow-400 to-yellow-500 border-2 border-yellow-300 shadow-xl transform transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-2xl flex items-center justify-center p-3">
                <img
                  src="/images/logo-dpk.png"
                  alt="Logo Desa"
                  className="h-full w-full object-contain filter drop-shadow-sm"
                />
              </div>

              {/* Corner accent */}
              <div className="absolute -top-2 -right-4 h-8 w-8 rounded-full bg-green-500 border-2 border-white shadow-sm flex items-center justify-center">
                <svg
                  className="h-5 w-5 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-1">
            Selamat Datang
          </h1>
          <p className="text-gray-500 uppercase tracking-widest text-sm">
            City Santri Depok
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <div className="mt-1 relative rounded-xl shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  className="h-5 w-5 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <input
                type="text"
                id="username"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="focus:ring-yellow-500 focus:border-yellow-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-xl py-3 border"
                placeholder="Masukkan username"
              />
            </div>
            {errors.Username && (
              <div
                className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 mt-2 rounded-xl relative"
                role="alert"
              >
                <span className="block sm:inline">{errors.Username}</span>
              </div>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <div className="mt-1 relative rounded-xl shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  className="h-5 w-5 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="focus:ring-yellow-500 focus:border-yellow-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-xl py-3 border"
                placeholder="Masukkan password"
              />
            </div>
            {errors.Password && (
              <div
                className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 mt-2 rounded-xl relative"
                role="alert"
              >
                <span className="block sm:inline">{errors.Password}</span>
              </div>
            )}
          </div>

          {errors.Error && (
            <div
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl relative"
              role="alert"
            >
              <span className="block sm:inline">
                {" "}
                Username atau password salah.
                {/* {errors.Error} */}
              </span>
            </div>
          )}

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-yellow-600 focus:ring-yellow-500 border-gray-300 rounded"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-gray-700"
              >
                Ingat saya
              </label>
            </div>

            <div className="text-sm">
              <a
                href="#"
                className="font-medium text-yellow-600 hover:text-yellow-500"
              >
                Lupa password?
              </a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition duration-150"
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Memproses...</span>
                </div>
              ) : (
                "Masuk"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
