import React from "react";
import Axios from "axios";
import { useForm } from "react-hook-form";
import "../css/Upload.css";
const uploadUrl = "http://49.50.162.195:8080/videos/upload";

//import { convertTime } from "./ChatContainer";
function Upload() {
  const [videoFile, changeVideoFile] = React.useState("");
  const [posterFile, changePosterFile] = React.useState("");
  const [uploadCompleted, handleUploadFlag] = React.useState(false);

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
      if (data.errorCode != 10) throw data;
      handleUploadFlag(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <React.Fragment>
      <label for="vf">동영상 업로드 </label>
      <input id="vf" type="file" onChange={videoFileChange} name="videoFile" />
      <br />
      <label for="vf">포스터 업로드 </label>
      <input id="pf" type="file" onChange={posterFileChange} name="posterFile" />

      <br />
      <input id="form-id" type="text" ref={register} name="videoName" placeholder="영상의 이름" />
      <br />
      <input id="form-desc" ref={register} name="videoDesc" placeholder="설명" />
      <br />
      <button id="form-btn" className="sendButton" type="submit" onClick={handleSubmit(fileUpload)}>
        Upload
      </button>

      {uploadCompleted && "업로드가 완료되었습니다."}
    </React.Fragment>
  );
}

export default Upload;
