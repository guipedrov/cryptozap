import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import CoinMap from "./components/CoinMap.js";
import ModalWhatsapp from "./components/ModalWhatsapp.js";
import { Container, Box, TextField, Grid, Link } from "@material-ui/core";
import { createUseStyles } from "react-jss";
import image from "./img/cryptozap.png";
import { initializeApp } from "firebase/app";

function App() {
  useEffect(() => {
    document.title = "Cryptozap | por guipedrov";
  }, []);

  //Firebase:
  const firebaseConfig = {
    apiKey: "AIzaSyCPwJh4IpN8NhhBq6v2oSN5Gh1qO7kpN68",
    authDomain: "crypto-zap.firebaseapp.com",
    projectId: "crypto-zap",
    storageBucket: "crypto-zap.appspot.com",
    messagingSenderId: "537717327652",
    appId: "1:537717327652:web:7de8864974791fa22455b1",
    measurementId: "G-YZ1X88ZYR5",
  };
  const app = initializeApp(firebaseConfig);

  //JSS | CSS in JS:
  const useStyles = createUseStyles({
    image: {
      minWidth: '15rem',
      maxWidth: '20rem',
      justifyContent: "center",
      textAlign: 'center',
      paddingTop: '2.5vh',
      paddingBottom: '1.5vh',
    },
    busque: {
      width: "66%",
      justifyContent: "center",
      background: "#FFBFF1",
      borderRadius: "5px 5px 5px 5px",
    },
    texto: {
      color: "#FFFFFF",
      margin: '0',
      textAlign: 'center',
      maxWidth: '25rem',
      fontFamily: "monospace",
      fontSize: "2.2vh",
      fontWeight: "400",
    },
    unlink: {
      color: "#FCCCFF",
      fontFamily: "monospace",
      margin: "15px 15px 15px 15px",
      paddingBottom: '1.5vh',
    },
    link: {
      color: "#FC4CFF",
      fontFamily: "monospace",
      margin: "15px 0px 0px 0px",
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
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=200&page=1&sparkline=false"
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
    <Container style={{ marginTop: "18px" }}>
      {modal && <ModalWhatsapp dados={dadosMoeda} offModal={offModal} />}
      <Grid
        container
        spacing={1}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: "35vh" }}
      >
        {/* <Grid item xs={1}> */}
        <img src={image} className={classes.image} alt="logo" />
        <Box className={classes.texto} style={{ paddingTop: "10px", justifyContent: "center" }}>
          Encontre facilmente sua criptomoeda e envie dicas para os seus contatos</Box>

        <Box className={classes.unlink}>
          by:{" "}
          <h0
            className={classes.link}
            onClick={() => {
              window.open(
                "https://www.linkedin.com/in/guilherme-pedro-velho-44232932/"
              );
            }}
          >
            guipedrov
          </h0>
        </Box>
        <TextField
          sx={{marginBottom: '3vh'}}
          className={classes.busque}
          id="filled-basic"
          label="Busque"
          variant="filled"
          onChange={handleChange}
        />
        {/* </Grid> */}
        <Box sx={{marginTop: '2.5vh'}}></Box>
        <CoinMap
          filteredCoins={filteredCoins}
          ativarModalWhatsapp={ativarModalWhatsapp}
        />
      </Grid>
    </Container>
  );
}

export default App;
