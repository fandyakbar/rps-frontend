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

import "bootstrap/dist/css/bootstrap.min.css";

//icon
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import DeleteIcon from "@mui/icons-material/Delete";
import BorderColorIcon from "@mui/icons-material/BorderColor";

// DataTable
import DataTableHeadCell from "examples/Tables/DataTable/DataTableHeadCell";
import DataTableBodyCell from "examples/Tables/DataTable/DataTableBodyCell";

// Link
import { Link } from "react-router-dom";

// modal
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";

// Notifikasi
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// loader
import { PacmanLoader } from "react-spinners";

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

function cekIndeks(idnilai, idassess, nilainya) {
  if (idnilai == idassess) {
    return <DataTableBodyCell align="center">{cekNilai(nilainya)}</DataTableBodyCell>;
  } else {
    return "";
  }
}

function ShowRubrik(props) {
  // cpmk
  const [rubriks, setRubriks] = useState([]);

  const { size } = typography;
  // const token = localStorage.getItem('token');
  const id_course = props.router.params.id;

  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // Loader
  const [loading, setLoading] = useState(true);
  let [color, setColor] = useState("#4bace9");

  const fetchDataUser = async () => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    await axios.get("http://127.0.0.1:8000/api/auth/me").then((response) => {
      setUser(response.data);
    });
  };

  const fetchData = async () => {
    await axios
      .get(`http://127.0.0.1:8000/api/rubrik/${id_course}`)

      .then((response) => {
        setRubriks(response.data);
      });
    setLoading(false);
  };

  useEffect(() => {
    fetchDataUser();
    fetchData();
  }, []);

  console.warn("di sini cek", rubriks);

  // Modal
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Edit Rubrik
  const [nilai, setNilai] = useState(0);
  const [idcpmks, setIdcpmks] = useState(0);
  const [idass, setIdass] = useState(0);

  const [validation, setValidation] = useState("");

  const updateHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("nilai", nilai);
    formData.append("cpmk_id", idcpmks);
    formData.append("assessment_id", idass);

    await axios
      .post(`http://127.0.0.1:8000/api/rubrik`, formData)
      .then((response) => {
        console.log("cek result", response);
        toast.success("Berhasil Mengubah Nilai");
        fetchData();
      })
      .catch((error) => {
        setValidation(error.response.data);
      });
  };

  return (
    <DashboardLayout>
      {(() => {
        if (user.type === "M") {
          navigate("/");
        }
      })()}
      <ToastContainer />
      <DashboardNavbar />
      {loading ? (
        <MDBox
          display="flex"
          justifyContent="center"
          alignItems="center"
          width="100%"
          height="100%"
        >
          <PacmanLoader color={color} loading={loading} size={25} />
        </MDBox>
      ) : (
        <>
          {rubriks.map((datas) => (
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
                        <div>
                          {datas.matkul.map((mk) => (
                            <MDBox>
                              <MDTypography variant="h6" color="white">
                                Tabel Rencana Assessment {mk.name}
                                <MDBox px={4} align="right">
                                  <MDButton
                                    onClick={handleOpen}
                                    color="white"
                                    fontSize="medium"
                                    size="small"
                                    alignItems="right"
                                  >
                                    <BorderColorIcon size="medium" /> Edit
                                  </MDButton>
                                </MDBox>
                              </MDTypography>
                            </MDBox>
                          ))}
                        </div>
                      </MDBox>
                      {/* Modal Mulai */}
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
                            <Card>
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
                                  Edit Rubrik
                                </MDTypography>
                              </MDBox>
                              <MDBox pt={4} pb={3} px={3}>
                                <MDBox display="flex" alignItems="center" ml={-1}></MDBox>
                                <form method="post" onSubmit={updateHandler}>
                                  <MDBox mb={2}>
                                    <label>
                                      <TableRow>
                                        <DataTableBodyCell>{idass}</DataTableBodyCell>
                                      </TableRow>
                                      <TableRow>
                                        <select
                                          className="form-control"
                                          value={idass}
                                          onChange={(e) => setIdass(e.target.value)}
                                        >
                                          <option value={0}>Pilih Assessment</option>
                                          {datas.assessment.map((pilihas) => (
                                            <option value={pilihas.assessment_id}>
                                              {pilihas.name}
                                            </option>
                                          ))}
                                        </select>
                                      </TableRow>
                                    </label>
                                  </MDBox>
                                  <MDBox mb={2}>
                                    <label>
                                      <TableRow>
                                        <DataTableBodyCell>{idcpmks}</DataTableBodyCell>
                                      </TableRow>
                                      <TableRow>
                                        <select
                                          className="form-control"
                                          value={idcpmks}
                                          onChange={(e) => setIdcpmks(e.target.value)}
                                        >
                                          <option value={0}>Pilih CPMK</option>
                                          {datas.cpmk.map((pilihcpmk) => (
                                            <option value={pilihcpmk.cpmk_id}>
                                              {pilihcpmk.name}
                                            </option>
                                          ))}
                                        </select>
                                      </TableRow>
                                    </label>
                                  </MDBox>

                                  <MDBox mb={2}>
                                    <input
                                      className="form-control"
                                      type="number"
                                      label="Nilai"
                                      min="0"
                                      fullWidth
                                      value={nilai}
                                      onChange={(e) => setNilai(e.target.value)}
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
                                      Submit
                                    </MDButton>
                                  </MDBox>
                                  <MDBox mt={3} mb={1} textAlign="center"></MDBox>
                                </form>
                              </MDBox>
                            </Card>
                          </Box>
                        </Fade>
                      </Modal>
                      {/* Modal Selesai */}
                      {/* Tabel Mulai */}
                      <TableContainer>
                        <MDBox
                          display="flex"
                          justifyContent="space-between"
                          alignItems="center"
                          p={3}
                        >
                          <Table size="small">
                            <TableRow>
                              <MDBox component="th" align="center">
                                <MDTypography variant="h6">CPMK \ Assessment </MDTypography>
                              </MDBox>

                              {datas.assessment.map((jenis) => (
                                <DataTableHeadCell align="center">{jenis.name}</DataTableHeadCell>
                              ))}
                              <DataTableHeadCell>
                                <MDBox
                                  display="flex"
                                  justifyContent="center"
                                  alignItems="center"
                                  flexWrap="wrap"
                                  color="text"
                                  fontSize={size.sm}
                                  px={1.5}
                                >
                                  Total
                                </MDBox>
                              </DataTableHeadCell>
                            </TableRow>
                            <TableBody>
                              {datas.cpmk.map((cpk, indeks) => (
                                <TableRow>
                                  <DataTableBodyCell>
                                    <MDBox
                                      display="inline-block"
                                      width="20em"
                                      color="text"
                                      fontSize={size.sm}
                                      px={1.5}
                                    >
                                      {cpk.name}
                                    </MDBox>
                                  </DataTableBodyCell>
                                  {datas.nilai.map((nil) =>
                                    cekIndeks(nil.course_lo_id, cpk.cpmk_id, nil.precentage)
                                  )}
                                  <DataTableBodyCell align="center">
                                    <MDTypography variant="h6">
                                      {cekNilai(datas.totalcpmk[indeks])}
                                    </MDTypography>
                                  </DataTableBodyCell>
                                </TableRow>
                              ))}
                              <TableRow>
                                <DataTableBodyCell>
                                  <MDTypography variant="h6">Total</MDTypography>
                                </DataTableBodyCell>
                                {datas.totalAsses.map((totalAssess) => (
                                  <DataTableBodyCell align="center">
                                    <MDTypography variant="h6">
                                      {cekNilai(totalAssess)}
                                    </MDTypography>
                                  </DataTableBodyCell>
                                ))}
                              </TableRow>
                            </TableBody>
                          </Table>
                        </MDBox>
                      </TableContainer>
                      {/* Tabel Selesai */}
                    </Card>
                  </Grid>
                </Grid>
              </MDBox>
            </MDBox>
          ))}
        </>
      )}
      <Footer />
    </DashboardLayout>
  );
}

export default withRouter(ShowRubrik);
