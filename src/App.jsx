import React, { useState } from 'react'
import './App.css'
import { BrowserRouter } from 'react-router-dom'
import { About, Contact, Education, Extracurricular, Hero, Navbar, Tech, Works } from './components' // if you want to use skills balls make sure to import tech and do the same for src\components\index.js
import GlobalWeatherCanvas from './components/canvas/GlobalWeather'
// import { Analytics } from "@vercel/analytics/react"

function App() {
  const [weatherMode, setWeatherMode] = useState('snow')

  return (
      <BrowserRouter>
        <div className='relative z-0 bg-primary'>
          <div className='fixed inset-0 z-10 pointer-events-none'>
            <GlobalWeatherCanvas mode={weatherMode} />
          </div>

          <div className='relative z-20'>
          <div className="div bg-hero-pattern bg-cover bg-no-repeat bg-center">
            <Navbar />
            <Hero weatherMode={weatherMode} setWeatherMode={setWeatherMode} />
          </div>
          <About />
          <Education />
          <Extracurricular />
          <Tech />
          <Works />
          {/* <Feedbacks /> */}
          <div className="div relative z-0">
            <Contact />
          </div>
          </div>
        </div>
      </BrowserRouter>
  )
}

export default App
