import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Button,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

const App = () => {
  let [data, setData] = useState({});
  let [numberOfLines, setNumberOfLines] = useState(2);
  let [incrementBtn, setIncrementBtn] = useState(1);

  let handleIncrementBtn = () => {
    setIncrementBtn(incrementBtn + 1);
  };

  let handleDecrementBtn = () => {
    if (incrementBtn > 1) {
      setIncrementBtn(incrementBtn - 1);
    }
  };

  let handleNumberOfLines = () => {
    setNumberOfLines(3);
  };

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${incrementBtn}`)
      .then((response) => response.json())
      .then((json) => setData(json));
  }, [incrementBtn]); // Include incrementBtn in the dependency array

  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={styles.parent}>
        <ScrollView style={styles.scrollViewVertical}>
          <Image
            resizeMode="cover"
            style={styles.img}
            source={{ uri: data.image }}
          />
          <Text style={styles.title}>{data.title}</Text>
          <Text
            onPress={handleNumberOfLines}
            numberOfLines={numberOfLines}
            style={styles.des}
          >
            Description: {data.description}
          </Text>
          <Text style={styles.price}>Category: {data.category}</Text>
          <Text style={styles.price}>Price: {data.price}</Text>
          <Button title="Buy" />
        </ScrollView>
        <View style={styles.actionBtns}>
          <View style={styles.leftBtn}>
            <AntDesign
              onPress={handleIncrementBtn}
              name="doubleleft"
              size={40}
              color="#0275d8"
            />
          </View>
          <View style={styles.rightBtn}>
            <AntDesign
              onPress={handleDecrementBtn}
              name="doubleright"
              size={40}
              color="#0275d8"
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

let styles = StyleSheet.create({
  parent: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    textAlign: "center",
    margin: 10,
    overflow: "hidden",
    position: "relative",
  },
  scrollViewVertical: {
    width: "100%",
    paddingTop: 20,
  },
  img: {
    marginTop: 45,
    height: 400,
    width: 300,
    alignSelf: "center",
    resizeMode: "cover",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textTransform: "capitalize",
    textAlign: "center",
    marginVertical: 10,
  },
  price: {
    fontSize: 18,
    textAlign: "center",
    marginVertical: 10,
    fontWeight: "bold",
  },
  des: {
    fontSize: 16,
    height: "auto",
    width: 320,
    textAlign: "center",
    marginLeft: 19,
  },
  actionBtns: {
    flexDirection: "row",
    width: "100%",
    position: "absolute",
    top: "50%",
  },
  leftBtn: {
    position: "absolute",
    left: 0,
  },
  rightBtn: {
    position: "absolute",
    right: 0,
  },
});

export default App;
