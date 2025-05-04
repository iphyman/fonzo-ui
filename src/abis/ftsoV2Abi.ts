export const ftsoV2Abi = [
    {
        "type": "function",
        "name": "calculateFeeById",
        "inputs": [
            {
                "name": "_feedId",
                "type": "bytes21",
                "internalType": "bytes21"
            }
        ],
        "outputs": [
            {
                "name": "_fee",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "calculateFeeByIds",
        "inputs": [
            {
                "name": "_feedIds",
                "type": "bytes21[]",
                "internalType": "bytes21[]"
            }
        ],
        "outputs": [
            {
                "name": "_fee",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "getFeedById",
        "inputs": [
            {
                "name": "_feedId",
                "type": "bytes21",
                "internalType": "bytes21"
            }
        ],
        "outputs": [
            {
                "name": "_value",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "_decimals",
                "type": "int8",
                "internalType": "int8"
            },
            {
                "name": "_timestamp",
                "type": "uint64",
                "internalType": "uint64"
            }
        ],
        "stateMutability": "payable"
    },
    {
        "type": "function",
        "name": "getFeedByIdInWei",
        "inputs": [
            {
                "name": "_feedId",
                "type": "bytes21",
                "internalType": "bytes21"
            }
        ],
        "outputs": [
            {
                "name": "_value",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "_timestamp",
                "type": "uint64",
                "internalType": "uint64"
            }
        ],
        "stateMutability": "payable"
    },
    {
        "type": "function",
        "name": "getFeedIdChanges",
        "inputs": [],
        "outputs": [
            {
                "name": "_feedIdChanges",
                "type": "tuple[]",
                "internalType": "struct FtsoV2Interface.FeedIdChange[]",
                "components": [
                    {
                        "name": "oldFeedId",
                        "type": "bytes21",
                        "internalType": "bytes21"
                    },
                    {
                        "name": "newFeedId",
                        "type": "bytes21",
                        "internalType": "bytes21"
                    }
                ]
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "getFeedsById",
        "inputs": [
            {
                "name": "_feedIds",
                "type": "bytes21[]",
                "internalType": "bytes21[]"
            }
        ],
        "outputs": [
            {
                "name": "_values",
                "type": "uint256[]",
                "internalType": "uint256[]"
            },
            {
                "name": "_decimals",
                "type": "int8[]",
                "internalType": "int8[]"
            },
            {
                "name": "_timestamp",
                "type": "uint64",
                "internalType": "uint64"
            }
        ],
        "stateMutability": "payable"
    },
    {
        "type": "function",
        "name": "getFeedsByIdInWei",
        "inputs": [
            {
                "name": "_feedIds",
                "type": "bytes21[]",
                "internalType": "bytes21[]"
            }
        ],
        "outputs": [
            {
                "name": "_values",
                "type": "uint256[]",
                "internalType": "uint256[]"
            },
            {
                "name": "_timestamp",
                "type": "uint64",
                "internalType": "uint64"
            }
        ],
        "stateMutability": "payable"
    },
    {
        "type": "function",
        "name": "getFtsoProtocolId",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "getSupportedFeedIds",
        "inputs": [],
        "outputs": [
            {
                "name": "_feedIds",
                "type": "bytes21[]",
                "internalType": "bytes21[]"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "verifyFeedData",
        "inputs": [
            {
                "name": "_feedData",
                "type": "tuple",
                "internalType": "struct FtsoV2Interface.FeedDataWithProof",
                "components": [
                    {
                        "name": "proof",
                        "type": "bytes32[]",
                        "internalType": "bytes32[]"
                    },
                    {
                        "name": "body",
                        "type": "tuple",
                        "internalType": "struct FtsoV2Interface.FeedData",
                        "components": [
                            {
                                "name": "votingRoundId",
                                "type": "uint32",
                                "internalType": "uint32"
                            },
                            {
                                "name": "id",
                                "type": "bytes21",
                                "internalType": "bytes21"
                            },
                            {
                                "name": "value",
                                "type": "int32",
                                "internalType": "int32"
                            },
                            {
                                "name": "turnoutBIPS",
                                "type": "uint16",
                                "internalType": "uint16"
                            },
                            {
                                "name": "decimals",
                                "type": "int8",
                                "internalType": "int8"
                            }
                        ]
                    }
                ]
            }
        ],
        "outputs": [
            {
                "name": "",
                "type": "bool",
                "internalType": "bool"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "event",
        "name": "FeedIdChanged",
        "inputs": [
            {
                "name": "oldFeedId",
                "type": "bytes21",
                "indexed": true,
                "internalType": "bytes21"
            },
            {
                "name": "newFeedId",
                "type": "bytes21",
                "indexed": true,
                "internalType": "bytes21"
            }
        ],
        "anonymous": false
    }
] as const;