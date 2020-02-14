class Routine < ApplicationRecord
  belongs_to :user, optional: true
  has_many :exercise_routines, dependent: :destroy
  has_many :exercises, through: :exercise_routines
end
