export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">

      <div className="w-full max-w-sm border rounded-xl p-6 shadow">

        <h2 className="text-2xl font-bold mb-6 text-center">
          Seller Register
        </h2>

        <input
          type="email"
          placeholder="Email"
          className="border w-full p-2 rounded mb-3"
        />

        <input
          type="password"
          placeholder="Password"
          className="border w-full p-2 rounded mb-4"
        />

        <button className="bg-cyan-600 text-white w-full py-2 rounded">
          Register
        </button>

      </div>

    </div>
  );
}