import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import toast from "react-hot-toast";

const formatSize = (bytes) => {
  if (bytes >= 1024 ** 3) return `${(bytes / 1024 ** 3).toFixed(1)} GB`;
  if (bytes >= 1024 ** 2) return `${(bytes / 1024 ** 2).toFixed(1)} MB`;
  return `${(bytes / 1024).toFixed(0)} KB`;
};

const FileUpload = ({ onFilesSelected, selectedFiles = [] }) => {
  const onDrop = useCallback(
    (accepted, rejected) => {
      if (rejected.length) {
        toast.error("Only PDF files are allowed");
      }
      if (accepted.length) {
        // Merge with existing, avoid duplicates by name+size
        const merged = [
          ...selectedFiles,
          ...accepted.filter(
            (a) => !selectedFiles.some((s) => s.name === a.name && s.size === a.size)
          ),
        ];
        onFilesSelected(merged);
      }
    },
    [selectedFiles, onFilesSelected]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "application/pdf": [".pdf"] },
    multiple: true,
  });

  const removeFile = (index) => {
    const updated = selectedFiles.filter((_, i) => i !== index);
    onFilesSelected(updated);
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Drop Zone */}
      <div
        {...getRootProps()}
        className={`cursor-pointer border-2 border-dashed rounded-xl p-10 flex flex-col items-center gap-3 transition-colors outline-none
          focus-visible:ring-2 focus-visible:ring-blue-500
          ${isDragActive
            ? "border-blue-500 bg-blue-50"
            : "border-gray-300 hover:border-blue-400 hover:bg-gray-50"
          }`}
      >
        <input {...getInputProps()} aria-label="Upload PDF files" />

        <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center">
          <svg className="w-7 h-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
        </div>

        {isDragActive ? (
          <p className="text-blue-600 font-medium">Drop PDF files here</p>
        ) : (
          <>
            <p className="text-gray-700 font-medium text-center">
              Drag &amp; Drop PDF files here
            </p>
            <p className="text-sm text-gray-400">or</p>
            <span className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors">
              Click to Browse
            </span>
          </>
        )}
      </div>

      {/* File List */}
      <div className="flex flex-col gap-2">
        {selectedFiles.length === 0 ? (
          <p className="text-sm text-gray-400 text-center py-2">No files selected</p>
        ) : (
          <>
            <p className="text-sm font-medium text-gray-600">
              Selected Files:{" "}
              <span className="text-blue-600 font-semibold">{selectedFiles.length}</span>
            </p>

            <ul className="flex flex-col gap-2">
              {selectedFiles.map((file, index) => (
                <li
                  key={`${file.name}-${file.size}-${index}`}
                  className="flex items-center justify-between gap-3 bg-gray-50 border border-gray-100 rounded-lg px-4 py-3"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-8 h-8 rounded bg-red-100 flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd"
                          d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"
                          clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-gray-800 truncate">{file.name}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-xs text-gray-400">{formatSize(file.size)}</span>
                        <span className="text-xs font-semibold bg-red-100 text-red-600 px-1.5 py-0.5 rounded">
                          PDF
                        </span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => removeFile(index)}
                    aria-label={`Remove ${file.name}`}
                    className="text-xs text-red-500 hover:text-red-700 font-medium flex-shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400 rounded"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
};

export default FileUpload;
