// friend add component
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_FRIEND } from '../../utils/mutations'
import "./AddFriend.css" 
import Auth from '../../utils/auth';

const AddFriend = () => {
    const [formState, setFormState] = useState({ username: ''});
    const [addFriend, { error, data }] = useMutation(ADD_FRIEND);

    const handleChange = (event) => {
        const { name, value } = event.target;
    
        setFormState({
            ...formState,
            [name]: value,
        });
        };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        console.log(formState);
        try {
            const {data} = await addFriend({
                variables: { ...formState }
            })

            
        Auth.login(data.login.token);
        } catch (e) {
            console.error(e)
        }
    }

    return (
        <div className="card card-height"style={{ width: '15rem' }}>
            
          <img
            className="head-img center"
            src="/assets/images/man-icon.jpg"
            alt="Avatar"
          />
        <form>
            <label >Add a Friend: </label>
            <input
                name="username"
                type="search"
                placeholder="Player Username"
                className="me-2"
                aria-label="Search"
            /><br></br>
            <button className='btn-green' variant="outline-success">Add</button>
        </form>
        </div>
    )
}

export default AddFriend;