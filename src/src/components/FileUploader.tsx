import { useState } from "react";
import { useDropzone } from "react-dropzone";
import jsPDF from "jspdf";

const FileUploader = () => {
  const [files, setFiles] = useState<File[]>([]);
  
  const onDrop = (acceptedFiles: File[]) => {
    setFiles([...files, ...acceptedFiles]);
  };

  const generatePDF = () => {
    const pdf = new jsPDF();
    files.forEach((file, index) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imgData = event.target?.result as string;
        if (imgData) {
          if (index > 0) pdf.addPage();
          pdf.addImage(imgData, "JPEG", 10, 10, 190, 0);
          if (index === files.length - 1) {
            pdf.save("converted.pdf");
          }
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop, accept: "image/jpeg" });

  return (
    <div className="p-6">
      <div {...getRootProps()} className="border-2 border-dashed border-gray-400 p-6 rounded-md text-center cursor-pointer">
        <input {...getInputProps()} />
        <p>Drag & drop JPG files here, or click to select files</p>
      </div>
      <ul className="mt-4">
        {files.map((file, idx) => (
          <li key={idx} className="text-gray-700">
            {file.name}
          </li>
        ))}
      </ul>
      {files.length > 0 && (
        <button
          onClick={generatePDF}
          className="bg-blue-500 text-white mt-4 px-4 py-2 rounded hover:bg-blue-600"
        >
          Convert to PDF
        </button>
      )}
    </div>
  );
};

export default FileUploader;
