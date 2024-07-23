import { useLoaderData } from "react-router-dom";
import getAuthCookie from "./modules/getAuthCookie";
import config from "./config";
import "./styles/CreateBlogPost.css";

export default function EditBlogPost() {
  const loaderData = useLoaderData();
  if(loaderData.message){
    return <div>{loaderData.message}</div>
  }
  async function submitChange(){
    const title = document.getElementById("title").value;
    const content = document.getElementById("content").value;

    if (!title || !content) {
      document.getElementById("message").innerText = "Please fill in all fields";
      return;
    }
    
    const isPublished = document.getElementById("isPublished").checked;
    const post = {title, content, isPublished};

    try{
      const authCookie = getAuthCookie();
      if(!authCookie) throw new Error("No auth cookie found");

      const response = await fetch(config.APIURL + "posts/" + loaderData._id, {
        mode: "cors",
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": authCookie
        },
        body: JSON.stringify(post),
      });
      const data = await response.json();
      
      document.getElementById("message").innerText = data.message;
      window.location.href = "/";

    }catch(error){
      document.getElementById("message").innerText = error.message || data.message;
      return;
    }
  }
  
  return (
    <form className="blogPostForm" action="#">
      <div className="form-group">
        <label htmlFor="title">Title:</label>
        <input className="create-title" type="text" name="title" id="title" defaultValue={loaderData.title}/>
      </div>
      <div className="form-group">
        <label htmlFor="content">Body:</label>
        <textarea className="create-content" name="content" id="content" defaultValue={loaderData.content}></textarea>
      </div>
      <div>
        <label htmlFor="isPublished">Publish:</label>
        <input type="checkbox" name="isPublished" id="isPublished" />
      </div>
      <button type="button" onClick={submitChange}>Submit</button>
      <div id="message"></div>
    </form>
  );
}