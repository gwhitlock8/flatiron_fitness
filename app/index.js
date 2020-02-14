const EXERCISE_URL = 'https://polar-earth-08264.herokuapp.com/exercises';
const ROUTINE_URL = 'https://polar-earth-08264.herokuapp.com/routines';

//Landing Page DOM Elements
const landingDiv = document.querySelector('div#landing');
const getStartedButton = document.querySelector('a#get-started');

//Exercises Page DOM Elements
const muscleGroupAndExerciseParentContainer = document.querySelector('div#muscles-exercises');
const muscleGroupContainer = document.querySelector('div#muscle-groups');
const showRoutinesLink = document.querySelector('a#show-routines');

//Exercise Card DOM Elements
const exerciseCard = document.querySelector('div#exercise-card');
const exerciseCardTitle = document.querySelector('h5#exercise-title');
const exerciseImage = document.querySelector('img#exercise-image');
const exerciseDescription = document.querySelector('p#exercise-description');
const exerciseVideo = document.querySelector('iframe#exercise-video');
const routineSelect = document.querySelector('select#routine');
const routineForm = document.querySelector('form#routines');
const createNewRoutineSelectOption = document.createElement('option');
createNewRoutineSelectOption.id = 'new-routine';
createNewRoutineSelectOption.innerText = 'Create a New Routine';
const newRoutineModal = document.querySelector('div#newRoutineModal');
const newRoutineForm = document.querySelector('form#newRoutineForm');

//Routines Display DOM Elements
const routinesContainer = document.querySelector('div#show-routines');
const routineCardsDiv = document.querySelector('div#routine-cards');
const showExercisesLink = document.querySelector('a#show-exercises');

//ExerciseRoutineModal DOM Elements
const exerciseRoutineModalTitle = document.querySelector('h5#exerciseRoutineModalTitle');
const exerciseRoutineModalDescription = document.querySelector('p#exerciseRoutineModalDescription');
const exerciseRoutineModalVideo = document.querySelector('iframe#exerciseRoutineVideo');

//EditRoutine Modal DOM Elements
const routineEditModalForm = document.querySelector('form#routineEditModalForm');
const routineEditModalTitle = document.querySelector('input#routineEditModalTitle');
const routineEditModalDay = document.querySelector('select#routineEditModalDay');
const routineEditModalExerciseList = document.querySelector('ul#routineEditModalExerciseList');
const updateRoutineButton = document.querySelector('button#updateRoutineButton');



const primaryMuscleGroup = {};
const secondaryMuscleGroup= {};
const muscleGroups = [];

document.addEventListener('DOMContentLoaded',() => {
    getStarted();
    submitRoutineForm();
    showAllRoutines();
    showExercises();
    $('[data-toggle="tooltip"]').tooltip();
    
})


function getStarted(){
    getStartedButton.addEventListener('click', (e) => {
        getExercises();
    })
}

