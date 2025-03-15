import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { PostInterface } from "../interfaces/postInterfaces";

interface PostsPayload {
    posts: PostInterface[];
}

const initialState: PostsPayload = {
    posts: [{
        postID:"0",
        userID:"0",
        firstName:"",
        lastName:"",
        profilePicture:"",
        headline:"",
        text: "",
        likes: 0,
        reposts: 0,
        pics: [],
        comments: [{commentID:"0", userID:"0", firstName:"", lastName:"", profilePicture:"", headline:"", commentText:""}],
    }]
}

const postSlice = createSlice({
    name: "post",
    initialState: initialState,
    reducers: {
        
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPost.pending, () => {
                console.log("fetching post");
            })
            .addCase(fetchPost.fulfilled, (state, action) => {
                console.log("fetched post");
                if (action.payload) {
                    state.posts = action.payload.posts;
                }
            })
            .addCase(fetchPost.rejected, () => {
                console.log("failed to fetch post");
            })
            .addCase(editPost.pending, () => {
                console.log("editing post");
            })
            .addCase(editPost.fulfilled, (state, action) => {
                console.log("edited post");
                //if (action.payload) {
                //    const post = state.posts.find((post) => {post.id === action.payload.postID});
                //    if (post) {
                //        post.text = action.payload.postText;
                //        post.pics = action.payload.postPics;
                //    }
                //}
            })
            .addCase(editPost.rejected, () => {
                console.log("failed to edit post");
            })
    }
});

export const fetchPost = createAsyncThunk("post/fetch", async (count: number) => {
    try {
        return new Promise<PostsPayload>((resolve) => {
            setTimeout(() => {
                console.log(`fetching posts`);
                const postID = "0";
                const userID = "0";
                const firstName = "Tyrone";
                const lastName = "Biggums";
                const profilePicture = "https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=1200&h=992&q=70&fm=webp";
                const headline = "I smoke rocks";
                const postText: string = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sollicitudin efficitur odio, vitae mollis libero dignissim nec. Maecenas lacinia velit ac lobortis finibus. Vestibulum facilisis fermentum dui in suscipit. Etiam mollis sapien sapien, ac efficitur mauris rutrum a. Duis vel vehicula est. Nullam imperdiet at ante a fringilla. Nunc sed nunc semper, mattis lectus nec, aliquam magna. Maecenas quis molestie mi. Praesent tempor turpis sit amet ipsum molestie maximus et vel lacus. Donec nec quam et turpis dapibus viverra. Nulla vehicula aliquet dictum. Aenean tristique tortor et est rutrum faucibus. Quisque eu erat a nunc pellentesque ultrices non non est. Pellentesque vulputate sit amet dui bibendum vehicula. Sed ut risus id ante facilisis faucibus.";
                const likes = 6;
                const reposts = 3;
                const postPics: string[] = ["https://d.newsweek.com/en/full/940601/05-23-galaxy.jpg"];
                const comments = [
                  {
                    commentID: "0",
                    userID: "1",
                    firstName: "Anime",
                    lastName: "Protagonist",
                    profilePicture: "",
                    headline: "I am the main character",
                    commentText:
                      "A very good comment, yes indeed, It is called Lothric, where the transitory lands of the Lords of Cinder converge.",
                  },
                ];
                const posts: PostInterface[] = [{
                    postID:postID,
                    userID:userID,
                    firstName:firstName,
                    lastName:lastName,
                    profilePicture:profilePicture,
                    headline:headline,
                    text:postText,
                    likes:likes,
                    reposts: reposts,
                    pics:postPics,
                    comments 
                }];
                resolve({posts});
            }, 1000);
        });
    } 
    catch (error) {
        console.log(Error);
    }
});

interface EditPostPayload {
    postID: string;
    newText: string;
    newPics: string[];
}

export const editPost = createAsyncThunk("post/edit", async ({ postID, newText, newPics }: EditPostPayload) => {
    try {
         return new Promise<{postID:string, postText: string; postPics: string[] }>(
           (resolve) => {
             setTimeout(() => {
               console.log(`fetching post #${postID}`);
               const postText: string = newText;
               const postPics: string[] = newPics;
               resolve({postID, postText, postPics });
             }, 1000);
           },
         );
    }
    catch (error) {
        console.log(Error);
    }
});

export default postSlice.reducer;
