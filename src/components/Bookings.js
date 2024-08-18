import React from "react";
import {Box,Typography} from '@mui/material';

const Bookings=({bookings})=>{
    return(
       <>
        <div style={{margin:"40px",backgroundColor:"lightgray",padding:"20px"}} >
        <h1>My Bookings</h1>
        {bookings.map((booking,index)=>(
            <Box>
           <h1>{booking.center.name}</h1>
            <span>{booking.time}</span>
            <span>{booking.date}</span>
            <p>{booking.center.state} {booking.center.city}</p>
            <p>{booking.center.Address}</p>
            </Box>
            
    ))}
    </div>
    </>
    )
}
export default Bookings;