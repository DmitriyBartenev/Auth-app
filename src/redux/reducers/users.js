import { createReducer } from "@reduxjs/toolkit"

import {
    usersFetching,
    usersFetched,
    usersFetchingError,
    userCreated,
    userDeleted
} from '../actions';

const initialState = {
    users:[],
    usersLoadingStatus:'idle'
}

const users = createReducer(initialState, builder => {
    builder
        .addCase(usersFetching, state => {
            state.usersLoadingStatus = 'loading';
        })
        .addCase(usersFetched, (state, action)  => {
            state.users = action.payload;
            state.usersLoadingStatus = 'idle';
        })
        .addCase(usersFetchingError, state => {
            state.usersLoadingStatus = 'error';
        })
        .addCase(userCreated, (state, action) => {
            state.users.push(action.payload);
        })
        .addCase(userDeleted, (state, action) => {
            state.users = state.users.filter(item => item.id !== action.payload)
        })
        .addDefaultCase(() => {});
})

export default users;