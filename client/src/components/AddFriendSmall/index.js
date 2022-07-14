// friend add component
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_FRIEND } from '../../utils/mutations'

const AddFriendSmall = () => {
    const [formState, setFormState] = useState({
        username: ''
    });

    const [addFriend, { error }] = useMutation(ADD_FRIEND);

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
            await addFriend({
                variables: { ...formState }
            })

        } catch (error) {
            console.error(error)
        }
    }

    return (

        <>
            <form onSubmit={handleFormSubmit}>
                <label>Add a Friend: </label>
                <input
                    name="username"
                    type="search"
                    placeholder="Player Username"
                    className="me-2"
                    aria-label="Search"
                    value={formState.username}
                    onChange={handleChange}
                    /><br></br>
                <button className='btn-green' variant="outline-success" >Add</button>
            </form>
            {error && (
                <output className=" px-3 bg-danger text-white error-message">
                    {error.message}
                </output>
            )}

        </>

)}

export default AddFriendSmall;