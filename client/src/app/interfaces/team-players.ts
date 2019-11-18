type Players = {
  _id: string;
  born: string;
  name: string;
  position: string;
  signin: {
    amount: number;
    currency: string;
  };
  thumbnail: string;
};

export interface TeamPlayers {
  name: string;
  players: Players[];
}
