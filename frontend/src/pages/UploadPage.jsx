import { useState } from "react";
import toast from "react-hot-toast";
import { uploadFiles } from "../api/fileApi";
import FileUpload from "../components/FileUpload";
import UploadProgressList from "../components/UploadProgressList";
import BulkUploadBanner from "../components/BulkUploadBanner";
import FileTable from "../components/FileTable";

const buildUploadItems = (files) =>
  files.map((file, i) => ({
    id: `${Date.now()}-${i}`,
    fileName: file.name,
    fileSize: file.size,
    fileType: file.type,
    progress: 0,
    status: "pending",
  }));

const UploadPage = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploadItems, setUploadItems] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleFilesSelected = (files) => {
    setSelectedFiles(files);
    setUploadItems(buildUploadItems(files));
  };

  const updateItem = (id, patch) =>
    setUploadItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...patch } : item))
    );

  const handleUpload = async () => {
    if (!selectedFiles.length) return;

    setIsUploading(true);

    // Mark all as uploading
    setUploadItems((prev) =>
      prev.map((item) => ({ ...item, status: "uploading" }))
    );

    try {
      await uploadFiles(selectedFiles, (percent) => {
        // Distribute the same progress to all items (single XHR request)
        setUploadItems((prev) =>
          prev.map((item) => ({ ...item, progress: percent }))
        );
      });

      // Mark all complete
      setUploadItems((prev) =>
        prev.map((item) => ({ ...item, progress: 100, status: "complete" }))
      );

      toast.success("Files uploaded successfully");
      setRefreshTrigger((n) => n + 1);
      setSelectedFiles([]);
    } catch {
      setUploadItems((prev) =>
        prev.map((item) =>
          item.status !== "complete" ? { ...item, status: "failed" } : item
        )
      );
      toast.error("Upload failed");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Bulk Banner */}
      {selectedFiles.length > 3 && (
        <BulkUploadBanner
          fileCount={selectedFiles.length}
          isUploading={isUploading}
          uploadItems={uploadItems}
        />
      )}

      {/* Upload Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-base font-semibold text-gray-800 mb-4">Upload PDFs</h2>
        <FileUpload onFilesSelected={handleFilesSelected} selectedFiles={selectedFiles} />

        {selectedFiles.length > 0 && (
          <div className="mt-4 flex justify-end">
            <button
              onClick={handleUpload}
              disabled={isUploading}
              className="px-5 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white text-sm font-medium rounded-lg transition-colors"
            >
              {isUploading ? "Uploading..." : "Upload Files"}
            </button>
          </div>
        )}
      </div>

      {/* Progress Card */}
      {uploadItems.length > 0 && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-base font-semibold text-gray-800 mb-4">Upload Progress</h2>
          <UploadProgressList uploadItems={uploadItems} />
        </div>
      )}

      {/* Document Table Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-base font-semibold text-gray-800 mb-4">Document List</h2>
        <FileTable refreshTrigger={refreshTrigger} />
      </div>
    </div>
  );
};

export default UploadPage;
