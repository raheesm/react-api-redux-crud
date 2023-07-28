import { useState } from "react";
import { useDispatch } from "react-redux";
import { createUser } from "../features/userDetailsSlice";
import { useNavigate } from "react-router-dom";

const Create = () => {
    
    const navigate = useNavigate();

    const [users,setUsers] = useState({});

    const getInputData = (e)=>{

        setUsers({ ...users, [e.target.name]: e.target.value }); // Use the spread operator to update the state correctly
    }

    const dispatch = useDispatch()

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createUser(users))
        navigate('/')
    }


    return (
        <div className="card w-50 mx-auto mt-5">
            <form className="m-3" onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor='name' className="form-label">Name</label>
                <input type="text" className="form-control" name="name"onChange={getInputData}/>
            </div>
            <div className="mb-3">
                <label className="form-label" htmlFor="email">Email address</label>
                <input type="email" name="email" className="form-control" id="exampleInputEmail1" onChange={getInputData}/>
                
            </div>
            <div className="mb-3">
                <label className="form-label" htmlFor="age">Age</label>
                <input type="number" className="form-control" name="age" onChange={getInputData}/>
            </div>
           
           <div className="d-flex gap-3">
           <div className="mb-3 form-check">
                <input type="radio" className="form-check-input" value='male' name="gender" onChange={getInputData}/>
                <label className="form-check-label" htmlFor='gender'>Male</label>
            </div>
            <div className="mb-3 form-check">
                <input type="radio" className="form-check-input" value='female' name="gender" onChange={getInputData}/>
                <label className="form-check-label" htmlFor='gender'>Female</label>
            </div>
           </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
        </div>
    );
}

export default Create;