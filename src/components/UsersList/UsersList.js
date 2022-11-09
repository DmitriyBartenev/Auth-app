import {useHttp} from '../../hooks/http.hook';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchUsers, userDeleted } from '../../redux/actions';

import UserItem from '../UserItem/UserItem';

import Spinner from '../../assets/Spinner';

import './usersList.scss';

const UsersList = () => {

    const [value, setValue] = useState('')

    const {request} = useHttp();

    const dispatch = useDispatch();

    const usersLoadingStatus = useSelector(state => state.users.usersLoadingStatus)
    const users = useSelector(state => state.users.users);

    useEffect(()=>{
        dispatch(fetchUsers(request))
        // eslint-disable-next-line
    },[])

    const onDelete = useCallback((id) => {
        request(`http://localhost:3001/users/${id}`, "DELETE")
            .then(data => console.log(data, 'Deleted'))
            .then(dispatch(userDeleted(id)))
            .catch(err => console.log(err))
        // eslint-disable-next-line 
    },[request])

    if(usersLoadingStatus === 'loading'){
        return <Spinner/>
    }else if(usersLoadingStatus === 'error'){
        return <h2>Something went wrong</h2>
    }

    const renderUsersList = (arr) => {
        if(arr.length === 0) {
            return(
                <h2>Oops...empty list</h2>
            )
        }
        return arr.map(({id, ...props})=> {
            return(
                <UserItem key={id} {...props} onDelete={() => onDelete(id)}/>
            )
        })
    }

    const filteredUsers = users.filter(user => {
        return user.name.toLowerCase().includes(value.toLowerCase())
    })

    const elements = renderUsersList(filteredUsers)

    return(
        <div className='wrapper'>
            {elements}
            <input 
                type='text'
                placeholder='Search User By Name'
                value={value}
                onChange={(e) => setValue(e.target.value)}
                />
        </div>
    )
}

export default UsersList;