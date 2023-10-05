import { signIn } from 'next-auth/react';

const Login = () => {
  return (
    <div
      className="flex h-screen w-full items-center justify-center bg-gray-900 bg-cover bg-no-repeat"
      style={{
        backgroundImage: 'url("/img/background.png")',
      }}
    >
      <div className="rounded-xl bg-gray-800 bg-opacity-50 px-16 py-10 shadow-lg backdrop-blur-md max-sm:px-8">
        <div className="text-white">
          <div className="mb-8 flex flex-col items-center">
            <img
              src="/img/logo.png"
              width="150"
              alt="Logo"
              className="rounded-full"
            />
            <h1 className="mb-2 text-2xl">Tatsuta</h1>
          </div>
          <div className="mt-8 flex justify-center text-lg text-black">
            <button
              type="submit"
              className="rounded-3xl bg-yellow-400 bg-opacity-50 px-10 py-2 text-white shadow-xl backdrop-blur-md transition-colors duration-300 hover:bg-yellow-600"
              onClick={() => signIn()}
            >
              Login With Discord
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
