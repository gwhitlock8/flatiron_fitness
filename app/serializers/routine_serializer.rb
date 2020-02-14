class RoutineSerializer
  include FastJsonapi::ObjectSerializer
  attributes :name, :day, :exercises
  has_many :exercise_routines
  has_many :exercises, through: :exercise_routines
  belongs_to :user
end
