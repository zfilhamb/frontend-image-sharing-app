import { useRouter } from "next/router";
import Link from "next/link";
import { Avatar, Button, Flex, HStack, Image, Text } from "@chakra-ui/react";

import { useEffect, useState } from "react";

const Navbar = () => {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = window.localStorage.getItem("token");

      if (token) {
        setIsLogin(true);
      }
    }
  }, []);

  return (
    <>
      <Flex
        w="full"
        as="nav"
        align="center"
        justify="space-between"
        wrap="wrap"
        padding="1rem"
        bg="teal.500"
        color="white"
      >
        <Flex align="center" mr={5} cursor="pointer">
          <Link href="/" >
            <Text fontSize="2xl" fontWeight="bold">
              Pinterest
            </Text>
          </Link>
        </Flex>
        <HStack>
          {!isLogin ? (
            <Link href="/login">
              <Button colorScheme="blue">Login</Button>
            </Link>
          ) : (
            <Flex align="center" mr={5} cursor="pointer">
              <Link href="/photos/create">
                <Text fontSize="xl" fontWeight="bold" mr={2}>
                  Create Photos
                </Text>
              </Link>
              <Button
                colorScheme="blue"
                onClick={() => {
                  localStorage.removeItem("token");
                  window.localStorage.removeItem("user");
                  setIsLogin(false);
                  router.push("/");
                }}
              >
                Logout
              </Button>
            </Flex>
          )}
        </HStack>
      </Flex>
    </>
  );
};

export default Navbar;
