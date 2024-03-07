const { Resolver } = require("truffle");


async function PlayGame() {
  if (typeof window.ethereum !== 'undefined') {
    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const provider = new Web3(window.ethereum);

      const accounts = await provider.eth.getAccounts();
      const userAddress = accounts[0];
      const receiverAddress = '0x812a80e249EC9dfeD5eC8Bdc3a626Eaf696b2393';

      let token;

      fetch("./build/contracts/BerryTk.json")
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          const contractAddress = '0x88b1933944122Ac6bf17B7edeFa9D48f79242e0A';
          const contract = new provider.eth.Contract(data.abi, contractAddress);
          const promise = new Promise((resolve,reject)=>{
            contract.methods.balanceOf(userAddress).call(function(err,res){
            if (err) {
              console.log("An error occured", err);
              reject("Errore");
            }
            else {
              token = parseInt(res);
              console.log("The balance is: ", token);
              resolve(token);
            }


          })});

          promise.then(
            (result) => {
              if(result>0){
                contract.methods.useToken().send({from: userAddress}).on('transactionHash', function(hash) {
                  console.log('Transaction hash0:', hash);
                  return startGame();
                })
                /*.on('confirmation', function(confirmationNumber, receipt) {
                  console.log('Transaction confirmation number:', confirmationNumber);
                  console.log('Transaction receip1t:', receipt);
                })*/
                .on('error', function(error) {
                    console.error('Error during transaction:', error);
                });
                
              }
              else{
                contract.methods.mint(2).send({from: userAddress, value: provider.utils.toWei('2', 'ether')})
                .on('transactionHash', function(hash) {
                  console.log('Transaction hash:', hash);
                })
                .on('confirmation', function(confirmationNumber, receipt) {
                  console.log('Transaction confirmation number:', confirmationNumber);
                  console.log('Transaction receipt:', receipt);
                  return startGame();
                })
                .on('error', function(error) {
                    console.error('Error during transaction:', error);
                });
              }
            }, 
            (error) => {
              console.error("Errore, vaffanculo", error);
            }


          )          
          /*
          contract.methods.makePaymentTo()
            .send({ from: userAddress, value: provider.utils.toWei('1', 'ether') })
            .on('transactionHash', function (hash) {
              console.log('Transaction Hash:', hash);
              return startGame();
            })
            .on('error', function (error) {
              console.error('Transaction Error:', error);
              return false;
            });*/
        })
        .catch(error => {
          console.error('Fetch error:', error);
          return false;
        });
    } catch (error) {
      console.error('MetaMask account access denied or error:', error);
      return false;
    }
  } else {
    console.error('MetaMask not detected');
    return false;
  }
}

async function keygen(score){
 if (typeof window.ethereum !== 'undefined') {
    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const provider = new Web3(window.ethereum);

      const accounts = await provider.eth.getAccounts();
      const userAddress = accounts[0];

      return fetch("./build/contracts/Keygen.json")
        .then(function (response) {
            return response.json();
      })
        .then(async function (data) {
            const contractAddress = '0x03c1Fa8ba623455b1962C06a3bB0869A5B90a78D';
            const contract = new provider.eth.Contract(data.abi, contractAddress);
            const inputString = document.getElementById("username").value+score;

            try {
              const hash = await contract.methods.generateKeccak256(inputString).call();
              console.log("dentro keygen", hash);
              return hash;
            } catch (error) {
              console.error("Error:", error);
            }

        })
      }catch(error){
        console.error("che cazzo non funziona:",error);
      }
  }
}
