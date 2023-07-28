import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Create Action
export const createUser = createAsyncThunk('createUser', async(data,{rejectWithValue})=>{
    const response = await fetch('https://64a550d600c3559aa9bf76aa.mockapi.io/users',{
        method:"post",
        headers:{
            "Content-Type":"application/json"
        },  
        body:JSON.stringify(data)

    });
    try{

        const result = response.json();
        return result;
    }catch(error){
        return rejectWithValue(error)
    }
})

// Read Action
export const getUsers = createAsyncThunk('getUsers', async(args,{rejectWithValue})=>{
    const response = await fetch('https://64a550d600c3559aa9bf76aa.mockapi.io/users')

    try{
        const result = await response.json();
        return result;
    }catch(error){
        return rejectWithValue(error)
    }
})

// delete action

export const deleteUser = createAsyncThunk('deleteUser', async(id,{rejectWithValue})=>{
    try {
        await fetch(`https://64a550d600c3559aa9bf76aa.mockapi.io/users/${id}`,{
            method:'DELETE'
        });

        // Return the deleted user ID
        return id;
    } catch(error) {
        return rejectWithValue(error);
    }
});

// Update action
export const updateUser = createAsyncThunk('updateUser', async(data,{rejectWithValue})=>{
    try{
        const response = await fetch(`https://64a550d600c3559aa9bf76aa.mockapi.io/users/${data.id}`,{
            method:'PUT',
            headers:{
                'Content-type':'application/json'
            },
            body:JSON.stringify(data)
        });
        const result = await response.json();
        return result;
    }catch(error){
        return rejectWithValue(error)
    }
})


const userDetailSlice = createSlice({
    name:'usersDetails',
    initialState:{
        users:[],
        loading:false,
        error:null,
        searchData:[]
    },
    reducers:{
        searchUser:(state,action)=>{
            state.searchData=action.payload
        }
    },
    extraReducers:{
        [createUser.pending] : (state,action)=>{
            state.loading = true
        },
        [createUser.fulfilled] : (state,action)=>{
            state.loading = false;
            state.users.push(action.payload)
        },
        [createUser.rejected] : (state,action)=>{
            state.loading = false,
            state.error = action.payload
        },
        [getUsers.pending] : (state,action)=>{
            state.loading = true
        },
        [getUsers.fulfilled] : (state,action)=>{
            state.loading = false;
            state.users=action.payload
        },
        [getUsers.rejected] : (state,action)=>{
            state.loading = false,
            state.error = action.payload
        },
        [deleteUser.pending] : (state)=>{
            state.loading = true
        },
        [deleteUser.fulfilled] : (state,action)=>{
            state.loading = false;
            const id = action.payload;
            const selUser = state.users.map(user=>user.id===id)
            if(selUser){

                state.users = state.users.filter(user=>user.id!==id)
            }
        },
        [deleteUser.rejected] : (state,action)=>{
            state.loading = false,
            state.error = action.payload
        },
        [updateUser.pending]:(state)=>{
            state.loading=true;
        },
        [updateUser.fulfilled]: (state, action) => {
            state.loading = false;
            // const { id, name, email, age, gender } = action.payload;
          
            // const selectedUser = state.users.find(user => user.id === id);
        
            // if (selectedUser) {
                
            //     selectedUser.name = name;
            //     selectedUser.email = email;
            //     selectedUser.age = age;
            //     selectedUser.gender = gender;

            //     state.users = [...state.users,{selectedUser}]
            // }
        
            // Return the state.users array as it is already updated
            // You don't need to modify state.users here
            state.users = state.users.map(user=>user.id===action.payload.id?action.payload:user)
        },
         [updateUser.rejected]:(state,action)=>{
            state.loading=false;
            state.error=action.payload
        }
    }

})
export default userDetailSlice.reducer;

export const {searchUser} =  userDetailSlice.actions;