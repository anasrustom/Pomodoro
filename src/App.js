import React, { useState, useEffect, useRef } from 'react';
import './index.css';
import Settings from './Settings';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGear } from '@fortawesome/free-solid-svg-icons'
import $ from 'jquery';
import { possible } from './SelectColor';
import TaskList from './TaskList';
export const colors = [['Red', '#b24a49', '#ba5c5c', '#c06a6a', '#c77a7a', '#a34443', '#b05553','#b97776','#ba9797','#c0aaaa'],
['DarkBlue', '#437098', '#4d7aa2', '#5784ac', '#618eb6', '#396680', '#437290', '#4f7ca0', '#8298ab', '#6390b4'],
['LightBlue', '#46858a', '#508f94', '#5a999e', '#64a3a8', '#3e7b80', '#468590', '#50909a', '#5a9aa4', '#64a4ae'],
['Purple', '#7a54a3', '#8865ac', '#9273b4', '#9872d1', '#6e4a93', '#7853a7', '#b495d5', '#c6b7d6', '#b8acc6'],
['Green', '#598a56', '#65945f', '#709e68', '#7ba872', '#4f7a4c', '#598c5a', '#659663', '#709f6c', '#7ba975'],
['Pink', '#a84f92', '#b2599b', '#bc63a4', '#c66dae', '#964589', '#8c4180', '#ae699f', '#bb88ae', '#c895ba'],
['Grey', '#555764', '#666874', '#6d6e76', '#797a7f', '#4b4c5b', '#464753', '#61616e', '#77777b', '#89898a'],
['Brown1', '#764620', '#825130', '#8e5c40', '#9a6750', '#6c3e16', '#653d22', '#825943', '#917163', '#978079'],
['Brown2', '#6a3a14', '#75482b', '#804e34', '#8b5844', '#603016', '#562c15', '#75482b', '#8f7265', '#9f8a83']
];

export function getAudioPath(filename) {
  return process.env.PUBLIC_URL + '/audios/' + filename;
}

