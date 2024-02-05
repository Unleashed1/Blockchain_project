

async function makePayment() {
  if (typeof window.ethereum !== 'undefined') {
    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const provider = new Web3(window.ethereum);

      const accounts = await provider.eth.getAccounts();
      const userAddress = accounts[0];
      const receiverAddress = '0x2DA17fae63983FF03cf36b4E1fD87c3516FB3Aab';
  console.log("eseguo");

      fetch("./build/contracts/Payment.json")
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          const contractAddress = '0x60B460af9ce1ff0e215Ffab4ba12A729223c6FB0';
          const contract = new provider.eth.Contract(data.abi, contractAddress);

          contract.methods.makePaymentTo(receiverAddress)
            .send({ from: userAddress, value: provider.utils.toWei('1', 'ether') })
            .on('transactionHash', function (hash) {
              console.log('Transaction Hash:', hash);
              alert("Transaction confirmed!");
              return true;
            })
            .on('error', function (error) {
              console.error('Transaction Error:', error);
              return false;
            });
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

async function keygen(){
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
            const contractAddress = '0xC391E2Dd921a0C9F18091b753eE06570C4651978';
            const contract = new provider.eth.Contract(data.abi, contractAddress);
            const inputString = document.getElementById("username").value;

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
