import './App.css';
import Location from './components/Location';
import WalletConnect from './components/WalletConnect';
import { useEffect, useState } from 'react';
import { CircularProgress,Box,Card, Typography } from '@mui/material';

function App() {

  const [latitude, setLatitude] = useState(null)
  const [longitude,setLongitude] = useState(null)
  const [navigatorAvailable, setNavigatorAvailable] = useState(false)

  const [defaultAccount,setDefaultAccount] = useState(null)
  const [signer, setSigner] = useState(null)
  const [contract, setContract] = useState(null)
  const [provider, setProvider] = useState(null)
  const [walletBalance,setWalletBalance] = useState(null)

  useEffect(()=>{
    if(navigator.geolocation){
      setNavigatorAvailable(true)
      navigator.geolocation.watchPosition(function(position){
          setLatitude(position.coords.latitude)
          setLongitude(position.coords.longitude)
      })
  }
  })

  return (
    <Box className="App">
      <header className="App-header">
       Treasure Go!
      </header>
      <Box>
      
       {latitude?
      <Location setLatitude={setLatitude}
      setLongitude={setLongitude}
      setNavigatorAvailable={setNavigatorAvailable}
      latitude={latitude}
      longitude={longitude}
      navigatorAvailable={navigatorAvailable}/>:
      <Box sx={{marginTop:'20px'}}>
        <CircularProgress/>
        <Typography>Latitude and Longitude Values Incoming</Typography>
      </Box>
       }
    
      <WalletConnect setDefaultAccount={setDefaultAccount}
      setSigner={setSigner}
      setContract={setContract}
      setProvider={setProvider}
      setWalletBalance={setWalletBalance}/>
      </Box>

    </Box>
  );
}

export default App;
