import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getFiles } from "../api/fileApi";

const formatSize = (bytes) => {
  if (!bytes) return "—";
  if (bytes >= 1024 ** 3) return `${(bytes / 1024 ** 3).toFixed(1)} GB`;
  if (bytes >= 1024 ** 2) return `${(bytes / 1024 ** 2).toFixed(1)} MB`;
  return `${(bytes / 1024).toFixed(0)} KB`;
};

const formatDate = (iso) =>
  new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

const STATUS_CONFIG = {
  pending:   { label: "Pending",   icon: "⏳", cls: "bg-gray-100 text-gray-500"   },
  uploading: { label: "Uploading", icon: "⬆",  cls: "bg-blue-100 text-blue-600"  },
  complete:  { label: "Complete",  icon: "✓",  cls: "bg-green-100 text-green-600" },
  failed:    { label: "Failed",    icon: "✕",  cls: "bg-red-100 text-red-600"     },
};

const FileTable = ({ refreshTrigger }) => {
  const [files, setFiles]       = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [isError, setError]     = useState(false);

  useEffect(() => {
    const fetchFiles = async () => {
      setLoading(true);
      setError(false);
      try {
        const data = await getFiles();
        setFiles(data);
      } catch {
        setError(true);
        toast.error("Failed to fetch files");
      } finally {
        setLoading(false);
      }
    };
    fetchFiles();
  }, [refreshTrigger]);

  const renderBody = () => {
    if (isLoading) {
      return (
        <tr>
          <td colSpan={6} className="py-16 text-center">
            <div className="flex flex-col items-center gap-3 text-gray-400">
              <svg className="w-8 h-8 animate-spin text-blue-400" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
              </svg>
              <p className="text-sm">Loading documents...</p>
            </div>
          </td>
        </tr>
      );
    }

    if (isError) {
      return (
        <tr>
          <td colSpan={6} className="py-16 text-center">
            <div className="flex flex-col items-center gap-2 text-red-400">
              <span className="text-3xl">✕</span>
              <p className="text-sm font-medium">Failed to load documents</p>
            </div>
          </td>
        </tr>
      );
    }

    if (!files.length) {
      return (
        <tr>
          <td colSpan={6} className="py-16 text-center">
            <div className="flex flex-col items-center gap-2 text-gray-400">
              <svg className="w-10 h-10 text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <p className="text-sm">No documents uploaded yet</p>
            </div>
          </td>
        </tr>
      );
    }

    return files.map((file) => {
      const status = STATUS_CONFIG[file.uploadStatus] ?? STATUS_CONFIG.complete;
      const fileUrl = file.fileUrl?.startsWith("http")
        ? file.fileUrl
        : `http://localhost:5000/${file.fileUrl}`;

      return (
        <tr key={file._id} className="hover:bg-blue-50/30 transition-colors">
          {/* Name */}
          <td className="px-5 py-4">
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center flex-shrink-0">
                <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd"
                    d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"
                    clipRule="evenodd" />
                </svg>
              </div>
              <span className="text-sm font-medium text-gray-800 truncate max-w-[180px]">
                {file.fileName}
              </span>
            </div>
          </td>

          {/* Size */}
          <td className="px-5 py-4 text-sm text-gray-500 whitespace-nowrap">
            {formatSize(file.fileSize)}
          </td>

          {/* Type */}
          <td className="px-5 py-4">
            <span className="text-xs font-semibold bg-red-100 text-red-600 px-2 py-0.5 rounded">
              PDF
            </span>
          </td>

          {/* Date */}
          <td className="px-5 py-4 text-sm text-gray-500 whitespace-nowrap">
            {formatDate(file.createdAt)}
          </td>

          {/* Status */}
          <td className="px-5 py-4">
            <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full ${status.cls}`}>
              <span>{status.icon}</span>
              {status.label}
            </span>
          </td>

          {/* Download */}
          <td className="px-5 py-4">
            <a
              href={fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg transition-colors"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download
            </a>
          </td>
        </tr>
      );
    });
  };

  return (
    <div className="overflow-x-auto">
      {/* Table header count */}
      {!isLoading && !isError && files.length > 0 && (
        <p className="text-xs text-gray-400 mb-3">
          Showing{" "}
          <span className="font-semibold text-gray-600">{files.length}</span>{" "}
          document{files.length !== 1 ? "s" : ""}
        </p>
      )}

      <table className="w-full text-left min-w-[640px]">
        <thead>
          <tr className="bg-gray-50 border-y border-gray-100">
            {["Name", "Size", "Type", "Upload Date", "Status", "Download"].map((h) => (
              <th
                key={h}
                className="px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">{renderBody()}</tbody>
      </table>
    </div>
  );
};

export default FileTable;
