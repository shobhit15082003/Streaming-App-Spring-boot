import React, { useState } from "react";
import uploadImage from "../../src/pictures/upload.png";
import { Alert, Button, Card, Label, Progress, Textarea, TextInput } from "flowbite-react";
import toast from "react-hot-toast";

const VideoUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [meta,setMeta]=useState({
    title:"",
    description:"",
  });
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");

  function handleFileChange(event) {
    console.log(event);
    setSelectedFile(event.target.file[0]);
    console.log(selectedFile);
  }

  function handleFormFieldChange(event){
    setMeta({
        // title:formEvent.target.title.value,
        // description:formEvent.target.description.value
        ...meta,
        [event.target.name]:event.target.value
    });
  }


  function handleForm(formEvent) {
    console.log("button clciked");
    formEvent.preventDefault();
    // console.log(formEvent.target);
   if(!selectedFile){
    alert("Select File!");
    return;
   }
    submitFileToServer(selectedFile,meta);
  }

  function resetForm(){
    setMeta({
        title:"",
        description:""
    });
    setSelectedFile(null);
    setUploading(false);
    
  }

  async function submitFileToServer(video,videoMetaData){
    setUploading(true);
    try{
        let formData =new FormData();
        formData.append("title",videoMetaData.title);
        formData.append("description",videoMetaData.description);
        formData.append("file",video);

       let response= await axios.post(`http://localhost:8081/api/v1/videos`,FormData,{
            headers:{
                'Content-Type':'multipart/form-data'
            },
            onUploadProgress:(progressEvent)=>{
                const progress=Math.round((progressEvent.loaded *100)/progressEvent.total);
                // console.log(progressEvent);
                setProgress(progress);
            }
        }); 
        console.log(response);
        setMessage("File uploaded");
        setProgress(0);
        setUploading(false);
        toast.success("File uploaded succcessfully!");
        resetForm();
    }
    catch(error){
        console.log(error);
        setMessage("Error in uploading file");
        setUploading(false);
        toast.error("File not uploaded!");
    }
  } 


  return (
    <div className="text-white">
      <Card className="flex flex-col items-center justify-center space-y-6 p-6">
        <h1 className="text-lg font-semibold">Upload Video</h1>

        <form noValidate onSubmit={handleForm} className="flex flex-col space-y-5">
          {/* <input type="text"/> */}
          <div>
            <div className="mb-2 block">
              <Label htmlFor="text-upload" value="Video uplaod" />
            </div>
            <TextInput value={meta.title} onChange={handleFormFieldChange} name="title"  placeholder="Enter title" />
          </div>

          <div className="max-w-md">
            <div className="mb-2 block">
              <Label htmlFor="video_description" value="Video Description">
                Video Description
              </Label>
            </div>
            <Textarea
            value={meta.description}
            onChange={handleFormFieldChange}
            name="description"
              id="comment"
              placeholder="Write video Description....."
              required
              rows={4}
            />
          </div>

          <div className="flex items-center space-x-5 justify-center">
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
            //   value={selectedFile}
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
              />
            </label>
          </div>


          <div className="">
               {
                uploading && (
                    <Progress
                    color="green"
                    progress={progress}
                    textLabel="Uploading.."
                    size="lg"
                    labelProgress
                    labelText
                />
                )};
          </div>

            <div>
                {
                    message && (
                    <Alert 
                    rounded
                    withBorderAccent
                    color="success"
                    onDismiss={()=>{
                        setMessage("");
                    }}
                    >
                    <span className="font-medium">Success Alret!</span>{message}
                </Alert>
                )}
            </div>

          <div className="flex justify-center items-center">
            <Button disabled={uploading} type="submit">Submit</Button>
          </div>
        </form>

        {/* <div className="flex justify-center">
          <Button onClick={handleForm}>Upload</Button>
        </div> */}
      </Card>
    </div>
  );
};

export default VideoUpload;
