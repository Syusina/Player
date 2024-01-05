import { useContext, useState, useEffect } from 'react';
import { AudioContext } from '../../context/AudioContext';
import styles from './PlayBar.module.scss';
import { Slider, IconButton } from '@mui/material';
import { Pause, PlayArrow } from '@mui/icons-material';
import secondsToMMSS from '../../utils/secondsToMMSS';

const TimeControls = () => {
  const { audio, currentTrack } = useContext(AudioContext);
  const {duration } = currentTrack;
  const [currentTime, setCurrentTime] = useState();
  const formatedCurrentTime = secondsToMMSS(currentTime);
  const sliderCurrentTime = Math.round((currentTime / duration) * 100);

  const handleChangeCurrentTime = (e, value) => {
    const time = Math.round((value / 100) * duration);
    setCurrentTime(time);
    audio.currentTime = time;
  };

  useEffect(() => {
    const timeInterval = setInterval(() => {
      setCurrentTime(audio.currentTime);
    }, 1000);

    return () => {
      clearInterval(timeInterval);
    }
  }, []);

  return (
    <>
      <p>{formatedCurrentTime}</p>
      <Slider
        step={1}
        min={0}
        max={100}
        value={sliderCurrentTime}
        onChange={handleChangeCurrentTime}
      />
    </>
  )
};

const PlayBar = () => {
  
  const { audio, handleToggleAudio, currentTrack, isPlaying } = useContext(AudioContext);
  const { preview, duration, title, artists } = currentTrack;
  const formatedDuration = secondsToMMSS(duration);

  return (
    <div className={styles.playbar}>
      <img className={styles.preview} src={preview} alt=''/>
      <IconButton onClick={() => handleToggleAudio(currentTrack)}>
        {isPlaying ? <Pause /> : <PlayArrow />}
      </IconButton>
      <div className={styles.credits}>
        <h4>{title}</h4>
        <p>{artists}</p>
      </div>
      <div className={styles.slider}>
        <TimeControls />
        <p>{formatedDuration}</p>
      </div>
    </div>
  )
};

export default PlayBar;