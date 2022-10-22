import React from "react";
import { apiRequestPost } from "../utils/api";
import { API } from "../utils/constants";
import Board from "./components/leaderboard/board";
import Delayed from "./components/leaderboard/delayed";

export class Player {
    name: string;
    score: number;
    date: string;

    constructor(name: string, score: number, date: string) {
        this.name = name;
        this.score = score;
        this.date = date;
    }
}

export let testPlayers: Player[]

export const Leaderboard = () => {
    
    const data = {
        ratingFieldName: "score",
        cursor: 0,
        limit: 1500
    }

    apiRequestPost(`${API}/leaderboard/SantaBarbara`, data)
      .then(res => {
          console.log(res);
          testPlayers = res;
      })
      .catch(err => {
        console.warn(err);
      });

    return (
        <Delayed>
            <Board />
        </Delayed>
    );
}

