//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

struct Treasure {
        address depositor;
        uint256 amount;
        uint256 treasureID; 
        int latitude;
        int longitude;
        bool isTreasureFound;  
}

contract TreasureGo {
Treasure[] public TreasureChest;
uint256 [] public Found; 
uint256 private treasureNum = 0;

receive() external payable{
}

function recordTreasureDeposit (int latitude, int longitude, uint256 amount) public {

    Treasure memory deposit = Treasure(
        msg.sender,
        amount, 
        treasureNum,
        latitude,
        longitude,
        false
    );
    TreasureChest.push(deposit);
    treasureNum++;

}

function exist (uint treasureID) public view returns (bool){
      for (uint i; i< Found.length;i++){
          if (Found[i]==treasureID)
          return true;
      }
      return false;
  }

function getTreasure(int256 latitude, int256 longitude, uint256 ID) public {
   require(exist(ID)==false,"treasure has been found");
   require(TreasureChest[ID].latitude== latitude,"Not at destination latitude for treasure");
    require(TreasureChest[ID].longitude== longitude,"Not at destination longitude for treasure");
   
    (bool sent,) = msg.sender.call{value:TreasureChest[ID].amount}("");
    require(sent, "Failed to send Ether To Finder");
    TreasureChest[ID].isTreasureFound = true;
    Found.push(ID);
}


function getBalance() public view returns (uint) {
        return address(this).balance;
    }

}