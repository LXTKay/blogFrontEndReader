"use strict";

import config from "../config.js";
import getAuthCookie from "./getAuthCookie.js";

export default async function editBlogPostLoader({ params }) {
  try{
    const authCookie = getAuthCookie();
    if(!authCookie) throw new Error('Not authorized');

    const id = params.postId;
    const fetchOptions = {
      mode: "cors",
      method: "GET"
    };
    
    fetchOptions.headers = { "Authorization": authCookie };

    const response = await fetch(config.APIURL + "posts/" + id, fetchOptions);

    if(!response.ok) throw new Error('Failed to fetch data');

    const data = await response.json();
    return data;
    
  }catch(error){
    console.log(error);
    return { message: error.name + error.message };
  }
}