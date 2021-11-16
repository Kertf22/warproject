import React,{ useState, useEffect} from 'react';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ToggleButton from '@mui/material/ToggleButton';

export default function Questions({type,question,correct_answer,incorrect_answers,handleQuestions,questionIndex}){

    function shuffleArray(arr) {
        // Loop em todos os elementos
    for (let i = arr.length - 1; i > 0; i--) {
            // Escolhendo elemento aleatório
        const j = Math.floor(Math.random() * (i + 1));
        // Reposicionando elemento
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    // Retornando array com aleatoriedade
    return arr;
    };

    const [options, setOptions] = useState([]);

    useEffect(()=> {
        setOptions(shuffleArray([correct_answer,...incorrect_answers]))
    },[]);
    
   
    const [alternative, setAlternative] = useState();

    const handleaAlternative = (e) => {

        setAlternative(e.target.value);
        const isTrue = alternative === correct_answer;
        
        handleQuestions(questionIndex, isTrue,e.target.value);
    };


    return(
        <Grid sx={{ mt: 2}}>
            <Typography fontSize="18px"  dangerouslySetInnerHTML={{ __html: question}}/>
                {options.map(item => (
                    <Box sx={{  
                        marginTop: 2,
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                    }} key={item}>
                        <ToggleButton value={item} aria-label="list" onClick={(e) => handleaAlternative(e)} sx={{background:`${alternative === item ? "#ccaaca": ''}`}}></ToggleButton>
                        <Typography fontSize="14px" sx={{ pl:2}}  dangerouslySetInnerHTML={{ __html: item}} />
                    </Box>
                    
                ))}
        </Grid>
    )

};