export const configs = {
  eth: {
    WNATIVE: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
    nativeCurrencyLabel: 'ETH',
    v2Factory: '0x0000000000000000000000000000000000000000',
    txConfig: {},
  },
  goerli: {
    WNATIVE: '0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6',
    nativeCurrencyLabel: 'GOR',
    v2Factory: '0x0000000000000000000000000000000000000000',
    txConfig: {},
  },
  bscMainnet: {
    WNATIVE: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
    nativeCurrencyLabel: 'BNB',
    v2Factory: '0x0000000000000000000000000000000000000000',
    txConfig: {},
  },
  bscTestnet: {
    WNATIVE: '0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd',
    nativeCurrencyLabel: 'tBNB',
    v2Factory: '0x0000000000000000000000000000000000000000',
    txConfig: {},
  },
  hardhat: {
    WNATIVE: '0x0000000000000000000000000000000000000000',
    nativeCurrencyLabel: 'BNB',
    v2Factory: '0x0000000000000000000000000000000000000000',
    txConfig: {},
  },
  tenderly: {
    WNATIVE: '0x0000000000000000000000000000000000000000',
    nativeCurrencyLabel: 'MNT',
    v2Factory: '0x0000000000000000000000000000000000000000',
    txConfig: {
      gasLimit: 100_000_000_000n,
    },
  },
  sepolia: {
    WNATIVE: '0x7b79995e5f793a07bc00c21412e50ecae098e7f9',
    nativeCurrencyLabel: 'ETH',
    v2Factory: '0x0000000000000000000000000000000000000000',
    txConfig: {},
  },
  mantle: {
    WNATIVE: '0x78c1b0C915c4FAA5FffA6CAbf0219DA63d7f4cb8',
    nativeCurrencyLabel: 'MNT',
    v2Factory: '0x0000000000000000000000000000000000000000',
    txConfig: {},
  },
} as const
