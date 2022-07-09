// friend add component
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_FRIEND } from '../../utils/mutations'

import Auth from '../../utils/auth';

const AddFriend = () => {
    const [formState, setFormState] = useState({
        username: ''
    });

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
        // console.log(formState);
        try {
            const { data } = await addFriend({
                variables: { ...formState }
            })

            console.log(data)


            Auth.login(data.login.token);
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <>
            <form className="d-flex" onSubmit={handleFormSubmit}>
                <label >Add a Friend: </label>
                <input
                    name="username"
                    type="search"
                    placeholder="Player Username"
                    className="me-2"
                    aria-label="Search"
                    value={formState.username}
                    onChange={handleChange}
                />
                <button variant="outline-success">Add</button>
            </form>

            {error && (
                <div className="my-3 p-3 bg-danger text-white">
                    {error.message}
                </div>
            )}
        </>
    )
}

export default AddFriend;