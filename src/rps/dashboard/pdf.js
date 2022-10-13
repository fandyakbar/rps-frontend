import React, { useState, useEffect, useRef } from "react";
import { Fragment } from "react";
import { Page, Document, Image, StyleSheet } from "@react-pdf/renderer";
import { PDFViewer } from "@react-pdf/renderer";

import Kop from "assets/images/logo-ct.png";
import PDFJudul from "./pdfJudul";

import PageLayout from "examples/LayoutContainers/PageLayout";
import InfoMatkul from "./pdfInfoMatkul";
import PDFDosen from "./pdfDosen";

import { useLocation, useNavigate, useParams } from "react-router-dom";

import axios from "axios";
import InfoDosen from "./pdfInfoDosen";
import DataTable from "examples/Tables/DataTable";
import RubrikPDF from "./pdfRubrik";

const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 11,
    paddingTop: 30,
    paddingLeft: 60,
    paddingRight: 60,
    lineHeight: 1.5,
    flexDirection: "column",
  },
  logo: {
    width: 74,
    height: 78,
    marginLeft: "auto",
    marginRight: "auto",
  },
});

function withRouter(Component) {
  function ComponentWithRouterProp(props) {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return <Component {...props} router={{ location, navigate, params }} />;
  }

  return ComponentWithRouterProp;
}

function PDF(props, datarubrik) {
  const id_course = props.router.params.id;

  const [rubriks, setRubriks] = useState([]);

  const fetchData = async () => {
    await axios
      .get(`http://127.0.0.1:8000/api/dashboard/${id_course}`)

      .then((response) => {
        setRubriks(response.data);
      });
  };

  useEffect(() => {}, []);

  return (
    <PageLayout>
      {(() => {
        fetchData();
        console.log("data", rubriks);
      })()}
      <Fragment>
        {rubriks.map((datas) => (
          <PDFViewer width={window.innerWidth} height={window.innerHeight} className="App">
            <Document>
              <Page size="A4" style={styles.page}>
                <Image style={styles.logo} src={Kop} />
                <PDFJudul title="Rencana Pembelajaran semester" />
                <InfoMatkul matkul={datas.matkul[0]} />
                <InfoDosen />
                {datas.namaDosen.map((namdos) => (
                  <PDFDosen dosen={namdos} />
                ))}

                <RubrikPDF datas={datas} />
              </Page>
              <Page></Page>
            </Document>
          </PDFViewer>
        ))}
      </Fragment>
    </PageLayout>
  );
}

export default withRouter(PDF);
