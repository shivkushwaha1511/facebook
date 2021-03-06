import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";
import { CameraOutlined, LoadingOutlined } from "@ant-design/icons";
import { Avatar } from "antd";

const PostForm = ({
  postContent,
  setPostContent,
  postSubmit,
  handleImageUpload,
  image,
  uploading,
}) => {
  return (
    <div className="card mb-5">
      <div className="card-body">
        <form className="form-group">
          <ReactQuill
            theme="snow"
            value={postContent}
            className="form-control"
            placeholder="Whats on your mind???"
            onChange={(e) => setPostContent(e)}
          />
        </form>
      </div>
      <div className="card-footer d-flex justify-content-between">
        <button
          onClick={postSubmit}
          disabled={!postContent}
          className="btn btn-primary text-white ms-2"
        >
          Post
        </button>

        <label className="pointer">
          {image && image.url ? (
            <Avatar size={30} src={image.url} className="mt-1 me-2" />
          ) : uploading ? (
            <LoadingOutlined spin className="fs-4 mt-2 me-2" />
          ) : (
            <CameraOutlined className="pt-2 fs-4 pe-2" />
          )}
          <input
            onChange={handleImageUpload}
            type="file"
            accept="images/*"
            hidden
          />
        </label>
      </div>
    </div>
  );
};

export default PostForm;
