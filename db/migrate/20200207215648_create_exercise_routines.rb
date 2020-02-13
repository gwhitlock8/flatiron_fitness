class CreateExerciseRoutines < ActiveRecord::Migration[6.0]
  def change
    create_table :exercise_routines do |t|
      t.references :routine, null: false, foreign_key: true
      t.references :exercise, null: false, foreign_key: true

      t.timestamps
    end
  end
end
