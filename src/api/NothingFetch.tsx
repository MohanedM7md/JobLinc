import axios from 'axios';

export const GetNothing = () =>{
    axios
    .get("https://jsonplaceholder.typicode.com/todos/1")
    .then(data => console.log(data))
    .catch(err => console.log(err));
}