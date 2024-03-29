// Imports
import React from 'react';
import ExerciseTable from '../components/ExerciseTable';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

function HomePage({ setExercise }) {

    const history = useHistory();

    const [exercises, setExercises] = useState([]);

    // RETRIEVE the list of exercises
    const loadExercises = async () => {
        const response = await fetch('/exercises');
        const data = await response.json();
        setExercises(data);
    }


    // UPDATE a exercise
    const onEditExercise = async exercise => {
        setExercise(exercise);
        history.push('/edit-exercises');
    }


    // DELETE a exercise
    const onDeleteExercise = async _id => {
        const response = await fetch(`/exercises/${_id}`, { method: 'DELETE' });
        if (response.status === 204) {
            const getResponse = await fetch('/exercises');
            const exercises = await getResponse.json();
            setExercises(exercises);
        } else {
            console.error(`Failed to delete exercise with id: ${_id}, status code: ${response.status}`);
        }
    }


    // LOAD the exercises
    useEffect(() => {
        loadExercises();
    }, []);

    // DISPLAY the exercises
    return (
        <>
        <article>
            <h2>Athletica Exercise Tracker</h2>
            <p>Welcome to Athletica, a tool for creating and tracking exercise. 
                The home page contains a list of all your exercises. 
                Use the create page to add a new exercise entries, 
                and click the edit button next to an entry to edit that specific entry.</p>
            <ExerciseTable
                exercises={exercises}
                onEdit={onEditExercise}
                onDelete={onDeleteExercise}
                />            
        </article>
        </>
    );
}

export default HomePage;