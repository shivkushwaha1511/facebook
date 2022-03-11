import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import PostList from "../components/cards/PostList";
import { UserContext } from "../context";

const Profile = () => {
  const [posts, setPosts] = useState([]);
  const [state, setState] = useContext(UserContext);

  useEffect(() => {
    if (state && state.user) fetchUserPosts();
  }, [state && state.user]);

  const fetchUserPosts = async () => {
    try {
      const { data } = await axios.get(`/user-posts`);
      setPosts(data);
    } catch (err) {
      console.log(err);
    }
  };

  // Deleting Post
  const handleDelete = async (post) => {
    try {
      const answer = window.confirm("Are you sure?");
      if (!answer) return;

      const { data } = await axios.delete(`/delete-post/${post._id}`);
      toast.error("Post deleted");
      fetchUserPosts();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-6 offset-3 pt-5">
          <PostList posts={posts} page="profile" handleDelete={handleDelete} />
        </div>
      </div>
    </div>
  );
};

export default Profile;
