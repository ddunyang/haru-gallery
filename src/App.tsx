import './App.css';
import Header from './components/Header';
import PhotoGallery from './components/PhotoGallery';
import VideoGallery from './components/VideoGallery';
import Footer from './components/Footer';

function App() {
  return (
    <>
      <Header />
      <main>
        <PhotoGallery />
        <VideoGallery />
      </main>
      <Footer />
    </>
  );
}

export default App;
