import React, { Fragment } from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  invoiceNoContainer: {
    flexDirection: "row",
    marginTop: 36,
    justifyContent: "flex-end",
  },
  invoiceDateContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  invoiceDate: {
    fontSize: 12,
    fontStyle: "bold",
  },
  label: {
    width: 60,
  },
});

const InfoMatkul = ({ matkul }) => (
  <Fragment>
    <View style={styles.invoiceNoContainer}>
      <Text style={styles.label}>Mata Kuliah:</Text>
      <Text style={styles.invoiceDate}> {matkul.name}</Text>
    </View>
    <View style={styles.invoiceDateContainer}>
      <Text style={styles.label}>Semester: </Text>
      <Text>{matkul.semester}</Text>
    </View>
    <View style={styles.invoiceDateContainer}>
      <Text style={styles.label}>SKS: </Text>
      <Text>{matkul.credit}</Text>
    </View>
  </Fragment>
);

export default InfoMatkul;
