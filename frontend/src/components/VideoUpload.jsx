import React from "react";
import uploadImage from "../../src/pictures/upload.png";
import { Button, Card } from "flowbite-react";

const VideoUpload = () => {
  return (
    <div className="text-white">
      <Card className="flex flex-col items-center justify-center space-y-6 p-6">
        <h1 className="text-lg font-semibold">Upload Video</h1>

        <form className="flex items-center space-x-6">
          <div className="shrink-0">
            <img
              className="h-16 w-16 object-cover"
              src={uploadImage}
              alt="Upload Icon"
            />
          </div>

          <label className="block">
            <span className="sr-only">Choose video file</span>
            <input
  type="file"
  accept="video/*"
  className="block w-full text-sm text-white
             file:mr-4 file:py-2 file:px-4
             file:rounded-full file:border-0
             file:text-sm file:font-semibold
             file:bg-violet-50 file:text-violet-700
             hover:file:bg-violet-100
             bg-gray-800"
/>
          </label>
        </form>

        <div className="flex justify-center">
          <Button>Upload</Button>
        </div>
      </Card>
    </div>
  );
};

export default VideoUpload;
