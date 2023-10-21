# Treasure Go!: Set the treasure and go! 

## Created for ETHOnline 2023 

##Summary
TreasureGo! is an experimental interface for distributing cryptocurrency. The current dApp deployment is to the layer 2 blockchain, Scroll. The dApp, TreasureGo! allows a user to set a physical geographic location for Scroll Ethereum to be deposited. A user overlapping this geographic region with an Ethereum deposit can in turn collect the amount by using the dApp. 

Think PokemonGo combined with crypto- and therin lies the concept behind TreasureGo!

##dApp Problem Statement
At a simplistic level, TreasureGo can be utilized as a kind of game, akin to PokemonGo!, where a user deposits an amount of Ethereum to be collected at a set geographic location. The technology within the concept itself can be extended to use cases such as HR payment disbursmens for workers arriving at a particular geographic region; moreoever, the idea of crypto tied to geographic location can function as a means for mobilizing people to visit locations as a type of incentivisation. 

The possibilities with TreasureGo! are vast and the bridge between the crypto relm and the physical relm is where the value lies within the concept; both on an artistic level, for a level of gamification, as well as a functional level on the level of payment disbursments tied to a unique parameter- device presnece at a physical location. 

##TreasureGo! 
The promise of cryptocurrency is the treasure which ultimately lies in promise of freedom untethered from centralized control. For some this means- leave some crypto to be collected in any geographic location. Set the destination, drop some crypto; buckle up those treasure hunting boots and go, go, go! 

##Smart Contract Patterns
-`TreasureGo.sol`: a single smart contract provides the backdrop for the experimental dApp/prototype, TreasureGo!. The TreasureGo! contract records deposit amounts made to the contract address, latitude and longitude parameters- as selected by the depositor for their ethereum amount. Collections via the TreasureGo.sol are made via a function which takes input paramaters: (latitude, longitude, 'the treasure ID',webkey).

The webkey paramter passed into the TreasureGo.sol contract is an attempt to make the contract callable only by the TresureGo! web dApp [note: current deployment is currently functional on desktop and not mobile]. This is important because location data for a user is pulled from the front end which uses the inbuilt properties of a webbrowser location services. When a user deployes a TresureGo.sol contract there is one input constructor argument a user passes is which is hashed (keccak256(abi.encodePacked(clientKey));) and then saved within the contract as a private variable. the one way hashing of the constructor attempts to mask the original paramater passed in and makes is a bit harder for 'bad actors' to comprimise. 

This private variable stored on the contract must be consistent with what is stored on the front end in a .env file. The data of which is masked to front end users- but pulled to interact with the deployed TreasureGo.sol contract when a user click a button. This 'hacky' feature is one of the proposed innovations conceptulized by way of this hackathon submission; the ability to interact with a solidity contract only by way of a specific web dApp using contstrutor arguments & hashing/combined with the process.env functionality of a front-end React.js app. 

## Run your own TreasureGo! frontend
TreasureGo! has been built for the L2 Scroll test network; upon reseraching the protocol it's more cost effective, scalable and faster to use it. 

1. Set your As a recommendation for quick setup- use MetaMask and connect to the Scroll network: https://docs.scroll.io/en/user-guide/setup/. 

From the following link you can also collect Scroll Sepolia ETH used to deploy and interact with the front end: https://sepolia.scroll.io/bridge


2. Use Remix,https://remix.ethereum.org/, to deploy your own TreasureGo.sol contract- pass in a constructor/string argument which defines your 'webkey.' This must be consistent with what is eventually stored on the front end inside a .env file. 

3. TreasureGo! relies on maps for depositing and finding treasure; and to make things easy on myself I went with utilizing Google Maps. Which means that users wishing to deploy their own TreasureGo! dApp must sign up for a Google Developers Account and enable the Maps API:https://developers.google.com/maps/get-started

4. Clone the repo and create a .env in your front end root folder with the following information outlined below- inserting your web_key (string constructor argument used on Treasure.sol deployment) as REACT_APP_WEB_KEY and REACT_APP_API: as the Google Maps API key registered:


    ```
    REACT_APP_WEB_KEY = "xxxxxxxxxxxxx"
    REACT_APP_API_KEY = "xxxxxxxxxxxxx"
    ```


5. Then run the following commands in the terminal to launch the dApp locally:
    
    ```
    npm install 
    npm start 
    ```
   

## Live Deployment/Desktop Only

The current TreasureGo dApp is only available on desktop and is deployed to the Scroll network (testnet/Sepolia) so test Scroll Sepolia is necessary. The TreasureGo! front end relies on the window navigator element and has only been tested with a Chrome browser. 

Location servies must be enabled to use the dApp:

https://treasurego.netlify.app/

## Front End Features
- <ins>Latitude and Longitude Display</ins>: Upon grating location services permissions a users latitude and longitude is displayed

-<ins>Wallet Connect Button</ins>: A wallet connect button provides a connection to MetaMask and displays a user's address as well as wallet balance in Scroll Sepolia ETH

-<ins>Set Treasure View</ins>: If a user selects the 'Set Treasure' button they will see a Google Map element set in proximity to their current location. A user can click on the map to set a deposit location (latitude/longitude) and also complete a text field to set the amount of ETH to be deposited there. Clicking the deposit button requires signing two transaciton- one to transfer said amount of ETH to the TreasureGo.sol contract and the second transaction write is to 'record' the location on the contract as a form of a map. 

-<ins>Get Treasure View</ins>: If a user selects the 'Get Treasure' button they will be prompted with a table with recorded treasure locations. If their current location status (as passed by the browser data) overlaps with their current location a red 'Collect Treasure' button will render in the specific row of the treasure table. 

-<ins>Get Treasure View Treasure Map</ins>: Below the 'Get Treasure' table is another Google Map where the user's location is indicated by a red pin. Deposited treasure is indicated by yellow pins on the map. This will help a user orient themselves as they seek treasure. 

## Tools and Frameworks Used
-<strong>Scroll Network</strong>: Affordable, scalable and fast- the Scroll (testnet) provides a perfect backdrop for testing and performance
-<strong>Ethers.js</strong>: The utility library for interacting with the Treasure.sol contract and converting data for viewing on the front end
-<strong>MetaMask</strong>: The web extension interface for ethers.js to pull from to create the signer object
-<strong>Remix</strong>: The single tool used for the development and testing of the smartcontract TreasureGo.sol.
-<strong>Google Maps API</strong>: Creates the accurate maps used on the front end for selecting deposit locations as well as visualizing crypto deposit locations via the dApp
-<strong>Chrome Browser</strong>: Provides the location services used by the dApp to determine a user's location and weather they are in enough proximity to deposited treasure to collect it. 

## Concluding Thoughts

I believe that the success of crypto, from an adopton standpoint, relies on a concrete/understandable concept which connects the physical world to the virtual. TreasureGo! is an attempt to think out of the box an innovate on the understanding of what is possible given the melting pot of centralized and decentralized tools available. 

## Developer
- [@kitfud](https://github.com/kitfud)
