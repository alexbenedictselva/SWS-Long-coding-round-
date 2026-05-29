const formatSize = (bytes) => {
  if (bytes >= 1024 ** 3) return `${(bytes / 1024 ** 3).toFixed(1)} GB`;
  if (bytes >= 1024 ** 2) return `${(bytes / 1024 ** 2).toFixed(1)} MB`;
  return `${(bytes / 1024).toFixed(0)} KB`;
};

const STATUS_CONFIG = {
  pending:   { label: "Pending",   icon: "⏳", text: "text-gray-400",  bar: "bg-gray-300"  },
  uploading: { label: "Uploading", icon: "⬆",  text: "text-blue-500", bar: "bg-blue-500"  },
  complete:  { label: "Complete",  icon: "✓",  text: "text-green-500",bar: "bg-green-500" },
  failed:    { label: "Failed",    icon: "✕",  text: "text-red-500",  bar: "bg-red-500"   },
};

const UploadItem = ({ item }) => {
  const { fileName, fileSize, progress, status } = item;
  const cfg = STATUS_CONFIG[status] ?? STATUS_CONFIG.pending;

  return (
    <div className="bg-white border border-gray-100 rounded-xl shadow-sm p-4 flex flex-col gap-3">
      {/* Top row */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-9 h-9 rounded-lg bg-red-50 flex items-center justify-center flex-shrink-0">
            <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd"
                d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"
                clipRule="evenodd" />
            </svg>
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-gray-800 truncate">{fileName}</p>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-xs text-gray-400">{formatSize(fileSize)}</span>
              <span className="text-xs font-semibold bg-red-100 text-red-600 px-1.5 py-0.5 rounded">
                PDF
              </span>
            </div>
          </div>
        </div>

        {/* Status badge */}
        <span className={`flex items-center gap-1 text-xs font-semibold flex-shrink-0 ${cfg.text}`}>
          <span>{cfg.icon}</span>
          {cfg.label}
        </span>
      </div>

      {/* Progress bar */}
      <div className="flex items-center gap-3">
        <div className="flex-1 bg-gray-100 rounded-full h-2 overflow-hidden">
          <div
            className={`h-2 rounded-full transition-all duration-300 ${cfg.bar}`}
            style={{ width: `${progress}%` }}
          />
        </div>
        <span className="text-xs font-semibold text-gray-500 w-9 text-right flex-shrink-0">
          {progress}%
        </span>
      </div>
    </div>
  );
};

export default UploadItem;
