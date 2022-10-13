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

// DataTable
import DataTableHeadCell from "examples/Tables/DataTable/DataTableHeadCell";
import DataTableBodyCell from "examples/Tables/DataTable/DataTableBodyCell";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Link
import { Link } from "react-router-dom";

// modal
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";

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

function ShowCPMKAssessment(props) {
  // console.warn("props", props.router.params.id);

  // cpmk
  const [dataCPMK, setDataCPMK] = useState([]);
  const [idcpmk, setIdcpmk] = useState("");
  const [validation, setValidation] = useState("");

  const { size } = typography;

  const id_assessment = props.router.params.id;

  const id_detail = props.router.params.id;

  const fetchData = async () => {
    await axios
      .get(`http://127.0.0.1:8000/api/rubrikassessment/cpmk/${id_detail}`)

      .then((response) => {
        setDataCPMK(response.data);
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

    formData.append("cpmk_id", idcpmk);

    await axios
      .post(`http://127.0.0.1:8000/api/rubrikassessment/cpmk/${id_detail}`, formData)
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
        .delete(`http://127.0.0.1:8000/api/rubrikassessment/cpmk/${idHapus}/${id_assessment}`)
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
            <Grid item xs={8}>
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
                      Halaman Edit CPMK
                    </MDTypography>
                  </MDBox>
                </MDBox>
                <TableContainer>
                  <MDBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
                    <Table size="small">
                      <TableRow>
                        <DataTableHeadCell component="th" align="center">
                          Code CPMK
                        </DataTableHeadCell>
                        <DataTableHeadCell component="th" align="center">
                          CPMK
                        </DataTableHeadCell>
                        <DataTableHeadCell component="th" align="center">
                          Aksi
                        </DataTableHeadCell>
                      </TableRow>

                      {dataCPMK.map((datas) => (
                        <TableBody>
                          {datas.data.map((item) => (
                            <TableRow>
                              <DataTableBodyCell>{item.code}</DataTableBodyCell>
                              <DataTableBodyCell>{item.name}</DataTableBodyCell>
                              <DataTableBodyCell>
                                <MDButton
                                  variant="gradient"
                                  color="error"
                                  size="small"
                                  iconOnly={true}
                                  onClick={() => hapusData(item.cpmk_id)}
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
                      {dataCPMK.map((datas) => (
                        <MDBox mb={2}>
                          <select
                            className="form-control"
                            value={idcpmk}
                            onChange={(e) => setIdcpmk(e.target.value)}
                          >
                            <option value={0}>Pilih CPMK</option>
                            {datas.cpmk.map((pilihcpmk) => (
                              <option value={pilihcpmk.cpmk_id}>
                                ({pilihcpmk.code}) {pilihcpmk.name}
                              </option>
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

export default withRouter(ShowCPMKAssessment);
