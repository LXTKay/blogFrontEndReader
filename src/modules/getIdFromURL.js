"use strict";
export default function getIdFromURL(){
  const path = window.location.pathname;
  const segments = path.split("/");
  const id = segments[segments.length - 1];
  return id;
}