const STATUS_STYLES = {
  pending:   "text-gray-400",
  uploading: "text-blue-500",
  complete:  "text-green-500",
  failed:    "text-red-500",
};

const STATUS_LABELS = {
  pending:   "Pending",
  uploading: "Uploading",
  complete:  "Complete",
  failed:    "Failed",
};

const formatSize = (bytes) => {
  if (bytes >= 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  return `${(bytes / 1024).toFixed(0)} KB`;
};

const UploadItem = ({ item }) => {
  const { fileName, fileSize, progress, status } = item;

  return (
    <div className="flex flex-col gap-1.5 p-4 bg-gray-50 rounded-lg">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-xs font-semibold bg-red-100 text-red-600 px-2 py-0.5 rounded">PDF</span>
          <span className="text-sm font-medium text-gray-800 truncate">{fileName}</span>
        </div>
        <span className={`text-xs font-semibold ml-2 flex-shrink-0 ${STATUS_STYLES[status]}`}>
          {STATUS_LABELS[status]}
        </span>
      </div>

      <p className="text-xs text-gray-400">Size: {formatSize(fileSize)}</p>

      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className={`h-2 rounded-full transition-all duration-300 ${
            status === "failed" ? "bg-red-400" : status === "complete" ? "bg-green-500" : "bg-blue-500"
          }`}
          style={{ width: `${progress}%` }}
        />
      </div>

      <p className="text-xs text-gray-400 text-right">{progress}%</p>
    </div>
  );
};

export default UploadItem;
