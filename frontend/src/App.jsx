import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FeaturedSection from './components/FeaturedSection';

function Home() {
  return (
    <>
      <Hero />
      <FeaturedSection />
    </>
  );
}

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-brand-cream">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;