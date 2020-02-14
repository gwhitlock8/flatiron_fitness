# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

require 'bundler'
Bundler.require


session = GoogleDrive::Session.from_service_account_key('./client_secret.json')

spreadsheet = session.spreadsheet_by_title("flatiron_fitness_spreadsheet")

exercise_worksheet = spreadsheet.worksheet_by_title('Exercises')

user_worksheet = spreadsheet.worksheet_by_title('Users')

routine_worksheet = spreadsheet.worksheet_by_title('Routines')

exercise_routine_worksheet = spreadsheet.worksheet_by_title('Exercises')



exercise_worksheet.rows.drop(1).each do |row|
    Exercise.create(name: row[0], description: row[1], primary_muscle_group: row[2], secondary_muscle_group: row[3], image_url: row[4], video_url: row[5], required_equipment: row[6])
end

user_worksheet.rows.drop(1).each do |row|
    User.create(username: row[0], name: row[1], password: row[2], gender: row[3], height: row[4], weight: row[5])
end

routine_worksheet.rows.drop(1).each do |row|
    Routine.create(user_id: row[0],name: row[1], day: row[2])
end

exercise_routine_worksheet.rows.drop(1).each do |row|
    ExerciseRoutine.create(exercise_id: row[0], routine_id: row[1])
end