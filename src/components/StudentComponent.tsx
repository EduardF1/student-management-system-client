import React, {useEffect, useState} from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import {Button, Container, Paper} from '@material-ui/core';
import {Student} from '../models/Student';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            '& > *': {
                margin: theme.spacing(1)
            },
        },
    }),
);


export default function StudentComponent() {
    const classes = useStyles();
    const paperStyle = {padding: '50px 20px', width: 600, margin: '20px auto'}
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const formButtonText = 'Submit';
    const formHeader = 'Add Student';
    const [students, setStudents] = useState<Student[]>([]);

    function handleNameChange(event: any) {
        const name = event.target.value;
        setName(name);
    }

    function handleAddressChange(event: any) {
        const address = event.target.value;
        setAddress(address);
    }

    function clearFields() {
        setAddress('');
        setName('');
    }

    function handleSubmit(event: any) {
        event.preventDefault();
        const student: Student = {name, address};
        fetch("http://localhost:8080/student/add", {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(student)
        }).then(() => {
            console.log(`${student.name + '\n' + student.address} added successfully to database.`);
        })
        clearFields();
    }

    useEffect(() => {
        fetch("http://localhost:8080/student/getAll")
            .then(res => res.json())
            .then((result: Student[]) => {
                setStudents(result);
            })
    }, []);

    return (
        <Container>
            <Paper elevation={3} style={paperStyle}>
                <h1 style={{color: 'hotpink', textAlign: 'center', fontFamily: 'sans-serif'}}><em>{formHeader}</em></h1>
                <form className={classes.root} noValidate autoComplete='off'>
                    <TextField id='outlined-basic'
                               label='StudentComponent Name'
                               variant='outlined'
                               fullWidth={true}
                               value={name}
                               onChange={handleNameChange}/>

                    <TextField id='outlined-basic'
                               label='StudentComponent Address'
                               variant='outlined'
                               fullWidth={true}
                               value={address}
                               onChange={handleAddressChange}/>
                    <Button variant='contained' color='primary' onClick={handleSubmit}>
                        {formButtonText}
                    </Button>
                </form>
            </Paper>
            <Paper elevation={3} style={paperStyle}>
                <h1 style={{fontFamily: 'sans-serif', textAlign: 'center'}}>Students</h1>
                {students.map((student: Student) => (
                    <Paper elevation={6}
                           style={{margin: '10px', padding: '15px', textAlign: 'left', fontFamily: 'sans-serif'}}
                           key={student.id}>
                        Id:{student.id}<br/>
                        Name:{student.name}<br/>
                        Address:{student.address}
                    </Paper>
                ))}
            </Paper>
        </Container>
    );
}
