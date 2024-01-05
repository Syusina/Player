import { useState } from 'react';
import trackList from '../../assets/tracksList';
import styles from './MainPage.module.scss';
import Track from './Track';
import { Input } from '@mui/material';

const runSearch = (query) => {
  if (!query) {
    return trackList
  }
  const lowerCaseQuery = query.toLowerCase();

  return trackList.filter((track) => track.title.toLocaleLowerCase().includes(lowerCaseQuery) || track.artists.toLocaleLowerCase().includes(lowerCaseQuery));
};

const MainPage = () => {
  const [tracks, setTracks] = useState(trackList);
  
  const handleChange = (event) => {
    const foundTracks = runSearch(event.target.value);
    setTracks(foundTracks);
  };

  return (
    <div className={styles.search}>
      <Input
        className={styles.input}
        placeholder='Поиск музыки'
        onChange={handleChange}
      />
      <div className={styles.list}>
        {tracks.map((track) => <Track key={track.id} {...track} />)}
      </div>
    </div>
  )
};

export default MainPage;
