import React, { useState, useEffect, useRef } from "react";

// @mui material components
import Grid from "@mui/material/Grid";
import DataTable from "examples/Tables/DataTable";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

import Card from "@mui/material/Card";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

// Material Dashboard 2 React contexts
import { useMaterialUIController, setDirection } from "context";

// Tabel React
// import Table from 'react-bootstrap/Table';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Icon from "@mui/material/Icon";
import Autocomplete from "@mui/material/Autocomplete";

import typography from "assets/theme/base/typography";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";

import axios from "axios";

import "bootstrap/dist/css/bootstrap.min.css";

//icon
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import DeleteIcon from "@mui/icons-material/Delete";
import BorderColorIcon from "@mui/icons-material/BorderColor";

// DataTable
import DataTableHeadCell from "examples/Tables/DataTable/DataTableHeadCell";
import DataTableBodyCell from "examples/Tables/DataTable/DataTableBodyCell";

import PrintIcon from "@mui/icons-material/Print";

// Link
import { Link } from "react-router-dom";

// modal
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";

// JSODF
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

// Notifikasi
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//
import { ReactToPrint } from "react-to-print";
import { useReactToPrint } from "react-to-print";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: 4,
  p: 4,
};

import { useLocation, useNavigate, useParams } from "react-router-dom";
import data from "layouts/tables/data/authorsTableData";
import { List } from "@mui/material";
import Kop from "assets/images/logo-ct.png";
import { convertLength } from "@mui/material/styles/cssUtils";
import { TableRows } from "@mui/icons-material";

function withRouter(Component) {
  function ComponentWithRouterProp(props) {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return <Component {...props} router={{ location, navigate, params }} />;
  }

  return ComponentWithRouterProp;
}

function cekNilai(persens) {
  if (persens != 0) {
    return persens + " %";
  } else {
    return "";
  }
}

function createMarkup() {
  return { __html: "First &middot; Second" };
}

function cekId(idkriteria, idparam, nilai) {
  if (idkriteria == idparam) {
    return nilai;
  }
}

function cekIndeks(idnilai, idassess, nilainya) {
  if (idnilai == idassess) {
    return <DataTableBodyCell align="center">{cekNilai(nilainya)}</DataTableBodyCell>;
  } else {
    return "";
  }
}

function convertBaris(replaceNilai) {
  return replaceNilai.replace(/\r\n/g, "<br/>");
}

