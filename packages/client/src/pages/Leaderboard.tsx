import { withStyles } from "@mui/styles";
import React from "react";
import { connect } from "react-redux";
import withNavigation from "../hocs/with-navigation/WithNavigation";
import { leaderApi, useGetLeaderQuery } from "../services/leaderApi";
import leader, { getLeader } from "../reducers/leader";
import { apiRequestPost } from "../utils/api";
import { API } from "../utils/constants";
import Board from "./components/leaderboard/board";
import Delayed from "./components/leaderboard/delayed";

export class Player {
    name: string;
    score: number;
    date: string;
    data?: any;

    constructor(name: string, score: number, date: string, data: any) {
        this.name = name;
        this.score = score;
        this.date = date;
        this.data = data;
    }
}

export type Leader = {
    data: Record<string, unknown>,
    ratingFieldName: string,
    teamName: string
}

export let testPlayers: Player[]
let reqOngoing = false;

const data = {
    ratingFieldName: "score",
    cursor: 0,
    limit: 1500
}

export const Leaderboard = () => {

    let res = useGetLeaderQuery({...data});
    testPlayers = res.currentData

    if (reqOngoing) {
        return (
            <Delayed>
                <Board />
            </Delayed>
        );
    }
    reqOngoing = true;
    
    return;
}

