    async function makePayment() {
            const sourceAddress = document.getElementById("sourceAddress").value;

            if (!web3.utils.isAddress(sourceAddress)) {
                alert("Invalid source address");
                return;
            }

            const contractAddress = 'CONTRACT_ADDRESS'; // Replace with the actual contract address
            const contractABI = [/* Insert the contract ABI here */];

            const web3 = new Web3(window.ethereum);
            const contract = new web3.eth.Contract(contractABI, contractAddress);

            try {
                const accounts = await ethereum.enable();
                const recipientAddress = '0xdB1e52BD977916D2ad93E1e8Ab6601Ee940d787C'; // Destination address
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
