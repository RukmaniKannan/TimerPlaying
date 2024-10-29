import React, { useEffect, useState } from 'react'
import "./timerplaying.css"
import { BsCalendar2Minus } from "react-icons/bs";
import { FaRegUser } from 'react-icons/fa';
import { MdOutlineCalendarMonth, MdOutlinePlayCircle } from 'react-icons/md';
import { GoClock } from 'react-icons/go';
import { CgPlayPauseO } from 'react-icons/cg';
// import { GiCircle } from 'react-icons/gi';
import imglog from "../Assets/Screenshot 2024-10-29 151227.png"


const TimerPlaying = () => {
    const [isPlaying, setIsPlaying] = useState(false);
  const [colorChange, setColorChange] = useState(false)
  const [timer, setTimer] = useState(60); // Timer in seconds
  const [intervalId, setIntervalId] = useState(null);
  const [currentTime, setCurrentTime] = useState("");

  const togglePlayPause = () => {
    if (isPlaying) {
      clearInterval(intervalId);
      setIntervalId(null);
      setIsPlaying(false)
    } else {
      const newIntervalId = setInterval(() => {
        setTimer(prev => (prev > 0 ? prev - 1 : 0)); // Countdown timer
      }, 1000);
      setIntervalId(newIntervalId);
      setIsPlaying(true)
      setColorChange(true)
    }
    // setIsPlaying(!isPlaying);
  };

  const startTimer = () => {
    if (!isPlaying) {
      // setTimer(60); // Reset timer
      togglePlayPause(); // Start timer
      updateCurrentTime(); // Set the current time in the input field
     }
  };

  const stopTimer = () => {
    // clearInterval(intervalId);
    setIntervalId(null);
    setIsPlaying(false);
    // setTimer(60); // Reset timer
  };
  const updateCurrentTime = () => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedTime = `${((hours + 11) % 12 + 1).toString().padStart(2, '0')}:${minutes}:${seconds} ${ampm}`;
    setCurrentTime(formattedTime);
  };

  const progressPercentage = (timer / 60) * 100;

  // Calculate the stroke-dashoffset for the progress effect
  const circumference = 200 * Math.PI; // Assuming radius = 100 for SVG circle
  const offset = circumference - (progressPercentage / 100) * circumference;


  // Format time to display as mm:ss
  const formatTime = () => {
    const minutes = Math.floor(timer / 60).toString().padStart(2, '0');
    const seconds = (timer % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  useEffect(() => {
    return () => clearInterval(intervalId); // Cleanup on unmount
  }, [intervalId]);
  const color = colorChange ? 'blue' : 'lightgrey'
  return (
    <>
     <div className='timer-container  mt-5 '>

<div className='row firma mt-5 p-5'>
  <div className='col'>
    <span >Firma</span>
    <img src={imglog} className='images mx-2' />

  </div>
  <div className='col'>
    {/* <i class="fas fa-calendar-alt"></i> */}
    <BsCalendar2Minus color='black' size={20} className='mx-3' />
    <span>Geratenummer</span>
    <span><select
      name="number"
      className="form-control-sm  mx-1 px-3 py-2"
      id="number"
      style={{ borderRadius: "10px" }}

    >
      <option value="4563235">4563235</option>
      <option value="124567">124567</option>
      <option value="1245645">947625</option>
      <option value="789456">75283412</option>
     </select></span>

  </div>
  <div className='col'>
    <FaRegUser size={20} />
    <span className='mx-1'>Bediener</span>
    <span><select
      name="names"
      className="form-control-sm py-2"
      style={{ borderRadius: "10px" }}
      id="names"
    >
      <option value="Select">Select</option>
      <option value="Paramanathan Thamiliny">Paramanathan Thamiliny</option>
      <option value="valavan Thikalya">valavan Thikalya</option>
      <option value="Kanthan Kavin">Kanthan Kavin</option>
      <option value="Varathan Thevi">Varathan Thevi</option>
      <option value="Karthika">Karthika </option>
      <option value="Kiruba">Kiruba</option>
     
    </select></span>
  </div>
  <div className='col '>
    {/* <button className='btn btn-success mx-5 px-4 'onClick={startTimer}>START</button> */}
    <button className='btn mx-5 px-4'
      style={{
        backgroundColor: isPlaying ? 'lightgray' : 'green',
        color: isPlaying ? 'black' : "white"
      }}
      onClick={isPlaying ? stopTimer : startTimer}
    >
      {isPlaying ? 'START' : 'START'}
    </button>
  </div>

  <div className='row datum'>
    <div className='col'>
      <MdOutlineCalendarMonth size={24} />
      <span className='mx-2'>Datum</span>
      <span><input type="date" className='form-control-sm  py-2'
        style={{ borderRadius: "10px" }} /></span>
    </div>

    <div className='col'
      style={{
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      // onClick={togglePlayPause} 
      onClick={isPlaying ? stopTimer : startTimer} // Toggle start/stop on click
    >
      {/* <GiCircle size={200} color={circleColor} className=''/> */}
      <svg width="200" height="200">
        <circle
          cx="100"
          cy="100"
          r="95" // Radius for the circle
          stroke="lightgray"
          strokeWidth="10"
          fill="none"
        />
        <circle
          cx="100"
          cy="100"
          r="95" // Radius for the circle
          stroke="green"
          strokeWidth="10"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 1s linear' }}
        />
      </svg>
      <span className='' style={{
        position: "absolute", top: "40%", left: "50%", transform: "translate(-50%, -50%)",
        display: 'flex', flexDirection: 'column', alignItems: 'center', fontSize: "45px", color: "green"
      }}>{formatTime()}</span>

      {/* <span className='' style={{backgroundColor:"blue",}}> */}
      <div style={{
        width: "50px", backgroundColor: "white", position: "absolute", top: '65%',
        left: '50%', height: "50px", borderRadius: "30px", display: "flex", alignItems: "center", justifyContent: "center",
        transform: 'translate(-50%, -50%)',
      }}>
        {isPlaying ? (
          <CgPlayPauseO
            size={35}
            color='red'
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
             }}
          />
        ) : (
          <MdOutlinePlayCircle
            size={35}
            style={{
              color: color,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          />
        )}
      </div>

    </div>
    <div className='col pt-5'>
      <GoClock size={25} />
      <span className='mx-3'>Angangzeit</span><br /><br />
      <GoClock size={25} />
      <span className='mx-3'> Endzeit</span>
    </div>

    <div className='col'>
      <input type="text" className='form-control-lg '
        placeholder='--:--'
        value={currentTime}
        style={{ width: "170px" }}
      /><br /><br />
      <input type="time" className='form-control-lg px-5' /><br />
      <div className='mt-3 '>
        {isPlaying ?
          <button className='btn btn-danger px-4 mx-5' onClick={stopTimer}>STOP</button>
          : ""}
      </div>
    </div>
  </div>
</div>



</div>
    </>
  )
}

export default TimerPlaying