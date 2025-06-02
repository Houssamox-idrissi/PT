import { FiArrowLeft } from "react-icons/fi";

export default function LoadingError({ type, error, navigate }) {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-background text-text">
      {type === "loading" ? (
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      ) : (
        <>
          <h2 className="text-2xl font-bold mb-4">Error Loading Logement</h2>
          <p className="mb-6">{error}</p>
          <button
            onClick={() => navigate("/logements")}
            className="bg-primary hover:bg-hover text-white px-6 py-2 rounded-lg flex items-center gap-2"
          >
            <FiArrowLeft /> Back to Logements
          </button>
        </>
      )}
    </div>
  );
}