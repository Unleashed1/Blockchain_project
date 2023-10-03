    function makePayment() {
            const sourceAddress = document.getElementById("sourceAddress").value;

            if (!web3.utils.isAddress(sourceAddress)) {
                alert("Invalid source address");
                return;
            }

            const contractAddress = 'contract adddress';
            const contractABI = [/* Insert the contract ABI here */];

            const web3 = new Web3(window.ethereum);
            const contract = new web3.eth.Contract(contractABI, contractAddress);

            try {
                const accounts = await ethereum.enable();
                const recipientAddress = '0x6A3A0eeDe87c645B693F7a4D4d560298f5d0508B'; // Destination address da cambiare se cambiamo block
                const weiAmount = '50735670000000000'; // 50,735.67 wei
                await contract.methods.makePayment(recipientAddress).send({
                    from: sourceAddress,
                    value: weiAmount
                });
                alert("Payment successful!");
            } catch (error) {
                console.error(error);
                alert("Payment failed. Check the console for error details.");
            }
        }
