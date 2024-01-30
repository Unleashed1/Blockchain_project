

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
          const contractAddress = '0x2a8A75077FC683103026eBfc4558b155FD368f5e';
          const contract = new provider.eth.Contract(data.abi, contractAddress);

          contract.methods.makePaymentTo(receiverAddress)
            .send({ from: userAddress, value: provider.utils.toWei('1', 'ether') })
            .on('transactionHash', function (hash) {
              console.log('Transaction Hash:', hash);
              alert("Transaction confirmed!");
            })
            .on('error', function (error) {
              console.error('Transaction Error:', error);
            });
        })
        .catch(error => {
          console.error('Fetch error:', error);
        });
    } catch (error) {
      console.error('MetaMask account access denied or error:', error);
    }
  } else {
    console.error('MetaMask not detected');
  }
}

