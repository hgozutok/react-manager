import React from "react";
import { Typography } from "@mui/material";
import { Grid, Card, CardContent, CardActions, Button } from "@mui/material";
import { useCategories } from "_components/services/useCategories";

export const ListCategories = () => {
  const { getCategories } = useCategories();
  const [categories, setCategories] = React.useState([]);

  const [isLoading, setIsloding] = React.useState(false);

  React.useEffect(() => {
    async function fetchData() {
      setIsloding(true);
      setCategories(await getCategories());

      console.log("categories", categories);
      setIsloding(false);
    }

    fetchData();
  }, []);

  return isLoading ? (
    <div>Loading...</div>
  ) : (
    <div>
      {categories.map((category) => {
        return (
          <Card key={category.categoryID}>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                {category.categoryName}
              </Typography>
            </CardContent>
            <CardActions>
              <Button variant="contained" size="small">
                Edit
              </Button>
              <Button variant="contained" size="small">
                Delete
              </Button>
            </CardActions>
          </Card>
        );
      })}
    </div>
  );
};
