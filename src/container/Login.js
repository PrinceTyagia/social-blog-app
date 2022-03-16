import React from "react";
import { Button, Flex, HStack, Image } from "@chakra-ui/react";
import MusicBg from "../img/musicbg.jpg";
import { FcGoogle } from "react-icons/fc";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { firebaseApp } from "../firebase-config.js";
import { useNavigate } from "react-router-dom";


const Login = () => {
  const firbaseauth = getAuth(firebaseApp);
  const provider = new GoogleAuthProvider();
  const firebaseDb = getFirestore(firebaseApp);
  const navigate = useNavigate();

  const login = async () => {
     const {user} = await signInWithPopup(firbaseauth, provider);
    // console.log(response);

    const {refreshToken,providerData} = user;
    // console.log(refreshToken,providerData);

    localStorage.setItem("user", JSON.stringify(providerData));
    localStorage.setItem("accessToken", JSON.stringify(refreshToken));
    
    await setDoc(doc(firebaseDb, "users", providerData[0].uid),
      providerData[0]
    );

    navigate("/", { replace: true });
    
  };

  return (
    <Flex
      justifyContent={"center"}
      alignItems={"center"}
      height={"100vh"}
      width={"100vw"}
      position={"relative"}
    >
      <Image
        src={MusicBg}
        alt=""
        objectFit="cover"
        width={"full"}
        height={"full"}
      />

      <Flex
        position={"absolute"}
        width={"100vw"}
        height={"100vh"}
        bg={"blackAlpha.600"}
        top={0}
        left={0}
        justifyContent="center"
        alignItems={"center"}
      >
        <HStack>
          <Button
            leftIcon={<FcGoogle fontSize={25} />}
            colorScheme="whiteAlpha"
            shadow={"lg"}
            onClick={() => login()}
          >
            Signin with Google
          </Button>
        </HStack>
      </Flex>
    </Flex>
  );
};

export default Login;
