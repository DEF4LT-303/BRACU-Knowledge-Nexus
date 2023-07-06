import { createSlice } from '@reduxjs/toolkit';

let nextIdVal = 0;

export function nextID() {
  nextIdVal += 1;
  return nextIdVal;
}

export const peopleSlice = createSlice({
  name: 'people',
  initialState: {
    list: [
      // { name: 'Joe', img: '/img/driver.png', id: nextID() },
      // { name: 'Mary', img: '/img/driver2.png', id: nextID() },
      // { name: 'Ryan', id: nextID() }
    ],
    isFetching: false,
    error: false
  },
  reducers: {
    getUsersStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },

    getUsersSuccess: (state, action) => {
      state.isFetching = false;
      state.list = action.payload;
    },

    getUsersFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },

    add: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.list.push(action.payload);
    },
    remove: (state, action) => {
      const removedIds = action.payload;
      state.list = state.list.filter((person) => {
        return !removedIds.includes(person.id);
      });
    },

    updateStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    update: (state, action) => {
      state.list = state.list.map((person) => {
        if (person.id === action.payload.id) {
          return action.payload;
        }
        return person;
      });
      state.isFetching = false;
    },
    updateFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    }
  }
});

export const {
  add,
  remove,
  update,
  getUsersStart,
  getUsersSuccess,
  getUsersFailure,
  updateStart,
  updateFailure
} = peopleSlice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
export const incrementAsync = (amount) => (dispatch) => {
  setTimeout(() => {
    //dispatch(incrementByAmount(amount));
  }, 1000);
};

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectPeople = (state) => state.people.list;
export const selectLoading = (state) => state.people.loading;

export default peopleSlice.reducer;
