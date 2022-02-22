import React, { useState, useEffect } from "react";
import { Button, Grid, Paper } from "@mui/material";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import CloseIcon from "@mui/icons-material/Close";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";

const ModalWhatsapp = ({ dados, offModal }) => {

  const [fazer, setFazer] = useState("comprar");
  const [valor, setValor] = useState("5");
  const [periodo, setPeriodo] = useState("30");
  const [adicional, setAdicional] = useState("");
  const [mensagem, setMensagem] = useState("Preencha os campos de rolagem acima");
  const [numero, setNumero] = useState("");
  const [link, setLink] = useState("");

 function onMensagem(){
    setMensagem(
      "Olá, amigo(a). Acho que você deve " +
        fazer +
        " " +
        valor +
        ",00 dólares em " +
        dados.name +
        " em no máximo " +
        periodo +
        " minuto(s) a contar dessa mensagem. " +
        adicional
    );
  };

  const changeLink = () => {
    const mensagemParaLink = mensagem.replaceAll(" ", "%20");
    setLink(mensagemParaLink);
  };

  //-------------------

  return (
    <div className="backmodal">
      <Grid component={Paper} className="modal">
        <form
          id='my-form'
          onSubmit={() =>
            window.open("https://wa.me/+55" + numero + "?text=" + link)
          }
        >
          <div className="container">
            {/*---   1:   ---*/}
            <div className="first">
              <td className="call">
                <h0>Notifique um amigo(a)</h0>
              </td>
              <td className="close">
                <CloseIcon
                  onClick={() => {
                    offModal();
                  }}
                />
              </td>
            </div>
            {/*first*/}

            {/*---   2:   ---*/}
            <div className="second">
              <div className="thecoin">
                <div className="coin"><img src={dados.image} alt="moeda" /></div>
                <div className="coinname">{dados.name}</div>
              </div>
            </div>
            {/*second*/}

            {/*---   3:   ---*/}
            <div className="third">
              <div className="buyandsell">
                <div style={{display:"block"}}>
                <div style={{ display: "flex", padding:"2px"}}>
                  <input
                    onClick={event => {
                      setFazer("comprar");
                    }}
                    type="radio"
                    id="comprar"
                    name="acao"
                    value="comprar"
                  />
                  <label for="comprar" className="comprar">Comprar</label>
                </div>
                <div style={{ display: "flex", padding:"2px"}}>
                  <input
                    onClick={event => {
                      setFazer("vender");
                      onMensagem();
                    }}
                    type="radio"
                    id="vender"
                    name="acao"
                    value="vender"
                  />
                  <label for="vender" className="vender">Vender</label>
                </div>
                </div>
              </div>
              {/*buyandsell*/}

              <div className="moneyandminutes">
              <div style={{display:"block"}}>
                <div className="coloring" style={{ display: "flex", alignItems: "center"}}>
                  <LocalAtmIcon className="badge" />
                  <input
                    onClick={event => {onMensagem()}}
                    className="money"
                    type="number"
                    min="1"
                    step=",00"
                    placeholder="Valor usd"
                    onChange={(e) => {
                      onMensagem();
                      e.preventDefault();
                      setValor(e.target.value);
                      onMensagem();
                    }}
                  ></input>
                </div>
                {/*money*/}

                <div className="coloring" style={{ display: "flex", alignItems: "center"}}>
                  <AccessTimeIcon className="badge" />
                  <input
                    onClick={event => {onMensagem()}}
                    className="minutes"
                    type="number"
                    min="1"
                    placeholder="Minutos"
                    onChange={(e) => {
                      onMensagem();
                      e.preventDefault();
                      setPeriodo(e.target.value);
                      onMensagem();
                    }}
                  ></input>
                </div>
                {/*minutes*/}
                </div>
              </div>
              {/*moneyandminutes*/}
            </div>
            {/*third*/}

            {/*---   4:   ---*/}
            <div className="fourth">
                <DriveFileRenameOutlineIcon className="badge coloring" />
                <input
                  className="aditional coloring"
                  type="text"
                  min="1"
                  size="50"
                  placeholder="Mensagem opcional"
                  onChange={(e) => {
                    e.preventDefault();
                    const valor = e.target.value;
                    setAdicional(valor);
                    onMensagem();
                  }}
                ></input>
              
            </div>
            {/*fourth*/}
            {/*---   5:   ---*/}
            <div className="fifth">
              <div className="msg">{mensagem}</div>
            </div>
            {/*---   6:   ---*/}
            <div className="sixth">
                <input
                  className="number"
                  placeholder="XX999990000"
                  onChange={(e) => {
                    e.preventDefault();
                    let valor = e.target.value;
                    setNumero(valor);
                    onMensagem();
                    changeLink();
                  }}
                ></input>
                <Button 
                  form='my-form' 
                  type="submit"
                  className="button"
                  endIcon={<WhatsAppIcon />}
                  color="success"
                  variant="outlined"
                >Enviar</Button>
              
            </div> {/*--- 6: ---*/}
          </div>
        </form>
      </Grid>
    </div>
  );
};

export default ModalWhatsapp;
