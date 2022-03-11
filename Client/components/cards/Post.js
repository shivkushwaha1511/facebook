import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import moment from "moment";
import renderHTML from "react-render-html";
import PostImage from "../images/PostImage";

const Post = ({ post, page, handleDelete }) => {
  return (
    <>
      {post && post.postedBy && (
        <div className="card mb-4">
          <div className="card-header d-flex">
            {/* Image/name/date */}
            <Avatar size={40}>{post.postedBy.name[0]}</Avatar>

            <span className="text-dark ms-3 pt-1 fs-5 flex-grow-1 fw-bold">
              {post.postedBy.name}
            </span>
            <span className="pt-2 text-dark">
              {moment(post.createdAt).fromNow()}
            </span>
          </div>
          <div className="card-body text-dark">
            {renderHTML(post.postContent)}
          </div>
          <div className="card-footer">
            {post.image && <PostImage url={post.image.url} />}
            {page === "profile" && (
              <div className="text-end">
                <DeleteOutlined
                  className="h5 me-2 text-danger pointer"
                  onClick={() => handleDelete(post)}
                />
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Post;
