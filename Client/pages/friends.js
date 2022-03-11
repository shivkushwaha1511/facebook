import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import People from "../components/cards/People";
import { UserContext } from "../context";

const Friends = () => {
  const [people, setPeople] = useState([]);
  const [state, setState] = useContext(UserContext);

  useEffect(() => {
    if (state && state.user) {
      findPeople();
      getUser();
    }
  }, []);

  const findPeople = async () => {
    const { data } = await axios.get("/find-people");
    setPeople(data);
  };

  const handleSendRequest = async (user) => {
    try {
      await axios.put("/send-request", { _id: user._id });
      findPeople();
      toast.success("Request Sent");
    } catch (err) {
      console.log(err);
    }
  };

  const handleAcceptRequest = async (user) => {
    try {
      const { data } = await axios.put("/accept-request", { _id: user._id });
      findPeople();
      toast.success("Request Accepted");
      getUser();
    } catch (err) {
      console.log(err);
    }
  };

  const getUser = async () => {
    const { data } = await axios.get("/current-user");
    // Update localstorage and context
    let auth = JSON.parse(localStorage.getItem("auth"));
    auth.user = data;
    localStorage.setItem("auth", JSON.stringify(auth));
    setState({ ...state, user: data });
  };

  const handleRejectRequest = async (user) => {
    try {
      await axios.put("/reject-request", { _id: user._id });
      findPeople();
      getUser();
      toast.success("Request Rejected");
    } catch (err) {
      console.log(err);
    }
  };

  const handleUnfriend = async (user) => {
    try {
      const { data } = await axios.put("/remove-friend", { _id: user._id });
      findPeople();
      toast.error("Removed");
      getUser();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container-fluid">
      <div className="row text-center pt-3">
        <div className="col-3">
          <h2>Friends</h2>
          {state && state.user && state.user.friends.length > 0 ? (
            <People
              people={state.user.friends}
              section="friend"
              handleUnfriend={handleUnfriend}
            />
          ) : (
            <h5 className="pt-2">No Users</h5>
          )}
        </div>
        <div className="col-4 offset-1">
          <h2>People you may know?</h2>
          <People people={people} handleSendRequest={handleSendRequest} />
        </div>
        <div className="col-3 offset-1">
          <h2>Friend requests</h2>
          {state && state.user && state.user.requests.length > 0 ? (
            <People
              people={state.user.requests}
              section="request"
              handleAcceptRequest={handleAcceptRequest}
              handleRejectRequest={handleRejectRequest}
            />
          ) : (
            <h5 className="pt-2">No Users</h5>
          )}
        </div>
      </div>
    </div>
  );
};

export default Friends;
