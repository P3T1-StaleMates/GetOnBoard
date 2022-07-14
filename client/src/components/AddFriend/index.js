// friend add component
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_FRIEND } from '../../utils/mutations'
import "./AddFriend.css"

const AddFriend = () => {
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

        <div className="card card-height d-flex justify-content-center" style={{ width: '15rem' }}>

            <img
                className="head-img center"
                src="/assets/images/chess/chess-blue.png"
                alt="Avatar"
            />
            {error && (
                <output className=" px-3 bg-danger text-white error-message">
                    {error.message}
                </output>
            )}
            {/* {!error && (
                <output className=" px-3 bg-success text-white error-message">
                    {formState.username} has been added to your friends list!
                </output>
            )} */}
            <form onSubmit={handleFormSubmit} className="pt-2">
                {/* <label> Add a Friend: </label> */}
                <input
                    name="username"
                    type="search"
                    placeholder="Player Username"
                    className="me-2 ms-2"
                    aria-label="Search"
                    value={formState.username}
                    onChange={handleChange}
                /><br></br>
                <button className='btn-green' variant="outline-success">Add</button>
            </form>

        </div>

    )
}

export default AddFriend;