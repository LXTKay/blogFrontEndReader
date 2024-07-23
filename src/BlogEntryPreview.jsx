import "./styles/BlogEntryPreview.css";
import { Link } from "react-router-dom";


function BlogEntryPreview(props) {
  function redirect() {
    window.location.href = "/posts/"+props.id;
  }
  return (
      <div className="blog-entry-preview" onClick={redirect}>
        <h2 className="title">{props.title}</h2>
        <p className="date">{props.date}</p>
        <p className="content">{props.content}</p>
      </div>
  )
}

export default BlogEntryPreview;