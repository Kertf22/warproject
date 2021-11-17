import React,{ useState, useEffect} from 'react';
import axios from 'axios';
import Questions from '../components/Questions';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@material-ui/core/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { useParams } from "react-router-dom";
import { setRelatorio } from '../service/localStorage';

export default function Form(props){

    let { number } = useParams();
    const [questions,setQuestions] = useState([]);
    const RightAnwsers = [];
    const Anwsers = [];

    const [error, setError] = useState(false);
    let allHaveAnwsers = true;
    
    const handleQuestions = (questionIndex, Anwser, correct_answer) => {
        const isRight = Anwser === correct_answer;
        RightAnwsers[questionIndex] = isRight;
        Anwsers[questionIndex] = Anwser;
    }

    const handleSubmit = () => {
        Anwsers.forEach(item => {
            if(item === undefined){
                allHaveAnwsers = false
                return;
        }})
        if(!allHaveAnwsers){
            setError(true);
            return;
        };

        const relatorio = [];
        questions.map((item,i) => {
            relatorio.push({
                ...item,
                anwser:Anwsers[i],
                acertou:RightAnwsers[i],
            })});
    
       setRelatorio(relatorio);
       props.history.push("/");
    };

    useEffect(() => {
        async function getData(){
            const { data } = await axios.get(`https://opentdb.com/api.php?amount=${number}`);

            setQuestions(data.results);
        }
        
        getData()
        
    }, [number]);

    questions.forEach(item => {
        RightAnwsers.push(undefined);
        Anwsers.push(undefined);
    });

    return(
        <Container component="main" maxWidth="xs">
            <Box sx={{ mt: 5,mb:2 }}>
                <Grid container spacing={2}>
                    {questions.map((item,i) => ( 
                    <Questions 
                        key={item.question}
                        {...item}
                        handleQuestions={handleQuestions} 
                        questionIndex={i}
                        />)
                    )}
                </Grid>
                <Typography variant="body2" color="#cf352e" fontSize="14px" align="center" sx={{ pt:1, opacity:`${error ? 1 : 0}`}}>Por favor, respota todas as questões!</Typography>
                <Button
                onClick={handleSubmit}
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                >
                    Submit
                </Button>
            </Box>
        </Container>
    )
};