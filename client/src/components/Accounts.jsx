import "./Main.css";
import { useState, useEffect } from "react";

function Accounts({web3,setAddress}) {
  const [provider,setProvider]=useState("None");
  const [balance,setBalance]=useState("None");
  const [account,setAcccont]=useState("None");
  useEffect(() => {
  async function allAccounts(){
    const select=document.querySelector("#selectNumber");
    try{
      setProvider();
    const options =await web3.eth.getAccounts();
    setProvider("Ganache");
    for(let i=0;i<options.length;i++){
      let opt=options[i];
      let element = document.createElement("option");
      element.textContent = opt ;
      element.value=opt; 
      select.appendChild(element);
      }
    }
    catch(error){
      setProvider("not connected");
    }
  }
  web3 && allAccounts();
}, [web3]);

  async function selectAccount(){
    let selectedAccount=document.querySelector("#selectNumber").value;
    if(selectedAccount){
      setAddress(selectedAccount);
      let accountBalance=await web3.eth.getBalance(selectedAccount);
      const etherBalance= web3.utils.fromWei(accountBalance,"ether");
      setBalance(etherBalance);
      setAcccont(selectedAccount);
    }
  }

  return (
    <>
      <form className="label1" id="myForm">
        <label htmlFor="selectNumber">Select an account</label>
        <select className="innerBox" id="selectNumber" onChange={selectAccount}>
          <option></option>
        </select>
      </form>
      <span className="conAc">Connected Account: {account}</span>
      <br></br>
      <span className="acBal">Account Balance:{balance}</span>
      <br></br>
      <span className="provider">Provider : {provider}</span>
    </>
  );
}

export default Accounts;
