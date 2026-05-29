import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

// Upload one or multiple PDF files with progress tracking
export const uploadFiles = async (files, onProgress) => {
  const formData = new FormData();
  files.forEach((file) => formData.append("files", file));

  try {
    const response = await api.post("/files/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
      onUploadProgress: (progressEvent) => {
        const percent = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        onProgress(percent);
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to upload files");
  }
};

// Fetch all uploaded documents
export const getFiles = async () => {
  try {
    const response = await api.get("/files");
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch files");
  }
};

export default api;
