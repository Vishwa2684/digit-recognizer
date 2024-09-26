import React,{useState} from 'react';
import './App.css';
import Canvas from './Canvas';
import Truth from './Truth';
import { Stack } from '@mui/material';
// import {LinearProgressWithLabel} from '@mui/material'
function App() {
  const [results,setResults] = useState([]);
  console.log(results)
  return (
    <div className="App">
      <h1>Digit Recognizer</h1>
      <Stack direction="row" spacing={10}>
        <Canvas setResults = {setResults}/>
        <Truth predictions={results}/>
      </Stack>
      
    </div>
  );
}

export default App;