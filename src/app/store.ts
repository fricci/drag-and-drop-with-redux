import { createSlice } from '@reduxjs/toolkit';
import { configureStore } from '@reduxjs/toolkit';

const history: any[] = [];

export const slice = createSlice({
    name: 'position',
    initialState: {
        x: 0,
        y: 0
    },
    reducers: {
        newBoxPosition: (state, action) => {
            history.push(action.payload);
            state.x = action.payload.x;
            state.y = action.payload.y;
        },
        undo: (state) => {
            const prevState = history.pop();
            if(prevState) {
                state.x = prevState.x;
                state.y = prevState.y;
            }
        }
    },
});

const store = configureStore({
    reducer: {
      position: slice.reducer
    },
  });

export const { newBoxPosition, undo} = slice.actions;
export { store };

