import React,{useState} from 'react';
import './App.css';
import Canvas from './Canvas';
import Truth from './Truth';
import { Stack, Typography } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';


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
      {/* <GitHubIcon onClick ={()=>window.open("https://github.com/Vishwa2684","_blank")}/> */}
      
       <Typography>please do check out my GitHub!</Typography>
        <GitHubIcon
          onClick={()=>window.open("https://github.com/Vishwa2684","_blank")}
          style={{ cursor: 'pointer', fontSize: '40px' }}
        />
      
    </div>
  );
}

export default App;