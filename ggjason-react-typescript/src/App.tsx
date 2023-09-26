import React from 'react';
import './App.css';
import {Parallax, ParallaxProvider} from 'react-scroll-parallax';


function App() {
  return (
    <div className="App">

      <ParallaxProvider>
          <Parallax translateY={[-20, 20]}>
              <div className="my-thing" >123</div>
      </Parallax>
      </ParallaxProvider>
    </div>
  );
}


export default App;
