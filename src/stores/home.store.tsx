import { action, observable } from 'mobx';

import axios from 'axios';

type Post = {
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

export default class HomeStore {

  @observable photoReady: boolean = false;

  @observable posts: Post[] = [];

  @action getPosts = async () => {
    try {
      const { data: posts } = await axios.get<[Post]>('http://localhost:3000/feed?_expand=author');
      this.posts = posts;
      console.log('succes');
    } catch (error) {
      console.error(error);
      this.posts = [];
    }
  }

  @action addPost = (uriPhoto: string) => {
    const post: Post = {
      author: {
        id: 1,
        name: "jr_acn",
        avatar: "https://avatars0.githubusercontent.com/u/6952134?s=50"
      },
      authorId: 1,
      description: 'irado',
      id: this.posts.length + 1,
      image: uriPhoto
    }

    this.posts.unshift(post);
  }

  @action toogleStatus = (status: boolean) => {
    this.photoReady = status;
  }
}

const homeStore = new HomeStore();
export { homeStore };
