import { useGetLeaderQuery } from "../services/leaderApi";
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

    const res = useGetLeaderQuery({...data});
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

