const luffy = document.getElementById('luffy');
const gameContainer = document.querySelector('.game-container');
const background = document.querySelector('.background');
const gameForm = document.getElementById('game-form');
const startBtn = document.getElementById('start');
const restartBtn = document.getElementById('restart');
const gameInsights = document.getElementById('game-insights');
const username = document.getElementById('username');

let jumpInterval;
let scoreInterval;

let up = false;
//Variabili delle vite
const L1 = document.getElementById("L1");
const L2 = document.getElementById("L2");
const L3 = document.getElementById("L3");

const scoreBoard = document.getElementById('score');

let isJumping = false;
let score = 0;
let obstacles = [];
let bgPosition = 0;
let s=0;
let gameStart = false;
startBtn.disabled = false;

//funzione pagamento

async function makePayment() {
      if (typeof window.ethereum !== 'undefined') {
        try {
          await window.ethereum.request({ method: 'eth_requestAccounts' });
          const provider = new Web3(window.ethereum);

          const accounts = await provider.eth.getAccounts();
          const userAddress = accounts[0];

          const receiverAddress = '0xBcbE47237A6106baD40cfa0B6c970780C4E16B2f';//receiverAddress

          const contractABI = [
            // Include your contract's ABI here
           {
  "contractName": "Payment",
  "abi": [
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "internalType": "address payable",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "address payable",
          "name": "_receiver",
          "type": "address"
        }
      ],
      "name": "makePaymentTo",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function",
      "payable": true
    }
  ],
  "metadata": "{\"compiler\":{\"version\":\"0.8.0+commit.c7dfd78e\"},\"language\":\"Solidity\",\"output\":{\"abi\":[{\"inputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"constructor\"},{\"inputs\":[{\"internalType\":\"address payable\",\"name\":\"_receiver\",\"type\":\"address\"}],\"name\":\"makePaymentTo\",\"outputs\":[],\"stateMutability\":\"payable\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"owner\",\"outputs\":[{\"internalType\":\"address payable\",\"name\":\"\",\"type\":\"address\"}],\"stateMutability\":\"view\",\"type\":\"function\"}],\"devdoc\":{\"kind\":\"dev\",\"methods\":{},\"version\":1},\"userdoc\":{\"kind\":\"user\",\"methods\":{},\"version\":1}},\"settings\":{\"compilationTarget\":{\"project:/contracts/Payment.sol\":\"Payment\"},\"evmVersion\":\"istanbul\",\"libraries\":{},\"metadata\":{\"bytecodeHash\":\"ipfs\"},\"optimizer\":{\"enabled\":false,\"runs\":200},\"remappings\":[]},\"sources\":{\"project:/contracts/Payment.sol\":{\"keccak256\":\"0xcf9281e06c7882a20062feae5589d8006a0ceb6a08c6684a456346d87a36fe57\",\"urls\":[\"bzz-raw://91a48cef44b8f036e896461b215914ce77b06ccfc3b8a7c599e7b7d881d9a081\",\"dweb:/ipfs/QmQjPJQxVY8AAi8TWPifhfeAiMejtuU1WR4xbD9dfXfKPC\"]}},\"version\":1}",
  "bytecode": "0x608060405234801561001057600080fd5b50336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555061027e806100606000396000f3fe6080604052600436106100295760003560e01c806349701c5e1461002e5780638da5cb5b1461004a575b600080fd5b6100486004803603810190610043919061013b565b610075565b005b34801561005657600080fd5b5061005f610102565b60405161006c91906101b3565b60405180910390f35b600034116100b8576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016100af906101ce565b60405180910390fd5b8073ffffffffffffffffffffffffffffffffffffffff166108fc349081150290604051600060405180830381858888f193505050501580156100fe573d6000803e3d6000fd5b5050565b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60008135905061013581610231565b92915050565b60006020828403121561014d57600080fd5b600061015b84828501610126565b91505092915050565b61016d816101ff565b82525050565b60006101806012836101ee565b91507f496e73756666696369656e742066756e647300000000000000000000000000006000830152602082019050919050565b60006020820190506101c86000830184610164565b92915050565b600060208201905081810360008301526101e781610173565b9050919050565b600082825260208201905092915050565b600061020a82610211565b9050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b61023a816101ff565b811461024557600080fd5b5056fea26469706673582212207876bcaf561398bca18aa677228f0edde5e239987886accdf554331f90742f1a64736f6c63430008000033",
  "deployedBytecode": "0x6080604052600436106100295760003560e01c806349701c5e1461002e5780638da5cb5b1461004a575b600080fd5b6100486004803603810190610043919061013b565b610075565b005b34801561005657600080fd5b5061005f610102565b60405161006c91906101b3565b60405180910390f35b600034116100b8576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016100af906101ce565b60405180910390fd5b8073ffffffffffffffffffffffffffffffffffffffff166108fc349081150290604051600060405180830381858888f193505050501580156100fe573d6000803e3d6000fd5b5050565b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60008135905061013581610231565b92915050565b60006020828403121561014d57600080fd5b600061015b84828501610126565b91505092915050565b61016d816101ff565b82525050565b60006101806012836101ee565b91507f496e73756666696369656e742066756e647300000000000000000000000000006000830152602082019050919050565b60006020820190506101c86000830184610164565b92915050565b600060208201905081810360008301526101e781610173565b9050919050565b600082825260208201905092915050565b600061020a82610211565b9050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b61023a816101ff565b811461024557600080fd5b5056fea26469706673582212207876bcaf561398bca18aa677228f0edde5e239987886accdf554331f90742f1a64736f6c63430008000033",
  "immutableReferences": {},
  "generatedSources": [],
  "deployedGeneratedSources": [
    {
      "ast": {
        "nodeType": "YulBlock",
        "src": "0:2165:1",
        "statements": [
          {
            "body": {
              "nodeType": "YulBlock",
              "src": "67:95:1",
              "statements": [
                {
                  "nodeType": "YulAssignment",
                  "src": "77:29:1",
                  "value": {
                    "arguments": [
                      {
                        "name": "offset",
                        "nodeType": "YulIdentifier",
                        "src": "99:6:1"
                      }
                    ],
                    "functionName": {
                      "name": "calldataload",
                      "nodeType": "YulIdentifier",
                      "src": "86:12:1"
                    },
                    "nodeType": "YulFunctionCall",
                    "src": "86:20:1"
                  },
                  "variableNames": [
                    {
                      "name": "value",
                      "nodeType": "YulIdentifier",
                      "src": "77:5:1"
                    }
                  ]
                },
                {
                  "expression": {
                    "arguments": [
                      {
                        "name": "value",
                        "nodeType": "YulIdentifier",
                        "src": "150:5:1"
                      }
                    ],
                    "functionName": {
                      "name": "validator_revert_t_address_payable",
                      "nodeType": "YulIdentifier",
                      "src": "115:34:1"
                    },
                    "nodeType": "YulFunctionCall",
                    "src": "115:41:1"
                  },
                  "nodeType": "YulExpressionStatement",
                  "src": "115:41:1"
                }
              ]
            },
            "name": "abi_decode_t_address_payable",
            "nodeType": "YulFunctionDefinition",
            "parameters": [
              {
                "name": "offset",
                "nodeType": "YulTypedName",
                "src": "45:6:1",
                "type": ""
              },
              {
                "name": "end",
                "nodeType": "YulTypedName",
                "src": "53:3:1",
                "type": ""
              }
            ],
            "returnVariables": [
              {
                "name": "value",
                "nodeType": "YulTypedName",
                "src": "61:5:1",
                "type": ""
              }
            ],
            "src": "7:155:1"
          },
          {
            "body": {
              "nodeType": "YulBlock",
              "src": "242:204:1",
              "statements": [
                {
                  "body": {
                    "nodeType": "YulBlock",
                    "src": "288:16:1",
                    "statements": [
                      {
                        "expression": {
                          "arguments": [
                            {
                              "kind": "number",
                              "nodeType": "YulLiteral",
                              "src": "297:1:1",
                              "type": "",
                              "value": "0"
                            },
                            {
                              "kind": "number",
                              "nodeType": "YulLiteral",
                              "src": "300:1:1",
                              "type": "",
                              "value": "0"
                            }
                          ],
                          "functionName": {
                            "name": "revert",
                            "nodeType": "YulIdentifier",
                            "src": "290:6:1"
                          },
                          "nodeType": "YulFunctionCall",
                          "src": "290:12:1"
                        },
                        "nodeType": "YulExpressionStatement",
                        "src": "290:12:1"
                      }
                    ]
                  },
                  "condition": {
                    "arguments": [
                      {
                        "arguments": [
                          {
                            "name": "dataEnd",
                            "nodeType": "YulIdentifier",
                            "src": "263:7:1"
                          },
                          {
                            "name": "headStart",
                            "nodeType": "YulIdentifier",
                            "src": "272:9:1"
                          }
                        ],
                        "functionName": {
                          "name": "sub",
                          "nodeType": "YulIdentifier",
                          "src": "259:3:1"
                        },
                        "nodeType": "YulFunctionCall",
                        "src": "259:23:1"
                      },
                      {
                        "kind": "number",
                        "nodeType": "YulLiteral",
                        "src": "284:2:1",
                        "type": "",
                        "value": "32"
                      }
                    ],
                    "functionName": {
                      "name": "slt",
                      "nodeType": "YulIdentifier",
                      "src": "255:3:1"
                    },
                    "nodeType": "YulFunctionCall",
                    "src": "255:32:1"
                  },
                  "nodeType": "YulIf",
                  "src": "252:2:1"
                },
                {
                  "nodeType": "YulBlock",
                  "src": "314:125:1",
                  "statements": [
                    {
                      "nodeType": "YulVariableDeclaration",
                      "src": "329:15:1",
                      "value": {
                        "kind": "number",
                        "nodeType": "YulLiteral",
                        "src": "343:1:1",
                        "type": "",
                        "value": "0"
                      },
                      "variables": [
                        {
                          "name": "offset",
                          "nodeType": "YulTypedName",
                          "src": "333:6:1",
                          "type": ""
                        }
                      ]
                    },
                    {
                      "nodeType": "YulAssignment",
                      "src": "358:71:1",
                      "value": {
                        "arguments": [
                          {
                            "arguments": [
                              {
                                "name": "headStart",
                                "nodeType": "YulIdentifier",
                                "src": "401:9:1"
                              },
                              {
                                "name": "offset",
                                "nodeType": "YulIdentifier",
                                "src": "412:6:1"
                              }
                            ],
                            "functionName": {
                              "name": "add",
                              "nodeType": "YulIdentifier",
                              "src": "397:3:1"
                            },
                            "nodeType": "YulFunctionCall",
                            "src": "397:22:1"
                          },
                          {
                            "name": "dataEnd",
                            "nodeType": "YulIdentifier",
                            "src": "421:7:1"
                          }
                        ],
                        "functionName": {
                          "name": "abi_decode_t_address_payable",
                          "nodeType": "YulIdentifier",
                          "src": "368:28:1"
                        },
                        "nodeType": "YulFunctionCall",
                        "src": "368:61:1"
                      },
                      "variableNames": [
                        {
                          "name": "value0",
                          "nodeType": "YulIdentifier",
                          "src": "358:6:1"
                        }
                      ]
                    }
                  ]
                }
              ]
            },
            "name": "abi_decode_tuple_t_address_payable",
            "nodeType": "YulFunctionDefinition",
            "parameters": [
              {
                "name": "headStart",
                "nodeType": "YulTypedName",
                "src": "212:9:1",
                "type": ""
              },
              {
                "name": "dataEnd",
                "nodeType": "YulTypedName",
                "src": "223:7:1",
                "type": ""
              }
            ],
            "returnVariables": [
              {
                "name": "value0",
                "nodeType": "YulTypedName",
                "src": "235:6:1",
                "type": ""
              }
            ],
            "src": "168:278:1"
          },
          {
            "body": {
              "nodeType": "YulBlock",
              "src": "533:61:1",
              "statements": [
                {
                  "expression": {
                    "arguments": [
                      {
                        "name": "pos",
                        "nodeType": "YulIdentifier",
                        "src": "550:3:1"
                      },
                      {
                        "arguments": [
                          {
                            "name": "value",
                            "nodeType": "YulIdentifier",
                            "src": "581:5:1"
                          }
                        ],
                        "functionName": {
                          "name": "cleanup_t_address_payable",
                          "nodeType": "YulIdentifier",
                          "src": "555:25:1"
                        },
                        "nodeType": "YulFunctionCall",
                        "src": "555:32:1"
                      }
                    ],
                    "functionName": {
                      "name": "mstore",
                      "nodeType": "YulIdentifier",
                      "src": "543:6:1"
                    },
                    "nodeType": "YulFunctionCall",
                    "src": "543:45:1"
                  },
                  "nodeType": "YulExpressionStatement",
                  "src": "543:45:1"
                }
              ]
            },
            "name": "abi_encode_t_address_payable_to_t_address_payable_fromStack",
            "nodeType": "YulFunctionDefinition",
            "parameters": [
              {
                "name": "value",
                "nodeType": "YulTypedName",
                "src": "521:5:1",
                "type": ""
              },
              {
                "name": "pos",
                "nodeType": "YulTypedName",
                "src": "528:3:1",
                "type": ""
              }
            ],
            "src": "452:142:1"
          },
          {
            "body": {
              "nodeType": "YulBlock",
              "src": "746:170:1",
              "statements": [
                {
                  "nodeType": "YulAssignment",
                  "src": "756:74:1",
                  "value": {
                    "arguments": [
                      {
                        "name": "pos",
                        "nodeType": "YulIdentifier",
                        "src": "822:3:1"
                      },
                      {
                        "kind": "number",
                        "nodeType": "YulLiteral",
                        "src": "827:2:1",
                        "type": "",
                        "value": "18"
                      }
                    ],
                    "functionName": {
                      "name": "array_storeLengthForEncoding_t_string_memory_ptr_fromStack",
                      "nodeType": "YulIdentifier",
                      "src": "763:58:1"
                    },
                    "nodeType": "YulFunctionCall",
                    "src": "763:67:1"
                  },
                  "variableNames": [
                    {
                      "name": "pos",
                      "nodeType": "YulIdentifier",
                      "src": "756:3:1"
                    }
                  ]
                },
                {
                  "expression": {
                    "arguments": [
                      {
                        "arguments": [
                          {
                            "name": "pos",
                            "nodeType": "YulIdentifier",
                            "src": "851:3:1"
                          },
                          {
                            "kind": "number",
                            "nodeType": "YulLiteral",
                            "src": "856:1:1",
                            "type": "",
                            "value": "0"
                          }
                        ],
                        "functionName": {
                          "name": "add",
                          "nodeType": "YulIdentifier",
                          "src": "847:3:1"
                        },
                        "nodeType": "YulFunctionCall",
                        "src": "847:11:1"
                      },
                      {
                        "kind": "string",
                        "nodeType": "YulLiteral",
                        "src": "860:20:1",
                        "type": "",
                        "value": "Insufficient funds"
                      }
                    ],
                    "functionName": {
                      "name": "mstore",
                      "nodeType": "YulIdentifier",
                      "src": "840:6:1"
                    },
                    "nodeType": "YulFunctionCall",
                    "src": "840:41:1"
                  },
                  "nodeType": "YulExpressionStatement",
                  "src": "840:41:1"
                },
                {
                  "nodeType": "YulAssignment",
                  "src": "891:19:1",
                  "value": {
                    "arguments": [
                      {
                        "name": "pos",
                        "nodeType": "YulIdentifier",
                        "src": "902:3:1"
                      },
                      {
                        "kind": "number",
                        "nodeType": "YulLiteral",
                        "src": "907:2:1",
                        "type": "",
                        "value": "32"
                      }
                    ],
                    "functionName": {
                      "name": "add",
                      "nodeType": "YulIdentifier",
                      "src": "898:3:1"
                    },
                    "nodeType": "YulFunctionCall",
                    "src": "898:12:1"
                  },
                  "variableNames": [
                    {
                      "name": "end",
                      "nodeType": "YulIdentifier",
                      "src": "891:3:1"
                    }
                  ]
                }
              ]
            },
            "name": "abi_encode_t_stringliteral_63452317cb6d597bef833f023ed2962a84dbd24c571e27629ed1e3056d6cfd8d_to_t_string_memory_ptr_fromStack",
            "nodeType": "YulFunctionDefinition",
            "parameters": [
              {
                "name": "pos",
                "nodeType": "YulTypedName",
                "src": "734:3:1",
                "type": ""
              }
            ],
            "returnVariables": [
              {
                "name": "end",
                "nodeType": "YulTypedName",
                "src": "742:3:1",
                "type": ""
              }
            ],
            "src": "600:316:1"
          },
          {
            "body": {
              "nodeType": "YulBlock",
              "src": "1036:140:1",
              "statements": [
                {
                  "nodeType": "YulAssignment",
                  "src": "1046:26:1",
                  "value": {
                    "arguments": [
                      {
                        "name": "headStart",
                        "nodeType": "YulIdentifier",
                        "src": "1058:9:1"
                      },
                      {
                        "kind": "number",
                        "nodeType": "YulLiteral",
                        "src": "1069:2:1",
                        "type": "",
                        "value": "32"
                      }
                    ],
                    "functionName": {
                      "name": "add",
                      "nodeType": "YulIdentifier",
                      "src": "1054:3:1"
                    },
                    "nodeType": "YulFunctionCall",
                    "src": "1054:18:1"
                  },
                  "variableNames": [
                    {
                      "name": "tail",
                      "nodeType": "YulIdentifier",
                      "src": "1046:4:1"
                    }
                  ]
                },
                {
                  "expression": {
                    "arguments": [
                      {
                        "name": "value0",
                        "nodeType": "YulIdentifier",
                        "src": "1142:6:1"
                      },
                      {
                        "arguments": [
                          {
                            "name": "headStart",
                            "nodeType": "YulIdentifier",
                            "src": "1155:9:1"
                          },
                          {
                            "kind": "number",
                            "nodeType": "YulLiteral",
                            "src": "1166:1:1",
                            "type": "",
                            "value": "0"
                          }
                        ],
                        "functionName": {
                          "name": "add",
                          "nodeType": "YulIdentifier",
                          "src": "1151:3:1"
                        },
                        "nodeType": "YulFunctionCall",
                        "src": "1151:17:1"
                      }
                    ],
                    "functionName": {
                      "name": "abi_encode_t_address_payable_to_t_address_payable_fromStack",
                      "nodeType": "YulIdentifier",
                      "src": "1082:59:1"
                    },
                    "nodeType": "YulFunctionCall",
                    "src": "1082:87:1"
                  },
                  "nodeType": "YulExpressionStatement",
                  "src": "1082:87:1"
                }
              ]
            },
            "name": "abi_encode_tuple_t_address_payable__to_t_address_payable__fromStack_reversed",
            "nodeType": "YulFunctionDefinition",
            "parameters": [
              {
                "name": "headStart",
                "nodeType": "YulTypedName",
                "src": "1008:9:1",
                "type": ""
              },
              {
                "name": "value0",
                "nodeType": "YulTypedName",
                "src": "1020:6:1",
                "type": ""
              }
            ],
            "returnVariables": [
              {
                "name": "tail",
                "nodeType": "YulTypedName",
                "src": "1031:4:1",
                "type": ""
              }
            ],
            "src": "922:254:1"
          },
          {
            "body": {
              "nodeType": "YulBlock",
              "src": "1353:248:1",
              "statements": [
                {
                  "nodeType": "YulAssignment",
                  "src": "1363:26:1",
                  "value": {
                    "arguments": [
                      {
                        "name": "headStart",
                        "nodeType": "YulIdentifier",
                        "src": "1375:9:1"
                      },
                      {
                        "kind": "number",
                        "nodeType": "YulLiteral",
                        "src": "1386:2:1",
                        "type": "",
                        "value": "32"
                      }
                    ],
                    "functionName": {
                      "name": "add",
                      "nodeType": "YulIdentifier",
                      "src": "1371:3:1"
                    },
                    "nodeType": "YulFunctionCall",
                    "src": "1371:18:1"
                  },
                  "variableNames": [
                    {
                      "name": "tail",
                      "nodeType": "YulIdentifier",
                      "src": "1363:4:1"
                    }
                  ]
                },
                {
                  "expression": {
                    "arguments": [
                      {
                        "arguments": [
                          {
                            "name": "headStart",
                            "nodeType": "YulIdentifier",
                            "src": "1410:9:1"
                          },
                          {
                            "kind": "number",
                            "nodeType": "YulLiteral",
                            "src": "1421:1:1",
                            "type": "",
                            "value": "0"
                          }
                        ],
                        "functionName": {
                          "name": "add",
                          "nodeType": "YulIdentifier",
                          "src": "1406:3:1"
                        },
                        "nodeType": "YulFunctionCall",
                        "src": "1406:17:1"
                      },
                      {
                        "arguments": [
                          {
                            "name": "tail",
                            "nodeType": "YulIdentifier",
                            "src": "1429:4:1"
                          },
                          {
                            "name": "headStart",
                            "nodeType": "YulIdentifier",
                            "src": "1435:9:1"
                          }
                        ],
                        "functionName": {
                          "name": "sub",
                          "nodeType": "YulIdentifier",
                          "src": "1425:3:1"
                        },
                        "nodeType": "YulFunctionCall",
                        "src": "1425:20:1"
                      }
                    ],
                    "functionName": {
                      "name": "mstore",
                      "nodeType": "YulIdentifier",
                      "src": "1399:6:1"
                    },
                    "nodeType": "YulFunctionCall",
                    "src": "1399:47:1"
                  },
                  "nodeType": "YulExpressionStatement",
                  "src": "1399:47:1"
                },
                {
                  "nodeType": "YulAssignment",
                  "src": "1455:139:1",
                  "value": {
                    "arguments": [
                      {
                        "name": "tail",
                        "nodeType": "YulIdentifier",
                        "src": "1589:4:1"
                      }
                    ],
                    "functionName": {
                      "name": "abi_encode_t_stringliteral_63452317cb6d597bef833f023ed2962a84dbd24c571e27629ed1e3056d6cfd8d_to_t_string_memory_ptr_fromStack",
                      "nodeType": "YulIdentifier",
                      "src": "1463:124:1"
                    },
                    "nodeType": "YulFunctionCall",
                    "src": "1463:131:1"
                  },
                  "variableNames": [
                    {
                      "name": "tail",
                      "nodeType": "YulIdentifier",
                      "src": "1455:4:1"
                    }
                  ]
                }
              ]
            },
            "name": "abi_encode_tuple_t_stringliteral_63452317cb6d597bef833f023ed2962a84dbd24c571e27629ed1e3056d6cfd8d__to_t_string_memory_ptr__fromStack_reversed",
            "nodeType": "YulFunctionDefinition",
            "parameters": [
              {
                "name": "headStart",
                "nodeType": "YulTypedName",
                "src": "1333:9:1",
                "type": ""
              }
            ],
            "returnVariables": [
              {
                "name": "tail",
                "nodeType": "YulTypedName",
                "src": "1348:4:1",
                "type": ""
              }
            ],
            "src": "1182:419:1"
          },
          {
            "body": {
              "nodeType": "YulBlock",
              "src": "1703:73:1",
              "statements": [
                {
                  "expression": {
                    "arguments": [
                      {
                        "name": "pos",
                        "nodeType": "YulIdentifier",
                        "src": "1720:3:1"
                      },
                      {
                        "name": "length",
                        "nodeType": "YulIdentifier",
                        "src": "1725:6:1"
                      }
                    ],
                    "functionName": {
                      "name": "mstore",
                      "nodeType": "YulIdentifier",
                      "src": "1713:6:1"
                    },
                    "nodeType": "YulFunctionCall",
                    "src": "1713:19:1"
                  },
                  "nodeType": "YulExpressionStatement",
                  "src": "1713:19:1"
                },
                {
                  "nodeType": "YulAssignment",
                  "src": "1741:29:1",
                  "value": {
                    "arguments": [
                      {
                        "name": "pos",
                        "nodeType": "YulIdentifier",
                        "src": "1760:3:1"
                      },
                      {
                        "kind": "number",
                        "nodeType": "YulLiteral",
                        "src": "1765:4:1",
                        "type": "",
                        "value": "0x20"
                      }
                    ],
                    "functionName": {
                      "name": "add",
                      "nodeType": "YulIdentifier",
                      "src": "1756:3:1"
                    },
                    "nodeType": "YulFunctionCall",
                    "src": "1756:14:1"
                  },
                  "variableNames": [
                    {
                      "name": "updated_pos",
                      "nodeType": "YulIdentifier",
                      "src": "1741:11:1"
                    }
                  ]
                }
              ]
            },
            "name": "array_storeLengthForEncoding_t_string_memory_ptr_fromStack",
            "nodeType": "YulFunctionDefinition",
            "parameters": [
              {
                "name": "pos",
                "nodeType": "YulTypedName",
                "src": "1675:3:1",
                "type": ""
              },
              {
                "name": "length",
                "nodeType": "YulTypedName",
                "src": "1680:6:1",
                "type": ""
              }
            ],
            "returnVariables": [
              {
                "name": "updated_pos",
                "nodeType": "YulTypedName",
                "src": "1691:11:1",
                "type": ""
              }
            ],
            "src": "1607:169:1"
          },
          {
            "body": {
              "nodeType": "YulBlock",
              "src": "1835:51:1",
              "statements": [
                {
                  "nodeType": "YulAssignment",
                  "src": "1845:35:1",
                  "value": {
                    "arguments": [
                      {
                        "name": "value",
                        "nodeType": "YulIdentifier",
                        "src": "1874:5:1"
                      }
                    ],
                    "functionName": {
                      "name": "cleanup_t_uint160",
                      "nodeType": "YulIdentifier",
                      "src": "1856:17:1"
                    },
                    "nodeType": "YulFunctionCall",
                    "src": "1856:24:1"
                  },
                  "variableNames": [
                    {
                      "name": "cleaned",
                      "nodeType": "YulIdentifier",
                      "src": "1845:7:1"
                    }
                  ]
                }
              ]
            },
            "name": "cleanup_t_address_payable",
            "nodeType": "YulFunctionDefinition",
            "parameters": [
              {
                "name": "value",
                "nodeType": "YulTypedName",
                "src": "1817:5:1",
                "type": ""
              }
            ],
            "returnVariables": [
              {
                "name": "cleaned",
                "nodeType": "YulTypedName",
                "src": "1827:7:1",
                "type": ""
              }
            ],
            "src": "1782:104:1"
          },
          {
            "body": {
              "nodeType": "YulBlock",
              "src": "1937:81:1",
              "statements": [
                {
                  "nodeType": "YulAssignment",
                  "src": "1947:65:1",
                  "value": {
                    "arguments": [
                      {
                        "name": "value",
                        "nodeType": "YulIdentifier",
                        "src": "1962:5:1"
                      },
                      {
                        "kind": "number",
                        "nodeType": "YulLiteral",
                        "src": "1969:42:1",
                        "type": "",
                        "value": "0xffffffffffffffffffffffffffffffffffffffff"
                      }
                    ],
                    "functionName": {
                      "name": "and",
                      "nodeType": "YulIdentifier",
                      "src": "1958:3:1"
                    },
                    "nodeType": "YulFunctionCall",
                    "src": "1958:54:1"
                  },
                  "variableNames": [
                    {
                      "name": "cleaned",
                      "nodeType": "YulIdentifier",
                      "src": "1947:7:1"
                    }
                  ]
                }
              ]
            },
            "name": "cleanup_t_uint160",
            "nodeType": "YulFunctionDefinition",
            "parameters": [
              {
                "name": "value",
                "nodeType": "YulTypedName",
                "src": "1919:5:1",
                "type": ""
              }
            ],
            "returnVariables": [
              {
                "name": "cleaned",
                "nodeType": "YulTypedName",
                "src": "1929:7:1",
                "type": ""
              }
            ],
            "src": "1892:126:1"
          },
          {
            "body": {
              "nodeType": "YulBlock",
              "src": "2075:87:1",
              "statements": [
                {
                  "body": {
                    "nodeType": "YulBlock",
                    "src": "2140:16:1",
                    "statements": [
                      {
                        "expression": {
                          "arguments": [
                            {
                              "kind": "number",
                              "nodeType": "YulLiteral",
                              "src": "2149:1:1",
                              "type": "",
                              "value": "0"
                            },
                            {
                              "kind": "number",
                              "nodeType": "YulLiteral",
                              "src": "2152:1:1",
                              "type": "",
                              "value": "0"
                            }
                          ],
                          "functionName": {
                            "name": "revert",
                            "nodeType": "YulIdentifier",
                            "src": "2142:6:1"
                          },
                          "nodeType": "YulFunctionCall",
                          "src": "2142:12:1"
                        },
                        "nodeType": "YulExpressionStatement",
                        "src": "2142:12:1"
                      }
                    ]
                  },
                  "condition": {
                    "arguments": [
                      {
                        "arguments": [
                          {
                            "name": "value",
                            "nodeType": "YulIdentifier",
                            "src": "2098:5:1"
                          },
                          {
                            "arguments": [
                              {
                                "name": "value",
                                "nodeType": "YulIdentifier",
                                "src": "2131:5:1"
                              }
                            ],
                            "functionName": {
                              "name": "cleanup_t_address_payable",
                              "nodeType": "YulIdentifier",
                              "src": "2105:25:1"
                            },
                            "nodeType": "YulFunctionCall",
                            "src": "2105:32:1"
                          }
                        ],
                        "functionName": {
                          "name": "eq",
                          "nodeType": "YulIdentifier",
                          "src": "2095:2:1"
                        },
                        "nodeType": "YulFunctionCall",
                        "src": "2095:43:1"
                      }
                    ],
                    "functionName": {
                      "name": "iszero",
                      "nodeType": "YulIdentifier",
                      "src": "2088:6:1"
                    },
                    "nodeType": "YulFunctionCall",
                    "src": "2088:51:1"
                  },
                  "nodeType": "YulIf",
                  "src": "2085:2:1"
                }
              ]
            },
            "name": "validator_revert_t_address_payable",
            "nodeType": "YulFunctionDefinition",
            "parameters": [
              {
                "name": "value",
                "nodeType": "YulTypedName",
                "src": "2068:5:1",
                "type": ""
              }
            ],
            "src": "2024:138:1"
          }
        ]
      },
      "contents": "{\n\n    function abi_decode_t_address_payable(offset, end) -> value {\n        value := calldataload(offset)\n        validator_revert_t_address_payable(value)\n    }\n\n    function abi_decode_tuple_t_address_payable(headStart, dataEnd) -> value0 {\n        if slt(sub(dataEnd, headStart), 32) { revert(0, 0) }\n\n        {\n\n            let offset := 0\n\n            value0 := abi_decode_t_address_payable(add(headStart, offset), dataEnd)\n        }\n\n    }\n\n    function abi_encode_t_address_payable_to_t_address_payable_fromStack(value, pos) {\n        mstore(pos, cleanup_t_address_payable(value))\n    }\n\n    function abi_encode_t_stringliteral_63452317cb6d597bef833f023ed2962a84dbd24c571e27629ed1e3056d6cfd8d_to_t_string_memory_ptr_fromStack(pos) -> end {\n        pos := array_storeLengthForEncoding_t_string_memory_ptr_fromStack(pos, 18)\n\n        mstore(add(pos, 0), \"Insufficient funds\")\n\n        end := add(pos, 32)\n    }\n\n    function abi_encode_tuple_t_address_payable__to_t_address_payable__fromStack_reversed(headStart , value0) -> tail {\n        tail := add(headStart, 32)\n\n        abi_encode_t_address_payable_to_t_address_payable_fromStack(value0,  add(headStart, 0))\n\n    }\n\n    function abi_encode_tuple_t_stringliteral_63452317cb6d597bef833f023ed2962a84dbd24c571e27629ed1e3056d6cfd8d__to_t_string_memory_ptr__fromStack_reversed(headStart ) -> tail {\n        tail := add(headStart, 32)\n\n        mstore(add(headStart, 0), sub(tail, headStart))\n        tail := abi_encode_t_stringliteral_63452317cb6d597bef833f023ed2962a84dbd24c571e27629ed1e3056d6cfd8d_to_t_string_memory_ptr_fromStack( tail)\n\n    }\n\n    function array_storeLengthForEncoding_t_string_memory_ptr_fromStack(pos, length) -> updated_pos {\n        mstore(pos, length)\n        updated_pos := add(pos, 0x20)\n    }\n\n    function cleanup_t_address_payable(value) -> cleaned {\n        cleaned := cleanup_t_uint160(value)\n    }\n\n    function cleanup_t_uint160(value) -> cleaned {\n        cleaned := and(value, 0xffffffffffffffffffffffffffffffffffffffff)\n    }\n\n    function validator_revert_t_address_payable(value) {\n        if iszero(eq(value, cleanup_t_address_payable(value))) { revert(0, 0) }\n    }\n\n}\n",
      "id": 1,
      "language": "Yul",
      "name": "#utility.yul"
    }
  ],
  "sourceMap": "40:291:0:-:0;;;98:58;;;;;;;;;;138:10;122:5;;:27;;;;;;;;;;;;;;;;;;40:291;;;;;;",
  "deployedSourceMap": "40:291:0:-:0;;;;;;;;;;;;;;;;;;;;;;;;;;162:167;;;;;;;;;;;;;:::i;:::-;;:::i;:::-;;63:28;;;;;;;;;;;;;:::i;:::-;;;;;;;:::i;:::-;;;;;;;;162:167;259:1;247:9;:13;239:44;;;;;;;;;;;;:::i;:::-;;;;;;;;;293:9;:18;;:29;312:9;293:29;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;162:167;:::o;63:28::-;;;;;;;;;;;;:::o;7:155:1:-;;99:6;86:20;77:29;;115:41;150:5;115:41;:::i;:::-;67:95;;;;:::o;168:278::-;;284:2;272:9;263:7;259:23;255:32;252:2;;;300:1;297;290:12;252:2;343:1;368:61;421:7;412:6;401:9;397:22;368:61;:::i;:::-;358:71;;314:125;242:204;;;;:::o;452:142::-;555:32;581:5;555:32;:::i;:::-;550:3;543:45;533:61;;:::o;600:316::-;;763:67;827:2;822:3;763:67;:::i;:::-;756:74;;860:20;856:1;851:3;847:11;840:41;907:2;902:3;898:12;891:19;;746:170;;;:::o;922:254::-;;1069:2;1058:9;1054:18;1046:26;;1082:87;1166:1;1155:9;1151:17;1142:6;1082:87;:::i;:::-;1036:140;;;;:::o;1182:419::-;;1386:2;1375:9;1371:18;1363:26;;1435:9;1429:4;1425:20;1421:1;1410:9;1406:17;1399:47;1463:131;1589:4;1463:131;:::i;:::-;1455:139;;1353:248;;;:::o;1607:169::-;;1725:6;1720:3;1713:19;1765:4;1760:3;1756:14;1741:29;;1703:73;;;;:::o;1782:104::-;;1856:24;1874:5;1856:24;:::i;:::-;1845:35;;1835:51;;;:::o;1892:126::-;;1969:42;1962:5;1958:54;1947:65;;1937:81;;;:::o;2024:138::-;2105:32;2131:5;2105:32;:::i;:::-;2098:5;2095:43;2085:2;;2152:1;2149;2142:12;2085:2;2075:87;:::o",
  "source": "// Payment.sol\npragma solidity ^0.8.0;\n\ncontract Payment {\n    address payable public owner;\n\n    constructor() {\n        owner = payable(msg.sender);\n    }\n\n    function makePaymentTo(address payable _receiver) external payable {\n        require(msg.value > 0, \"Insufficient funds\");\n        _receiver.transfer(msg.value);\n    }\n}\n",
  "sourcePath": "/home/kub/Desktop/Blockchain_project/contracts/Payment.sol",
  "ast": {
    "absolutePath": "project:/contracts/Payment.sol",
    "exportedSymbols": {
      "Payment": [
        37
      ]
    },
    "id": 38,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 1,
        "literals": [
          "solidity",
          "^",
          "0.8",
          ".0"
        ],
        "nodeType": "PragmaDirective",
        "src": "15:23:0"
      },
      {
        "abstract": false,
        "baseContracts": [],
        "contractDependencies": [],
        "contractKind": "contract",
        "fullyImplemented": true,
        "id": 37,
        "linearizedBaseContracts": [
          37
        ],
        "name": "Payment",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "constant": false,
            "functionSelector": "8da5cb5b",
            "id": 3,
            "mutability": "mutable",
            "name": "owner",
            "nodeType": "VariableDeclaration",
            "scope": 37,
            "src": "63:28:0",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_address_payable",
              "typeString": "address payable"
            },
            "typeName": {
              "id": 2,
              "name": "address",
              "nodeType": "ElementaryTypeName",
              "src": "63:15:0",
              "stateMutability": "payable",
              "typeDescriptions": {
                "typeIdentifier": "t_address_payable",
                "typeString": "address payable"
              }
            },
            "visibility": "public"
          },
          {
            "body": {
              "id": 14,
              "nodeType": "Block",
              "src": "112:44:0",
              "statements": [
                {
                  "expression": {
                    "id": 12,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "id": 6,
                      "name": "owner",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 3,
                      "src": "122:5:0",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address_payable",
                        "typeString": "address payable"
                      }
                    },
                    "nodeType": "Assignment",
                    "operator": "=",
                    "rightHandSide": {
                      "arguments": [
                        {
                          "expression": {
                            "id": 9,
                            "name": "msg",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 4294967281,
                            "src": "138:3:0",
                            "typeDescriptions": {
                              "typeIdentifier": "t_magic_message",
                              "typeString": "msg"
                            }
                          },
                          "id": 10,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "sender",
                          "nodeType": "MemberAccess",
                          "src": "138:10:0",
                          "typeDescriptions": {
                            "typeIdentifier": "t_address",
                            "typeString": "address"
                          }
                        }
                      ],
                      "expression": {
                        "argumentTypes": [
                          {
                            "typeIdentifier": "t_address",
                            "typeString": "address"
                          }
                        ],
                        "id": 8,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": true,
                        "lValueRequested": false,
                        "nodeType": "ElementaryTypeNameExpression",
                        "src": "130:8:0",
                        "typeDescriptions": {
                          "typeIdentifier": "t_type$_t_address_payable_$",
                          "typeString": "type(address payable)"
                        },
                        "typeName": {
                          "id": 7,
                          "name": "address",
                          "nodeType": "ElementaryTypeName",
                          "src": "130:8:0",
                          "stateMutability": "payable",
                          "typeDescriptions": {}
                        }
                      },
                      "id": 11,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "kind": "typeConversion",
                      "lValueRequested": false,
                      "names": [],
                      "nodeType": "FunctionCall",
                      "src": "130:19:0",
                      "tryCall": false,
                      "typeDescriptions": {
                        "typeIdentifier": "t_address_payable",
                        "typeString": "address payable"
                      }
                    },
                    "src": "122:27:0",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address_payable",
                      "typeString": "address payable"
                    }
                  },
                  "id": 13,
                  "nodeType": "ExpressionStatement",
                  "src": "122:27:0"
                }
              ]
            },
            "id": 15,
            "implemented": true,
            "kind": "constructor",
            "modifiers": [],
            "name": "",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 4,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "109:2:0"
            },
            "returnParameters": {
              "id": 5,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "112:0:0"
            },
            "scope": 37,
            "src": "98:58:0",
            "stateMutability": "nonpayable",
            "virtual": false,
            "visibility": "public"
          },
          {
            "body": {
              "id": 35,
              "nodeType": "Block",
              "src": "229:100:0",
              "statements": [
                {
                  "expression": {
                    "arguments": [
                      {
                        "commonType": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        },
                        "id": 24,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "leftExpression": {
                          "expression": {
                            "id": 21,
                            "name": "msg",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 4294967281,
                            "src": "247:3:0",
                            "typeDescriptions": {
                              "typeIdentifier": "t_magic_message",
                              "typeString": "msg"
                            }
                          },
                          "id": 22,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "value",
                          "nodeType": "MemberAccess",
                          "src": "247:9:0",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "nodeType": "BinaryOperation",
                        "operator": ">",
                        "rightExpression": {
                          "hexValue": "30",
                          "id": 23,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "number",
                          "lValueRequested": false,
                          "nodeType": "Literal",
                          "src": "259:1:0",
                          "typeDescriptions": {
                            "typeIdentifier": "t_rational_0_by_1",
                            "typeString": "int_const 0"
                          },
                          "value": "0"
                        },
                        "src": "247:13:0",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        }
                      },
                      {
                        "hexValue": "496e73756666696369656e742066756e6473",
                        "id": 25,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": true,
                        "kind": "string",
                        "lValueRequested": false,
                        "nodeType": "Literal",
                        "src": "262:20:0",
                        "typeDescriptions": {
                          "typeIdentifier": "t_stringliteral_63452317cb6d597bef833f023ed2962a84dbd24c571e27629ed1e3056d6cfd8d",
                          "typeString": "literal_string \"Insufficient funds\""
                        },
                        "value": "Insufficient funds"
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        },
                        {
                          "typeIdentifier": "t_stringliteral_63452317cb6d597bef833f023ed2962a84dbd24c571e27629ed1e3056d6cfd8d",
                          "typeString": "literal_string \"Insufficient funds\""
                        }
                      ],
                      "id": 20,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        4294967278,
                        4294967278
                      ],
                      "referencedDeclaration": 4294967278,
                      "src": "239:7:0",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$",
                        "typeString": "function (bool,string memory) pure"
                      }
                    },
                    "id": 26,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "239:44:0",
                    "tryCall": false,
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 27,
                  "nodeType": "ExpressionStatement",
                  "src": "239:44:0"
                },
                {
                  "expression": {
                    "arguments": [
                      {
                        "expression": {
                          "id": 31,
                          "name": "msg",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 4294967281,
                          "src": "312:3:0",
                          "typeDescriptions": {
                            "typeIdentifier": "t_magic_message",
                            "typeString": "msg"
                          }
                        },
                        "id": 32,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "value",
                        "nodeType": "MemberAccess",
                        "src": "312:9:0",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      ],
                      "expression": {
                        "id": 28,
                        "name": "_receiver",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 17,
                        "src": "293:9:0",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address_payable",
                          "typeString": "address payable"
                        }
                      },
                      "id": 30,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "memberName": "transfer",
                      "nodeType": "MemberAccess",
                      "src": "293:18:0",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_transfer_nonpayable$_t_uint256_$returns$__$",
                        "typeString": "function (uint256)"
                      }
                    },
                    "id": 33,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "293:29:0",
                    "tryCall": false,
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 34,
                  "nodeType": "ExpressionStatement",
                  "src": "293:29:0"
                }
              ]
            },
            "functionSelector": "49701c5e",
            "id": 36,
            "implemented": true,
            "kind": "function",
            "modifiers": [],
            "name": "makePaymentTo",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 18,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 17,
                  "mutability": "mutable",
                  "name": "_receiver",
                  "nodeType": "VariableDeclaration",
                  "scope": 36,
                  "src": "185:25:0",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_address_payable",
                    "typeString": "address payable"
                  },
                  "typeName": {
                    "id": 16,
                    "name": "address",
                    "nodeType": "ElementaryTypeName",
                    "src": "185:15:0",
                    "stateMutability": "payable",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address_payable",
                      "typeString": "address payable"
                    }
                  },
                  "visibility": "internal"
                }
              ],
              "src": "184:27:0"
            },
            "returnParameters": {
              "id": 19,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "229:0:0"
            },
            "scope": 37,
            "src": "162:167:0",
            "stateMutability": "payable",
            "virtual": false,
            "visibility": "external"
          }
        ],
        "scope": 38,
        "src": "40:291:0"
      }
    ],
    "src": "15:317:0"
  },
  "compiler": {
    "name": "solc",
    "version": "0.8.0+commit.c7dfd78e.Emscripten.clang"
  },
  "networks": {
    "5777": {
      "events": {},
      "links": {},
      "address": "0x9a82fdBb22E6cEE18B1BBBEA0e06ed8BCEA0801e",
      "transactionHash": "0xec3ca2b4dad2b034def2b85609f48421c12b1f12518f45f5a14b6316a2b39352"
    }
  },
  "schemaVersion": "3.4.15",
  "updatedAt": "2023-11-27T16:15:28.072Z",
  "networkType": "ethereum",
  "devdoc": {
    "kind": "dev",
    "methods": {},
    "version": 1
  },
  "userdoc": {
    "kind": "user",
    "methods": {},
    "version": 1
  }
}
          ];

          const contractAddress = '0x9a82fdBb22E6cEE18B1BBBEA0e06ed8BCEA0801e'; // Replace with your contract's address

          const contract = new provider.eth.Contract(contractABI, contractAddress);

          contract.methods.makePaymentTo(receiverAddress)
            .send({ from: userAddress, value: provider.utils.toWei('0.1', 'ether') })
            .on('transactionHash', function (hash) {
              console.log('Transaction Hash:', hash);
              // Transaction sent, handle success or confirmation here
            })
            .on('error', function (error) {
              console.error('Transaction Error:', error);
              // Handle error
            });
        } catch (error) {
          console.error('MetaMask account access denied or error:', error);
          // Handle error
        }
      } else {
        console.error('MetaMask not detected');
        // Inform the user to install MetaMask
      }
    }




