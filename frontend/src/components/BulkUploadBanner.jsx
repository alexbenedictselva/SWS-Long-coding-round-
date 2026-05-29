const BulkUploadBanner = ({ fileCount }) => (
  <div className="flex items-center gap-4 bg-blue-600 text-white rounded-xl px-5 py-4 shadow">
    <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 animate-pulse">
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
      </svg>
    </div>
    <div>
      <p className="font-semibold text-sm">Upload in progress</p>
      <p className="text-xs text-blue-100">Processing {fileCount} files in background</p>
    </div>
  </div>
);

export default BulkUploadBanner;
