import UploadItem from "./UploadItem";

const UploadProgressList = ({ uploadItems }) => {
  if (!uploadItems.length) return null;

  return (
    <div className="flex flex-col gap-3 max-h-72 overflow-y-auto pr-1">
      {uploadItems.map((item) => (
        <UploadItem key={item.id} item={item} />
      ))}
    </div>
  );
};

export default UploadProgressList;
