export const fonzoMarketAbi = [
    {
        "type": "constructor",
        "inputs": [
            {
                "name": "_owner",
                "type": "address",
                "internalType": "address"
            },
            {
                "name": "_ftsoV2",
                "type": "address",
                "internalType": "address"
            }
        ],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "DURATION",
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
        "name": "bearish",
        "inputs": [
            {
                "name": "id",
                "type": "bytes21",
                "internalType": "bytes21"
            },
            {
                "name": "roundId",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "outputs": [],
        "stateMutability": "payable"
    },
    {
        "type": "function",
        "name": "bullish",
        "inputs": [
            {
                "name": "id",
                "type": "bytes21",
                "internalType": "bytes21"
            },
            {
                "name": "roundId",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "outputs": [],
        "stateMutability": "payable"
    },
    {
        "type": "function",
        "name": "ftsoV2",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "address",
                "internalType": "contract FtsoV2Interface"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "getLatestRoundsWithPosition",
        "inputs": [
            {
                "name": "id",
                "type": "bytes21",
                "internalType": "bytes21"
            },
            {
                "name": "account",
                "type": "address",
                "internalType": "address"
            },
            {
                "name": "numOfRounds",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "outputs": [
            {
                "name": "rounds",
                "type": "tuple[]",
                "internalType": "struct IFonzoMarket.RoundInfo[]",
                "components": [
                    {
                        "name": "roundId",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "lockTime",
                        "type": "uint64",
                        "internalType": "uint64"
                    },
                    {
                        "name": "closingTime",
                        "type": "uint64",
                        "internalType": "uint64"
                    },
                    {
                        "name": "closingPrice",
                        "type": "uint64",
                        "internalType": "uint64"
                    },
                    {
                        "name": "lockedPrice",
                        "type": "uint64",
                        "internalType": "uint64"
                    },
                    {
                        "name": "totalShares",
                        "type": "uint128",
                        "internalType": "uint128"
                    },
                    {
                        "name": "bullShares",
                        "type": "uint128",
                        "internalType": "uint128"
                    },
                    {
                        "name": "bearShares",
                        "type": "uint128",
                        "internalType": "uint128"
                    },
                    {
                        "name": "rewardPool",
                        "type": "uint128",
                        "internalType": "uint128"
                    },
                    {
                        "name": "winningShares",
                        "type": "uint128",
                        "internalType": "uint128"
                    },
                    {
                        "name": "status",
                        "type": "uint8",
                        "internalType": "enum IFonzoMarket.Status"
                    },
                    {
                        "name": "winningSide",
                        "type": "uint8",
                        "internalType": "enum IFonzoMarket.Option"
                    },
                    {
                        "name": "position",
                        "type": "tuple",
                        "internalType": "struct IFonzoMarket.Position",
                        "components": [
                            {
                                "name": "stake",
                                "type": "uint240",
                                "internalType": "uint240"
                            },
                            {
                                "name": "option",
                                "type": "uint8",
                                "internalType": "enum IFonzoMarket.Option"
                            },
                            {
                                "name": "settled",
                                "type": "bool",
                                "internalType": "bool"
                            }
                        ]
                    }
                ]
            },
            {
                "name": "roundId",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "getMarketIds",
        "inputs": [],
        "outputs": [
            {
                "name": "marketIds",
                "type": "bytes21[]",
                "internalType": "bytes21[]"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "getMyRoundIds",
        "inputs": [
            {
                "name": "id",
                "type": "bytes21",
                "internalType": "bytes21"
            },
            {
                "name": "account",
                "type": "address",
                "internalType": "address"
            }
        ],
        "outputs": [
            {
                "name": "roundIds",
                "type": "uint256[]",
                "internalType": "uint256[]"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "getPositions",
        "inputs": [
            {
                "name": "id",
                "type": "bytes21",
                "internalType": "bytes21"
            },
            {
                "name": "account",
                "type": "address",
                "internalType": "address"
            },
            {
                "name": "roundIds",
                "type": "uint256[]",
                "internalType": "uint256[]"
            }
        ],
        "outputs": [
            {
                "name": "rounds",
                "type": "tuple[]",
                "internalType": "struct IFonzoMarket.RoundInfo[]",
                "components": [
                    {
                        "name": "roundId",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "lockTime",
                        "type": "uint64",
                        "internalType": "uint64"
                    },
                    {
                        "name": "closingTime",
                        "type": "uint64",
                        "internalType": "uint64"
                    },
                    {
                        "name": "closingPrice",
                        "type": "uint64",
                        "internalType": "uint64"
                    },
                    {
                        "name": "lockedPrice",
                        "type": "uint64",
                        "internalType": "uint64"
                    },
                    {
                        "name": "totalShares",
                        "type": "uint128",
                        "internalType": "uint128"
                    },
                    {
                        "name": "bullShares",
                        "type": "uint128",
                        "internalType": "uint128"
                    },
                    {
                        "name": "bearShares",
                        "type": "uint128",
                        "internalType": "uint128"
                    },
                    {
                        "name": "rewardPool",
                        "type": "uint128",
                        "internalType": "uint128"
                    },
                    {
                        "name": "winningShares",
                        "type": "uint128",
                        "internalType": "uint128"
                    },
                    {
                        "name": "status",
                        "type": "uint8",
                        "internalType": "enum IFonzoMarket.Status"
                    },
                    {
                        "name": "winningSide",
                        "type": "uint8",
                        "internalType": "enum IFonzoMarket.Option"
                    },
                    {
                        "name": "position",
                        "type": "tuple",
                        "internalType": "struct IFonzoMarket.Position",
                        "components": [
                            {
                                "name": "stake",
                                "type": "uint240",
                                "internalType": "uint240"
                            },
                            {
                                "name": "option",
                                "type": "uint8",
                                "internalType": "enum IFonzoMarket.Option"
                            },
                            {
                                "name": "settled",
                                "type": "bool",
                                "internalType": "bool"
                            }
                        ]
                    }
                ]
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "initializeMarket",
        "inputs": [
            {
                "name": "id",
                "type": "bytes21",
                "internalType": "bytes21"
            }
        ],
        "outputs": [],
        "stateMutability": "payable"
    },
    {
        "type": "function",
        "name": "owner",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "address",
                "internalType": "address"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "protocolFeesAccrued",
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
        "name": "resolve",
        "inputs": [
            {
                "name": "id",
                "type": "bytes21",
                "internalType": "bytes21"
            },
            {
                "name": "roundId",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "outputs": [],
        "stateMutability": "payable"
    },
    {
        "type": "function",
        "name": "settle",
        "inputs": [
            {
                "name": "id",
                "type": "bytes21",
                "internalType": "bytes21"
            },
            {
                "name": "roundIds",
                "type": "uint256[]",
                "internalType": "uint256[]"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "event",
        "name": "Claim",
        "inputs": [
            {
                "name": "marketId",
                "type": "bytes21",
                "indexed": true,
                "internalType": "bytes21"
            },
            {
                "name": "roundId",
                "type": "uint256",
                "indexed": true,
                "internalType": "uint256"
            },
            {
                "name": "account",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            },
            {
                "name": "positionId",
                "type": "bytes32",
                "indexed": false,
                "internalType": "bytes32"
            },
            {
                "name": "amount",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "InitializedMarket",
        "inputs": [
            {
                "name": "id",
                "type": "bytes21",
                "indexed": true,
                "internalType": "bytes21"
            },
            {
                "name": "creator",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "LockedPrice",
        "inputs": [
            {
                "name": "marketId",
                "type": "bytes21",
                "indexed": true,
                "internalType": "bytes21"
            },
            {
                "name": "roundId",
                "type": "uint256",
                "indexed": true,
                "internalType": "uint256"
            },
            {
                "name": "lockedPrice",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            },
            {
                "name": "closingTime",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "NewRound",
        "inputs": [
            {
                "name": "marketId",
                "type": "bytes21",
                "indexed": true,
                "internalType": "bytes21"
            },
            {
                "name": "roundId",
                "type": "uint256",
                "indexed": true,
                "internalType": "uint256"
            },
            {
                "name": "lockTime",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            },
            {
                "name": "closingTime",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "Predicted",
        "inputs": [
            {
                "name": "marketId",
                "type": "bytes21",
                "indexed": true,
                "internalType": "bytes21"
            },
            {
                "name": "roundId",
                "type": "uint256",
                "indexed": true,
                "internalType": "uint256"
            },
            {
                "name": "account",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            },
            {
                "name": "positionId",
                "type": "bytes32",
                "indexed": false,
                "internalType": "bytes32"
            },
            {
                "name": "option",
                "type": "uint8",
                "indexed": false,
                "internalType": "enum IFonzoMarket.Option"
            },
            {
                "name": "betAmount",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "Resolve",
        "inputs": [
            {
                "name": "marketId",
                "type": "bytes21",
                "indexed": true,
                "internalType": "bytes21"
            },
            {
                "name": "roundId",
                "type": "uint256",
                "indexed": true,
                "internalType": "uint256"
            },
            {
                "name": "closePrice",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            },
            {
                "name": "rewardPool",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            },
            {
                "name": "winningShares",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            },
            {
                "name": "winningSide",
                "type": "uint8",
                "indexed": false,
                "internalType": "enum IFonzoMarket.Option"
            },
            {
                "name": "resolverReward",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            }
        ],
        "anonymous": false
    },
    {
        "type": "error",
        "name": "ActionTooEarly",
        "inputs": []
    },
    {
        "type": "error",
        "name": "AmountCannotBeZero",
        "inputs": []
    },
    {
        "type": "error",
        "name": "Claimed",
        "inputs": []
    },
    {
        "type": "error",
        "name": "EntryClosed",
        "inputs": []
    },
    {
        "type": "error",
        "name": "InsufficientFee",
        "inputs": []
    },
    {
        "type": "error",
        "name": "InvalidRoundStatus",
        "inputs": []
    },
    {
        "type": "error",
        "name": "MarketAlreadyExist",
        "inputs": []
    },
    {
        "type": "error",
        "name": "MarketNotInitialized",
        "inputs": []
    },
    {
        "type": "error",
        "name": "NoReward",
        "inputs": []
    },
    {
        "type": "error",
        "name": "PositionExist",
        "inputs": []
    },
    {
        "type": "error",
        "name": "PositionNotFound",
        "inputs": []
    }
] as const;