

async function makePayment() {
  if (typeof window.ethereum !== 'undefined') {
    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const provider = new Web3(window.ethereum);

      const accounts = await provider.eth.getAccounts();
      const userAddress = accounts[0];
      const receiverAddress = '0x2DA17fae63983FF03cf36b4E1fD87c3516FB3Aab';

      fetch("./build/contracts/Payment.json")
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          const contractAddress = '0xeed7E6bc1F4A9Ca45ffF674a705129A9D9aad41D';
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

 fetch("./build/contracts/Keygen.json")
        .then(function (response) {
          return response.json();
        })
        .then(async function (data) {
        const contractAddress = '0x25f8C5a25A54D3A6d9F714D91D531Ee7B6547597';
        const contract = new provider.eth.Contract(data.abi, contractAddress);
        const inputString = document.getElementById("username").value;

        try {
            const result = await contract.methods.generateKeccak256(inputString).call();

            // Display the result in the HTML
            key =result // modif this and put in db
            makePayment();
            console.log("key generata:", key);
        } catch (error) {
            console.error("Error:", error);
        }        })
}catch(error){
  console.error("che cazzo non funziona:",error);
 }
 }
}

/*
function handlePayment() {
  makePayment().then((result) => {
    // Utilizza il valore di ritorno come desiderato
    console.log(result);

    // Esegui altre operazioni con il valore di ritorno, se necessario
  }).catch((error) => {
    // Gestisci eventuali errori durante il pagamento
    console.error(error);
  });
}*/
