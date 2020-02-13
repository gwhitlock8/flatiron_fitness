class RoutinesController < ApplicationController
    
    def index
        routines = Routine.all
        render json: RoutineSerializer.new(routines)
    end

    def show
        routine = Routine.find(params[:id])
        options = {
            include: [:exercise_routines,:user]
        }
        render json: RoutineSerializer.new(routine,options)
    end

    def create
        routine = Routine.new(name: params[:name], day: params[:day]);
        routine.save();
        
        if routine.save()
            routine.exercise_routines.create(exercise_id: params[:exercise_id]);
        end
    end

    def destroy
    end

    def add_exercise
        routine = Routine.find(params[:routine_id])
        routine.exercise_routines.create(exercise_id: params[:exercise_id]);
    end

end
