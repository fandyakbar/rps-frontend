import React from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  titleContainer: {
    marginTop: 24,
  },
  reportTitle: {
    color: "#30b807",
    letterSpacing: 4,
    fontSize: 16,
    textAlign: "center",
    textTransform: "uppercase",
  },
});

const PDFJudul = ({ title }) => (
  <View style={styles.titleContainer}>
    <Text style={styles.reportTitle}>{title}</Text>
  </View>
);

export default PDFJudul;
