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

function Dashboard() {
  return (
    <div>
      <Typography variant="h4" gutterBottom></Typography>
      Dashboard
      <Grid
        container
        margin={25}
        spacing={3}
        sx={{
          margin: "15px",
          padding: "15px",

          borderRadius: "1px",

          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",

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
            <Typography variant="h5" gutterBottom>
              Companies
            </Typography>
          </CardContent>
          <CardActions>
            <Button variant="contained" size="small">
              Add
            </Button>
            <Button variant="contained" size="small">
              List
            </Button>
          </CardActions>
        </Card>

        <Card>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Employees
            </Typography>
          </CardContent>

          <CardActions>
            <Button variant="contained" size="small">
              Add
            </Button>
            <Button variant="contained" size="small">
              List
            </Button>
          </CardActions>
        </Card>

        <Card>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Products
            </Typography>
          </CardContent>

          <CardActions>
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
