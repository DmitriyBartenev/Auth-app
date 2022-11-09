
import './userItem.scss';

const UserItem = ({name, email, onDelete}) => {



    return(
        <div className="card">
            <h2>
                {name}
            </h2>
            <div>
                <p>
                    {email}
                </p>
            </div>
            <span 
                className='close'
                onClick={onDelete}
                >
                ❌
            </span>
        </div>
    )
}

export default UserItem;