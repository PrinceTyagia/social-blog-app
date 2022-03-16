import React, { useEffect, useState } from "react";
import { Flex } from "@chakra-ui/react";
import {
  NavBar,
  Create,
  Feed,
  VideoPinDetail,
  Search,
  UserProfile,
  Category,
} from "../Components/index.js";
import { Routes, Route } from "react-router-dom";
import { categories } from "../data.js";





const Home = ({ user }) => {
  const [searchTerm, setsearchTerm] = useState("");
  // console.log(user);

  return (
    <>
      <NavBar user={user} setsearchTerm={setsearchTerm} />

      <Flex width={"100vw"}>
        <Flex
          direction={"column"}
          justifyContent="start"
          alignItems={"center"}
          width="5%"
        >
          {categories &&
            categories.map((data) => <Category key={data.id} data={data} />)}
        </Flex>

        <Flex
          width={"full"}
          px={4}
          justifyContent="center"
          alignItems={"center"}
        >
          <Routes>
            <Route path="/" element={<Feed />} />
            <Route path="/category/:categoryId" element={<Feed />} />
            <Route path="/create" element={<Create />} />
            <Route path="/videoDetail/:videoId" element={<VideoPinDetail />} />
            <Route path="/search" element={<Search />} />
            <Route path="/userDetail/:userId" element={<UserProfile />} />
          </Routes>
        </Flex>
      </Flex>
    </>
  );
};;

export default Home;
