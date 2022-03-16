import React, { useEffect, useState } from "react";
import { Box, Flex, SimpleGrid } from "@chakra-ui/react";
import { firebaseApp } from "../firebase-config";
import { getFirestore } from "firebase/firestore";
import { getAllFeeds } from "../utils/fetchData.js";
import Spinner from "../Components/Spinner.js";
import {categoryFeeds} from "../utils/fetchData.js";
import { useParams } from "react-router-dom";
import NotFound from './NotFound'
import {VideoPin} from ".";
const Feed = () => {

  const firestoreDb = getFirestore(firebaseApp);
  const { categoryId } = useParams();
  const [feeds, setFeeds] = useState(null);
  const [loading, setLoading] = useState(false);
 
  useEffect(() => {
    setLoading(true);
    if (categoryId) {
      categoryFeeds(firestoreDb, categoryId).then((data) => {
        setFeeds(data);
        setLoading(false);
      });
    } else {
      getAllFeeds(firestoreDb).then((data) => {
        setFeeds(data);
        setLoading(false);
      });
    }
  }, [categoryId]);

 if (loading) return <Spinner msg={"Loading your feeds"} />;
 if (!feeds?.length > 0) return <NotFound />;
  return (
     <SimpleGrid
      minChildWidth="300px"
      spacing="15px"
      width="full"
      autoColumns={"max-content"}
      overflowX={"hidden"}
    >{
      feeds &&
        feeds.map((data) => (
          <VideoPin key={data.id} maxWidth={420} height="80px" data={data} />
        ))
    }</SimpleGrid>
  );
};

export default Feed;
