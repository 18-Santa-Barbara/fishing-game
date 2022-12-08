import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Leader } from '../pages/Leaderboard';
import { Player } from '../types/leader';
import { apiRequestPost } from '../utils/api';
import { API } from '../utils/constants';

const initialState: Player = {
    name: '',
    score: 0,
    date: '',
    data: null
};

const LeaderSlice = createSlice({
    name: 'leader',
    initialState,
    reducers: {
        getLeader: (state, action: PayloadAction<Player>) => {
            state = {...state, ...action.payload}
        }
    }
});

export const {getLeader} = LeaderSlice.actions;

export default LeaderSlice.reducer;