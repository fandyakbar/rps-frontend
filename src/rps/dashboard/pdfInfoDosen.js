import React from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  headerContainer: {
    marginTop: 20,
  },
  billTo: {
    marginTop: 5,
    paddingBottom: 3,
    fontFamily: "Helvetica-Oblique",
  },
});

const InfoDosen = ({ invoice }) => (
  <View style={styles.billTo}>
    <Text>Dosen Pengampu :</Text>
  </View>
);

export default InfoDosen;
