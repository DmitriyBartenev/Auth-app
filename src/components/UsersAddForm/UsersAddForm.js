import { useHttp } from "../../hooks/http.hook";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from 'uuid';

import { userCreated } from "../../redux/actions";

import './usersAddForm.scss';

const UserAddForm = () => {

    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');

    const dispatch = useDispatch();

    const {request} = useHttp(); 

    const onSubmit = (e) =>  {
        e.preventDefault();
        const newUser = {
            id: uuidv4(),
            name: userName,
            email: userEmail
        }

        request("http://localhost:3001/users", "POST", JSON.stringify(newUser))
            .then(res => console.log(res, 'Succes'))
            .then(dispatch(userCreated(newUser)))
            .catch(err => console.log(err))

        setUserName('');
        setUserEmail('');
    }

    return(
        <form onSubmit={onSubmit}>
            <div className="name">
                <label>
                    Your Name:
                </label>
                <input 
                    type='text'
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    required/>
            </div>
            <div className="email">
                <label>
                    Your Email:
                </label>
                <input 
                    type='email'
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                    required/>
            </div>
            <button>
                Push
            </button>
        </form>
    )
}

export default UserAddForm;