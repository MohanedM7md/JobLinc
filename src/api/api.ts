import axios from "axios";

export const api = axios.create({
  //baseURL: "https://joblinc.me/api",
  baseURL: "http://localhost:3000/api",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

export const GetNothing = () => {
  axios
    .get("https://jsonplaceholder.typicode.com/todos/1")
    .then((data) => console.log(data))
    .catch((err) => console.log(err));
};
