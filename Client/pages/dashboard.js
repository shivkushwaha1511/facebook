import axios from "axios";
import { useContext, useState } from "react";
import PostForm from "../components/form/PostForm";
import { UserContext } from "../context";

const Dashboard = () => {
  const [state, setState] = useContext(UserContext);
  const [postContent, setPostContent] = useState("");
  const [image, setImage] = useState({});
  const [uploading, setUploading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [people, setPeople] = useState([]);

  const handleImageUpload = async (e) => {
    setUploading(true);
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    try {
      const { data } = await axios.post("/image-upload", formData);
      setImage(data);
      setUploading(false);
    } catch (err) {
      console.log(err);
      setUploading(false);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-8 px-4 pt-5 center">
          <PostForm
            postContent={postContent}
            setPostContent={setPostContent}
            // postSubmit={postSubmit}
            handleImageUpload={handleImageUpload}
            image={image}
            uploading={uploading}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
