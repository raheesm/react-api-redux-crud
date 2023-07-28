import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { updateUser } from "../features/userDetailsSlice";
const Edit = () => {
    const navigate = useNavigate();
    const {eid} = useParams();
    const {users,loading} = useSelector(state=>state.app)

    const [newData,setNewData] = useState('');
    useEffect(()=>{
        if(eid){
            const selectedUser = users.filter(user=>user.id === eid)

            setNewData(selectedUser[0]);
           
        }
},[])
    // const [name,email,gender,age] = selectedUser[];
    
    const getInputData = (e)=>{
        setNewData({...newData,[e.target.name]:e.target.value})
    }
    const dispatch = useDispatch();
    const handleSubmit = (e) =>{
       e.preventDefault()
       dispatch(updateUser(newData));
       console.log(newData);
        navigate('/')
    }

    return ( 
        <main>
            <h2>Edit Page for user {eid}</h2>
            <div className="card w-50 mx-auto mt-5">
            <form className="m-3" onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor='name' className="form-label">Name</label>
                <input type="text" className="form-control" value={newData && newData.name} onChange={getInputData}  name="name"/>
            </div>
            <div className="mb-3">
                <label className="form-label" htmlFor="email">Email address</label>
                <input type="email" name="email" className="form-control" value={newData && newData.email} onChange={getInputData}  id="exampleInputEmail1" />
                
            </div>
            <div className="mb-3">
                <label className="form-label" htmlFor="age">Age</label>
                <input type="number" className="form-control" value={newData && newData.age} onChange={getInputData} name="age" />
            </div>
           
           <div className="d-flex gap-3">
           <div className="mb-3 form-check">
                <input type="radio" className="form-check-input" checked={newData && newData.gender === "male"} onChange={getInputData} value='male' name="gender" />
                <label className="form-check-label" htmlFor='gender'>Male</label>
            </div>
            <div className="mb-3 form-check">
                <input type="radio" className="form-check-input" checked={newData && newData.gender === "female"} onChange={getInputData} value='female' name="gender" />
                <label className="form-check-label" htmlFor='gender'>Female</label>
            </div>
           </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
        </div>
        </main>
     );
}
 
export default Edit;