"use client";

import { useState } from "react";

export default function DragDropZone({ index, onUploadSuccess, notify }) {
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      await uploadFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = async (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      await uploadFile(e.target.files[0]);
    }
  };

  const uploadFile = async (file) => {
    if (!file.type.startsWith("image/")) {
      notify("Please upload an image file only.", "error");
      return;
    }
    setUploading(true);
    notify("Uploading dropped image to server...", "info");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const json = await response.json();
      if (response.ok && json.url) {
        onUploadSuccess(json.url);
        notify("Image uploaded successfully!", "success");
      } else {
        notify(json.error || "Failed to upload image.", "error");
      }
    } catch (err) {
      console.error("Failed to upload image:", err);
      notify("Network error. Image upload failed.", "error");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div
      onDragEnter={handleDrag}
      onDragOver={handleDrag}
      onDragLeave={handleDrag}
      onDrop={handleDrop}
      className={`relative rounded-lg border border-dashed p-3 flex flex-col items-center justify-center text-center transition cursor-pointer select-none h-[42px] min-h-[42px] mt-1.5 ${
        dragActive
          ? "border-blue-500 bg-blue-600/10"
          : "border-gray-850 bg-gray-950 hover:bg-gray-950/80 hover:border-gray-800"
      }`}
    >
      <input
        type="file"
        accept="image/*"
        id={`drag-upload-file-${index}`}
        onChange={handleChange}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10 font-bold"
        disabled={uploading}
      />
      <div className="flex flex-row items-center justify-center gap-2 pointer-events-none w-full">
        <i className={`fas ${uploading ? "fa-circle-notch animate-spin text-blue-400" : dragActive ? "fa-arrow-circle-down text-blue-400 animate-bounce" : "fa-cloud-upload-alt text-gray-500"} text-sm shrink-0`}></i>
        <div className="text-left leading-tight">
          <span className="text-[10px] font-bold text-gray-300 block">
            {uploading ? "Uploading file..." : dragActive ? "Drop file now!" : "Drag & drop image file"}
          </span>
          <span className="text-[9px] text-gray-500 block">or click to browse local files</span>
        </div>
      </div>
    </div>
  );
}