function buildMuscleGroupList(uniqueMuscleGroups){
    muscleGroupAndExerciseParentContainer.removeAttribute('hidden');
    landingDiv.setAttribute('hidden',true);

    uniqueMuscleGroups.forEach(muscleGroup => {


        let muscleGroupDivItem = document.createElement('div');
        muscleGroupDivItem.className = "card";

        let muscleGroupInnerDiv = document.createElement('div');
        muscleGroupInnerDiv.className = 'card-header';
        muscleGroupInnerDiv.id = `heading-${muscleGroup}`;

        let h2MuscleGroup = document.createElement('h2');
        h2MuscleGroup.className = 'mb-0';

        let muscleGroupButton = document.createElement('button');
        muscleGroupButton.className = "btn btn-link";
        muscleGroupButton.type ='button';
        muscleGroupButton.setAttribute('data-toggle','collapse');
        muscleGroupButton.setAttribute('data-target',`#collapse-${muscleGroup}`);
        muscleGroupButton.setAttribute('aria-expanded','false');
        muscleGroupButton.setAttribute('aria-controls',`collapse-${muscleGroup}`);
        muscleGroupButton.innerText = muscleGroup;

        let muscleGroupSpanPrimary = document.createElement('button');
        muscleGroupSpanPrimary.type = 'button';
        muscleGroupSpanPrimary.className = "badge badge-danger badge-pill";
        muscleGroupSpanPrimary.setAttribute('data-toggle','tooltip');
        muscleGroupSpanPrimary.setAttribute('data-placement','top');
        muscleGroupSpanPrimary.setAttribute('title',`${primaryMuscleGroup[muscleGroup].length} exercises with ${muscleGroup} as primary muscle group`);
        muscleGroupSpanPrimary.innerText = primaryMuscleGroup[muscleGroup].length;
        
        let muscleGroupSpanSecondary = document.createElement('button');
        muscleGroupSpanSecondary.className = "badge badge-secondary badge-pill";
        muscleGroupSpanSecondary .type = 'button';
        muscleGroupSpanSecondary.setAttribute('data-toggle','tooltip');
        muscleGroupSpanSecondary.setAttribute('data-placement','top');
        muscleGroupSpanSecondary.setAttribute('title',`${secondaryMuscleGroup[muscleGroup].length} exercises with ${muscleGroup} as secondary muscle group`);
        muscleGroupSpanSecondary.innerText = secondaryMuscleGroup[muscleGroup].length;

        muscleGroupDivItem.appendChild(muscleGroupInnerDiv);
        muscleGroupInnerDiv.appendChild(h2MuscleGroup);
        h2MuscleGroup.appendChild(muscleGroupButton);
        h2MuscleGroup.appendChild(muscleGroupSpanPrimary);
        h2MuscleGroup.appendChild(muscleGroupSpanSecondary);

        muscleGroupDivItem.appendChild(buildExerciseList(muscleGroup));
        
        muscleGroupContainer.appendChild(muscleGroupDivItem);



    });

}

function getExercises(){
    fetch(EXERCISE_URL)
    .then(resp => resp.json())
    .then(resp => {
       return groupExercisesByMuscleGroups(resp);
    })
    .then(resp => buildMuscleGroupList(resp))
    .catch(error => console.log(error.message));
}

function groupExercisesByMuscleGroups(exercises){

    exercises.data.forEach(exercise => {
        if(primaryMuscleGroup[exercise.attributes.primary_muscle_group]){
            primaryMuscleGroup[exercise.attributes.primary_muscle_group].push(exercise);
        } else {
            primaryMuscleGroup[exercise.attributes.primary_muscle_group] = [];
        };

        if(secondaryMuscleGroup[exercise.attributes.secondary_muscle_group]){
            secondaryMuscleGroup[exercise.attributes.secondary_muscle_group].push(exercise);
        } else {
            secondaryMuscleGroup[exercise.attributes.secondary_muscle_group] = [];
        };
    });
    
    muscleGroups.push(...Object.keys(primaryMuscleGroup),...Object.keys(secondaryMuscleGroup));
    const uniqueMuscleGroups = [...new Set(muscleGroups)];

    return uniqueMuscleGroups;
}

function buildExerciseList(muscleGroup){
    let exerciseDiv = document.createElement('div');
    exerciseDiv.className = 'collapse';
    exerciseDiv.id = `collapse-${muscleGroup}`;
    exerciseDiv.setAttribute('aria-labelledby',`heading-${muscleGroup}`);
    exerciseDiv.setAttribute('data-parent','#muscle-groups');

    let exerciseInnerDiv = document.createElement('div');
    exerciseInnerDiv.className = 'card-body';

    let innerExerciseUl = document.createElement('ul');
    innerExerciseUl.className = 'list-group exercises';
    innerExerciseUl.id = muscleGroup;

    primaryMuscleGroup[muscleGroup].forEach(exercise => {
        
        let primaryExerciseListItem = buildExerciseListItem(exercise);
        primaryExerciseListItem.className = 'list-group-item list-group-item-danger';
        
        innerExerciseUl.appendChild(primaryExerciseListItem)
        
    });

    secondaryMuscleGroup[muscleGroup].forEach(exercise => {

        let secondaryExerciseListItem = buildExerciseListItem(exercise);
        secondaryExerciseListItem.className = 'list-group-item list-group-item-dark';

        innerExerciseUl.appendChild(secondaryExerciseListItem)
        
    });

    exerciseDiv.appendChild(innerExerciseUl);

    return exerciseDiv;

}

