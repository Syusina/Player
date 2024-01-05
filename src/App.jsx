import MainPage from "./pages/MainPage/MainPage";
import styles from './global.module.scss';
import PlayBar from "./components/PlayBar/PlayBar";

const App = () => {
  return (
    <div className={styles.wrapper}>
      <MainPage />
      <PlayBar />
    </div>
  )
};

export default App;
