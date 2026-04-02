import './App.css';
import Header from './components/Header';
import HaruProfile from './components/HaruProfile';
import PhotoGallery from './components/PhotoGallery';
import MedicalRecords from './components/MedicalRecords';
import WeightChart from './components/WeightChart';
import Footer from './components/Footer';

function App() {
  return (
    <>
      <Header />
      <HaruProfile />
      <main>
        <PhotoGallery />
        <MedicalRecords />
        <WeightChart />
      </main>
      <Footer />
    </>
  );
}

export default App;
