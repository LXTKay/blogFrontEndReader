export default function getAuthCookie() {
  const cookies = document.cookie.split(";");
  const authCookie = cookies.find(function(cookie){
    if(cookie.includes("Authorization")){
      return cookie.split("=")[0]
    };
  });
  return authCookie;
};