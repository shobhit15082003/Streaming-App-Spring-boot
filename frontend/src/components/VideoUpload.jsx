import React, { useRef, useState } from "react";
import uploadImage from "../../src/pictures/upload.png";
import { Alert, Button, Card, Label, Progress, Textarea, TextInput } from "flowbite-react";
import toast from "react-hot-toast";
import axios from "axios";

const VideoUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [meta, setMeta] = useState({
    title: "",
    description: "",
  });
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
  const fileInputRef = useRef(null);

  function handleFileChange(event) {
    const file = event.target.files[0];
    
    if (!file) {
      setSelectedFile(null);
      return;
    }

    // More thorough file type validation
    const validTypes = ['video/mp4', 'video/webm', 'video/ogg'];
    const validExtensions = ['.mp4', '.webm', '.ogg'];
    const fileExtension = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();
    
    if (!file.type.includes('video/') || !validTypes.includes(file.type) || !validExtensions.includes(fileExtension)) {
      toast.error("Please select a valid video file (MP4, WebM, or OGG)");
      return;
    }

    if (file.size > 100 * 1024 * 1024) {
      toast.error("File size too large (max 100MB)");
      return;
    }

    setSelectedFile(file);
  }

  function handleFormFieldChange(event) {
    const { name, value } = event.target;
    
    // Add character limits
    if (name === "title" && value.length > 100) {
      toast.error("Title cannot exceed 100 characters");
      return;
    }
    
    if (name === "description" && value.length > 500) {
      toast.error("Description cannot exceed 500 characters");
      return;
    }

    setMeta(prev => ({
      ...prev,
      [name]: value
    }));
  }

  function handleImageClick() {
    fileInputRef.current.click();
  };

  function clearFile() {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }

  function handleForm(formEvent) {
    formEvent.preventDefault();
    
    if (!selectedFile) {
      toast.error("Please select a video file");
      return;
    }

    if (!meta.title.trim()) {
      toast.error("Title is required");
      return;
    }

    submitFileToServer(selectedFile, meta);
  }

  function resetForm() {
    setMeta({
      title: "",
      description: ""
    });
    setSelectedFile(null);
    setUploading(false);
    setProgress(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }

  async function submitFileToServer(video, videoMetaData) {
    setUploading(true);
    setMessage("");
    
    try {
      let formData = new FormData();
      formData.append("title", videoMetaData.title);
      formData.append("description", videoMetaData.description);
      formData.append("file", video);

      let response = await axios.post(`http://localhost:8081/api/v1/videos`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: (progressEvent) => {
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setProgress(progress);
        }
      });

      setMessage("Video uploaded successfully!"+response.data.videoId);
      toast.success("Video uploaded successfully!");
      resetForm();
    } catch (error) {
      console.error(error);
      let errorMsg = "Failed to upload video";
      
      if (error.response) {
        errorMsg = error.response.data.message || errorMsg;
      } else if (error.request) {
        errorMsg = "Network error - please check your connection";
      }

      setMessage(errorMsg);
      toast.error(errorMsg);
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="text-white">
      <Card className="flex flex-col items-center justify-center space-y-6 p-6">
        <h1 className="text-lg font-semibold">Upload Video</h1>

        <form noValidate onSubmit={handleForm} className="flex flex-col space-y-5 w-full max-w-md">
          <div>
            <div className="mb-2 block">
              <Label htmlFor="title" value="Video Title*" />
            </div>
            <TextInput 
              value={meta.title} 
              onChange={handleFormFieldChange} 
              name="title"  
              id="title"
              placeholder="Enter title (max 100 chars)" 
              required
              disabled={uploading}
            />
          </div>

          <div>
            <div className="mb-2 block">
              <Label htmlFor="description" value="Video Description" />
            </div>
            <Textarea
              value={meta.description}
              onChange={handleFormFieldChange}
              name="description"
              id="description"
              placeholder="Write video description (max 500 chars)"
              rows={4}
              disabled={uploading}
            />
          </div>

          <div className="flex items-center space-x-5 justify-center">
            <div className="shrink-0 cursor-pointer" onClick={!uploading ? handleImageClick : undefined}>
              <img
                className="h-16 w-16 object-cover"
                src={uploadImage}
                alt="Upload Icon"
              />
            </div>

            <div className="flex-1">
              <label className="block">
                <span className="sr-only">Choose video file</span>
                <input
                  ref={fileInputRef}
                  name="file"
                  type="file"
                  accept="video/*"
                  onChange={handleFileChange}
                  className="block w-full text-sm text-white
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-full file:border-0
                    file:text-sm file:font-semibold
                    file:bg-violet-50 file:text-violet-700
                    hover:file:bg-violet-100
                    bg-gray-800"
                  disabled={uploading}
                />
              </label>
              {selectedFile && (
                <div className="mt-2 flex items-center">
                  <span className="text-sm text-gray-300 truncate">
                    {selectedFile.name} ({(selectedFile.size / (1024 * 1024)).toFixed(2)} MB)
                  </span>
                  <button 
                    type="button" 
                    onClick={clearFile}
                    className="ml-2 text-red-400 hover:text-red-300 text-sm"
                    disabled={uploading}
                  >
                    Clear
                  </button>
                </div>
              )}
            </div>
          </div>

          {uploading && (
            <div className="w-full">
              <Progress
                color={progress === 100 ? 'green' : 'blue'}
                progress={progress}
                textLabel={`Uploading... ${progress}%`}
                size="lg"
                labelProgress
                labelText
              />
            </div>
          )}

          {message && (
            <Alert 
              rounded
              withBorderAccent
              color={message.includes("success") ? "success" : "failure"}
              onDismiss={() => setMessage("")}
            >
              <span className="font-medium">
                {message.includes("success") ? "Success!" : "Error!"}
              </span> {message}
            </Alert>
          )}

          <div className="flex justify-center items-center pt-2">
            <Button 
              type="submit"
              disabled={uploading}
              isProcessing={uploading}
              className="w-full max-w-xs"
            >
              {uploading ? "Uploading..." : "Upload Video"}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default VideoUpload;