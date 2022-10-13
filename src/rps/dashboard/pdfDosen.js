import React from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  headerContainer: {
    marginTop: 6,
  },
  billTo: {
    marginTop: 5,
    paddingBottom: 3,
    fontFamily: "Helvetica-Oblique",
  },
});

const PDFDosen = ({ dosen }) => (
  <View style={styles.headerContainer}>
    <Text>{dosen}</Text>
  </View>
);

export default PDFDosen;
