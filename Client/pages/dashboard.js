import axios from "axios";
import { useContext, useEffect, useState } from "react";
import PostForm from "../components/form/PostForm";
import { UserContext } from "../context";
import { toast } from "react-toastify";
import PostList from "../components/cards/PostList";
import Pagination from "@material-ui/lab/Pagination";

const Dashboard = () => {
  const [state, setState] = useContext(UserContext);
  const [postContent, setPostContent] = useState("");
  const [image, setImage] = useState({});
  const [uploading, setUploading] = useState(false);
  const [posts, setPosts] = useState([]);

  //Pagination
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);

  const totalPost = async () => {
    try {
      const { data } = await axios.get(`/total-post/${state.user._id}`);
      setTotal(data);
    } catch (err) {
      console.log(err);
    }
  };

  //Fetching Posts
  useEffect(() => {
    if (state && state.token) {
      fetchUserPosts();
    }
  }, [state && state.token, page]);

  const fetchUserPosts = async () => {
    try {
      const { data } = await axios.get(`/community-posts/${page}`);
      setPosts(data);
      totalPost();
    } catch (err) {
      console.log(err);
    }
  };

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

  const postSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post("/create-post", {
        postContent,
        image,
      });

      if (data.error) {
        toast.error(data.error);
      } else {
        fetchUserPosts();
        toast.success("Post created");
        setPostContent("");
        setImage({});
      }
    } catch (err) {
      toast.error("Try again!");
      console.log(err);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-8 px-4 pt-5 center">
          <PostForm
            postContent={postContent}
            setPostContent={setPostContent}
            postSubmit={postSubmit}
            handleImageUpload={handleImageUpload}
            image={image}
            uploading={uploading}
          />
          <PostList posts={posts} />

          <Pagination
            count={Math.ceil(total / 5)}
            page={page}
            onChange={(e, pg) => setPage(pg)}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
