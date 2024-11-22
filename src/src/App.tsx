import Navbar from "./components/Navbar";
import FileUploader from "./components/FileUploader";

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="max-w-7xl mx-auto py-10">
        <h2 className="text-3xl font-bold mb-6 text-center">Convert JPG Files to PDF Easily</h2>
        <FileUploader />
      </main>
    </div>
  );
}

export default App;