function jump() {
  if (!isJumping) {
    isJumping = true;
    let position = 2;
    jumpInterval = setInterval(() => {
        up=true;
        if (position >= 250 ) {
          clearInterval(jumpInterval);
          up = false;
          downInterval = setInterval(() => {
            if (position <= 2 ) {
              clearInterval(downInterval);
              isJumping = false;
            }
            position -= s/2;
            luffy.style.bottom = position + 'px';
          }, 15);
        }
        position += s/2;
        luffy.style.bottom = position + 'px';
      }, 15);
  }
}

document.addEventListener('keydown', (event) => {
  if (event.code === 'Space') {
    jump();
  }
});

const obstacleImages = [
  '15766.png',
  '15767.png',
  '15770.png',
  '15775.png',
  '15782.png',
];

function pickRandomImage(images) {
  const randomIndex = Math.floor(Math.random() * images.length);
  return images[randomIndex];
}

async function createObstacle() {
  if (gameStart){
    console.log('create obstacle');
    s = s + 0.8;//+Math.random(0.5,0.8);

    const images = obstacleImages.map((imageName) => 'png/' + imageName);

    const obstacle = document.createElement('img');

    //obstacle.style.left = '800px';
    //obstacle.style.bottom = '0px';

    obstacle.classList.add('obstacle');
    obstacle.src = pickRandomImage(images);

    gameContainer.appendChild(obstacle);
    obstacles.push(obstacle);

    moveObstacle(obstacle);

  }
}

