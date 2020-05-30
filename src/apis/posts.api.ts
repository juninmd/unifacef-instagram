import axios from 'axios';

export type Post = {
  id: number;
  image: string;
  description: string;
  authorId: number;
  author: {
    id: number;
    name: string;
    avatar: string
  }
}

const BaseUrl = 'http://localhost:3000';

export const getPosts = async () => {
  const { data: posts } = await axios.get<[Post]>(`${BaseUrl}/feed?_expand=author`);
  return posts;
}