function buildExerciseListItem(exercise){
    
    let exerciseListItem = document.createElement('li');
    exerciseListItem.dataset.exerciseid = exercise.id;
    exerciseListItem.innerText = exercise.attributes.name;

    let exerciseListItemInfoIcon = document.createElement('button');
    exerciseListItemInfoIcon.className = 'fas fa-info-circle btn';
    exerciseListItemInfoIcon.dataset.exerciseid = exercise.id;

    exerciseListItem.appendChild(exerciseListItemInfoIcon);
    

    exerciseListItemInfoIcon.addEventListener('click',(e) => {
        getExerciseInfo(e.target.getAttribute('data-exerciseid'));
        getRoutines()
    })

    return exerciseListItem;
}


function getExerciseInfo(exerciseId){
    fetch(EXERCISE_URL + `/${exerciseId}`)
    .then(resp => resp.json())
    .then(resp => {
        buildExerciseDisplayCard(resp.data);
    })
}

function buildExerciseDisplayCard(exercise){
    exerciseCard.removeAttribute('hidden');
    exerciseCardTitle.innerText = exercise.attributes.name;
    exerciseImage.src = exercise.attributes.image_url;
    exerciseDescription.innerHTML = `${exercise.attributes.description} <br><br><strong>Primary Muscle Group:</strong> ${exercise.attributes.primary_muscle_group}<br><em>Secondary Muscle Group:</em> ${exercise.attributes.secondary_muscle_group}<br><br>Required Equipment: ${exercise.required_equipment}`;
    exerciseVideo.src = exercise.attributes.video_url;
    routineSelect.dataset.exerciseid = exercise.id;
}

function getRoutines(){
    fetch(ROUTINE_URL)
    .then(resp => resp.json())
    .then(resp => {
        routineSelect.innerHTML = '';
        routineCardsDiv.innerHTML = '';
        routineSelect.appendChild(createNewRoutineSelectOption);
        resp.data.forEach(routine => {
            buildRoutineDropdownList(routine);
            buildRoutineCard(routine);
        })
    })
}

function buildRoutineDropdownList(routine){
    let routineOption = document.createElement('option');
    routineOption.id = routine.id;
    routineOption.value = routine.attributes.name;
    routineOption.innerText = routine.attributes.name;
    routineSelect.appendChild(routineOption);

}


function submitRoutineForm(){
    routineForm.addEventListener('submit',function(e){
        e.preventDefault();
        let exerciseId = e.target.routines.dataset.exerciseid;
        let routineId = e.target.routines[e.target.routines.selectedIndex].id;
        

        if (routineId == 'new-routine'){
            $('#newRoutineModal').modal('show');
            submitNewRoutine(exerciseId);
            
        } else {
            addExerciseToExistingRoutine(exerciseId,routineId);
            alert('Exercise has been added to routine!');
        }
        
        
    })
}

function addExerciseToExistingRoutine(exerciseId,routineId){
    fetch(ROUTINE_URL + '/add_exercise',{
        method: 'POST',
        headers: {
            'Content-Type':'application/json',
            'Accept':'application/json'
        },
        body: JSON.stringify({
            exercise_id: exerciseId,
            routine_id: routineId
        })
    })
    .then(resp => resp.json())
    .then(resp => console.log(resp))
    .catch(error => console.log(error.message));
}

function newRoutine(exerciseId,routineName,routineDay){
    fetch(ROUTINE_URL + '/create',{
        method: 'POST',
        headers: {
            'Content-Type':'application/json',
            'Accept':'application/json'
        },
        body: JSON.stringify({
            name: routineName,
            day: routineDay,
            exercise_id: exerciseId
        })
    })
    .then(resp => resp.json())
    .then(resp => {
        console.log(resp);

    })
    .catch(error => console.log(error.message));
}

function submitNewRoutine(exerciseId){
    newRoutineForm.addEventListener('submit',(e) => {
        e.preventDefault();
        const newRoutineName = e.target.newRoutineName.value;
        let newRoutineDay;
        const days = e.target.day;

        for(let i=0;i < days.length; i++){
            if(days[i].checked){
                newRoutineDay = days[i].id
                break;
            }
        }
        newRoutine(exerciseId,newRoutineName,newRoutineDay)
        $('#newRoutineModal').modal('hide');
    });
    
}