function moveObstacle(obstacle) {
  let obstaclePosition = 1800;

  const moveInterval = setInterval(() => {
    if (obstaclePosition < -150) {
      clearInterval(moveInterval);
      obstacle.remove();
      obstacles = obstacles.filter((ob) => ob !== obstacle);
    } else {
      obstaclePosition -= s;
      obstacle.style.left = obstaclePosition + 'px';

      if (checkCollision(obstacle)) {
        endGame();
        clearInterval(moveInterval);
      }
      else{
        //updateScore()
        scoreBoard.innerHTML = 'Score: ' + score;
      }
    }
  }, 20);

}

setInterval(createObstacle, 4500);

function checkCollision(obstacle) {
  const luffyRect = luffy.getBoundingClientRect();
  const obstacleRect = obstacle.getBoundingClientRect();

  /*console.log('obstacle')
  console.log(obstacleRect.left)
  console.log(obstacleRect.right)
  
  console.log('luffy')
  console.log(luffyRect.left)
  console.log(luffyRect.right)*/

  return (
    luffyRect.bottom >= obstacleRect.top + 10 &&
    luffyRect.top <= obstacleRect.bottom &&
    luffyRect.right >= obstacleRect.left + 40 &&
    luffyRect.left <= obstacleRect.right + 10
  );
}

