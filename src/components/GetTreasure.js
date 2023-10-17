import React from 'react'
import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import { CircularProgress,
  Box,
  Card,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
  Button,
  TextField,
  Snackbar,
  Paper
} from '@mui/material';

const GetTreasure = ({contract,userLatitude,userLongitude}) => {

  const [treasureArray, setTreasrureArray] = useState([])
  const [foundArray, setFoundArray] = useState([])
  const [tabledata,setTableData] = useState([])

  async function getData(){
    let data = await contract.getTreasureArray()
    setTreasrureArray(data)
    //console.log(data)
    let founddata = await contract.getFoundArray()
    setFoundArray(founddata)
    //console.log(founddata)
  }

  useEffect(()=>{
    if(contract){
    getData()
    }
  },[])

  useEffect(()=>{
console.log(treasureArray)
let convertedArray = []
let counter = 0;
treasureArray.forEach((element)=>{
  counter++
let tdata = {
  "treasureId": parseInt(element.treasureID),
  "depositor": element.depositor,
  "amount": parseFloat(ethers.utils.formatEther(element.amount)),
  "latitude": (parseFloat(element.latitude))/1000,
  "longitude":(parseFloat(element.longitude))/1000,
}
console.log("tdata",tdata)
if(element.isTreasureFound==false){
  convertedArray.push(tdata)
}
if(counter ==treasureArray.length){
  console.log("Setting Table Data", treasureArray.length)
  setTableData(convertedArray)
  }
})


  },[treasureArray])

  useEffect(()=>{
console.log("TABLE DATA",tabledata)
  },[tabledata])

const getTreasure = async (userLat,userLong,ID)=>{
  console.log("data",{"lat":userLat,"long":userLong,"ID":ID})
  let tx = await contract.getTreasure(userLat,userLong,ID)
}

  return (
    <>
    <Box>Get Treasure</Box>
    <Card
                  sx={{
                    marginTop:'20px',
                    marginBottom: "20px",
                    padding:'0px',
                    border:2,
                    borderColor:"green"
                  }}
                >
                  <Box>
                  </Box>
                  <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 900, }} aria-label="Current Dollar Cost Average">
                      <TableHead sx={{backgroundColor:"#a7aeff"}}>
                        <TableRow>
                          <TableCell>treasureID</TableCell>
                          <TableCell align="right">Depositor</TableCell>
                          <TableCell align="right">Amount</TableCell>
                          <TableCell align="right">Latitude</TableCell>
                          <TableCell align="right">Longitude&nbsp;</TableCell>
                          <TableCell align="right"></TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody
                        sx={{
                          backgroundColor: "#ebecff"
                        }}
                      >
                        {
                          tabledata
                          ?
                            (tabledata.map((row) => {
                       console.log("COUNT",tabledata)
                              return(
                                <TableRow
                                  key={row.treasureId}
                                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                  <TableCell align="right">{row.treasureId}</TableCell>
                                  <TableCell align="right">{row.depositor}</TableCell>
                                  <TableCell align="right">{row.amount}</TableCell>
                                  {console.log("LATITUDE",row)}
                                  <TableCell align="right">{row.latitude}</TableCell>
                                  <TableCell align="right">{row.longitude}</TableCell>
                                  <TableCell>
                                  {

                                row.latitude==userLatitude&&row.longitude==userLongitude?
                    
                                    <Button
                                      onClick={()=>{getTreasure(userLatitude*1000,userLongitude*1000,row.treasureId)}}
                                      variant='contained'
                                      color="error"
                                    >
                                      Collect Treasure
                                    </Button>:null
                            }
                                  </TableCell>
                                </TableRow>
                              )
                            }))
                          :
                            null
                        }
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Card>
    </>
  )
}

export default GetTreasure