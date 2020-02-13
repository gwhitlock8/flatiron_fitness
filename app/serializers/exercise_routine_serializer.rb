class ExerciseRoutineSerializer
  include FastJsonapi::ObjectSerializer
  attributes :created_at
  belongs_to :exercise
  belongs_to :routine
end
