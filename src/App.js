import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import CoinMap from "./components/CoinMap.js";
import ModalWhatsapp from "./components/ModalWhatsapp.js";
import { Container, Box, TextField, Grid, Link } from "@material-ui/core";
import { createUseStyles } from "react-jss";
import image from './img/cryptozap.png'

function App() {
  useEffect(() => {
    document.title = "Cryptozap | por guipedrov";
  }, []);

  //JSS | CSS in JS:
  const useStyles = createUseStyles({
    busque: {
      width: '32rem',
      background: "#FFBFF1",
      borderRadius: '5px 5px 5px 5px',
    },
    texto: {
      color: '#FFFFFF',
      fontFamily: 'monospace',
      fontSize: '2.35vh',
      fontWeight: '450',
    },
    unlink: {
      color: '#FCCCFF',
      fontFamily: 'monospace',
      margin: '15px 15px 15px 15px',
    },
    link: {
      color: '#FC4CFF',
      fontFamily: 'monospace',
      margin: '15px 0px 0px 0px',
    },
  });

  const classes = useStyles();

  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState(false);
  const [dadosMoeda, setDadosMoeda] = useState([]);

  useEffect(() => {
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=brl&order=market_cap_desc&per_page=200&page=1&sparkline=false"
      )
      .then((res) => {
        setCoins(res.data);
      })
      .catch((err) => console.log(err)); //só pra rodar
  });
  //outra forma de escrever a `promise`

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const filteredCoins = coins.filter((coin) =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );

  const offModal = () => {
    setModal(false);
  };

  const ativarModalWhatsapp = (dadosMoeda) => {
    setDadosMoeda(dadosMoeda);
    setTimeout(setModal(true), 500);
  };

  return (
    <Container style={{marginTop:"18px"}}>
      {modal && <ModalWhatsapp dados={dadosMoeda} offModal={offModal} />}
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: "35vh" }}
      >
        <Box><img src={image} style={{height:"60px"}} alt="logo" /></Box>
        <Box className={classes.texto} style={{paddingTop:"10px"}}>Encontre facilmente sua criptomoeda</Box>
        <Box className={classes.texto}>e envie dicas para os seus contatos</Box>
        <Box className={classes.unlink}>feito por: <h0 className={classes.link} onClick={() => {window.open("https://www.linkedin.com/in/guilherme-pedro-velho-44232932/")}}>guipedrov</h0></Box>
        <TextField
          style={{marginTop:"10px", marginBottom:"10px"}}
          className={classes.busque}
          id="filled-basic"
          label="Busque"
          variant="filled"
          onChange={handleChange}
        />
      </Grid>
      <CoinMap style={{marginTop:"10px"}}
        filteredCoins={filteredCoins}
        ativarModalWhatsapp={ativarModalWhatsapp}
      />
    </Container>
  );
}

export default App;