import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Leader } from '../pages/Leaderboard';
import { Player } from '../types/leader';
import { apiRequestPost } from '../utils/api';
import { API } from '../utils/constants';

const initialState: Leader = {
    data: {},
    ratingFieldName: '',
    teamName: ''
};

const LeadersSlice = createSlice({
    name: 'leader',
    initialState,
    reducers: {
        setLeader: (state, action: PayloadAction<Leader>) => {
            state = {...state, ...action.payload}
        }
    }
});

export const {setLeader} = LeadersSlice.actions;

export default LeadersSlice.reducer;