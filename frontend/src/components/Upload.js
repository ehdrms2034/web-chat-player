import React from "react";
import Axios from "axios";
import { useForm } from "react-hook-form";

const uploadUrl = "http://49.50.162.195:8080/videos/upload";

//import { convertTime } from "./ChatContainer";
function Upload() {
  const [videoFile, changeVideoFile] = React.useState("");
  const [posterFile, changePosterFile] = React.useState("");

  const { register, handleSubmit, watch, errors } = useForm();

  const videoFileChange = (e) => {
    changeVideoFile(e.target.files[0]);
  };

  const posterFileChange = (e) => {
    changePosterFile(e.target.files[0]);
  };

  const fileUpload = async () => {
    const formData = new FormData();
    formData.append("file", videoFile);
    formData.append("poster", posterFile);
    formData.append("videoname", watch("videoName"));
    formData.append("desc", watch("videoDesc"));
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    try {
      const data = await Axios.post(uploadUrl, formData, config).then((res) => {
        return res.data;
      });
      // if (data.response !== 10) throw data;
      return data.data;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(fileUpload)}>
        <input type="file" onChange={videoFileChange} name="videoFile" />
        <input type="file" onChange={posterFileChange} name="posterFile" />
        <input type="text" ref={register} name="videoName" placeholder="영상의 이름" />
        <input type="text" ref={register} name="videoDesc" placeholder="설명" />

        <button type="submit">Upload</button>
      </form>
    </div>
  );
}

export default Upload;
