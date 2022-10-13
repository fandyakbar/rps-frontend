import React from "react";
import { View, StyleSheet } from "@react-pdf/renderer";

import RubrikHeader from "./pdfRubrikHeade";
import PDFRubrikRow from "./pdfRubrikRow";

const tableRowsCount = 11;

const styles = StyleSheet.create({
  tableContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 24,
    borderWidth: 1,
    borderColor: "#bff0fd",
  },
});

const RubrikPDF = ({ datas }) => (
  <View style={styles.tableContainer}>
    <RubrikHeader head={datas.kolomPDF} />
    <PDFRubrikRow items={datas.tabelPDF} />
  </View>
);

export default RubrikPDF;
