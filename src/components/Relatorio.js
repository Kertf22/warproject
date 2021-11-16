import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';

export default function Relatorio({relatorio,displayRelatorio,handleDisplayRelatorio}){

    if(!relatorio){
        return(<></>)
    };

    let acertou = 0;
    relatorio.forEach(item => {
        if(item.acertou){
            acertou += 1
        }
    });


    const pontuacao = `${acertou}/${relatorio.length}`;
    
    const handleParentFunction = () => handleDisplayRelatorio(false)
    return (
        <Box 
        spacing={3}
        sx=
        {{
            boxShadow:"0px 1px 1px 2px rgba(8,146,208,0.3)",
            borderRadius:"10px",
            position:"absolute",
            zIndex:"100",
            top:`${displayRelatorio ? "10%" : `${-50*relatorio.length}%`}`,
            backgroundColor:"#fafafafa",
            padding:"10px",
            transition:"1s",
            maxWidth:'650px'
        }}>
            <CloseIcon color="black" onClick={handleParentFunction} sx={{cursor:"pointer"}}/>
            <Typography variant="body2" color="black" fontSize="24px" align="center">Relatório</Typography>
            { relatorio.map(item => (
                <Box sx={{
                    padding:2
                }}>
                    <Typography fontSize="18px" color="primary"  dangerouslySetInnerHTML={{ __html:"Pergunta: " +  item.question}}/>
                    <Typography fontSize="15px" color="text.secondary"  dangerouslySetInnerHTML={{ __html:"Reposta: " + item.correct_answer}}/>
                    <Typography fontSize="15px" dangerouslySetInnerHTML={{ __html:"Sua Reposta: " + item.anwser}}/>
                    {item.acertou ? <Typography color="green"> Acertou</Typography> : <Typography color="red"> Errou</Typography>}
                </Box>
            )
            )}

        <Typography variant="body2" color="black" fontSize="18px" align="center">Pontuação:{pontuacao}</Typography>
        </Box>
    )
}