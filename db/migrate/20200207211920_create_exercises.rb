class CreateExercises < ActiveRecord::Migration[6.0]
  def change
    create_table :exercises do |t|
      t.string :name
      t.text :description
      t.string :primary_muscle_group
      t.string :secondary_muscle_group
      t.string :image_url
      t.string :video_url
      t.string :required_equipment

      t.timestamps
    end
  end
end
