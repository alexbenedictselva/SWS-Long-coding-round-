import { useEffect, useState } from "react";
import { getFiles } from "../api/fileApi";

const formatSize = (bytes) => {
  if (!bytes) return "—";
  if (bytes >= 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  return `${(bytes / 1024).toFixed(0)} KB`;
};

const FileTable = ({ refreshTrigger }) => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        const data = await getFiles();
        setFiles(data);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [refreshTrigger]);

  return (
    <div className="overflow-x-auto">
      {loading ? (
        <p className="text-sm text-gray-400 py-6 text-center">Loading documents...</p>
      ) : files.length === 0 ? (
        <p className="text-sm text-gray-400 py-6 text-center">No documents uploaded yet.</p>
      ) : (
        <table className="w-full text-sm text-left">
          <thead>
            <tr className="border-b border-gray-100 text-gray-500 text-xs uppercase tracking-wide">
              <th className="pb-3 pr-4">File Name</th>
              <th className="pb-3 pr-4">Size</th>
              <th className="pb-3 pr-4">Type</th>
              <th className="pb-3">Uploaded At</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {files.map((file) => (
              <tr key={file._id} className="hover:bg-gray-50 transition-colors">
                <td className="py-3 pr-4 font-medium text-gray-800 truncate max-w-[200px]">
                  {file.originalName || file.fileName}
                </td>
                <td className="py-3 pr-4 text-gray-500">{formatSize(file.size || file.fileSize)}</td>
                <td className="py-3 pr-4">
                  <span className="bg-red-100 text-red-600 text-xs font-semibold px-2 py-0.5 rounded">PDF</span>
                </td>
                <td className="py-3 text-gray-400">
                  {new Date(file.createdAt).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default FileTable;
