import { Post, getPosts } from '../apis/posts.api';
import { action, observable } from 'mobx';

export default class HomeStore {

  @observable photoReady: boolean = false;

  @observable posts: Post[] = [];

  @observable loading: boolean = false;

  @action getPosts = async () => {
    this.loading = true
    try {
      const posts = await getPosts();
      this.posts = posts;
    } catch (error) {
      this.posts = [];
      throw error;
    } finally {
      this.loading = false
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
