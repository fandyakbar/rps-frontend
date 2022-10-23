import React, { useState, useEffect } from "react";

// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

import Card from "@mui/material/Card";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

// Tabel React
// import Table from 'react-bootstrap/Table';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";

import Icon from "@mui/material/Icon";

import typography from "assets/theme/base/typography";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";

import axios from "axios";

// modal
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";

//icon

import DeleteIcon from "@mui/icons-material/Delete";

// DataTable
import DataTableHeadCell from "examples/Tables/DataTable/DataTableHeadCell";
import DataTableBodyCell from "examples/Tables/DataTable/DataTableBodyCell";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

function withRouter(Component) {
  function ComponentWithRouterProp(props) {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return <Component {...props} router={{ location, navigate, params }} />;
  }

  return ComponentWithRouterProp;
}

function Kategori(props) {
  // Modal
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [kategori, setKategori] = useState([]);
  const [idKategori, setIdKategori] = useState("");
  const [nameKategori, setNameKategori] = useState("");
  const [validation, setValidation] = useState("");

  const { size } = typography;

  const id_assessment = props.router.params.id;

  const id_detail = props.router.params.id;

  const fetchData = async () => {
    await axios
      .get(`http://127.0.0.1:8000/api/kategori/${id_detail}`)

      .then((response) => {
        setKategori(response.data);
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
    fetchData();
    fetchDataUser();
  }, []);

  const navigate = useNavigate();

  const insertHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("kategori_id", idKategori);

    await axios
      .post(`http://127.0.0.1:8000/api/kategori/${id_detail}`, formData)
      .then((response) => {
        console.log("result", response);
        toast.info("Data Berhasil Ditambahkan");
      })
      .catch((error) => {
        setValidation(error.response.data);
        toast.error("Data Gagal Ditambahkan");
        toast.warn("Data Sudah Ada");
      });

    fetchData();
  };

  const insertKategoriHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("name", nameKategori);

    await axios
      .post(`http://127.0.0.1:8000/api/kategoris`, formData)
      .then((response) => {
        console.log("result", response);
        toast.info("Data Berhasil Ditambahkan");
      })
      .catch((error) => {
        setValidation(error.response.data);
        toast.error("Data Gagal Ditambahkan");
        toast.warn("Data Sudah Ada");
      });

    fetchData();
  };

  async function hapusData(idHapus) {
    // alert(`Yeee di klik ${id}`);
    let text = "Yakin Ingin Menghapus Data??";
    if (confirm(text) == true) {
      axios
        .delete(`http://127.0.0.1:8000/api/kategori/${idHapus}/${id_assessment}`)
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
      <MDBox py={3}>
        <MDBox>
          <Grid container spacing={3}>
            <Grid item xs={6}>
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
                      Halaman Edit Kategori
                    </MDTypography>

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
                                Tambah Kategori
                              </MDTypography>
                            </MDBox>
                            <MDBox pt={4} pb={3} px={3}>
                              <MDBox display="flex" alignItems="center" ml={-1}></MDBox>
                              <form method="post" onSubmit={insertKategoriHandler}>
                                <MDBox mb={2}>
                                  <MDInput
                                    type="text"
                                    label="name"
                                    fullWidth
                                    value={nameKategori}
                                    onChange={(e) => setNameKategori(e.target.value)}
                                  />
                                </MDBox>

                                <MDBox display="flex" alignItems="center" ml={-1}></MDBox>

                                <MDBox mt={4} mb={1}>
                                  <MDButton
                                    type="submit"
                                    variant="gradient"
                                    onClick={handleClose}
                                    color="info"
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
                  </MDBox>
                </MDBox>
                <TableContainer>
                  <MDBox align="right" mt={2} px={2}>
                    <MDButton
                      variant="gradient"
                      onClick={handleOpen}
                      color="success"
                      fontSize="medium"
                      size="small"
                    >
                      <Icon iconOnly={true} fontSize="small">
                        add_circle_outline
                      </Icon>{" "}
                      &nbsp; custom
                    </MDButton>
                  </MDBox>
                  <MDBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
                    <Table size="small">
                      <TableRow>
                        <DataTableHeadCell component="th" align="center">
                          Kategori
                        </DataTableHeadCell>
                        <DataTableHeadCell component="th" align="center">
                          Aksi
                        </DataTableHeadCell>
                      </TableRow>

                      {kategori.map((datas) => (
                        <TableBody>
                          {datas.data.map((item) => (
                            <TableRow>
                              <DataTableBodyCell>{item.kategori}</DataTableBodyCell>
                              <DataTableBodyCell>
                                <MDButton
                                  variant="gradient"
                                  color="error"
                                  size="small"
                                  iconOnly={true}
                                  onClick={() => hapusData(item.idkat)}
                                >
                                  <DeleteIcon fontSize="large" />
                                </MDButton>
                              </DataTableBodyCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      ))}
                    </Table>
                  </MDBox>
                  <MDBox px={5}>
                    <form method="post" onSubmit={insertHandler}>
                      {kategori.map((datas) => (
                        <MDBox mb={2}>
                          <select
                            className="form-control"
                            value={idKategori}
                            onChange={(e) => setIdKategori(e.target.value)}
                          >
                            <option value={0}>Pilih Kategori</option>
                            {datas.dataKategori.map((pilihKategori) => (
                              <option value={pilihKategori.id}>{pilihKategori.name}</option>
                            ))}
                          </select>
                        </MDBox>
                      ))}

                      <MDBox mt={2} mb={1}>
                        <MDButton type="submit" variant="gradient" color="info">
                          Tambah
                        </MDButton>
                      </MDBox>
                      <MDBox mt={3} mb={1} textAlign="center"></MDBox>
                    </form>
                  </MDBox>
                </TableContainer>
              </Card>
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default withRouter(Kategori);
