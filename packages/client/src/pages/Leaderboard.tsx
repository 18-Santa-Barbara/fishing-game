import Board from "././components/leaderboard/board";

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

export const Leaderboard = () => <Board />;

