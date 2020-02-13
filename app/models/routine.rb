class Routine < ApplicationRecord
  belongs_to :user, optional: true
  has_many :exercise_routines
  has_many :exercises, through: :exercise_routines
end
