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
  display: "flex",
  justifyContent: "center",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  height: "100%",
  backgroundColor: "rgba(0,0,0, .1)",
  boxShadow: 24,
  p: 4,
  zIndex: "1000",
  overflowY: "auto",
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

function cekMember(member) {
  if (member == 1) {
    return "individual";
  } else {
    return "Kelompok (" + member + " orang)";
  }
}

function ShowTask(props) {
  // console.warn("props", props.router.params.id);

  // cpmk
  const [task, setTask] = useState([]);

  const { size } = typography;
  // const token = localStorage.getItem('token');
  const id_rps = props.router.params.id;

  const fetchData = async () => {
    await axios
      .get(`http://127.0.0.1:8000/api/task/${id_rps}`)

      .then((response) => {
        setTask(response.data);
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

  console.warn("di sini cek", task);

  // Modal
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Tambah Assessment

  const [name, setName] = useState("");
  const [theme, setTheme] = useState("");
  const [description, setDescription] = useState("");
  const [step, setStep] = useState("");
  const [output, setOutput] = useState("");
  const [member, setMember] = useState(0);

  const navigate = useNavigate();

  const [validation, setValidation] = useState("");

  const insertHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("name", name);
    formData.append("theme", theme);
    formData.append("description", description);
    formData.append("step", step);
    formData.append("output", output);
    formData.append("member", member);

    await axios
      .post(`http://127.0.0.1:8000/api/task/${id_rps}`, formData)
      .then((response) => {
        console.log("result", response);
        toast.info(response.data.message);
        fetchData();
      })
      .catch((error) => {
        setValidation(error.response.data);
      });
  };

  async function hapusData(idHapus) {
    // alert(`Yeee di klik ${id}`);
    let text = "Yakin Ingin Menghapus Data??";
    if (confirm(text) == true) {
      axios
        .delete(`http://127.0.0.1:8000/api/task/${idHapus}`)
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
      {task.map((datas) => (
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
                    <MDBox>
                      <MDTypography variant="h6" color="white">
                        Daftar Tugas Mata Kuliah {datas.namaMatkul}
                        <MDBox px={4} align="right">
                          <MDButton
                            onClick={handleOpen}
                            color="white"
                            fontSize="medium"
                            size="small"
                          >
                            <ManageSearchIcon size="medium" /> Tambah
                          </MDButton>
                          <Modal
                            aria-labelledby="transition-modal-title"
                            aria-describedby="transition-modal-description"
                            open={open}
                            padding="15px"
                            onClose={handleClose}
                            closeAfterTransition
                            BackdropComponent={Backdrop}
                            BackdropProps={{
                              timeout: 500,
                            }}
                          >
                            <Fade in={open}>
                              <Box sx={style}>
                                <div
                                  position="absolute"
                                  backgroundColor="#FFF"
                                  padding={9}
                                  zIndex="1000"
                                  width="35%"
                                  borderRadius=".5em"
                                >
                                  <Card>
                                    <MDBox
                                      variant="gradient"
                                      bgColor="info"
                                      borderRadius="lg"
                                      coloredShadow="info"
                                      width={700}
                                      mx={2}
                                      mt={-3}
                                      p={2}
                                      py={2}
                                      mb={1}
                                      textAlign="center"
                                    >
                                      <MDTypography
                                        variant="h6"
                                        fontWeight="medium"
                                        color="white"
                                        mt={1}
                                      >
                                        Tambah Penugasan
                                      </MDTypography>
                                    </MDBox>
                                    <MDBox pt={4} pb={3} px={1}>
                                      <MDBox display="flex" alignItems="center" ml={-1}></MDBox>
                                      <form method="post" onSubmit={insertHandler}>
                                        <MDBox px={4} mb={2}>
                                          <MDInput
                                            type="text"
                                            label="name"
                                            fullWidth
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                          />
                                        </MDBox>

                                        <MDBox px={4} mb={2}>
                                          <MDInput
                                            type="text"
                                            label="theme"
                                            fullWidth
                                            value={theme}
                                            onChange={(e) => setTheme(e.target.value)}
                                          />
                                        </MDBox>
                                        <MDBox px={4} mb={2}>
                                          <MDInput
                                            type="text"
                                            multiline
                                            rows={8}
                                            label="Deskripsi"
                                            fullWidth
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                          />
                                        </MDBox>

                                        <MDBox px={4} mb={2}>
                                          <MDInput
                                            type="text"
                                            multiline
                                            rows={20}
                                            label="Langkah"
                                            fullWidth
                                            value={step}
                                            onChange={(e) => setStep(e.target.value)}
                                          />
                                        </MDBox>

                                        <MDBox px={4} mb={2}>
                                          <MDInput
                                            type="text"
                                            label="Output"
                                            fullWidth
                                            value={output}
                                            onChange={(e) => setOutput(e.target.value)}
                                          />
                                        </MDBox>

                                        <MDBox px={4} mb={2}>
                                          <MDInput
                                            type="number"
                                            label="Jumlah Anggota"
                                            fullWidth
                                            value={member}
                                            onChange={(e) => setMember(e.target.value)}
                                          />
                                        </MDBox>

                                        <MDBox display="flex" alignItems="center" ml={-1}></MDBox>

                                        <MDBox px={4} mt={4} mb={1}>
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
                                </div>
                              </Box>
                            </Fade>
                          </Modal>
                        </MDBox>
                      </MDTypography>
                    </MDBox>
                  </MDBox>

                  {/* Tabel Mulai */}

                  <TableContainer>
                    <MDBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
                      <Table size="small">
                        <TableRow>
                          <DataTableHeadCell component="th" align="center">
                            <MDTypography variant="h6"> Tugas </MDTypography>
                          </DataTableHeadCell>
                          <DataTableHeadCell component="th" align="center">
                            <MDTypography variant="h6"> Tema </MDTypography>
                          </DataTableHeadCell>
                          <DataTableHeadCell component="th" align="center">
                            <MDTypography variant="h6"> Output </MDTypography>
                          </DataTableHeadCell>
                          <DataTableHeadCell component="th" align="center">
                            <MDTypography variant="h6"> Member </MDTypography>
                          </DataTableHeadCell>
                          <DataTableHeadCell component="th" align="center">
                            <MDTypography variant="h6"> Aksi </MDTypography>
                          </DataTableHeadCell>
                        </TableRow>
                        <TableBody>
                          {datas.tugas.map((item) => (
                            <TableRow>
                              <DataTableBodyCell>{item.name} </DataTableBodyCell>
                              <DataTableBodyCell>{item.theme} </DataTableBodyCell>
                              <DataTableBodyCell>{item.output} </DataTableBodyCell>
                              <DataTableBodyCell>{cekMember(item.member)}</DataTableBodyCell>
                              <DataTableBodyCell>
                                <Link to={`/task/show/${item.id}`}>
                                  <MDButton
                                    variant="gradient"
                                    color="success"
                                    size="medium"
                                    iconOnly={true}
                                  >
                                    <BorderColorIcon />
                                  </MDButton>
                                </Link>
                                &nbsp; &nbsp;
                                <MDButton
                                  variant="gradient"
                                  color="error"
                                  size="medium"
                                  iconOnly={true}
                                  onClick={() => hapusData(item.id)}
                                >
                                  <DeleteIcon fontSize="large" />
                                </MDButton>
                              </DataTableBodyCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </MDBox>
                  </TableContainer>

                  {/* Tabel Akhir */}
                </Card>
              </Grid>
            </Grid>
          </MDBox>
        </MDBox>
      ))}
      <Footer />
    </DashboardLayout>
  );
}

export default withRouter(ShowTask);
