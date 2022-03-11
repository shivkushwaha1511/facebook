import Post from "./Post";

const PostList = ({ posts, page, handleDelete }) => {
  return (
    <>
      {posts &&
        posts.map((post) => (
          <Post
            key={post._id}
            post={post}
            page={page}
            handleDelete={handleDelete}
          />
        ))}
    </>
  );
};

export default PostList;