function App() {
  const audioRef = useRef(null);
  const [seconds, setSeconds] = useState(1500);
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState('pomodoro');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isChecked, setIsChecked] = useState(false); // for the white noise
  const [inputValue, setInputValue] = useState(''); // for the name input

  // Saved States to storage
  const defaultColors = [colors[0], colors[2], colors[1]];
  const defaultTimes = [1500, 300, 900];

  let localPColor = JSON.parse(localStorage.getItem('PColor')) || defaultColors[0];
  let localSBColor = JSON.parse(localStorage.getItem('SBColor')) || defaultColors[1];
  let localLBColor = JSON.parse(localStorage.getItem('LBColor')) || defaultColors[2];

  let localPomodoroSeconds = JSON.parse(localStorage.getItem('POMODORO_SECONDS')) || defaultTimes[0];
  let localShortBreakSeconds = JSON.parse(localStorage.getItem('SHORT_BREAK_SECONDS')) || defaultTimes[1];
  let localLongBreakSeconds = JSON.parse(localStorage.getItem('LONG_BREAK_SECONDS')) || defaultTimes[2];
  
  let localRangeValueAL = JSON.parse(localStorage.getItem('rangeValueAL')) || 50;
  let localRangeValue = JSON.parse(localStorage.getItem('rangeValue')) || 25;

  let localName = JSON.parse(localStorage.getItem('name')) || '';

  const [PColor, setPColor] = useState(localPColor);
  const [SBColor, setSBColor] = useState(localSBColor);
  const [LBColor, setLBColor] = useState(localLBColor);

  const [pomodoroSeconds, setPomodoroSeconds] = useState(localPomodoroSeconds);
  const [shortBreakSeconds, setShortBreakSeconds] = useState(localShortBreakSeconds);
  const [longBreakSeconds, setLongBreakSeconds] = useState(localLongBreakSeconds);

  const [rangeValueAL, setRangeValueAL] = useState(localRangeValueAL);
  const [rangeValue, setRangeValue] = useState(localRangeValue);

  const [name, setName] = useState(localName);

  useEffect(() => {localStorage.setItem('PColor', JSON.stringify(PColor));}, [PColor]);
  useEffect(() => {localStorage.setItem('SBColor', JSON.stringify(SBColor));}, [SBColor]);
  useEffect(() => {localStorage.setItem('LBColor', JSON.stringify(LBColor));}, [LBColor]);
  useEffect(() => {localStorage.setItem('POMODORO_SECONDS', JSON.stringify(pomodoroSeconds));}, [pomodoroSeconds]);
  useEffect(() => {localStorage.setItem('SHORT_BREAK_SECONDS', JSON.stringify(shortBreakSeconds));}, [shortBreakSeconds]);
  useEffect(() => {localStorage.setItem('LONG_BREAK_SECONDS', JSON.stringify(longBreakSeconds));}, [longBreakSeconds]);
  useEffect(() => {localStorage.setItem('rangeValueAL', JSON.stringify(rangeValueAL));}, [rangeValueAL]);
  useEffect(() => {localStorage.setItem('rangeValue', JSON.stringify(rangeValue));}, [rangeValue]);
  useEffect(() => {localStorage.setItem('name', JSON.stringify(name));}, [name]);


  const minutes = Math.floor(seconds / 60);
  const displaySeconds = seconds % 60;
  const displayedTime = `${minutes < 10 ? '0' : ''}${minutes}:${displaySeconds < 10 ? '0' : ''}${displaySeconds}`;

  useEffect(() => {
    if (seconds > 0 && isRunning) {
      const timerId = setTimeout(() => setSeconds(seconds - 1), 1000);
      return () => clearTimeout(timerId);
    }
  }, [seconds, isRunning]);


  // useEffect for the timer going down
  useEffect(() => {
    if (seconds > 0 && isRunning) {
      const endTime = Date.now() + seconds * 1000;
      const timerId = setInterval(() => {
        const remainingTime = Math.round((endTime - Date.now()) / 1000);
        if (remainingTime <= 0) {
          clearInterval(timerId);
          setSeconds(0);
        } else {
          setSeconds(remainingTime);
        }
      }, 1000);
      return () => clearInterval(timerId);
    }
  }, [seconds, isRunning]);
  
  // useEffect to update the seconds on the screen + the title
  useEffect(() => {
    const minutes = Math.floor(seconds / 60);
    const displaySeconds = seconds % 60;
    const displayedTime = `${minutes.toString().padStart(2, '0')}:${displaySeconds.toString().padStart(2, '0')}`;
  
    const isPomodoroMode = mode === 'pomodoro';
    const isBreakMode = mode === 'short-break' || mode === 'long-break';
    const isNameInPossible = possible.includes(name);
  
    const titlePrefix = isPomodoroMode ? 'Focus' : 'Rest';
    const titleSuffix = isNameInPossible ?  `${name}` : `${name}!`;
  
    if (isPomodoroMode || isBreakMode) {
      document.title = `${displayedTime} - ${titlePrefix} ${titleSuffix}`;
    }
  }, [mode, seconds, name]);

  // useEffects to play the alarm once done
  useEffect(() => {
    if (seconds === 0) {
      let WNAudio = localStorage.getItem(`selectedOption_1`);
      if (WNAudio === null) {
        WNAudio = "Alarm Sound 1"; 
      } else {
        WNAudio = WNAudio.replace(/"/g, '');
      }
  
      const audioPath = getAudioPath(`${WNAudio}.mp3`);
      const audio = new Audio(audioPath);
      audio.volume = rangeValueAL / 100;
  
      let playPromise = audio.play();
  
      if (playPromise !== undefined) {
        playPromise.then(_ => {
        }).catch(error => {
        });
      }
  
      if (mode === 'pomodoro') {
        handleMode('short');
        setIsRunning(false);
      }
      else if (mode === 'short-break'){
        handleMode('pomodoro');
        setIsRunning(false);
      }
    }
  }, [seconds, rangeValueAL, mode, handleMode]);

  // useEffects to play the white noise
  useEffect(() => {
    let WNAudio = localStorage.getItem(`selectedOption_2`);
    if (WNAudio === null) {
      WNAudio = "White Noise 1"; 
    } else {
      WNAudio = WNAudio.replace(/"/g, '');
    }
  
    if (audioRef.current) {
      audioRef.current.pause();
    }
  
    const audioPath = getAudioPath(`${WNAudio}.mp3`);
    audioRef.current = new Audio(audioPath);
    audioRef.current.volume = rangeValue / 100;
    audioRef.current.loop = true;
  
    if (isChecked && isRunning) {
      let playPromise = audioRef.current.play();
  
      if (playPromise !== undefined) {
        playPromise.then(_ => {
        }).catch(error => {
        });
      }
    }
  }, [isChecked, isRunning, rangeValue]);


  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = rangeValue / 100;
    }
  }, [rangeValue]);


  // functions to handle name input / optional section
  
  function handleInputChange(event) {setInputValue(event.target.value);}
  function handleSubmit() {
    if (!inputValue) {setName('');return;}
    setName(inputValue);}
  function handleCheckboxChange(event) {if (isRunning) setIsChecked(event.target.checked);}

  // function to toggle the timer + clicking sound + favicon change
  function toggleTimer() {
    const audioClickPath = getAudioPath(isRunning ? 'click-3.mp3' : 'click-2.mp3');
    const audioClick = new Audio(audioClickPath);
    const iconHref = isRunning ? 'fire-pause.png' : 'fire.png';
    setIsRunning(!isRunning);
    $('.time-button').toggleClass('time-button-active');
    if (mode === 'pomodoro') {
      document.querySelector('link[rel="icon"]').href = iconHref;
    }
    audioClick.play();
  }
  // switches between the modes + favicon change + timer
  function handleMode(mode) {
    const modes = $('.mode');
    modes.removeClass('time-header-active');
    modes.addClass('time-header-text');
    
    $('.time-button').removeClass('time-button-active');
    let selectedMode;
    let icon;
    let seconds;
  
    switch (mode) {
      case 'pomodoro':
        selectedMode = 'pomodoro';
        seconds = pomodoroSeconds;
        icon = 'fire.png';
        break;
      case 'short':
        selectedMode = 'short-break';
        seconds = shortBreakSeconds;
        icon = 'ice.png';
        break;
      case 'long':
        selectedMode = 'long-break';
        seconds = longBreakSeconds;
        icon = 'ice.png';
        break;
      default:
        return;
    }
  
    setMode(selectedMode);
    setSeconds(seconds);
    document.querySelector('link[rel="icon"]').href = icon;
    $(`.${selectedMode}`).addClass('time-header-active');
    $(`.${selectedMode}`).removeClass('time-header-text');
    setIsRunning(false);
  }

  function changeColors(colorArray, mode) {
    $("html").css("--primary-color", colorArray[1]);
    $("html").css("--secondary-color", colorArray[2]);
    $("html").css("--tertiary-color", colorArray[3]);
    $("html").css("--quaternary-color", colorArray[4]);
    $("html").css("--darker-color", colorArray[5]);
    $("html").css("--darker-color-hover", colorArray[6]);
    $("html").css("--add-task-border", colorArray[7]);
    $("html").css("--add-task-text", colorArray[8]);
    $("html").css("--add-task-text-hover", colorArray[9]);
  
    switch(mode) {
      case 'Pomodoro':
        setPColor(colorArray);
        break;
      case 'Short Break':
        setSBColor(colorArray);
        break;
      case 'Long Break':
        setLBColor(colorArray);
        break;
      default:
        break;
    }
    localStorage.setItem(`colorPreference-${mode}`, JSON.stringify(colorArray));
    return colorArray;
  }
  
  useEffect(() => {
    if (mode === 'pomodoro') {
      setSeconds(pomodoroSeconds);
      changeColors(PColor, mode);
         } 
      else if (mode === 'short-break') {
      setSeconds(shortBreakSeconds);
      changeColors(SBColor, mode);
    } else if (mode === 'long-break') {
      setSeconds(longBreakSeconds);
      changeColors(LBColor, mode);
    }
  }, [mode, pomodoroSeconds, shortBreakSeconds, longBreakSeconds, PColor, SBColor, LBColor]);

  function openSettings() {setIsSettingsOpen(true)}


  
  return (
    <div className="App">
    <div className="main-wrapper">
    {isSettingsOpen && (
        <Settings setIsChecked={setIsChecked} rangeValueAL={rangeValueAL} setRangeValueAL={setRangeValueAL} rangeValue={rangeValue} setRangeValue={setRangeValue} PColor={PColor} SBColor={SBColor} LBColor={LBColor} setPColor={setPColor} setSBColor={setSBColor} setLBColor={setLBColor} pomodoroSeconds={pomodoroSeconds} shortBreakSeconds={shortBreakSeconds} longBreakSeconds={longBreakSeconds} setPomodoroSeconds={setPomodoroSeconds} setShortBreakSeconds={setShortBreakSeconds} setLongBreakSeconds={setLongBreakSeconds} setIsSettingsOpen={setIsSettingsOpen} />
      )}
      <div className="main_container">

        <div className="header">
          <div className="header-text">Pomodoro AR</div>
          <div className="header-text settings" onClick={openSettings}><FontAwesomeIcon className="faGear" icon={faGear} /> Settings</div></div>

        <div className="time">
          <div className="time-header">
            <div className='mode time-header-active pomodoro' onClick={()=> handleMode('pomodoro')}>Pomodoro</div>
            <div className='mode time-header-text short-break' onClick={()=> handleMode('short')}>Short Break</div>
            <div className='mode time-header-text long-break' onClick={()=> handleMode('long')}>Long Break</div>
          </div>
          <div className="time-display">
            <div className="time-display-text">{displayedTime}</div>
            </div>
          <div className="time-button" onClick={toggleTimer}>{isRunning ? 'PAUSE' : 'START'}</div>
        </div>

        <div className='optional-container'>
        <div className='name-container'>
        <p>Enter your name:</p>
        <div className='submit-container'>
          <input maxLength={15} type='text' placeholder='OPTIONAL' className='input-name' value={inputValue} onChange={handleInputChange} />
          <div className='submit-button' onClick={handleSubmit}>SUBMIT</div>
        </div>
      </div>
          <div className='whitenoise-checker-container'>
            <p>White Noise</p>
            <label className="switch">
            <input type="checkbox" checked={isRunning && isChecked} onChange={handleCheckboxChange} />
            <span className="slider"></span>
          </label>
          </div>
        </div>


    <div className='time-for-container'>
       <p>{mode === 'pomodoro' ? `Time to focus ${name}` : `Take a break ${name}`}</p>

    </div>
          
      </div>
      <div className='tasklist-container'>
      <TaskList />
      </div>
      
    </div>
    </div>
  );
}

export default App;
