import UploadItem from "./UploadItem";

const UploadProgressList = ({ uploadItems = [] }) => {
  if (!uploadItems.length) {
    return (
      <div className="flex flex-col items-center justify-center py-10 text-gray-400 gap-2">
        <svg className="w-10 h-10 text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
        </svg>
        <p className="text-sm">No uploads in progress</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3 max-h-80 overflow-y-auto pr-1">
      {uploadItems.map((item) => (
        <UploadItem key={item.id} item={item} />
      ))}
    </div>
  );
};

export default UploadProgressList;
