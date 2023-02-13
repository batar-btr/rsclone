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
  favorite: Favorite
  rate: Rate
  constructor() {
    this.favorite = {
      movie: [],
      tv: []
    }
    this.rate = {
      movie: {
       
      },
      tv: {

      }
    }
  }
}