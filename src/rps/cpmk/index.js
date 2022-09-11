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

function CPMK(props) {
  // console.warn("props", props.router.params.id);

  // cpmk
  const [cpmk, setCPMK] = useState([]);

  const { size } = typography;
  // const token = localStorage.getItem('token');
  const id_cpmk = props.router.params.id;

  const fetchData = async () => {
    await axios
      .get(`http://127.0.0.1:8000/api/cpmk/${id_cpmk}`)

      .then((response) => {
        setCPMK(response.data);
      });
  };
  useEffect(() => {
    fetchData();
  }, []);

  console.warn("cpmk", cpmk);

  // cpmk.map((datas)=>{
  //   const matkul = datas.matkul
  //   // console.warn("matkul", matkul);
  //   }
  // )

  // Modal
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Tambah CPMK
  const [code, setCode] = useState("");
  const [name, setName] = useState("");

  const [validation, setValidation] = useState("");

  const insertHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("code", code);
    formData.append("name", name);

    await axios
      .post(`http://127.0.0.1:8000/api/cpmk/${id_cpmk}`, formData)
      .then((response) => {
        console.log("result", response);

        navigate(`/cpmk_detail/${id_cpmk}`);
      })
      .catch((error) => {
        setValidation(error.response.data);
      });
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
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
                  {cpmk.map((datas) => (
                    <div>
                      {datas.matkul.map((mk) => (
                        <MDBox>
                          <MDTypography variant="h6" color="white">
                            CPMK {mk.name}
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
                                          Tambah CPMK
                                        </MDTypography>
                                      </MDBox>
                                      <MDBox pt={4} pb={3} px={3}>
                                        <MDBox display="flex" alignItems="center" ml={-1}></MDBox>
                                        <form method="post" onSubmit={insertHandler}>
                                          <MDBox mb={2}>
                                            <MDInput
                                              type="text"
                                              label="code"
                                              fullWidth
                                              value={code}
                                              onChange={(e) => setCode(e.target.value)}
                                            />
                                          </MDBox>
                                          <MDBox mb={2}>
                                            <MDInput
                                              type="text"
                                              label="name"
                                              fullWidth
                                              value={name}
                                              onChange={(e) => setName(e.target.value)}
                                            />
                                          </MDBox>

                                          <MDBox mb={2}>
                                            <MDTypography>
                                              <input type="checkbox" /> Sub-CPMK
                                            </MDTypography>
                                          </MDBox>
                                          <MDBox display="flex" alignItems="center" ml={-1}></MDBox>

                                          <MDBox mt={4} mb={1}>
                                            <MDButton
                                              type="submit"
                                              variant="gradient"
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
                          <MDTypography variant="h6"> Code </MDTypography>
                        </DataTableHeadCell>
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

                      {cpmk.map((datas) => (
                        <TableBody>
                          {datas.datas.map((cpmkitem) => (
                            <TableRow>
                              <DataTableBodyCell>{cpmkitem.code}</DataTableBodyCell>
                              <DataTableBodyCell>
                                <MDBox
                                  display="inline-block"
                                  width="30em"
                                  color="text"
                                  fontSize={size.sm}
                                  px={1.5}
                                >
                                  {cpmkitem.name}
                                </MDBox>
                              </DataTableBodyCell>
                              <DataTableBodyCell>{cpmkitem.precentages} %</DataTableBodyCell>
                              <DataTableBodyCell>
                                <MDTypography>Skip</MDTypography>
                              </DataTableBodyCell>
                            </TableRow>
                          ))}
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
      <Footer />
    </DashboardLayout>
  );
}

export default withRouter(CPMK);