function showAllRoutines(){
    showRoutinesLink.addEventListener('click',()=> {
        muscleGroupAndExerciseParentContainer.setAttribute('hidden',true);
        routinesContainer.removeAttribute('hidden');

        getRoutines();
    })
    
}

function buildRoutineCard(routine){
    let routineCard = document.createElement('div');
    routineCard.className = 'card shadow p-2 m-2 bg-white rounded';
    routineCard.style = 'width: 18rem';
    routineCard.dataset.id = routine.id;
    routineCard.id = `routine-${routine.id}`;

    let routineCardBody = document.createElement('div');
    routineCardBody.className = 'card-body';
    routineCard.appendChild(routineCardBody);

    let routineCardTitle = document.createElement('h4');
    routineCardTitle.className = 'card-title routine-title';
    routineCardTitle.innerText = routine.attributes.name;
    routineCardBody.appendChild(routineCardTitle);


    let routineCardSubTitle = document.createElement('h6');
    routineCardSubTitle.className = 'card-subtitle mb-2 text-muted';
    routineCardSubTitle.innerText = routine.attributes.day;
    routineCardBody.appendChild(routineCardSubTitle);

    let routineButtonGroup = document.createElement('div');
    routineButtonGroup.className = 'btn-group';
    routineButtonGroup.role = 'group';
    routineCardBody.appendChild(routineButtonGroup);

    let routineEditButton = document.createElement('button');
    routineEditButton.type = 'button';
    routineEditButton.className = 'btn btn-warning btn-sm';
    routineEditButton.dataset.id = routine.id;
    routineEditButton.innerText = 'Edit';
    routineButtonGroup.appendChild(routineEditButton);
    routineEditButton.addEventListener('click',(e) => {
        getRoutine(e.target.dataset.id)
    });

    let routineDeleteButton = document.createElement('button');
    routineDeleteButton.type = 'button';
    routineDeleteButton.className = 'btn btn-danger btn-sm';
    routineDeleteButton.dataset.id = routine.id;
    routineDeleteButton.innerText = 'Delete';
    routineButtonGroup.appendChild(routineDeleteButton);
    routineDeleteButton.addEventListener('click',(e) => {
        deleteRoutine(e.target.dataset.id);
    })


    let routineExerciseList = document.createElement('div');
    routineExerciseList.className = 'list-group overflow-auto d-inline p-2';

    let routineExerciseListHeader = document.createElement('h6');
    routineExerciseListHeader.innerText = 'Exercises:';
    routineCard.appendChild(routineExerciseListHeader);

    routine.attributes.exercises.forEach(exercise => {
        let linkToExerciseModal = document.createElement('a');
        linkToExerciseModal.href = '#';
        linkToExerciseModal.className = 'list-group-item list-group-item-action';
        linkToExerciseModal.id = 'exercise-routine-info-item';
        linkToExerciseModal.dataset.id = exercise.id;
        linkToExerciseModal.id = `exercise-${exercise.id}`;
        routineExerciseList.appendChild(linkToExerciseModal);

        let routineExerciseInfoDiv = document.createElement('div');
        routineExerciseInfoDiv.className = 'd-flex w-100 justify-content-between';
        linkToExerciseModal.appendChild(routineExerciseInfoDiv);

        let exerciseTitle = document.createElement('h10');
        exerciseTitle.className = 'mb-1';
        exerciseTitle.innerText = exercise.name;
        routineExerciseInfoDiv.appendChild(exerciseTitle);

        let routineExercisePrimaryMuscleGroup = document.createElement('small');
        routineExercisePrimaryMuscleGroup.className = 'text-muted';
        routineExercisePrimaryMuscleGroup.innerText = exercise.primary_muscle_group;
        routineExerciseInfoDiv.appendChild(routineExercisePrimaryMuscleGroup);

        routineCard.appendChild(linkToExerciseModal);

        linkToExerciseModal.addEventListener('click',() => {
            console.log(exercise);
            buildExerciseRoutineModal(exercise);
        })
        
    })

    routineCardsDiv.appendChild(routineCard);
}

function showExercises(){
    showExercisesLink.addEventListener('click',()=>{

        routinesContainer.setAttribute('hidden',true);
        muscleGroupAndExerciseParentContainer.removeAttribute('hidden');
    })
}

