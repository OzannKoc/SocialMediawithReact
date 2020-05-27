import axios from "axios";

export const signUp = (user) => {
  return axios.post("/api/users", user);
};
export const login = (creds) => {
  return axios.post("/api/auth", {}, { auth: creds  });
};
export const changeLanguage = (language) => {
  axios.defaults.headers["accept-language"] = language;
};
export const getUsers=(pageNumber=0,size=5)=>{
  return axios.get(`/api/users?page=${pageNumber}&size=${size}`);
}
export const setAuthorizationHeader = ({username , password,isLoggedIn})=>{
  if(isLoggedIn){
    const authUser = `Basic ${btoa(username+":"+password)}`
    axios.defaults.headers["Authorization"] = authUser;
  }else{
    delete axios.defaults.headers["Authorization"];
  }
}
export const getUser = (username)=>{
  return axios.get(`/api/users/${username}`);
}
export const updateUser = (username,body)=>{
  return axios.put(`/api/users/${username}`,body);
}
export const postBitchy=(bitchy)=>{
  return axios.post("/api/posts",bitchy);
}
export const getBitchy=(username,page=0)=>{
  const path = username ? `/api/users/${username}/posts?page=`:"/api/posts?page=";
  return axios.get(path + page);
}
export const getOldBitchy=(id,username) =>{
  const path = username ? `/api/users/${username}/posts/` : "/api/posts/" ;
  return axios.get(path + id)
}
export const getNewBitchyCount = (id,username)=>{
  const path = username ? `/api/users/${username}/posts/` : "/api/posts/" ;
  return axios.get(path+id+"?count=true")
}
export const getNewBitchy=(id,username)=>{
  const path = username ? `/api/users/${username}/posts/${id}?direction=after` : `/api/posts/${id}?direction=after`;
  return axios.get(path);
}
