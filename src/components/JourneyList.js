import React from "react";
import { FlatList } from "react-native";
import JourneyDetail from "./JourneyDetail";

const JourneyList = ({ sections, navigation }) => {
  return (
    <FlatList
        data={sections}
        renderItem={({ item }) => <JourneyDetail data={item} navigation={navigation} />}
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.title}
      />
  );
};

export default JourneyList;