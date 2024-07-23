import { useEffect, useState } from "react";
import config from "./config";
import Comment from "./Comment";
import CreateComment from "./CreateComment";
import getIdFromURL from "./modules/getIdFromURL";
import getAuthCookie from "./modules/getAuthCookie";
import "./styles/BlogEntry.css";
import makeDatePretty from "./modules/makeDatePretty";

function BlogEntry(){
  const [post, setPost] = useState({});

  useEffect(() => {
    async function fetchData() {
      const fetchOptions = {
        mode: "cors",
        method: "GET"
      };

      const authCookie = getAuthCookie();
      if(authCookie) fetchOptions.headers = { "Authorization": authCookie };

      const id = getIdFromURL();
      try{
        const response = await fetch(config.APIURL + "posts/" + id, fetchOptions);

        if(!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const data = await response.json();
        if(data.message) throw new Error(data.message);
        data.timestamp = makeDatePretty(data.timestamp);
        data.comments.map(comment => comment.timestamp = makeDatePretty(comment.timestamp));
        setPost(data);

      } catch(error) {
        console.log(error);
        const data = {
          id: "dummyID",
          title: error.name,
          content: error.message,
          isPublished: true,
          date: Date.now(),
        }
        setPost(data);
        return;
      }
    }
    fetchData();
  }, []);

  let comments = null;
  if (post.comments && (post.comments.length > 0)){
    comments = post.comments.map(function(comment){
      return <Comment 
        key={comment._id}
        name={comment.name} 
        content={comment.content} 
        timestamp={comment.timestamp}
        id={comment._id}
      />
    })
  }
  
  return (
    <>
      <div className="blog-entry">
        <h2 className="title">{post.title}</h2>
        <p className="date">{post.timestamp}</p>
        <p className="content">{post.content}</p>
      </div>
      <div className="commentSection">
        <h3>Comments</h3>
        {comments}
        <CreateComment />
      </div>
    </>
    
  )
}

export default BlogEntry;