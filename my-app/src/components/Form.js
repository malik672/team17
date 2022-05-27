import Header from './Header';
import Web3 from 'web3';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import { getDatabase, ref, set } from "firebase/database";
import {ref as sRef, uploadBytes, getDownloadUrl, getDownloadURL } from "firebase/storage";
import Charity from "./Charity.json";
import Token from "./Token.json";
import {BigNumber} from "bignumber.js";
import { useState } from 'react';




const Form = () => {
   
  const web3 = new Web3(window.ethereum);
  let contract = new web3.eth.Contract(Charity.abi,'0x83D7ef3262d0830d95e2FbD7e96bbFa583Ca663f');
  let contracts = new web3.eth.Contract(Token.abi,'0x1313Ef117B24a3140C6C7B3744AB0608C37424Dd');
  
  let id = -1;

  const [purpose, setPurpose] = useState();
  const [receiver, setReceiver] = useState("");
  const [target, setTarget] = useState("");
  const [value, setValue] = useState("");
  const [desi, setDesi] = useState("");
  const [fors, setFor] = useState("");
  const [against, setAgainst] = useState("");
  const [state, setState] = useState("");
  const [executes, setExecute] = useState("");
  const [cancel, setCancel] = useState("");
   
    //add fundraiser
    const main =async(e) =>{
      try{
        const firebaseConfig = {
          apiKey: "AIzaSyA9Xi7rE8j2-G6Hhg-jxXGgGLZ-T3OZeRs",
          authDomain: "global-38c80.firebaseapp.com",
          projectId: "global-38c80",
          storageBucket: "global-38c80.appspot.com",
          messagingSenderId: "436303615902",
          appId: "1:436303615902:web:6e28dfff6d4b6d2c12288f",
          measurementId: "G-G1WWBZSFJ8",
        };        

        const app = initializeApp(firebaseConfig);
        id = id + 1; 

        async function writeUserData(purpose,target,address, proposalId){
          const db = getDatabase();
          const refrence = ref(db, 'Charity/' + proposalId);         
          set(refrence, {
            purpose:purpose,
            target:target,
            address:address,
            proposalId:proposalId
          })
        }
        writeUserData(purpose, target, receiver, id);
      }catch(e){

      }
    }

     // adds proposal
     const add = async(e) => {
      e.preventDefault();
      
     try{
      const test = await contract.methods.addProposal(purpose, receiver, target).send({
        from: window.ethereum.selectedAddress,
        value:0
      });
      if(test.status === true){
        main();
      }
     }catch(e) {
      
     } 
   }
  
   const mint = async(e) => {//not done yet
    const Big = new BigNumber(value).times(10 ** 18)
    const wei = web3.utils.toBN(Big)
    console.log(wei);
     await contracts.methods.mint().send({
       from:window.ethereum.selectedAddress,
       value:wei
     })
   }
 
   const designate = async(e) => {
     await contracts.methods.designate(desi).send({
       from: window.ethereum.selectedAddress,
       value:0
     })
   }
 
   //vote for
   const voteFor = async(e) => {
     await contract.methods.voteFor(fors).send({
       from: window.ethereum.selectedAddress,
       value:0
     })
   }
 
   //Vote Against
   const voteAgainst = async(e) => {
    await contract.methods.voteAgainst(against).send({
      from: window.ethereum.selectedAddress,
      value:0
    })
   }
 
   const execute = async(e) => {
    await contract.methods.executeProposal(executes).send({
      from: window.ethereum.selectedAddress,
      value:0
    })
   }
 
   const cancels = async(e) => {
    await contract.methods.cancelProposal(cancel).send({
      from: window.ethereum.selectedAddress,
      value:0
    })
   }
 
   const time = async(e) => {
   let times =   await contract.methods.timeLeft(0).send({
      from: window.ethereum.selectedAddress,
      value:0
     })
     console.log(times)
   }


  return (
    <div>
       <Header/> 
      <div className="hidden">
       <div className="form-section">
        <section>
          <p>Charity Dao - a decentralized fundraiser Dao</p>
        </section>
        <sections>
          <p></p>
        </sections>
        </div>
        <form className="form" method="post">
        <div>
            <label>Purpose</label>
            <input type="text" onChange={(e)=>(setPurpose(e.target.value))}/>
          </div>
          <div>
            <label>Receiver Address</label>
            <input type="text" onChange={(e)=>(setReceiver(e.target.value))}/>
          </div>
          <div>
            <label>Target Amount</label>
            <input type="number" onChange={(e)=>(setTarget(e.target.value))}/>
          </div>
          <button type="submit" onClick={(e)=>(add(e))}>Submit</button>
        </form>
        <div className="container-2">
           <div className="mint">
             <label>mint tokens: note you have to pay</label>
             <input type="text" className="minted" onChange={(e) =>(setValue(e.target.value))}/>
             <button onClick={(e)=>(mint())}>Mint</button>
           </div>
           <div className="designate">
             <label>designate votes to anyone</label>
             <input type="text" onChange={(e) => (setDesi(e.target.value))}/>
             <button onClick={(e)=>(designate())}>Designate</button>
           </div>
          </div>
        <section className="section">
       <div>
         <label>vote for: input proposal Id</label>
         <input type="number" onChange={(e) =>(setFor(e.target.value))}/>
         <button onClick={(e)=>(voteFor())}>VoteFor</button>
       </div>
       <div>
         <label>vote Against: input proposal Id</label>
         <input type="number" onChange={(e) =>(setAgainst(e.target.value))}/>
         <button onClick={(e)=>(voteAgainst())}>VoteAgainst</button>
       </div>
       <div>
         <label>execute: input proposal Id</label>
         <input type="number" onChange={(e) =>(setExecute(e.target.value))}/>
         <button onClick={(e)=>(execute())}>Execute</button>
       </div>
       <div>
         <label>cancel: input proposal Id</label>
         <input type="number" onChange={(e) =>(setCancel(e.target.value))}/>
         <button onClick={(e)=>(cancels())}>Execute</button>
         <button onClick={(e)=>(time())}>Execute</button>
       </div>
       </section>
        </div>

    </div>
  )
}

export default Form;