import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { LeftMenu } from "_components/layout/LeftMenu";

function Dashboard() {
  return (
    <div>
      <Typography variant="h4" gutterBottom></Typography>
      Dashboard
      <Grid
        container
        spacing={3}
        sx={{
          margin: "15px",
          padding: "15px",

          borderRadius: "1px",

          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          gap: "20px",
          alignItems: "flex-start",
          alignContent: "space-around",
          justifyContent: "start",
          justifyItems: "space-around",
          textAlign: "center",
        }}
      >
        <Card>
          <CardContent>
            <Typography variant="h5">Categories</Typography>
          </CardContent>
          <CardActions
            sx={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              gap: "20px",
            }}
          >
            <Button
              href="/dashboard/category/new"
              variant="contained"
              size="small"
            >
              Add
            </Button>
            <Button
              href="/dashboard/categories"
              variant="contained"
              size="small"
            >
              List
            </Button>
          </CardActions>
        </Card>
        <Card>
          <CardContent>
            <Typography variant="h5">Companies</Typography>
          </CardContent>
          <CardActions
            sx={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              gap: "20px",
            }}
          >
            <Button
              href="/dashboard/company/new"
              variant="contained"
              size="small"
            >
              Add
            </Button>
            <Button
              href="/dashboard/companies"
              variant="contained"
              size="small"
            >
              List
            </Button>
          </CardActions>
        </Card>
        <Card>
          <CardContent
            sx={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              gap: "20px",
            }}
          >
            <Typography variant="h5" gutterBottom>
              Employees
            </Typography>
          </CardContent>

          <CardActions
            sx={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              gap: "20px",
            }}
          >
            <Button variant="contained" size="small">
              Add
            </Button>
            <Button variant="contained" size="small">
              List
            </Button>
          </CardActions>
        </Card>
        <Card>
          <CardContent
            sx={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              gap: "20px",
            }}
          >
            <Typography variant="h5" gutterBottom>
              Products
            </Typography>
          </CardContent>

          <CardActions
            sx={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              gap: "20px",
            }}
          >
            <Button variant="contained" size="small">
              Add
            </Button>
            <Button variant="contained" size="small">
              List
            </Button>
          </CardActions>
        </Card>
      </Grid>
    </div>
  );
}

export default Dashboard;
