/**
=========================================================
* Material Dashboard 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/
// react bootsrap
import Table from 'react-bootstrap/Table';

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MDTypography from "components/MDTypography";

import DataTable from "examples/Tables/DataTable";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

import { Map } from "@mui/icons-material";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";

// Data
import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
import reportsLineChartData from "layouts/dashboard/data/reportsLineChartData";

// Dashboard components
import Projects from "layouts/dashboard/components/Projects";
import OrdersOverview from "layouts/dashboard/components/OrdersOverview";


import React, {useState, useEffect} from "react";


function Dashboard() {
  const { sales, tasks } = reportsLineChartData;

  const [data, setData] = useState([]);

  useEffect(async () => {
    let result = await fetch("http://127.0.0.1:8000/api/myrps")
    result = await result.json();
    setData(result)
  },[])



  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <MDBox>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              {/* Isinya Tarok Di sini */}
              <Card>
                <MDBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
                    <MDTypography variant="h6" gutterBottom>
                      List My RPS
                    </MDTypography>
                  </MDBox>
                  
                  <DataTable
                    table={{
                      columns: [
                        { Header: "Kode", accessor: "Kode", width: "15em" },
                        { Header: "Nama", accessor: "Nama" },
                        { Header: "Semester", accessor: "Semester", width: "12%" },
                        { Header: "SKS", accessor: "SKS", width: "12%" },
                      ],
                      rows: [
                        
                          {
                            Kode: "Mahasiswa mampu memilih metode, data, teknik pengumpulan data, teknik penyajian data, dan standar untuk menyelesaikan proyek perancangan",
                            Nama: "RPS MPSI",
                            Semester: "5",
                            SKS: 3,
                          },  
                         
                      ]
                    }}
                  />

              </Card>
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
