import React, { useState, useEffect } from "react";

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

//icon
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import DeleteIcon from "@mui/icons-material/Delete";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import AccountTreeIcon from "@mui/icons-material/AccountTree";

// DataTable
import DataTableHeadCell from "examples/Tables/DataTable/DataTableHeadCell";
import DataTableBodyCell from "examples/Tables/DataTable/DataTableBodyCell";

// Link
import { Link } from "react-router-dom";
import Checkbox from "@mui/material/Checkbox";

// modal
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";

// Notifikasi
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  boxShadow: 24,
  opacity: 0.1,
  borderRadius: 4,
  p: 4,
};

import { useLocation, useNavigate, useParams } from "react-router-dom";
import data from "layouts/tables/data/authorsTableData";

function withRouter(Component) {
  function ComponentWithRouterProp(props) {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return <Component {...props} router={{ location, navigate, params }} />;
  }

  return ComponentWithRouterProp;
}

function cekId(idkriteria, idparam, nilai) {
  if (idkriteria == idparam) {
    return nilai;
  }
}

function RubrikAssessment(props) {
  // console.warn("props", props.router.params.id);

  // cpmk
  const [assessment, setAssessment] = useState([]);

  const { size } = typography;
  // const token = localStorage.getItem('token');
  const id_assessment = props.router.params.id;

  const fetchData = async () => {
    await axios
      .get(`http://127.0.0.1:8000/api/rubrikassessment/${id_assessment}`)

      .then((response) => {
        setAssessment(response.data);
      });
  };

  const [user, setUser] = useState({});
  const token = localStorage.getItem("token");

  const fetchDataUser = async () => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    await axios.get("http://127.0.0.1:8000/api/auth/me").then((response) => {
      setUser(response.data);
    });
  };

  useEffect(() => {
    fetchDataUser();
    fetchData();
  }, []);

  console.warn("di sini cek", assessment);

  // cpmk.map((datas)=>{
  //   const matkul = datas.matkul
  //   // console.warn("matkul", matkul);
  //   }
  // )

  // Modal
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Tambah Assessment Detail
  const [criteria, setCriteria] = useState("");
  const [inferior, setInferior] = useState("");
  const [average, setAverage] = useState("");
  const [good, setGood] = useState("");
  const [Excellent, setExcellent] = useState("");
  const navigate = useNavigate();

  const [validation, setValidation] = useState("");

  const insertHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("criteria", criteria);
    formData.append("inferior", inferior);
    formData.append("average", average);
    formData.append("good", good);
    formData.append("Excellent", Excellent);

    await axios
      .post(`http://127.0.0.1:8000/api/rubrikassessment/${id_assessment}`, formData)
      .then((response) => {
        console.log("result", response);
        toast.info(response.data.message);
        fetchData();
      })
      .catch((error) => {
        setValidation(error.response.data);
      });

    setCriteria("");
    setAverage("");
    setInferior("");
    setGood("");
    setExcellent();
  };

  async function hapusData(idHapus) {
    // alert(`Yeee di klik ${id}`);
    let text = "Yakin Ingin Menghapus Data??";
    if (confirm(text) == true) {
      axios
        .delete(`http://127.0.0.1:8000/api/rubrikassessment/delete/${idHapus}`)
        .then((response) => {
          console.log("Hapus di sini", response);
          toast.error(response.data);
          fetchData();
        })
        .catch((error) => {
          setValidation(error.response);
        });
    }
  }

  return (
    <DashboardLayout>
      {(() => {
        if (user.type === "M") {
          navigate("/");
        }
      })()}
      <DashboardNavbar />
      <ToastContainer />
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <MDBox
              variant="gradient"
              bgColor="info"
              borderRadius="lg"
              coloredShadow="info"
              mx={2}
              mt={-3}
              p={2}
              py={2}
              mb={1}
              textAlign="center"
            >
              <MDTypography variant="h6" fontWeight="medium" color="white" mt={1}>
                Tambah Kriteria
              </MDTypography>
            </MDBox>
            <Card>
              <MDBox pt={4} pb={3} px={3}>
                <MDBox display="flex" alignItems="center" ml={-1}></MDBox>
                <form method="post" onSubmit={insertHandler}>
                  <MDBox mb={2}>
                    <MDInput
                      type="text"
                      label="kriteria"
                      fullWidth
                      value={criteria}
                      onChange={(e) => setCriteria(e.target.value)}
                    />
                  </MDBox>
                  <MDBox mb={2}>
                    <MDInput
                      type="text"
                      label="Inferior"
                      fullWidth
                      multiline
                      rows={2}
                      value={inferior}
                      onChange={(e) => setInferior(e.target.value)}
                    />
                  </MDBox>
                  <MDBox mb={2}>
                    <MDInput
                      type="text"
                      label="average"
                      fullWidth
                      multiline
                      rows={2}
                      value={average}
                      onChange={(e) => setAverage(e.target.value)}
                    />
                  </MDBox>
                  <MDBox mb={2}>
                    <MDInput
                      type="text"
                      label="good"
                      fullWidth
                      multiline
                      rows={2}
                      value={good}
                      onChange={(e) => setGood(e.target.value)}
                    />
                  </MDBox>
                  <MDBox mb={2}>
                    <MDInput
                      type="text"
                      label="Excellent"
                      fullWidth
                      multiline
                      rows={2}
                      value={Excellent}
                      onChange={(e) => setExcellent(e.target.value)}
                    />
                  </MDBox>

                  <MDBox display="flex" alignItems="center" ml={-1}></MDBox>

                  <MDBox mt={4} mb={1}>
                    <MDButton
                      type="submit"
                      variant="gradient"
                      color="info"
                      onClick={handleClose}
                      fullWidth
                    >
                      Tambah
                    </MDButton>
                  </MDBox>
                  <MDBox mt={3} mb={1} textAlign="center"></MDBox>
                </form>
              </MDBox>
            </Card>
          </Box>
        </Fade>
      </Modal>
      <MDBox py={3}>
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
                  {assessment.map((datas) => (
                    <MDBox>
                      <MDTypography variant="h6" color="white">
                        Rubrik Penilaian {datas.assessment}
                      </MDTypography>
                    </MDBox>
                  ))}
                </MDBox>

                <TableContainer>
                  <MDBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
                    {assessment.map((datas) => (
                      <Table size="small">
                        <TableRow>
                          <td colSpan={4}>
                            <MDBox
                              position="relative"
                              textAlign="left"
                              opacity={0.7}
                              sx={({ typography: { size, fontWeightBold } }) => ({
                                fontSize: size.xxs,
                                fontWeight: fontWeightBold,
                                textTransform: "uppercase",
                              })}
                              colSpan={3}
                            >
                              Capaian Pembelajaran Mata Kuliah yang diases
                            </MDBox>
                          </td>
                        </TableRow>
                        {datas.cpmk.map((list) => (
                          <TableRow>
                            <DataTableBodyCell width="5em">{list.code}</DataTableBodyCell>
                            <DataTableBodyCell> : {list.name}</DataTableBodyCell>
                          </TableRow>
                        ))}
                      </Table>
                    ))}
                  </MDBox>
                </TableContainer>

                {/* Tabel Mulai */}

                {assessment.map((datas) => (
                  <TableContainer>
                    <MDBox align="right" px={5}>
                      <MDButton variant="gradient" color="info" size="small" onClick={handleOpen}>
                        Tambah <BorderColorIcon />
                      </MDButton>
                    </MDBox>
                    <MDBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
                      <Table size="small">
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
                          <DataTableHeadCell component="th" align="center">
                            Aksi
                          </DataTableHeadCell>
                        </TableRow>

                        <TableBody>
                          {datas.datas.map((kriteria) => (
                            <TableRow>
                              <DataTableBodyCell width="5em">
                                {datas.cpmkcode.map((cpmkcodes) => (
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
                              <DataTableBodyCell>
                                <MDBox mx={2} mb={1}>
                                  <Link to={`/rubrikAssessment/cpmk/${kriteria.id}`}>
                                    <MDButton
                                      variant="gradient"
                                      color="info"
                                      size="small"
                                      iconOnly={true}
                                    >
                                      <AccountTreeIcon />
                                    </MDButton>
                                  </Link>
                                </MDBox>
                                <MDBox mx={2} mb={1}>
                                  <Link to={`/rubrikAssessment/show/${kriteria.id}`}>
                                    <MDButton
                                      variant="gradient"
                                      color="success"
                                      size="small"
                                      iconOnly={true}
                                    >
                                      <BorderColorIcon />
                                    </MDButton>
                                  </Link>
                                </MDBox>
                                <MDBox mx={2} mb={1}>
                                  <MDButton
                                    variant="gradient"
                                    color="error"
                                    size="small"
                                    iconOnly={true}
                                    onClick={() => hapusData(kriteria.id)}
                                  >
                                    <DeleteIcon fontSize="large" />
                                  </MDButton>
                                </MDBox>

                                <MDBox mx={2} py={1} px={2}></MDBox>
                              </DataTableBodyCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </MDBox>
                  </TableContainer>
                ))}

                {/* Tabel Akhir */}
              </Card>
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default withRouter(RubrikAssessment);
