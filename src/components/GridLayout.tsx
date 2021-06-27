import { Grid, makeStyles, Theme, Typography as Text } from '@material-ui/core'
import React from 'react';

const useStyles = makeStyles((theme: Theme) => (
   {
      firstRow: {
         backgroundColor: 'blue',
      },
      secondRow: {
         backgroundColor: 'green',
      },
      thirdRow: {
         backgroundColor: 'yellow',
      },
   }
));

const GridLayout = () => {
   const classes = useStyles();
   return (
      <Grid container spacing={3}>
         <Grid item lg={12} sm={12} xs={12}>
            <Text className={classes.firstRow}>
               Main Grid Item
            </Text>
         </Grid>
         <Grid item sm={6} xs={12} >
            <Text className={classes.secondRow}>
               Second Row First Item
            </Text>
         </Grid>
         <Grid item sm={6} xs={12} >
            <Text className={classes.secondRow}>
               Second Row Second Item
            </Text>
         </Grid>
         <Grid item sm={4} xs={12} >
            <Text className={classes.thirdRow}>
               Second Row First Item
            </Text>
         </Grid>
         <Grid item sm={4} xs={12} >
            <Text className={classes.thirdRow}>
               Second Row Second Item
            </Text>
         </Grid>
         <Grid item sm={4} xs={12} >
            <Text className={classes.thirdRow}>
               Second Row Third Item
            </Text>
         </Grid>

      </Grid>
   );
};

export default GridLayout;