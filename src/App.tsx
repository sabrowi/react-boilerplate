import { useState } from "react";
import useSWR from "swr";
import { Text, Box, Center } from "@chakra-ui/react";
import { helloWorld } from "constants/helloWorld";
import { useErrorMessage, useInterval } from "hooks";
import { fetcher } from "connections/api";

function App() {
  const [show, setShow] = useState(true);
  const [index, setIndex] = useState(0);
  const { data, error } = useSWR(`https://swapi.dev/api/people/1/`, fetcher);
  useErrorMessage(error);

  useInterval(() => {
    setShow(false);
    setTimeout(() => {
      setShow(true);
      if (index >= helloWorld.length - 1) {
        setIndex(0);
      } else {
        setIndex((index) => index + 1);
      }
    }, 1000);
  }, 5000);

  console.log(data);

  return (
    <Box as='main' h='full' w='full'>
      <Center h='100vh'>
        <Text
          transition='visibility 1s linear, opacity 1s linear'
          opacity={show ? 1 : 0}
          visibility={show ? "visible" : "hidden"}
          fontSize='5xl'
        >
          {helloWorld[index]}
        </Text>
      </Center>
    </Box>
  );
}

export default App;
