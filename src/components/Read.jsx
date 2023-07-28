import { useSelector } from "react-redux";
import { getUsers } from "../features/userDetailsSlice";
import { useDispatch } from "react-redux";
import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { deleteUser } from "../features/userDetailsSlice";
const Read = () => {
    const dispatch = useDispatch();
    const {users,loading,searchData} = useSelector(state => state.app)
    const fetchData = ()=>{
        dispatch(getUsers())
    }
    const handleDelete = (id)=>{
        dispatch(deleteUser(id));     
    }
    const [radioData,setRadioData] = useState('')
    
    useEffect(() => {
        fetchData();
    }, []);
    // console.log('type serching word from read component',typeof(searchData));
    
    if(loading){
       return <h2 className="text-center text-warning mt-5">loading</h2>
    }
    return (
        <main>
            <h1>Users List</h1><br />

            <div className="filter">
            <input type="radio" name="gender" id="gender" checked={radioData === ''} onChange={(e)=>setRadioData('')} />
            <label htmlFor="gender" className="form-check-label">All</label>
            <input type="radio" name="gender" id="gender" value="male" 
            checked={radioData === 'male'} onChange={(e)=>setRadioData(e.target.value)} />
            <label htmlFor="gender" className="form-check-label">Male</label>
            <input type="radio" name="gender" id="gender" value="female" 
            checked={radioData === 'female'} onChange={(e)=>setRadioData(e.target.value)} />
            <label htmlFor="gender" className="form-check-label">Female</label>
            </div>


            <div className="d-flex flex-wrap gap-2 list-unstyled flex-fill">
                {
                    users&&
                    users.filter(user => {
                        if (searchData.length === 0) {
                          return true; // Include all users when no search input is provided
                        } else if (user.name && typeof user.name === 'string' && user.name.toLowerCase().includes(searchData.toLowerCase())) {
                          return true; // Filter based on the user's name if it's a string and not null/undefined
                        } else {
                          return false; // Exclude the user if the name is not a string or doesn't match the search input
                        }
                      }).filter(user=>{
                        if(user.gender===radioData){
                            return user.gender === radioData;
                        }else if (radioData === ''){

                            return true
                        }else{
                            return false
                        }
                      })
                                         
                      .map(user => {
                        return (
                            <div key={user.id} className="flex">
                                <div  className="card rounded-3">
                                    <div className="card-head bg-warning text-dark p-2 fw-bold border-bottom rounded-top-2">
                                    {user.name} : {user.id}
                                    </div>
                                    <div className="card-body">
                                        <p>Sex : {user.gender}</p>
                                        <p>Email:{user.email}</p>
                                        <p>Age  :{user.age}</p>
                                    </div>
                                    <div className="card-footer">
                                        <Link to={`/${user.id}`} className="btn btn-primary">View</Link>&nbsp;
                                        <Link to={`/edit/${user.id}`} className="btn btn-success">Edit</Link>&nbsp;
                                        <button onClick={()=>handleDelete(user.id)} className="btn btn-danger">Delete</button>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </main>
    );
}

export default Read;