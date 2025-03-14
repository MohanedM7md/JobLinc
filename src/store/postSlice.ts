import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface PostPayload {
    text: string;
    pics: string[];
}

const initialState: PostPayload = {
    text: "",
    pics: [],
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
                    state.text = action.payload.postText;
                    state.pics = action.payload.postPics;
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
                if (action.payload) {
                    state.text = action.payload.postText;
                    state.pics = action.payload.postPics;
                }
            })
            .addCase(editPost.rejected, () => {
                console.log("failed to edit post");
            })
    }
});

export const fetchPost = createAsyncThunk("post/fetch", async (postID: string) => {
    try {
        return new Promise<{ postText: string, postPics: string[] }>((resolve) => {
            setTimeout(() => {
                console.log(`fetching post #${postID}`);
                const postText: string = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sollicitudin efficitur odio, vitae mollis libero dignissim nec. Maecenas lacinia velit ac lobortis finibus. Vestibulum facilisis fermentum dui in suscipit. Etiam mollis sapien sapien, ac efficitur mauris rutrum a. Duis vel vehicula est. Nullam imperdiet at ante a fringilla. Nunc sed nunc semper, mattis lectus nec, aliquam magna. Maecenas quis molestie mi. Praesent tempor turpis sit amet ipsum molestie maximus et vel lacus. Donec nec quam et turpis dapibus viverra. Nulla vehicula aliquet dictum. Aenean tristique tortor et est rutrum faucibus. Quisque eu erat a nunc pellentesque ultrices non non est. Pellentesque vulputate sit amet dui bibendum vehicula. Sed ut risus id ante facilisis faucibus.";
                const postPics: string[] = ["https://d.newsweek.com/en/full/940601/05-23-galaxy.jpg"];
                resolve({ postText, postPics });
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
         return new Promise<{ postText: string; postPics: string[] }>(
           (resolve) => {
             setTimeout(() => {
               console.log(`fetching post #${postID}`);
               const postText: string = newText;
               const postPics: string[] = newPics;
               resolve({ postText, postPics });
             }, 1000);
           },
         );
    }
    catch (error) {
        console.log(Error);
    }
});

export default postSlice.reducer;
