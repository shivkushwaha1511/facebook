import { List, Avatar } from "antd";
import { useContext } from "react";
import { UserContext } from "../../context";

const People = ({
  people,
  handleSendRequest,
  handleAcceptRequest,
  handleRejectRequest,
  handleUnfriend,
  section,
}) => {
  const [state] = useContext(UserContext);
  return (
    <>
      <List
        itemLayout="horizontal"
        dataSource={people}
        renderItem={(user) => {
          return (
            state &&
            state.user &&
            state.user._id !== user._id && (
              <List.Item className="px-4">
                <List.Item.Meta
                  avatar={<Avatar size={40}>{user.name[0]}</Avatar>}
                  title={
                    <div className="d-flex justify-content-between fw-bold">
                      <span className="text-dark pt-1 fs-6">{user.name}</span>
                      {section === "request" ? (
                        <div className="pt-2">
                          <span
                            className="text-primary pt-1 pointer me-3"
                            onClick={() => handleAcceptRequest(user)}
                          >
                            Accept
                          </span>
                          <span
                            className="text-danger pt-1 pointer"
                            onClick={() => handleRejectRequest(user)}
                          >
                            Delete
                          </span>
                        </div>
                      ) : section === "friend" ? (
                        <div className="pt-2">
                          <span
                            className="text-danger pt-1 pointer"
                            onClick={() => handleUnfriend(user)}
                          >
                            Unfriend
                          </span>
                        </div>
                      ) : user.requests &&
                        user.requests.includes(state.user._id) ? (
                        <span className="text-secondary pt-1">
                          Request sent
                        </span>
                      ) : (
                        <span
                          className="text-primary pt-1 pointer"
                          onClick={() => handleSendRequest(user)}
                        >
                          Send Request
                        </span>
                      )}
                    </div>
                  }
                />
              </List.Item>
            )
          );
        }}
      />
    </>
  );
};

export default People;
