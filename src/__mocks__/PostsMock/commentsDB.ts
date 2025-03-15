import { CommentInterface } from "../../interfaces/postInterfaces";

export const commentsResponse: CommentInterface[] = [ //I'm assuming all those comments are for my post as that SHOULD be what I get from the API
    {
        commentID: "0",
        userID: "1", //Should be logged in userID, same thing for all the user info
        firstName: "Anime",
        lastName: "Protagonist",
        profilePicture: "https://i.pinimg.com/550x/04/bb/21/04bb2164bbfa3684118a442c17d086bf.jpg",
        headline: "I am the main character",
        commentText: "A very good comment, yes indeed, It is called Lothric, where the transitory lands of the Lords of Cinder converge.",
    }
]