import { createSlice } from "@reduxjs/toolkit";
//check krne k liye kya user authenicate h ya nhi
const initialState={
    status:false,
    //mtlb abhi authenicated nhi h
    userData:null,
}
const authSlice=createSlice({
name:"authSlice",
initialState,
reducers:{
login:(state,action)=>{
state.status=true;// mtlb login ho gya h
state.userData=action.payload;
},
logout:(state)=>{
state.status=false;
state.userData=null;
}
}
})
export const {login,logout}=authSlice.actions;
export default authSlice.reducer