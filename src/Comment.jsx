import config from "./config";
import getAuthCookie from "./modules/getAuthCookie";
import "./styles/Comment.css";

export default function Comment(props) {
  return (
    <div className="comment" id={props.id}>
      <div className="commentTopBar">
        <p className="commentName">{props.name}</p>
        <p className="commentDate">{props.timestamp}</p>
      </div>
      <p className="commentContent">{props.content}</p>
    </div>
  );
}