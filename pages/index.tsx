import type { NextPage } from "next";
import * as React from "react";
import { QueryClient, QueryClientProvider, QueryCache } from "react-query";
import { ChakraProvider, Box, Heading, Image, Text } from "@chakra-ui/react";
import { Toaster, toast } from "react-hot-toast";
import theme from "../theme";
import { Provider as WagmiProvider } from "wagmi";
import { providers } from "ethers";
import Comments from "../components/Comments";

// Provider thatis locally hosted using hardhat
//const provider = providers.getDefaultProvider("http://localhost:8545");

// Ploygon Mumbai testnet provider
const provider = providers.getDefaultProvider("https://rpc-mumbai.maticvigil.com");

// Create a react-query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
  queryCache: new QueryCache({
    onError: () => {
      toast.error(
        "Network Error: Ensure MetaMask is connected to the same network that your contract is deployed to."
      );
    },
  }),
});

const App: NextPage = () => {
  return (
    
    <WagmiProvider autoConnect provider={provider}>
      <ChakraProvider theme={theme}>
        {/* <Image src={"../images/Moralis.png"}></Image> */}
        <Heading color="whiteAlpha.800" fontSize="50" textAlign="center">
            Web3 Forum using Poygon
        </Heading>
        <Text textAlign="center">
          Connect to Poylgon Mumbai testnet
        </Text>
        <QueryClientProvider client={queryClient}>
          <Box p={8} maxW="600px" minW="320px" m="0 auto">
            <Comments topic="my-blog-post" />
            <Toaster position="bottom-right" />
          </Box>
        </QueryClientProvider>
      </ChakraProvider>
    </WagmiProvider>
  );
};

export default App;