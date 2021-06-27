import './App.css';
import CssBaseLine from '@material-ui/core/CssBaseline';
import { Container } from '@material-ui/core';
import { NavigationBar, GridLayout } from './components';


const App = () => {
  return (
    <div className='App'>
      <CssBaseLine />
      <NavigationBar title='Petmalou Interactive, Inc.' />
      <Container>
        <main>
          {/* <GridLayout /> */}
        </main>
      </Container>
    </div>
  );
}

export default App;
