export interface Post {
    _id: string;
    _createdAt: string;
    _updatedAt: string;
    _rev: string;
    _type: 'post';
    blockTweet: boolean;
    text: string;
    username: string;
    profileImg: string;
    image?: string;
  }

  export interface Reply {
    _id: string;
    _createdAt: string;
    _updatedAt: string;
    _rev: string;
    _type: 'comment';
    comment: string;
    username: string;
    profileImg: string | null;
    post: Post; // Assuming you have a `Post` interface defined
  }
  
  // You can remove the PostBody type since all properties are now included in the Post interface