function buildExerciseRoutineModal(exercise){

    $('#exerciseRoutineModal').modal('show');
    exerciseRoutineModalTitle.innerText = exercise.name;
    exerciseRoutineModalDescription.innerHTML = `${exercise.description} <br><br><strong>Primary Muscle Group:</strong> ${exercise.primary_muscle_group}<br><em>Secondary Muscle Group:</em> ${exercise.secondary_muscle_group}<br><br>Required Equipment: ${exercise.required_equipment}`;
    exerciseRoutineModalVideo.src = exercise.video_url;
}

function deleteRoutine(routineId){
    fetch(ROUTINE_URL + `/${routineId}/delete`,{
        method: 'DELETE',
        headers: {
            'Content-Type':'application/json',
            'Accept':'application/json'
        },
        body: JSON.stringify({
            id: routineId
        })
    })
    .then(resp => resp.json())
    .then(resp => {
        console.log(resp);
        alert('Routine has been deleted!');
        let deletedRoutine = document.querySelector(`div#routine-${routineId}`);
        deletedRoutine.remove();
    })
}

function getRoutine(routineId){
    fetch(ROUTINE_URL + `/${routineId}`)
    .then(resp => resp.json())
    .then(resp => {
        console.log(resp);
        buildRoutineEditModal(resp.data)
    })
}

function buildRoutineEditModal(routine){
    routineEditModalExerciseList.innerHTML = '';
    $('#routineEditModal').modal('show');

    routineEditModalTitle.value = routine.attributes.name;
    routineEditModalDay.childNodes.forEach(day => {
        if(day.innerText === routine.attributes.day){
            day.selected = 'selected';
        }
    });

    routine.attributes.exercises.forEach(exercise => {
        let routineExerciseListItem = document.createElement('li');
        routineExerciseListItem.className = 'list-group-item d-flex justify-content-between align-items-center';
        routineExerciseListItem.innerText = exercise.name;
        routineExerciseListItem.id = `exercise-${exercise.id}`;
        routineEditModalExerciseList.appendChild(routineExerciseListItem);
        
        let deleteExerciseFromRoutineButton = document.createElement('button');
        deleteExerciseFromRoutineButton.type = 'button';
        deleteExerciseFromRoutineButton.className = 'badge badge-danger badge-pill';
        deleteExerciseFromRoutineButton.dataset.id = exercise.id;
        deleteExerciseFromRoutineButton.innerHTML = "<span>&times;</span>";
        routineExerciseListItem.appendChild(deleteExerciseFromRoutineButton);

        deleteExerciseFromRoutineButton.addEventListener('click',(e) => {
            deleteExerciseFromRoutine(routine.id,exercise.id)
        })

    })

    updateRoutine(routine.id);

}

function deleteExerciseFromRoutine(routineId,exerciseId){
    fetch(ROUTINE_URL + `/${routineId}/delete_exercise`,{
        method: 'DELETE',
        headers: {
            'Content-Type':'application/json',
            'Accept':'application/json'
        },
        body: JSON.stringify({
            routine_id: routineId,
            exercise_id: exerciseId
        })
    })
    .then(resp => resp.json())
    .then(resp => {
        let deletedExercise = document.querySelector(`li#exercise-${exerciseId}`);
        deletedExercise.remove();
        let linkToDeletedExercise = document.querySelector(`a#exercise-${exerciseId}`);
        linkToDeletedExercise.remove();
        
        alert('Exercise has been deleted from routine');
    })

}

function updateRoutine(routineId){
    routineEditModalForm.addEventListener('submit',(e)=>{
        e.preventDefault();

        let routineName = e.target.routineEditModalTitle.value;
        let routineDay = e.target.routineEditModalDay[e.target.routineEditModalDay.selectedIndex].innerText;

        fetch(ROUTINE_URL + `/${routineId}/update`,{
            method: 'PATCH',
            headers: {
                'Content-Type':'application/json',
                'Accept':'application/json'
            },
            body: JSON.stringify({
                id: routineId,
                name: routineName,
                day: routineDay
            })

        })
        .then(resp => resp.json())
        .then(resp => {
            console.log(resp);

            alert('Routine has been updated!');

            $('#routineEditModal').modal('hide');


        });
    
    })
}
