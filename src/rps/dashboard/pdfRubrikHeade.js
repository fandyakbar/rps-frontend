import React from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";

const borderColor = "#90e5fc";
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderBottomColor: "#bff0fd",
    backgroundColor: "#bff0fd",
    borderBottomWidth: 1,
    alignItems: "center",
    height: 60,
    textAlign: "center",
    fontStyle: "bold",
    fontSize: 8,
    flexGrow: 1,
    padding: 1,
  },
  description: {
    width: "60%",
    borderRightColor: borderColor,
    borderRightWidth: 1,
  },
  qty: {
    width: "40%",
    borderRightColor: borderColor,
    borderRightWidth: 1,
  },
  rate: {
    width: "20%",
    height: 50,
    borderRightColor: borderColor,
    borderRightWidth: 1,
  },
  amount: {
    width: "15%",
  },
});

function cekIndeks(indeks, header) {
  if (indeks != 0) {
    return <Text style={styles.rate}>{header}</Text>;
  }
}

const RubrikHeader = ({ head }) => (
  <View style={styles.container}>
    <Text style={styles.qty}>{head[0]}</Text>
    {head.map((header, indeks) => cekIndeks(indeks, header))}
  </View>
);

export default RubrikHeader;
