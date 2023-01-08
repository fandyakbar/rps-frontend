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

// loader
import { PacmanLoader } from "react-spinners";

const style = {
  position: "absolute",
  display: "flex",
  justifyContent: "center",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "40%",
  height: "100%",
  backgroundColor: "rgba(0,0,0, .1)",
  boxShadow: 24,
  p: 4,
  zIndex: "1000",
  overflowY: "auto",
};

import { useLocation, useNavigate, useParams } from "react-router-dom";

import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import kategori from "./kategori";

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
  // Loader
  const [loading, setLoading] = useState(true);
  let [color, setColor] = useState("#4bace9");

  // cpmk
  const [assessment, setAssessment] = useState([]);
  const [category, setCategory] = useState([]);

  const { size } = typography;
  // const token = localStorage.getItem('token');
  const id_assessment = props.router.params.id;

  const fetchData = async () => {
    await axios
      .get(`http://127.0.0.1:8000/api/rubrikassessment/${id_assessment}`)

      .then((response) => {
        setAssessment(response.data);
      });

    await axios
      .get(`http://127.0.0.1:8000/api/kategori/${id_assessment}`)

      .then((response) => {
        setCategory(response.data);
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

  // Tambah Assessment Detail
  const [criteria, setCriteria] = useState("");
  const [inferior, setInferior] = useState("");
  const [average, setAverage] = useState("");
  const [good, setGood] = useState("");
  const [Excellent, setExcellent] = useState("");
  const navigate = useNavigate();

  const [validation, setValidation] = useState("");

  const [cpmkArray, setCpmkArray] = useState({
    cpmkid: [],
  });

  const [ambilIdKategori, setAmbilIdKategori] = useState("");
  const [ambilIdKriteria, setAmbilIdKriteria] = useState("");
  const [ambilNilai, setAmbilNilai] = useState("");
  const [ambilPoint, setAmbilPoint] = useState("");

  const insertHandler = async (e) => {
    setLoading(true);
    e.preventDefault();

    const formData = new FormData();

    formData.append("criteria", criteria);
    formData.append("inferior", inferior);
    formData.append("average", average);
    formData.append("good", good);
    formData.append("Excellent", Excellent);

    cpmkArray.cpmkid.map((listcpmk, indess) => {
      formData.append(`listcpmk[${indess}]`, listcpmk);
    });

    await axios
      .post(`http://127.0.0.1:8000/api/rubrikassessment/${id_assessment}`, formData)
      .then((response) => {
        console.log("result", response);
        toast.info(response.data.message);
        fetchData();
      })
      .catch((error) => {
        setValidation(error.response.data);
        toast.error(error.response.data.message);
        setLoading(false);
      });

    setCriteria("");
    setAverage("");
    setInferior("");
    setGood("");
    setExcellent();
  };

  function cekValue(inputValue, inputPoint, inputId, paramId) {
    if (inputId == paramId) {
      return (
        <DataTableBodyCell>
          {inputValue} <br /> {inputPoint}
          <b> Point</b>
        </DataTableBodyCell>
      );
    }
  }

  function cekBtnKategori(params) {
    if (params.length != 0) {
      console.log("cek param", params);
      return (
        <Link to={`/kategori/${id_assessment}`}>
          <MDButton variant="gradient" color="success" size="small">
            <Icon fontSize="small">align_horizontal_left</Icon> &nbsp; Kategori
          </MDButton>
        </Link>
      );
    }
  }

  const updateHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("nilai", ambilNilai);
    formData.append("point", ambilPoint);
    formData.append("id_kategori", ambilIdKategori);
    formData.append("id_kriteria", ambilIdKriteria);

    await axios
      .post(`http://127.0.0.1:8000/api/kategories/rubrik`, formData)
      .then((response) => {
        console.log("cek result", response);
        toast.success("Berhasil Mengubah Data");
        fetchData();
      })
      .catch((error) => {
        setValidation(error.response.data);
      });

    fetchData();
  };

  async function hapusData(idHapus) {
    // alert(`Yeee di klik ${id}`);
    let text = "Yakin Ingin Menghapus Data??";
    if (confirm(text) == true) {
      setLoading(true);
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
  console.log("tescpmknya", cpmkArray.cpmkid);

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
        <>
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
                  width={40}
                  borderRadius=".5em"
                >
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
                        Tambah Kriteria
                      </MDTypography>
                    </MDBox>
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
                        {assessment.map((datas) => (
                          <MDBox>
                            {datas.cpmk.map((inputcpmk, indeknya) => (
                              <TableRow>
                                <TableCell>
                                  <div className="form-check form-switch">
                                    <input
                                      className="form-check-input"
                                      type="Checkbox"
                                      value={inputcpmk.cpmk_id}
                                      onChange={(e) => {
                                        const { cpmkid } = cpmkArray;
                                        if (e.target.checked) {
                                          setCpmkArray({
                                            cpmkid: [...cpmkid, inputcpmk.cpmk_id],
                                          });
                                        } else {
                                          setCpmkArray({
                                            cpmkid: cpmkid.filter((e) => e !== inputcpmk.cpmk_id),
                                          });
                                        }
                                      }}
                                      fullWidth
                                    />
                                    ({inputcpmk.code}) {inputcpmk.name}
                                  </div>
                                </TableCell>
                              </TableRow>
                            ))}
                          </MDBox>
                        ))}
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
                </div>
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
                      <MDBox
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        p={3}
                      >
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
                        <Grid container spacing={3}>
                          <Grid item xs={7}>
                            <MDBox align="left" px={5}>
                              <MDButton
                                variant="gradient"
                                color="info"
                                size="small"
                                onClick={handleOpen}
                              >
                                <Icon fontSize="small">border_color</Icon> &nbsp; Tambah
                              </MDButton>
                              &nbsp;
                              {cekBtnKategori(datas.datas)}
                            </MDBox>
                            {category.map((paramKategori) => (
                              <MDBox align="left" px={5}>
                                {paramKategori.data.length != 0 && (
                                  <form method="post" onSubmit={updateHandler}>
                                    <MDBox mt={2} mb={2}>
                                      <Row fullWidth>
                                        <Col>
                                          {assessment.map((datas) => (
                                            <select
                                              className="form-control"
                                              value={ambilIdKriteria}
                                              onChange={(e) => setAmbilIdKriteria(e.target.value)}
                                            >
                                              <option value={0}>Pilih Kriteria</option>
                                              {datas.datas.map((pilihas) => (
                                                <option value={pilihas.id}>
                                                  ({pilihas.id}){pilihas.criteria}
                                                </option>
                                              ))}
                                            </select>
                                          ))}
                                        </Col>
                                        <Col>
                                          {category.map((pilihanss) => (
                                            <select
                                              className="form-control"
                                              value={ambilIdKategori}
                                              onChange={(e) => setAmbilIdKategori(e.target.value)}
                                            >
                                              <option value={0}>Pilih Kategori</option>
                                              {pilihanss.data.map((pilihkat) => (
                                                <option value={pilihkat.idkat}>
                                                  ({pilihkat.idkat}) {pilihkat.kategori}
                                                </option>
                                              ))}
                                            </select>
                                          ))}
                                        </Col>
                                      </Row>
                                    </MDBox>

                                    <MDBox mb={2}>
                                      <MDInput
                                        type="text"
                                        label="Nilai"
                                        fullWidth
                                        value={ambilNilai}
                                        onChange={(e) => setAmbilNilai(e.target.value)}
                                      />
                                    </MDBox>
                                    <MDBox mb={2}>
                                      <input
                                        className="form-control"
                                        type="number"
                                        step="0.01"
                                        min="0"
                                        placeholder="point"
                                        fullWidth
                                        value={ambilPoint}
                                        onChange={(e) => setAmbilPoint(e.target.value)}
                                      />
                                    </MDBox>
                                    <MDBox mt={1} mb={1}>
                                      <MDButton type="submit" variant="gradient" color="info">
                                        Submit
                                      </MDButton>
                                    </MDBox>
                                    <MDBox mt={3} mb={1} textAlign="center"></MDBox>
                                  </form>
                                )}
                              </MDBox>
                            ))}
                          </Grid>
                        </Grid>

                        <MDBox
                          display="flex"
                          justifyContent="space-between"
                          alignItems="center"
                          p={3}
                        >
                          <Table size="small">
                            {category.map((ambilKategori) => (
                              <TableRow>
                                <DataTableHeadCell component="th" align="center">
                                  CP-MK
                                </DataTableHeadCell>
                                <DataTableHeadCell component="th" align="center">
                                  Kriteria
                                </DataTableHeadCell>
                                {ambilKategori.data.map((listKategori) => (
                                  <DataTableHeadCell component="th" align="center">
                                    {listKategori.kategori}
                                  </DataTableHeadCell>
                                ))}
                                <DataTableHeadCell component="th" align="center">
                                  Aksi
                                </DataTableHeadCell>
                              </TableRow>
                            ))}

                            {category.map((ambilKategori) => (
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
                                    {ambilKategori.rubrik.map((nilaikategori) =>
                                      cekValue(
                                        nilaikategori.value,
                                        nilaikategori.point,
                                        nilaikategori.assessment_detail_id,
                                        kriteria.id
                                      )
                                    )}
                                    <DataTableBodyCell>
                                      <MDBox mx={2} mb={1}>
                                        <Link to={`/rubrikAssessment/show/${kriteria.id}`}>
                                          <MDButton
                                            variant="gradient"
                                            color="success"
                                            size="medium"
                                            iconOnly={true}
                                          >
                                            <BorderColorIcon />
                                          </MDButton>
                                        </Link>
                                        &nbsp;
                                        <MDButton
                                          variant="gradient"
                                          color="error"
                                          size="medium"
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
                            ))}
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
        </>
      )}
      <Footer />
    </DashboardLayout>
  );
}

export default withRouter(RubrikAssessment);
