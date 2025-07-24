import { PostInterface } from "../../../interfaces/postInterfaces";

export const postsResponse: PostInterface[] = [
  {
    postId: "0",
    userId: "0",
    firstname: "Tyrone",
    lastname: "Biggums",
    companyId: null,
    companyName: null,
    companyLogo: null,
    profilePicture:
      "https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=1200&h=992&q=70&fm=webp",
    headline: "I smoke rocks",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sollicitudin efficitur odio, vitae mollis libero dignissim nec. Maecenas lacinia velit ac lobortis finibus. Vestibulum facilisis fermentum dui in suscipit. Etiam mollis sapien sapien, ac efficitur mauris rutrum a. Duis vel vehicula est. Nullam imperdiet at ante a fringilla. Nunc sed nunc semper, mattis lectus nec, aliquam magna. Maecenas quis molestie mi. Praesent tempor turpis sit amet ipsum molestie maximus et vel lacus. Donec nec quam et turpis dapibus viverra. Nulla vehicula aliquet dictum. Aenean tristique tortor et est rutrum faucibus. Quisque eu erat a nunc pellentesque ultrices non non est. Pellentesque vulputate sit amet dui bibendum vehicula. Sed ut risus id ante facilisis faucibus.",
    time: new Date(),
    likes: 6,
    comments: 2,
    reposts: 3,
    media: ["https://d.newsweek.com/en/full/940601/05-23-galaxy.jpg"],
  },
  {
    postId: "1",
    userId: null,
    firstname: "",
    lastname: "",
    companyId: "0",
    companyName: "The Galactic Empire",
    companyLogo:
      "https://upload.wikimedia.org/wikipedia/commons/0/0d/Red_emblem_of_the_First_Galactic_Empire.png",
    profilePicture: null,
    headline: "The Empire did nothing wrong",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sollicitudin efficitur odio, vitae mollis libero dignissim nec. Maecenas lacinia velit ac lobortis finibus. Vestibulum facilisis fermentum dui in suscipit. Etiam mollis sapien sapien, ac efficitur mauris rutrum a. Duis vel vehicula est. Nullam imperdiet at ante a fringilla. Nunc sed nunc semper, mattis lectus nec, aliquam magna. Maecenas quis molestie mi. Praesent tempor turpis sit amet ipsum molestie maximus et vel lacus. Donec nec quam et turpis dapibus viverra. Nulla vehicula aliquet dictum. Aenean tristique tortor et est rutrum faucibus. Quisque eu erat a nunc pellentesque ultrices non non est. Pellentesque vulputate sit amet dui bibendum vehicula. Sed ut risus id ante facilisis faucibus.",
    time: new Date(),
    likes: 0,
    comments: 0,
    reposts: 0,
    media: ["https://d.newsweek.com/en/full/940601/05-23-galaxy.jpg"],
  },
];
