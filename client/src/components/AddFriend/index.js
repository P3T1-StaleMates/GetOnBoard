// friend add component
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_FRIEND } from '../../utils/mutations'

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
        <form className="d-flex">
            <label >Add a Friend: </label>
            <input
                name="username"
                type="search"
                placeholder="Player Username"
                className="me-2"
                aria-label="Search"
            />
            <button variant="outline-success">Add</button>
        </form>
    )
}

export default AddFriend;