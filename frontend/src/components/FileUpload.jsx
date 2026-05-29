import { useRef, useState } from "react";

const FileUpload = ({ onFilesSelected }) => {
  const inputRef = useRef(null);
  const [dragging, setDragging] = useState(false);

  const handleFiles = (files) => {
    const pdfs = Array.from(files).filter((f) => f.type === "application/pdf");
    if (pdfs.length) onFilesSelected(pdfs);
  };

  const onDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  return (
    <div
      onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
      onDragLeave={() => setDragging(false)}
      onDrop={onDrop}
      onClick={() => inputRef.current.click()}
      className={`cursor-pointer border-2 border-dashed rounded-xl p-10 flex flex-col items-center gap-3 transition-colors
        ${dragging ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:border-blue-400 hover:bg-gray-50"}`}
    >
      <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center">
        <svg className="w-7 h-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
        </svg>
      </div>
      <p className="text-gray-700 font-medium">Drag &amp; drop PDF files here</p>
      <p className="text-sm text-gray-400">or click to browse</p>
      <input
        ref={inputRef}
        type="file"
        accept="application/pdf"
        multiple
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />
    </div>
  );
};

export default FileUpload;