function ShowRubrikDashboard(props) {
  // cpmk
  const [rubriks, setRubriks] = useState([]);
  const [detailData, setDetailData] = useState([]);
  const [dataTask, setDataTask] = useState([]);
  const [nilainya, setNilainya] = useState("");

  const { size } = typography;
  // const token = localStorage.getItem('token');
  const id_course = props.router.params.id;

  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const fetchDataUser = async () => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    await axios.get("http://127.0.0.1:8000/api/auth/me").then((response) => {
      setUser(response.data);
    });
  };

  const fetchData = async () => {
    await axios
      .get(`http://127.0.0.1:8000/api/dashboard/${id_course}`)

      .then((response) => {
        setRubriks(response.data);
      });
  };
  const fetchDatas = async () => {
    await axios
      .get(`http://127.0.0.1:8000/api/rubrikassessments/${id_course}`)

      .then((response) => {
        setDetailData(response.data);
      });
  };

  const fetchDataTask = async () => {
    await axios
      .get(`http://127.0.0.1:8000/api/task/${id_course}`)

      .then((response) => {
        setDataTask(response.data);
      });
  };

  useEffect(() => {
    fetchDataUser();
    fetchData();
    fetchDatas();
    fetchDataTask();
  }, []);

  console.warn("di sini cek", rubriks);
  console.log("cek data ases", detailData);

  const componentRef = useRef();
  const printHandler = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "testing",
    onAfterPrint: () => alert("sukes rint "),
  });

  return (
    <DashboardLayout>
      <ToastContainer />
      <DashboardNavbar />
      {rubriks.map((datas) => (
        <MDBox py={3}>
          {dataTask.map((tasks) => (
            <MDBox>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  {/* Isinya Tarok Di sini */}
                  <Card>
                    <MDBox
                      mx={2}
                      mt={-3}
                      py={3}
                      px={2}
                      variant="gradient"
                      bgColor="info"
                      borderRadius="lg"
                      coloredShadow="info"
                    >
                      <div>
                        {datas.matkul.map((mk) => (
                          <Grid container spacing={3}>
                            <Grid item xs={12} md={6} lg={11}>
                              <MDTypography variant="h6" color="white">
                                RPS Mata Kuliah {mk.name}
                              </MDTypography>
                            </Grid>
                          </Grid>
                        ))}
                      </div>
                    </MDBox>

                    <MDBox p={2}>
                      {(() => {
                        if (user.type != "M") {
                          return (
                            <>
                              <Link to={`/assessment_detail/${id_course}`}>
                                <MDButton variant="gradient" color="success" size="medium">
                                  <Icon fontSize="small">calculate</Icon> &nbsp; Assessment
                                </MDButton>
                              </Link>
                              &nbsp;
                              <Link to={`/task/${id_course}`}>
                                <MDButton variant="gradient" color="success" size="medium">
                                  <Icon fontSize="small">task</Icon> &nbsp; Tugas
                                </MDButton>
                              </Link>
                              &nbsp;
                              <Link to={`/rubrik_detail/${id_course}`}>
                                <MDButton variant="gradient" color="success" size="medium">
                                  <Icon fontSize="small">vertical_split</Icon> &nbsp; Komponen
                                  Penilaian
                                </MDButton>
                              </Link>
                            </>
                          );
                        }
                      })()}
                      &nbsp;
                      {detailData.map((datass) => (
                        <MDButton
                          variant="gradient"
                          color="warning"
                          size="medium"
                          onClick={() => {
                            toast.info("Sedang Memuat PDF");
                            const doc = new jsPDF();
                            var width = doc.internal.pageSize.getWidth();
                            var height = doc.internal.pageSize.getHeight();

                            let img = new Image();
                            img.src = Kop;

                            doc.addImage(img, "png", width / 2 - 19, height / 2 - 40, 38, 39);

                            doc.setFontSize(18);

                            var text = "RENCANA PEMBELAJARAN SEMESTER",
                              xOffset = width / 2;
                            doc.text(text, xOffset, 30, { align: "center" });
                            doc.text("(RPS)", xOffset, 40, { align: "center" });

                            datas.matkul.map((mk) => {
                              doc.setFontSize(16);
                              doc.text(mk.name, width / 2, 80, { align: "center" });

                              var semesterdansks =
                                "(" + mk.credit + " SKS) Semester " + mk.semester;
                              doc.text(semesterdansks, width / 2, 90, {
                                align: "center",
                              });

                              var textHeight = height / 2 + 25;

                              doc.setFontSize(12);

                              doc.text("Oleh :", width / 2, textHeight, { align: "center" });
                              datas.namaDosen.map((namdos, index) => {
                                doc.text(namdos, width / 2, textHeight + (index + 1) * 7, {
                                  align: "center",
                                });
                              });

                              doc.setFontSize(14);
                              doc.text("DEPARTEMEN SISTEM INFORMASI", xOffset, height - 60, {
                                align: "center",
                              });
                              doc.text("FAKULTAS TEKNOLOGI INFORMASI", xOffset, height - 50, {
                                align: "center",
                              });
                              doc.text("UNIVERSITAS ANDALAS", xOffset, height - 40, {
                                align: "center",
                              });
                              doc.text("PADANG, 2022", xOffset, height - 30, { align: "center" });

                              doc.addPage();

                              let cpmkMatkul = [];

                              datas.cpmk.map((itemcpmk, index) => {
                                cpmkMatkul[index] = [
                                  "(" + itemcpmk.code + ") " + itemcpmk.name,
                                  datas.totalcpmk[index] + "%",
                                ];
                              });

                              autoTable(doc, {
                                startY: 30,
                                head: [["Daftar CP Mata Kuliah", "Bobot"]],
                                body: cpmkMatkul,
                                margin: { top: 25, bottom: 15 },
                                styles: { overflow: "linebreak", fontSize: 8 },
                                showHeader: "everyPage",
                                theme: "grid",
                              });

                              doc.setFontSize(12);
                              doc.text("Bagian 1 Tabel Rencana Assessment", width / 2, 110, {
                                align: "center",
                              });

                              autoTable(doc, {
                                startY: 115,
                                head: [datas.kolomPDF],
                                body: datas.tabelPDF,
                                margin: { top: 25, bottom: 15 },
                                styles: { overflow: "linebreak", fontSize: 8 },
                                showHeader: "everyPage",
                                theme: "grid",
                              });

                              tasks.tugas.map((tasknya, indexy) => {
                                doc.addPage();
                                doc.setFontSize(12);
                                doc.text("Bagian 2 Penugasan Mata Kuliah", width / 2, 20, {
                                  align: "center",
                                });
                                doc.text(tasknya.name, width / 2, 30, { align: "center" });

                                doc.setFontSize(10);
                                autoTable(doc, {
                                  startY: 40,
                                  head: [["Tema"]],
                                  body: [[tasknya.theme]],
                                  margin: { top: 25, bottom: 15 },
                                  styles: { overflow: "linebreak", fontSize: 8 },
                                  showHeader: "everyPage",
                                  theme: "grid",
                                });

                                let datacpmk = [];

                                datas.cpmk.map((itemcpmk, index) => {
                                  datacpmk[index] = ["(" + itemcpmk.code + ") " + itemcpmk.name];
                                });

                                autoTable(doc, {
                                  startY: 65,
                                  head: [["CPMK yang Hendak Dicapai"]],
                                  body: datacpmk,
                                  margin: { top: 25, bottom: 15 },
                                  styles: { overflow: "linebreak", fontSize: 8 },
                                  showHeader: "everyPage",
                                  theme: "grid",
                                });

                                autoTable(doc, {
                                  startY: 135,
                                  head: [["Deskripsi"]],
                                  body: [[tasknya.description]],
                                  margin: { top: 25, bottom: 15 },
                                  styles: { overflow: "linebreak", fontSize: 8 },
                                  showHeader: "everyPage",
                                  theme: "grid",
                                });

                                autoTable(doc, {
                                  startY: 190,
                                  head: [["Langkah Pengerjaan"]],
                                  body: [[tasknya.step]],
                                  margin: { top: 25, bottom: 15 },
                                  styles: { overflow: "linebreak", fontSize: 8 },
                                  showHeader: "everyPage",
                                  theme: "grid",
                                });

                                autoTable(doc, {
                                  startY: 240,
                                  head: [["Luaran Tugas"]],
                                  body: [[tasknya.output]],
                                  margin: { top: 25, bottom: 15 },
                                  styles: { overflow: "linebreak", fontSize: 8 },
                                  showHeader: "everyPage",
                                  theme: "grid",
                                });
                              });

                              datass.assessment.map((detailAs, index) => {
                                doc.addPage();
                                doc.setFontSize(12);
                                doc.text("Bagian 3 Rubrik Penilaian", width / 2, 20, {
                                  align: "center",
                                });

                                if (detailAs.flag == 1) {
                                  autoTable(doc, {
                                    startY: 30,
                                    head: [[detailAs.name]],
                                    body: [
                                      ["Nomor Kelompok"],
                                      ["Nama (NIM) Anggota"],
                                      ["1. \n2. \n3."],
                                    ],
                                    margin: { top: 25, bottom: 15 },
                                    styles: { overflow: "linebreak", fontSize: 8 },
                                    showHeader: "everyPage",
                                    theme: "grid",
                                  });
                                } else {
                                  autoTable(doc, {
                                    startY: 30,
                                    head: [[detailAs.name]],
                                    body: [["Nama (NIM) :"], [""]],
                                    margin: { top: 25, bottom: 15 },
                                    styles: { overflow: "linebreak", fontSize: 8 },
                                    showHeader: "everyPage",
                                    theme: "grid",
                                  });
                                }

                                let datacpmk2 = [];

                                datass.cpmk[index].map((cpmknya, inss) => {
                                  datacpmk2[inss] = ["(" + cpmknya.code + ") " + cpmknya.name];
                                });

                                autoTable(doc, {
                                  startY: 75,
                                  head: [["CPMK yang Diases"]],
                                  body: datacpmk2,
                                  margin: { top: 25, bottom: 15 },
                                  styles: { overflow: "linebreak", fontSize: 8 },
                                  showHeader: "everyPage",
                                  theme: "grid",
                                });

                                let dataKriteria = [];
                                let codecpmkDisplay = [];

                                datass.datas[index].map((kriteria, insk) => {
                                  let codecpmk = [];
                                  let angkaurut = 0;
                                  datass.cpmkcode[index].map((cpmkcodess, indexks) => {
                                    if (cpmkcodess.id == kriteria.id) {
                                      codecpmk[angkaurut] = cpmkcodess.code;
                                      angkaurut++;
                                    }
                                  });

                                  codecpmkDisplay[insk] = codecpmk;
                                  // Tambah Map

                                  dataKriteria[insk] = [codecpmkDisplay[insk], kriteria.criteria];

                                  let valuenya = [];
                                  kriteria.detail_category.map((vl, indks) => {
                                    dataKriteria[insk][indks + 2] = vl.value;
                                  });

                                  // akhiran map
                                });

                                let hp = ["CP-MK", "Kriteria"];

                                datass.header[index].map((dh, inhp) => {
                                  hp[inhp + 2] = dh.assessment_category.name;
                                });

                                autoTable(doc, {
                                  startY: 145,
                                  head: [hp],
                                  body: dataKriteria,
                                  margin: { top: 25, bottom: 15 },
                                  styles: { overflow: "linebreak", fontSize: 8 },
                                  showHeader: "everyPage",
                                  theme: "grid",
                                });
                              });

                              doc.save("rubrik-" + mk.name + ".pdf");
                            });
                          }}
                        >
                          <Icon>print</Icon>&nbsp; Cetak RPS
                        </MDButton>
                      ))}
                    </MDBox>

                    {/* Data Tabel */}

                    <MDBox p={2}>
                      {datas.matkul.map((mk) => (
                        <Table size="small">
                          <TableRow>
                            <DataTableHeadCell width="5em">Semester</DataTableHeadCell>
                            <DataTableHeadCell width="5em"> : </DataTableHeadCell>
                            <DataTableHeadCell fontSize="small">{mk.semester}</DataTableHeadCell>
                          </TableRow>
                          <TableRow>
                            <DataTableHeadCell width="5em">SKS</DataTableHeadCell>
                            <DataTableHeadCell width="5em"> : </DataTableHeadCell>
                            <DataTableHeadCell>{mk.credit}</DataTableHeadCell>
                          </TableRow>

                          <TableRow>
                            <DataTableHeadCell width="5em">Dosen</DataTableHeadCell>
                            <DataTableHeadCell width="5em"> : </DataTableHeadCell>
                            <DataTableHeadCell>
                              {datas.namaDosen.map((namDos) => (
                                <List>{namDos}</List>
                              ))}
                            </DataTableHeadCell>
                          </TableRow>
                        </Table>
                      ))}

                      <TableRow></TableRow>
                      <Table>
                        <TableRow>
                          <DataTableBodyCell> Daftar CP Mata Kuliah </DataTableBodyCell>
                          <DataTableBodyCell width="5em"> Bobot </DataTableBodyCell>
                        </TableRow>
                        {datas.cpmk.map((listcpmk, indecpmk) => (
                          <TableRow>
                            <DataTableHeadCell width="5em">
                              ({listcpmk.code}) {listcpmk.name}
                            </DataTableHeadCell>
                            <DataTableHeadCell width="5em">
                              {" "}
                              {datas.totalcpmk[indecpmk]}%
                            </DataTableHeadCell>
                          </TableRow>
                        ))}
                        <TableRow>
                          <DataTableBodyCell></DataTableBodyCell>
                        </TableRow>
                        {datas.matkul.map((mk) => (
                          <TableRow>
                            <DataTableHeadCell width="5em"> Deskripsi </DataTableHeadCell>
                            <DataTableHeadCell width="5em"> {mk.description} </DataTableHeadCell>
                          </TableRow>
                        ))}
                        {datas.matkul.map((mk) => (
                          <TableRow>
                            <DataTableHeadCell width="5em">
                              {" "}
                              Material Pembelajaran{" "}
                            </DataTableHeadCell>
                            <DataTableHeadCell width="5em">
                              {" "}
                              <div
                                dangerouslySetInnerHTML={{
                                  __html: mk.material.replace(/\n/g, "<br />"),
                                }}
                              ></div>{" "}
                            </DataTableHeadCell>
                          </TableRow>
                        ))}
                      </Table>
                    </MDBox>

                    <MDBox display="flex" justifyContent="space-between" alignItems="center" p={1}>
                      <DataTableHeadCell>
                        <MDTypography variant="h6">Bagian 1 Tabel Rencana Assessment</MDTypography>
                      </DataTableHeadCell>
                    </MDBox>

                    <DataTable
                      entriesPerPage={false}
                      table={{
                        columns: datas.kolom,
                        rows: datas.tabel,
                      }}
                    />

                    <MDBox
                      id="ambilPDF"
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                      p={1}
                    >
                      <DataTableHeadCell>
                        <MDTypography variant="h6">Bagian 2 Format Tugas Proyek</MDTypography>
                      </DataTableHeadCell>
                    </MDBox>
                    {tasks.tugas.map((tugasItem) => (
                      <MDBox px={3}>
                        <MDBox>
                          <TableRow fullWidth>
                            <MDBox>
                              <DataTableHeadCell align="center">
                                <MDTypography>{tugasItem.name}</MDTypography>
                              </DataTableHeadCell>
                            </MDBox>
                          </TableRow>
                          <TableRow>
                            <DataTableHeadCell>Tema</DataTableHeadCell>
                          </TableRow>
                          <DataTableBodyCell>{tugasItem.theme}</DataTableBodyCell>

                          <TableRow>
                            <DataTableHeadCell>CPMK yang hendak dicapai</DataTableHeadCell>
                          </TableRow>
                          {datas.cpmk.map((cpmkrub) => (
                            <TableRow>
                              <DataTableBodyCell>
                                ({cpmkrub.code}) {cpmkrub.name}
                              </DataTableBodyCell>
                            </TableRow>
                          ))}
                          <TableRow>
                            <DataTableHeadCell>Deskripsi</DataTableHeadCell>
                          </TableRow>
                          <TableRow>
                            <DataTableBodyCell>{tugasItem.description}</DataTableBodyCell>
                          </TableRow>
                          <TableRow>
                            <DataTableHeadCell>Langkah Pengerjaan</DataTableHeadCell>
                          </TableRow>
                          <TableRow>
                            <DataTableBodyCell>
                              <div
                                dangerouslySetInnerHTML={{
                                  __html: tugasItem.step.replace(/\n/g, "<br />"),
                                }}
                              ></div>
                            </DataTableBodyCell>
                          </TableRow>
                          <TableRow>
                            <DataTableHeadCell>Bentuk dan Format Luaran</DataTableHeadCell>
                          </TableRow>
                          <TableRow>
                            <DataTableBodyCell>{tugasItem.output}</DataTableBodyCell>
                          </TableRow>
                        </MDBox>
                      </MDBox>
                    ))}

                    <MDBox display="flex" justifyContent="space-between" alignItems="center" p={1}>
                      <DataTableHeadCell>
                        <MDTypography variant="h6">Bagian 3 Rubrik Penilaian</MDTypography>
                      </DataTableHeadCell>
                    </MDBox>
                    {detailData.map((datas) => (
                      <MDBox px={3}>
                        {datas.assessment.map((ases, indeks) => (
                          <MDBox>
                            <TableRow fullWidth>
                              <MDBox>
                                <DataTableHeadCell align="center">
                                  <MDTypography>{ases.name}</MDTypography>
                                </DataTableHeadCell>
                              </MDBox>
                            </TableRow>
                            <TableRow>
                              <DataTableBodyCell>Nomor Kelompok :</DataTableBodyCell>
                            </TableRow>

                            <TableRow>
                              <DataTableBodyCell>Nama (NIM) Anggota</DataTableBodyCell>
                            </TableRow>
                            <TableRow>
                              <DataTableBodyCell>1.</DataTableBodyCell>
                            </TableRow>
                            <TableRow>
                              <DataTableBodyCell>2.</DataTableBodyCell>
                            </TableRow>
                            <TableRow>
                              <DataTableBodyCell>3.</DataTableBodyCell>
                            </TableRow>
                            <TableRow>
                              <DataTableHeadCell>CPMK yang diases</DataTableHeadCell>
                            </TableRow>
                            {datas.cpmk[indeks].map((cpm) => (
                              <TableRow>
                                <DataTableBodyCell>
                                  ({cpm.code}) {cpm.name}
                                </DataTableBodyCell>
                              </TableRow>
                            ))}

                            <Table>
                              <TableRow>
                                <DataTableHeadCell component="th" align="center">
                                  CP-MK
                                </DataTableHeadCell>
                                <DataTableHeadCell component="th" align="center">
                                  Kriteria
                                </DataTableHeadCell>
                                <DataTableHeadCell component="th" align="center">
                                  Inferior
                                </DataTableHeadCell>

                                <DataTableHeadCell component="th" align="center">
                                  Average
                                </DataTableHeadCell>
                                <DataTableHeadCell component="th" align="center">
                                  Good
                                </DataTableHeadCell>
                                <DataTableHeadCell component="th" align="center">
                                  Excellent
                                </DataTableHeadCell>
                              </TableRow>

                              <TableBody>
                                {datas.datas[indeks].map((kriteria) => (
                                  <TableRow>
                                    <DataTableBodyCell width="5em">
                                      {datas.cpmkcode[indeks].map((cpmkcodes) => (
                                        <p margin-bottom="1em">
                                          {cekId(cpmkcodes.id, kriteria.id, cpmkcodes.code)}
                                        </p>
                                      ))}
                                    </DataTableBodyCell>
                                    <DataTableBodyCell>{kriteria.criteria}</DataTableBodyCell>
                                    <DataTableBodyCell>{kriteria.inferior}</DataTableBodyCell>
                                    <DataTableBodyCell>{kriteria.average}</DataTableBodyCell>
                                    <DataTableBodyCell>{kriteria.good}</DataTableBodyCell>
                                    <DataTableBodyCell>{kriteria.Excellent}</DataTableBodyCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </MDBox>
                        ))}
                        <Table size="small"></Table>
                      </MDBox>
                    ))}
                    {/* Data Tabel */}
                  </Card>
                </Grid>
              </Grid>
            </MDBox>
          ))}
        </MDBox>
      ))}
      <Footer />
    </DashboardLayout>
  );
}

export default withRouter(ShowRubrikDashboard);
