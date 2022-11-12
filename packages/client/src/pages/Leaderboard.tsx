import React from "react";
import { apiRequestPost } from "../utils/api";
import { API } from "../utils/constants";
import Board from "./components/leaderboard/board";
import Delayed from "./components/leaderboard/delayed";

export class Player {
    name: string;
    score: number;
    date: string;
    data: any;

    constructor(name: string, score: number, date: string, data: any) {
        this.name = name;
        this.score = score;
        this.date = date;
        this.data = data;
    }
}

export let testPlayers: Player[]
let reqOngoing = false;

const data = {
    ratingFieldName: "score",
    cursor: 0,
    limit: 1500
}

export const Leaderboard = () => {

    if (reqOngoing) {
        return (
            <Delayed>
                <Board />
            </Delayed>
        );
    }
    reqOngoing = true;

    apiRequestPost(`${API}/leaderboard/Santa-Barbara`, data)
      .then(res => {
          testPlayers = res;
          reqOngoing = false;
      })
      .catch(err => {
        console.warn(err);
      });

    return;
}

