import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Avatar, Card, CardActionArea, CardContent, Typography } from '@mui/material';

function App() {
  const [resultados, setResultados] = useState()

  const bolsonaro_img = 'https://uploads.metropoles.com/wp-content/uploads/2022/10/19181319/Presidente-Bolsonaro-concede-coletiva-de-imprensa-ao-lado-de-prefeitos-apo%CC%81s-reunia%CC%83o-no-Pala%CC%81cio-da-Alvorada-1-600x400.jpeg'
  const lula_img = 'https://classic.exame.com/wp-content/uploads/2021/05/LULA-RICARDO-STUCKERT.jpg'

  const getResultado = () => {
    axios.get("https://resultados.tse.jus.br/oficial/ele2022/545/dados-simplificados/br/br-c0001-e000545-r.json").then((res) => {
      console.log(res.data.cand)
      setResultados(res.data.cand);
    })
  }

  useEffect(() => {
    setInterval(() => {
      getResultado()
    }, 1000);
  }, []);

  // useEffect(() => {
  //   console.log(resultados);
  // }, [resultados])

  return (
    <>
      <h1 style={{ textAlign: 'center' }}>  Eleições presidenciais 2022  </h1>
      <div style={{ height: '100vh', display: 'block', justifyContent: 'center', alignItems: 'center' }}>
        {resultados ? resultados.map((candidato) => (
          <Card style={candidato.cc.includes('PT') ? { margin: 10, backgroundColor: 'red', textAlign: 'center', color: 'white' } : { margin: 10, backgroundColor: 'yellow', color: 'green', textAlign: 'center' }}>
            <CardActionArea>
              <div style={{ display: 'flex', justifyContent: 'center', padding: 10 }}>
                <Avatar alt="Presidente" src={candidato.nm.includes('LULA') ? lula_img : bolsonaro_img} sx={{ width: 120, height: 120 }} />
              </div>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div" style={{ display: 'flex', justifyContent: 'center' }}>
                  {candidato.nm}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <h1 style={candidato.cc.includes('PT') ? { color: 'white' } : { color: 'green' }}><span style={{ color: '' }}>VOTOS:</span> {new Intl.NumberFormat().format(candidato.vap)}</h1>
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        )) : 'carregando'}
        <div style={{ textAlign: 'center' }}><h1>Atualizando a cada 1s...</h1></div>
      </div>
    </>
  );
}


export default App;