function endGame() {
  s=5;
  alert('Game Over!');
  clearInterval(scoreInterval);
  scoreBoard.innerHTML = 'Score: ' + score;
  obstacles.forEach((obstacle) => obstacle.remove());
  obstacles = [];
  if (up){
    clearInterval(jumpInterval);
    let position = parseInt(luffy.style.bottom);
    downInterval = setInterval(() => {
      if (position <= 2 ) {
        clearInterval(downInterval);
        isJumping = false;
        down=false;
      }
      position -= s/2;
      luffy.style.bottom = position + 'px';
    }, 15);
    
  }
  // display restart btn
  restartBtn.disabled = false;
  gameStart=false;

  //check delle vite

  if (L1.hidden == false){
    if(L2.hidden == false){
      if(L3.hidden == false){
        L3.hidden=true;
      }
      else{
        L2.hidden = true;
      }
    } 
    else{
      L1.hidden = true;
      score = 0;
      startBtn.disabled = false;
      restartBtn.disabled = true;
    } 
  }
 
}

function updateScore() {
  score++;
}

function restartGame(){
  gameStart = true;
  moveBackground();
  scoreInterval = setInterval(updateScore, 250);
}


//setInterval(updateScore, 100);


function moveBackground() {
  bgPosition -= 1;

  if (bgPosition <= -800) {
    bgPosition = 0;
  }

  background.style.backgroundPositionX = bgPosition + 'px';

  requestAnimationFrame(moveBackground);
}

function startGame() {
  //add the payment function
  //makePayment()
  s=5;
  gameStart = true;
  //e.preventDefault();
  moveBackground();
  //createObstacle();
  startBtn.disabled = true;
    // hide background
  background.style.display = 'none';
  scoreInterval = setInterval(updateScore, 250);
  //Vite visualizzate tutte e 3 almeno finchè non sarà implementato il pagamento
  L1.hidden=false;
  L2.hidden=false;
  L3.hidden=false;
}
//gameForm.addEventListener('submit', startGame);

startBtn.addEventListener('click',startGame)
restartBtn.addEventListener('click',restartGame)

//gameForm.addEventListener('restart', restartGame); 


document.getElementById
// jump luffy on click space
document.addEventListener('keydown', (event) => {
  if (event.code === 'Space') {
    jump();
  }
});


// get username
function getUsername(e) {
  e.preventDefault();
  const name = username.value;
  gameInsights.innerHTML = `Hello ${name}! <br> Use spacebar to jump.`;
}

