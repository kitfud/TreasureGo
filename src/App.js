import './App.css';
import Location from './components/Location';
import WalletConnect from './components/WalletConnect';
import { useEffect, useState } from 'react';
import { CircularProgress,
  Box,
  Card, 
  Typography,
  Button} from '@mui/material';
import GetTreasure from './components/GetTreasure';
import SetTreasure from './components/SetTreasure';
import SmartContracts from './chain-info/smart_contracts.json'

function App() {

  const [latitude, setLatitude] = useState(null)
  const [longitude,setLongitude] = useState(null)
  const [navigatorAvailable, setNavigatorAvailable] = useState(false)

  const [defaultAccount,setDefaultAccount] = useState(null)
  const [signer, setSigner] = useState(null)
  const [contract, setContract] = useState(null)
  const [provider, setProvider] = useState(null)
  const [walletBalance,setWalletBalance] = useState(null)

  const [treasuremode,setTreasureMode] = useState(null)

  const TreasureGoAddress = SmartContracts.deploymentAddress.sepolia

  useEffect(()=>{
    if(navigator.geolocation){
      setNavigatorAvailable(true)
      navigator.geolocation.watchPosition(function(position){
          setLatitude(Math.round(position.coords.latitude*1000)/1000)
          setLongitude(Math.round(position.coords.longitude*1000)/1000)
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
    
      <WalletConnect 
      setDefaultAccount={setDefaultAccount}
      setSigner={setSigner}
      setContract={setContract}
      setProvider={setProvider}
      setWalletBalance={setWalletBalance}
      defaultAccount={defaultAccount}
      provider={provider}
      walletBalance={walletBalance}
      />
      </Box>

       {
      defaultAccount?
      <Box sx={{display:'flex'}}>
       <Box sx={{flexDirection:'row',margin:'auto'}}>
       <Button onClick={()=>{setTreasureMode("setTreasure")}} variant="contained" color="success">SET TREASURE</Button> 
       <Button onClick={()=>{setTreasureMode("getTreasure")}} variant="contained" color="warning">GET TREASURE</Button>
       </Box>
      </Box>:null
      } 

      {
        treasuremode?treasuremode=='getTreasure'?
        <GetTreasure/>
        :(<>
        <Box sx={{display:'flex',margin:'auto',justifyContent:'center'}}>
          <Box>
          <SetTreasure latitude={latitude} 
          longitude={longitude}
          contract={contract}
          signer={signer}
          contractAddress={TreasureGoAddress}
          provider={provider}/>
          </Box>
        </Box>
        </>)
        :null
      }

    </Box>
  );
}

export default App;
