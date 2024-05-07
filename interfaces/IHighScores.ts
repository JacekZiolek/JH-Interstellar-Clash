export interface IGame {
  vs: string
  userScore: number
  oponentScore: number
}

export interface IHighScores {
  userId: string
  games: IGame[]
}
