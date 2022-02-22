import { React, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  Paper,
  Button,
  Grid,
} from "@mui/material";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { createUseStyles } from "react-jss";

const Coin = ({
  name,
  image,
  symbol,
  price,
  volume,
  priceChange,
  marketcap,
  ativarModalWhatsapp,
}) => {

  //JSS | CSS in JS:
  const useStyles = createUseStyles({
    tableBody: {
      maxWidth: 1330,
      background: "#0B070D",
    },
    text: {
      color: '#FFFFFF',
      fontFamily: 'monospace',
    },
    textDown: {
        color: 'red',
        fontFamily: 'monospace',
      },
    textUp: {
        color: 'green',
        fontFamily: 'monospace',
      },
    img: {
        maxWidth: '2rem'
    }
  });

  const classes = useStyles();

  const [dadosMoeda, setDadosMoeda] = useState({
    name, image, symbol, price, volume, priceChange,
    marketcap, });

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableBody className={classes.tableBody}>
          {/* Textos: */}
          <TableCell component="th" scope="row">
            <Grid container>
            <img className={classes.img} src={image} alt="crypto" />
            </Grid>
          </TableCell>
          <TableCell component="th" scope="row">
            <Grid container>
            <h0 className={classes.text}>{name}</h0>
            </Grid>
          </TableCell>
          <TableCell component="th" scope="row">
            <Grid container>
            <h0 className={classes.text}>{symbol}</h0>
            </Grid>
          </TableCell>
          {/* Valores: */}
          <TableCell color="light" >
            <Grid container className="precoevolume">
            <h0 className={classes.text}>
            $
            {price.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 9,
            })} (preço)
            </h0>
            </Grid>
          </TableCell>
          <TableCell component="th" scope="row">
            <Grid container>
            <h0 className={classes.text}>
            $
            {volume.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })} (volume)
            </h0> 
            </Grid>
          </TableCell>
          {priceChange < 0 ? (
            <TableCell component="th" scope="row">
            <h0 className={classes.textDown}>
              {priceChange.toFixed(2)}%
            </h0>
            </TableCell>
          ) : (
            <TableCell component="th" scope="row">
            <h0 className={classes.textUp}>
              {priceChange.toFixed(2)}%
            </h0>
            </TableCell>
          )}
          <TableCell component="th" scope="row">
            <h0 className={classes.text}>
            ${marketcap.toLocaleString()} (mkt cap)
            </h0> 
          </TableCell>

          <TableCell component="th" scope="row">
            <Button
              color="success"
              variant="outlined"
              endIcon={<WhatsAppIcon />}
              onClick={() => {
                ativarModalWhatsapp(dadosMoeda);
              }}
            >
              Whatsapp
            </Button>
          </TableCell>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Coin;