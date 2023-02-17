import { DocumentSnapshot, SnapshotOptions } from "firebase/firestore"

interface Favorite {
  movie: number[],
  tv:[]
}



interface Rate {
  movie: {
    [key: string]: number
  }
  tv: {
    [key: string]: number
  }
}



export default class UserData {
  constructor(public favorite: Favorite ,public rate: Rate ) {
    
  }

  getTotalFavorites() {
    const movies = this.favorite.movie.length;
    const tvs = this.favorite.tv.length;
    return movies + tvs;
  }
}

export const userConverter = {
  toFirestore: (user: UserData) => {
      return {
          favorite: user.favorite,
          rate: user.rate
          };
  },
  fromFirestore: (snapshot: DocumentSnapshot, options: SnapshotOptions) => {
      const data = snapshot.data(options) as UserData;
      return new UserData(data.favorite, data.rate);
  }
};
