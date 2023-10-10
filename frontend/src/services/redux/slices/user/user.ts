import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchSignIn } from './userAPI';

// export interface ISavedFilter {
//   TK: string[];
//   categories: string[];
//   subcategories: string[];
//   sku: string[];
// }

export interface IUserState {
  status: 'idle' | 'success' | 'loading' | 'failed';
  error: unknown;
  user: {
    login: string;
    token: string;
    name: string;
    photo: string;
  };
}

export const signInUser = createAsyncThunk('@@user/signIn', async (data: any, { fulfillWithValue, rejectWithValue }) => {
  // try {
  //   const response = await fetchSignIn(data);
  //   const json = await response.json();
  //   return fulfillWithValue(json.access);
  // } catch (error: unknown) {
  //   return rejectWithValue(error);
  // }
  const response = await fetchSignIn(data);
  return fulfillWithValue(response);
});

const initialState: IUserState = {
  status: 'idle',
  error: null,
  user: {
    login: '',
    token: '',
    name: '',
    photo: '',
  },
};

const userSlice = createSlice({
  name: '@@user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    signOut: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(signInUser.fulfilled, (state, action) => {
        state.status = 'success';
        state.user = action.payload;
      })
      .addMatcher(
        (action) => action.type.endsWith('/pending'),
        (state) => {
          state.status = 'loading';
          state.error = '';
        }
      )
      .addMatcher(
        (action) => action.type.endsWith('/rejected'),
        (state, action) => {
          state.status = 'failed';
          state.error = action.payload.statusText;
        }
      );
  },
});

export const { setUser, signOut } = userSlice.actions;

export const userReducer = userSlice.reducer;

export const selectUser = (state: { user: IUserState }) => state.user.user;
export const selectUserStatus = (state: { user: IUserState }) => state.user.status;
