import { createAction } from "@reduxjs/toolkit";

export const fetchUsers = (request) => (dispatch) => {
    dispatch(usersFetching());
    request('http://localhost:3001/users')
        .then(data => dispatch(usersFetched(data)))
        .catch(() => dispatch(usersFetchingError()))
}

export const usersFetching = createAction('USERS_FETCHING');

export const usersFetched = createAction('USERS_FETCHED');

export const usersFetchingError = createAction('USERS_FETCHING_ERROR');

export const userCreated = createAction('USER_CREATED');

export const userDeleted = createAction('USER_DELETED');

