class ExerciseSerializer
  include FastJsonapi::ObjectSerializer
  attributes :name, :description, :primary_muscle_group, :secondary_muscle_group, :image_url, :video_url, :required_equipment
end
