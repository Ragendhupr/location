function Button({ getLocation }) {
  return (
    <button
      onClick={getLocation}
      className="px-6 py-3 bg-blue-500 text-white rounded-lg border-2 hover:border-black"
    >
      Get My Location
    </button>
  );
}
export default Button;
