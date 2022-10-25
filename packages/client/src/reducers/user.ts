import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type User = {
  id?: number| null;
  login: string;
  firstName: string;
  secondName: string;
  displayName?: string;
  avatar?: string;
  phone: string;
  email: string;
};


const initialState: User = {
  id: null,
  login: '',
  firstName: '',
  secondName: '',
  displayName: '',
  avatar: '',
  phone: '',
  email: '',
}

const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state = {...state, ...action.payload}
    }
  }
});

export const {setUser} = UserSlice.actions;

export default UserSlice.reducer;