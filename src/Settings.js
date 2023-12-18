import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark, faClockRotateLeft, faVolumeHigh, faPalette } from '@fortawesome/free-solid-svg-icons'
import AlarmSoundDropdown from './AlarmSoundDropdown'
import AlarmSoundDropdownWN from './AlarmSoundDropdown-WN'
import SelectColor from './SelectColor';
import $ from 'jquery';

export default function Settings({ setIsChecked, rangeValue, setRangeValue, rangeValueAL, setRangeValueAL, setIsSettingsOpen, setPomodoroSeconds, setShortBreakSeconds, setLongBreakSeconds, pomodoroSeconds, shortBreakSeconds, longBreakSeconds, setPColor, setSBColor, setLBColor, PColor, SBColor, LBColor }) {
  const [isColorOpen, setIsColorOpen] = useState(false);
  const [selectedMode, setSelectedMode] = useState('');
  function openColor(mode) {
    setIsColorOpen(true);
    setSelectedMode(mode);
  }
  function closeColor() {
    setIsColorOpen(false);
    setIsSettingsOpen(false);
  }
  return (
    <div>
      {isColorOpen && (
        $('.settings-modal').css('display', 'none'),
        <SelectColor setSBColor={setSBColor} setLBColor={setLBColor} setPColor={setPColor} closeColor={closeColor} mode={selectedMode}/>
        
      )}
      <div className="settings-modal">
          <div className='settings-page'>
              <div className="settings-header">
                <p>Settings</p>
                <div onClick={() => setIsSettingsOpen(false)}><FontAwesomeIcon icon={faXmark} className='Xmark'/></div>
              </div>

              <div className="edit-timer">
                <h4 className='setting-title'><FontAwesomeIcon className='Faicon' icon={faClockRotateLeft} /> TIMER</h4>
                <p className='setting-subtitle'>Time (minutes)</p>
                <div className="edit-timer-big-container">
                <div className="edit-timer-container">
                  <div className="edit-timer-text">Pomodoro</div>
                  <div className="edit-timer-input">
                    <input value={pomodoroSeconds / 60} onChange={(event)=>{const value = Math.min(Math.max(event.target.value, 0.05), 50);setPomodoroSeconds(value * 60)}} type="number" min="5" max='50' step="1" />
                  </div>
                </div>
                <div className="edit-timer-container">
                  <div className="edit-timer-text">Short Break</div>
                  <div className="edit-timer-input">
                     <input value={shortBreakSeconds / 60} onChange={(event)=>{const value = Math.min(Math.max(event.target.value, 0.05), 15);setShortBreakSeconds(value * 60)}} type="number" min="3" max='15' step="1" />

                  </div>
                </div>
                <div className="edit-timer-container">
                  <div className="edit-timer-text">Long Break</div>
                  <div className="edit-timer-input">
                    <input value={longBreakSeconds / 60} onChange={(event)=>{const value = Math.min(Math.max(event.target.value, 10), 25);setLongBreakSeconds(value * 60)}} type="number" min="10" max='30' step="1" />
                  </div>
                </div>
                </div>
              </div>

            <div className="edit-sound">
            <h4 className='setting-title'><FontAwesomeIcon className='Faicon' icon={faVolumeHigh} /> SOUND</h4>
                <div className="alarm-container">
                <p className='setting-subtitle'>Alarm Sound</p>
                <AlarmSoundDropdown rangeValueAL={rangeValueAL} setRangeValueAL={setRangeValueAL}  options={['Alarm Sound 1', 'Alarm Sound 2', 'Metal Pipe']}/>
                
                </div>
                <div className="alarm-container whitenoise-container">
                <p className='setting-subtitle'>White Noise Sound</p>
                <AlarmSoundDropdownWN setIsChecked={setIsChecked} rangeValue={rangeValue} setRangeValue={setRangeValue} options={['White Noise 1', 'White Noise 2', 'Rainfall']}/>
                
                </div>
            </div>
           
            <div className='edit-color'>
            <h4 className='setting-title'><FontAwesomeIcon className='Faicon' icon={faPalette} /> COLOR</h4>
                <p className='setting-subtitle'>Background Color</p>
                <div className="edit-timer-big-container">
                <div className="edit-timer-container color-container">
                  <div className="edit-color-text">Pomodoro</div>
                  <div className="edit-timer-input">
                  <div onClick={()=>openColor('Pomodoro')}  className='color-pomodoro' style={{backgroundColor: PColor[1]}}></div>                  </div>
                </div>
                <div className="edit-timer-container color-container">
                  <div className="edit-color-text">Short Break</div>
                  <div className="edit-timer-input">
                   <div onClick={()=>openColor('Short Break')} className='color-short' style={{backgroundColor: SBColor[1]}}></div>

                  </div>
                </div>
                <div className="edit-timer-container color-container">
                  <div className="edit-color-text">Long Break</div>
                  <div className="edit-timer-input">
                   <div onClick={()=>openColor('Long Break')} className='color-long' style={{backgroundColor: LBColor[1]}}></div>
                  </div>
                </div>
                </div>

            </div>
          </div>
          
        </div>
    </div>
  )
}
