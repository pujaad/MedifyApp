import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { Box, Button, IconButton } from '@mui/material';

import 'swiper/css';
import 'swiper/css/navigation';

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Bookings from './Bookings';


const BookingCenter = ({ medicalCentre }) => {
 
  const [selectedDay, setSelectedDay] = useState(0);
  const [selectedTime,setSelectedTime] =useState(null)
  const days = ["Today", "Tomorrow", 'Fri, 5 May', 'Sat,6 May', 'Sun,7 May']
  const slots = [{
    period: "Morning",
    time: ["11:30 AM"]
  },
  {
    period: "Afternoon",
    time: ['12:00 PM', '12:30 PM', '01:00 PM', '02:00 PM', '02:30 PM']
  },
  {
    period: 'Evening',
    time: ['06:00 PM', '06:30 PM', '07:00 PM', '07:30 PM']
  }
  ]
  const [selectedCentre,setSelectedCentre] = useState(null)
 const [bookings,setBookings]=useState([]);
 const [showCalendar,setShowCalendar]= useState(true)
  const handleTimeSelection=(time)=>{
      setSelectedTime(time)
  }
const handleCenterSelection =(center)=>{
  setSelectedCentre(center);
  if (selectedTime && selectedCentre) {
    const newBookings={
      date: days[selectedDay],
      time:selectedTime,
      center:{
       name: center["Hospital Name"],
       address: center.Address,
       city:center.City,
       state:center.State
      }
    }
    setBookings(prev => ([...prev,newBookings]))
   setShowCalendar(false)
  }
}
  return (

 
    <Box>
      {showCalendar ? (
        <Box>
      <Box sx={{display:'flex',margin:"10px",alignItems: 'center', justifyContent: 'space-around', width: '100%' }}>
        <IconButton className="swiper-button-prev" sx={{ margin: '0 30px' }}>
          <ArrowBackIosIcon/>
        </IconButton>
        <Swiper
          modules={[Navigation]}
          spaceBetween={10}
          slidesPerView={3}
          onSlideChange={(swiper) => setSelectedDay(swiper.activeIndex)}
          navigation={{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          }}
        >
          {days.map((day, index) => (
            <SwiperSlide key={index}>
              <Box sx={{textAlign: 'center', padding: '10px', cursor: 'pointer', backgroundColor: selectedDay == index ? "lightblue" : "white", borderRadius: "2px", border: selectedDay == index ? '2px solid blue' : '1px solid grey', marginTop: "8px" }}>

                <span>{day}</span>
              </Box>
            </SwiperSlide>
          ))}
        </Swiper>
        <IconButton className="swiper-button-next" sx={{ margin: '0 30px' }}>
          <ArrowForwardIosIcon />
        </IconButton>
      </Box>

      {slots.map((slot, index) => (
        <Box key={index} sx={{ marginTop: 2 }}>
          <Box sx={{ fontWeight: 'bold', marginBottom: 1 }}>{slot.period}</Box>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            {slot.time.map((time, tym) => (
              <Button

                key={tym}
                variant="outlined"
                color="primary"
                sx={{ minWidth: '100px', padding: "10px", margin: "10px" }}
                onClick={()=>handleTimeSelection(time)}
              >
                {time}
              </Button>
            ))}
          </Box>
        </Box>
      ))}
      <Box sx={{padding: "10px", margin: "10px", border: "2px solid blue", backgroundColor: "lightblue" }}>
        {medicalCentre.map((center) => (
          <div key={center["Provider ID"]} style={{ marginBottom: "10px"}}>
            <img src="/Assets/hospital.svg" alt="hospital" />
            <h2>{center["Hospital Name"]}</h2>
            <h3>{center.City}, {center.State}</h3>
            <p>{center.Address}</p>

            <p style={{ color: center["Hospital overall rating"] >= 4 ? "green" : "red" }} >
              Rating:{center["Hospital overall rating"]}
            </p>

            <button onClick={()=>handleCenterSelection(center)}>Book Free Center Visit</button>
          </div>
        ))}

      </Box>
      </Box>
 ):(
      bookings.length>0 && 
        <Bookings bookings={bookings}/>
      )}
    
    </Box>
 
  );
};



export default BookingCenter;