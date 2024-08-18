import Styles from "./HomePage.Styles.module.css";
import React,{useState} from "react";


const HomePage=()=>{
   

     
    

    
    return(
        <>
        <div className={Styles.image}>
        <img src="Assets/Group 7.png"/>
        <h3>Skip the travel! Find Online</h3>
        <h2>Medical Centers</h2>
        <p style={{color:"grey"}}>connect instantly with a 24*7 specialist or choose to video visit a particular doctor</p>
        </div>
        <div className={Styles.doctor}>
            <img src="Assets/doctors.jpg"/>
        </div>
       </>
    )
}
export default HomePage;