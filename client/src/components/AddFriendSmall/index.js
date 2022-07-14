// friend add component
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_FRIEND } from '../../utils/mutations'

const AddFriendSmall = () => {
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

        try {
            const { data } = await addFriend({
                variables: { ...formState }
            })

        } catch (error) {
            console.error(error)
        }
    }

    return (

        <>
            <form onSubmit={handleFormSubmit}>
                <label >Add a Friend: </label>
                <input
                    name="username"
                    type="search"
                    placeholder="Player Username"
                    className="me-2"
                    aria-label="Search"
                    value={formState.username}
                    onChange={handleChange}
                /><br></br>
                <button className='btn-green' variant="outline-success">Add</button>
            </form>

            {error && (
                <div className="my-3 p-3 bg-danger text-white">
                    Unable to locate a user by this username.
                </div>
            )}
        </>

    )}

export default AddFriendSmall;