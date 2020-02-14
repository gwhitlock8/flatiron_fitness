class Exercise < ApplicationRecord
    has_many :exercise_routines
    has_many :routines, through: :exercise_routines
end
