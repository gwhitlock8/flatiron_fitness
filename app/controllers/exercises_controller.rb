class ExercisesController < ApplicationController
    def index
        exercises = Exercise.all
        render json: ExerciseSerializer.new(exercises)

    end

    def show
        exercise = Exercise.find(params[:id])
        render json: ExerciseSerializer.new(exercise)
    end
end
