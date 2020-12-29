import { Grid } from "@material-ui/core";

import "./App.css";

import Search from "./components/Search";

import Logo from "./assets/logo_tela.png";

function App() {
  return (
    <Grid
      className="App"
      container
      direction="column"
      justify="center"
      alignItems="center"
    >
      <img style={{
                    width: '6rem',
                    marginBottom: '15px'
                }} src={Logo} alt="Encurtador de url" title="Encurtador de URL" />
      <Search></Search>
    </Grid>
  );
}

export default App;
