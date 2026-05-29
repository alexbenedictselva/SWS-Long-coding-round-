import { useState } from "react";

const STATUS_CONFIG = {
  pending:   { label: "Pending",   icon: "⏳", text: "text-gray-400",  bar: "bg-gray-300"  },
  uploading: { label: "Uploading", icon: "⬆",  text: "text-blue-500", bar: "bg-blue-500"  },
  complete:  { label: "Complete",  icon: "✓",  text: "text-green-500",bar: "bg-green-500" },
  failed:    { label: "Failed",    icon: "✕",  text: "text-red-500",  bar: "bg-red-500"   },
};

const BulkUploadBanner = ({ fileCount, isUploading, uploadItems = [] }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  if (!isUploading || fileCount <= 3) return null;

  const completed  = uploadItems.filter((i) => i.status === "complete").length;
  const uploading  = uploadItems.filter((i) => i.status === "uploading").length;
  const failed     = uploadItems.filter((i) => i.status === "failed").length;

  return (
    <div className="bg-white border border-blue-200 rounded-2xl shadow-md overflow-hidden">
      {/* Banner Header */}
      <div className="bg-blue-600 px-5 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-xl">⚡</span>
          <div>
            <p className="text-white font-semibold text-sm">Upload in Progress</p>
            <p className="text-blue-100 text-xs mt-0.5">
              Processing {fileCount} files in background
            </p>
          </div>
        </div>

        {/* Animated pulse indicator */}
        <span className="flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-blue-300 opacity-75" />
          <span className="relative inline-flex rounded-full h-3 w-3 bg-white" />
        </span>
      </div>

      {/* Summary Row */}
      <div className="grid grid-cols-4 divide-x divide-gray-100 border-b border-gray-100 text-center">
        {[
          { label: "Total Files", value: fileCount,  color: "text-gray-700"  },
          { label: "Completed",   value: completed,  color: "text-green-600" },
          { label: "Uploading",   value: uploading,  color: "text-blue-600"  },
          { label: "Failed",      value: failed,     color: "text-red-500"   },
        ].map(({ label, value, color }) => (
          <div key={label} className="py-3 px-2">
            <p className={`text-lg font-bold ${color}`}>{value}</p>
            <p className="text-xs text-gray-400 mt-0.5">{label}</p>
          </div>
        ))}
      </div>

      {/* Collapsible Details */}
      <div className="px-5 py-3">
        <button
          onClick={() => setIsExpanded((prev) => !prev)}
          className="flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors w-full text-left"
        >
          <span className="text-xs">{isExpanded ? "▼" : "▶"}</span>
          Upload Details
        </button>

        {isExpanded && (
          <div className="mt-3 flex flex-col gap-3 max-h-64 overflow-y-auto pr-1">
            {uploadItems.map((item, index) => {
              const cfg = STATUS_CONFIG[item.status] ?? STATUS_CONFIG.pending;
              return (
                <div
                  key={item.id ?? index}
                  className="bg-gray-50 rounded-xl px-4 py-3 flex flex-col gap-2"
                >
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-medium text-gray-800 truncate">
                      {item.fileName}
                    </p>
                    <span className={`text-xs font-semibold flex-shrink-0 flex items-center gap-1 ${cfg.text}`}>
                      <span>{cfg.icon}</span>
                      {cfg.label}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex-1 bg-gray-200 rounded-full h-1.5 overflow-hidden">
                      <div
                        className={`h-1.5 rounded-full transition-all duration-300 ${cfg.bar}`}
                        style={{ width: `${item.progress}%` }}
                      />
                    </div>
                    <span className="text-xs text-gray-500 w-9 text-right flex-shrink-0">
                      {item.progress}%
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default BulkUploadBanner;
