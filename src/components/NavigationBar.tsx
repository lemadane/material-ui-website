import { Box, Container, Link, makeStyles, Theme, Toolbar, Typography as Text } from '@material-ui/core'
import { ClassNameMap } from '@material-ui/core/styles/withStyles';

const useStyles = makeStyles((theme: Theme) => {
   return {
      menuOption: {
         padding: theme.spacing(1),
         [theme.breakpoints.up('md')]: {
            paddingLeft: theme.spacing(5),
         }

      },
      menuBox: {
         display: 'flex',
         flexDirection: 'column',
         [theme.breakpoints.up('md')]: {
            flexDirection: 'row'
         }
      },
      siteTitle: {
         fontWeight: 'bold',
         letterSpacing: 2,
      },
      toolbar: {
         display: 'flex',
         flexDirection: 'column',
         [theme.breakpoints.up('md')]: {
            flexDirection: 'row',
            alignitems: 'flex-end',
            justifyContent: 'space-between',
         }
      },
   };
});

export const menu = (styles: ClassNameMap<'menuOption' | 'menuBox'>) => (
   <Box className={styles.menuBox}>
      {
         [
            'home', 'courses', 'sign-up', 'about', 'contact us'
         ].map((menuItem: string, index: number) => (
            <Link
               key={index}
               component='button'
               variant='body1' // body1 | body2
               className={styles.menuOption}
            >
               {menuItem.toUpperCase()}
            </Link>
         ))
      }
   </Box>
);

const NavigationBar = (props: { title: string }) => {
   const styles = useStyles();
   return (
      <Container>
         <Toolbar
            className={styles.toolbar}>
            <Text
               component='h2'
               variant='h4'
               className={styles.siteTitle}
            >
               {props.title}
            </Text>
            {menu(styles)}
         </Toolbar>
      </Container>
   )
}

export default NavigationBar;