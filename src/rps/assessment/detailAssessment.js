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
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";

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

// loader
import { PacmanLoader } from "react-spinners";

function withRouter(Component) {
  function ComponentWithRouterProp(props) {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return <Component {...props} router={{ location, navigate, params }} />;
  }

  return ComponentWithRouterProp;
}

function DetailAssessment(props) {
  // console.warn("props", props.router.params.id);

  // Loader
  const [loading, setLoading] = useState(true);
  let [color, setColor] = useState("#4bace9");

  // cpmk
  const [assessment, setAssessment] = useState([]);
  const [kelompok, setKelompok] = useState(0);

  const { size } = typography;
  // const token = localStorage.getItem('token');
  const id_assessment = props.router.params.id;

  const fetchData = async () => {
    setLoading(true);
    await axios
      .get(`http://127.0.0.1:8000/api/assessment/${id_assessment}`)

      .then((response) => {
        setAssessment(response.data);
      });
    setLoading(false);
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

  // Modal
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Tambah Assessment
  const [percentage, setPercentage] = useState(0);
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const [validation, setValidation] = useState("");

  const handleChange = (event) => {
    if (event.target.checked) {
      setKelompok(1);
    } else {
      setKelompok(0);
    }
  };

  const insertHandler = async (e) => {
    setLoading(true);
    e.preventDefault();

    const formData = new FormData();

    formData.append("percentage", percentage);
    formData.append("name", name);
    formData.append("kelompok", kelompok);

    await axios
      .post(`http://127.0.0.1:8000/api/assessment/${id_assessment}`, formData)
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
        .delete(`http://127.0.0.1:8000/api/assessment/delete/${idHapus}`)
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
                      <div>
                        {datas.matkul.map((mk) => (
                          <MDBox>
                            <MDTypography variant="h6" color="white">
                              Assessment {mk.name}
                              <MDBox px={4} align="right">
                                <MDButton
                                  title="Tambah Assessment"
                                  onClick={handleOpen}
                                  color="light"
                                  size="medium"
                                  variant="gradient"
                                  iconOnly={true}
                                >
                                  <PlaylistAddIcon />
                                </MDButton>
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
                                          <MDTypography
                                            variant="h6"
                                            fontWeight="medium"
                                            color="white"
                                            mt={1}
                                          >
                                            Tambah Assessment
                                          </MDTypography>
                                        </MDBox>
                                        <MDBox pt={4} pb={3} px={3}>
                                          <MDBox display="flex" alignItems="center" ml={-1}></MDBox>
                                          <form method="post" onSubmit={insertHandler}>
                                            <MDBox mb={1}>
                                              <MDInput
                                                type="text"
                                                label="name"
                                                fullWidth
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                              />
                                            </MDBox>

                                            <TableCell>
                                              <div className="form-check form-switch">
                                                <input
                                                  className="form-check-input"
                                                  type="Checkbox"
                                                  onChange={handleChange}
                                                  fullWidth
                                                  value={kelompok}
                                                />
                                                Kelompok
                                              </div>
                                            </TableCell>

                                            <MDBox
                                              display="flex"
                                              alignItems="center"
                                              ml={-1}
                                            ></MDBox>

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
                              </MDBox>
                            </MDTypography>
                          </MDBox>
                        ))}
                      </div>
                    ))}
                  </MDBox>

                  {/* Tabel Mulai */}

                  <TableContainer>
                    <MDBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
                      <Table size="small">
                        <TableRow>
                          <DataTableHeadCell component="th" align="center">
                            <MDTypography variant="h6"> Kriteria </MDTypography>
                          </DataTableHeadCell>
                          <DataTableHeadCell component="th" align="center">
                            <MDTypography variant="h6"> Presentase </MDTypography>
                          </DataTableHeadCell>

                          <DataTableHeadCell component="th" align="center">
                            <MDTypography variant="h6"> Aksi </MDTypography>
                          </DataTableHeadCell>
                        </TableRow>

                        {assessment.map((datas) => (
                          <TableBody>
                            {datas.datas.map((asitem, inde) => (
                              <TableRow>
                                <DataTableBodyCell>
                                  <MDBox
                                    display="inline-block"
                                    width="30em"
                                    color="text"
                                    fontSize={size.sm}
                                    px={1.5}
                                  >
                                    {asitem.name}
                                  </MDBox>
                                </DataTableBodyCell>
                                <DataTableBodyCell>{datas.totalAsses[inde]} %</DataTableBodyCell>
                                <DataTableBodyCell>
                                  <Link to={`/rubrikAssessment/${asitem.id}`}>
                                    <MDButton
                                      title="Rubrik Assessment"
                                      variant="gradient"
                                      color="info"
                                      size="medium"
                                      iconOnly={true}
                                    >
                                      <AccountTreeIcon />
                                    </MDButton>
                                  </Link>
                                  &nbsp; &nbsp;
                                  <Link to={`/assessment/show/${asitem.id}`}>
                                    <MDButton
                                      title="Edit"
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
                                    title="Hapus"
                                    variant="gradient"
                                    color="error"
                                    size="medium"
                                    iconOnly={true}
                                    onClick={() => hapusData(asitem.id)}
                                  >
                                    <DeleteIcon fontSize="large" />
                                  </MDButton>
                                </DataTableBodyCell>
                              </TableRow>
                            ))}
                            <TableRow>
                              <DataTableBodyCell>
                                <MDTypography variant="h6"> Total </MDTypography>
                              </DataTableBodyCell>
                              <DataTableBodyCell>
                                <MDTypography variant="h6"> {datas.total} %</MDTypography>
                              </DataTableBodyCell>
                            </TableRow>
                          </TableBody>
                        ))}
                      </Table>
                    </MDBox>
                  </TableContainer>

                  {/* Tabel Akhir */}
                </Card>
              </Grid>
            </Grid>
          </MDBox>
        </MDBox>
      )}
      <Footer />
    </DashboardLayout>
  );
}

export default withRouter(DetailAssessment);
