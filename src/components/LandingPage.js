

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from "./LandingPageStyles.module.css";
import BookingCenter from './BookingCentre';
import HomePage from './HomePage';


const LandingPage = () => {
    const [states, setStates] = useState([]);
    const [selectedState, setSelectedState] = useState("");
    const [cities, setCities] = useState([]);
    const [selectedCity, setSelectedCity] = useState('');
    const [medicalCenters, setMedicalCenters] = useState([]);
    const [showBookingCentre, setShowBookingCentre] = useState(false)
    const navigate = useNavigate();

    useEffect(() => {
        fetchStates();
    }, []);

    useEffect(() => {
        fetchCities();
    }, [selectedState]);

    const fetchStates = async () => {
        try {
            const response = await axios.get("https://meddata-backend.onrender.com/states");
            console.log(response.data)
            setStates(response.data);
        } catch (error) {
            console.log("Error fetching states", error);
        }
    };


    const fetchCities = async () => {
        if (selectedState) {
            try {

                const response = await axios.get(`https://meddata-backend.onrender.com/cities/${selectedState}`);
                setCities(response.data);
            } catch (error) {
                console.error("Error fetching cities", error);
            }
        } else {
            setCities([]);
        }

    };
    const handleSearch = async () => {
        if (!selectedState || !selectedCity) {
            return;
        }
        try {
            const response = await axios.get(`https://meddata-backend.onrender.com/data?state=${selectedState}&city=${selectedCity}`)
            console.log(response)
            setMedicalCenters(response.data);
        } catch (error) {
            console.log("Error fetching medical centers", error)
        }

    }

    const handleBooking = () => {
        setShowBookingCentre(true)
    }

    return (
        <>
            <div className={styles.navAll}>
                <nav>
                    <ul>
                        <li onClick={() => navigate('/find-doctors')}>Find Doctors</li>
                        <li onClick={() => navigate('/hospitals')}>Hospitals</li>
                        <li onClick={() => navigate('/medicines')}>Medicines</li>
                    </ul>
                </nav>
            </div>
            <HomePage medicalCentre={medicalCenters}/>
            <div className={styles.select}>
                <select id="state-select" value={selectedState} onChange={(e) => setSelectedState(e.target.value)}>
                    <option value="">Select State</option>
                    {states.map(state => (
                        <option key={state} value={state}>{state}</option>
                    ))}
                </select>

                <select id="city-select" value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)}>
                    <option value="">Select City</option>
                    {cities.map(city => (
                        <option key={city} value={city}>{city}</option>
                    ))}
                </select>
                <button onClick={() => { handleSearch() }}>Search</button>
            </div>
            <div>
                {medicalCenters.length > 0 && (
                    <div style={{  border: "5px solid grey", color: "black", padding: "10px", backgroundColor: "lightblue" }}>
                        {medicalCenters.map((center) => (
                            <div key={center["Provider ID"]} style={{ marginBottom: "10px" }}>
                                <img src="/Assets/hospital.svg" alt="hospital" />
                                <h2>{center["Hospital Name"]}</h2>
                                <h3>{center.City}, {center.State}</h3>
                                <p>{center.Address}</p>




                                <p style={{ color: center["Hospital overall rating"] >= 4 ? "green" : "red" }} >
                                    Rating:{center["Hospital overall rating"]}
                                    {center["Hospital overall rating"] >= 4 && (
                                        <img src="Assets/vector.png" alt="Rating Info" />
                                    )}
                                </p>


                                <button onClick={handleBooking}>Book Free Center Visit</button>
                            </div>
                        ))}

                    </div>

                )}
                {showBookingCentre && (
                    <BookingCenter medicalCentre={medicalCenters} />
                )}

            </div>

        </>
    );
};

export default LandingPage;
