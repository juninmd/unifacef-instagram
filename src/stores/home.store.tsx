import { action, observable } from 'mobx';

import axios from 'axios';

type Post = {
  id: number;
  image: string;
  description: string;
  authorId: number;
  author: {
    id: number,
    name: string,
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
    } catch (error) {
      console.log(error);
      this.posts = [];
    }
  }

  @action addPost = (uriPhoto) => {
    const post: Post = {
      author: {
        avatar: 'https://i1.wp.com/www.jornadageek.com.br/wp-content/uploads/2016/10/Batman-not2.jpg?resize=696%2C398&ssl=1',
        id: 2,
        name: 'batman'
      },
      authorId: 2,
      description: 'minha foto',
      id: this.posts.length + 1,
      image: uriPhoto
    };

    this.posts.push(post);
  }

  @action toogleStatus = (status: boolean) => {
    this.photoReady = status;
  }

}

const homeStore = new HomeStore();
export { homeStore };
