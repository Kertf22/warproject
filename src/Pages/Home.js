import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import { getRelatorio } from '../service/localStorage';
import Relatorio from '../components/Relatorio';

export default function Home(props){

    const [number, setNumber] = useState(0);
    const [error, setError] = useState(false);

    const handleInput = (e) => setNumber(e.target.value);

    const handleClick = async () => {
        if ( number <= 0){
            setError(true);

            return;
        };

        props.history.push(`/questions/${number}`);
    }

    const [displayRelatorio, setDisplayRelatorio] = useState(false)
    const relatorio = getRelatorio();

    const handleRelatorio = () => {
        setDisplayRelatorio(true)
    };

    const handleDisplayRelatorio = (clickCloseButton) => setDisplayRelatorio(clickCloseButton);

    return(
        <Container component="main" maxWidth="xs">
            
            <Box
            sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
            >
                <Typography variant="body2" color="text.secondary" fontSize="24px" align="center">Web Quest</Typography >
                <Typography variant="body1" color="text.secondary" fontSize="12px" align="center" >Quantas questões deseja responder?</Typography>
                <Box
                sx={{
                    marginTop: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
                >
                    <TextField 
                    id="standard-basic" 
                    label="Number" 
                    variant="outlined" 
                    type="number" 
                    min="0"
                    onChange={(e) => handleInput(e)} />
                    <Typography variant="body2" color="#cf352e" fontSize="12px" align="center" sx={{ pt:1, opacity:`${error ? 1 : 0}`}}>Escoha um número possível</Typography>
                    <Button variant="contained" color="primary" sx={{ mt: 2, mb: 2 }} onClick={handleClick}>
                        Let's do the quests!
                    </Button>
                </Box>
                {
                    relatorio 
                        ?  <Box
                        sx={{
                            marginTop: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                        >
                            <Typography variant="contained" color="#380036" >
                                    Você já tem um questionário concluido!
                            </Typography>
                            
                            <Button variant="contained" color="secondary"  sx={{ mt: 2, mb: 2 }} onClick={handleRelatorio}>
                                    Gostaria de ver seu relatório? 
                            </Button>
                        </Box>
                        
                        : <></>
                }
                
                <Relatorio relatorio={relatorio} displayRelatorio={displayRelatorio} handleDisplayRelatorio={handleDisplayRelatorio}/>
            </Box>
        </Container>
    )
};