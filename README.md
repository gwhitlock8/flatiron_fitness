# Flatiron Fitness
#### Single page application built during module 3 of Flatiron's Software Engineering Immersive program. This application allows the user to build workout routines from a list of predefined exercises.

### Video Demo
[![Watch the video](https://img.youtube.com/vi/pPYZJk-RJic/maxresdefault.jpg)](https://youtu.be/pPYZJk-RJic)

## Technologies:

### FrontEnd:
- Javascript
- Bootstrap (https://getbootstrap.com/)

### Backend
- Ruby on Rails
- Google Drive (https://github.com/gimite/google-drive-ruby)
- Google API (https://github.com/googleapis/google-api-ruby-client)
- Fast JSON API (https://github.com/Netflix/fast_jsonapi)
- Postgres (https://github.com/ged/ruby-pg)

## Deployment Instructions

1. Clone the repository
2. Make a copy of this Google Sheet: [Exercise List](https://docs.google.com/spreadsheets/d/1ooL1Wd7cubZuiZHBezBbmfXrJyHf6_eVtV4OysiHX7E/edit?usp=sharing)
   - Name the spreadsheet *"flatiron_fitness_spreadsheet"*
3. Create a Google Project in the [Google Project Console](https://console.cloud.google.com/project)
   - Instructions can be found here: [Creating and Managing Projects](https://cloud.google.com/resource-manager/docs/creating-managing-projects)
4. Enable the Google Drive API in your new Google Project
   1. Click the menu icon in the top left of the window
   2. Click the *APIs & Services* option
   3. Click the *Enable APIs and Services* button at the top of the screen
   4. Search for and enable the Google Drive API and the Google Sheets API
5. Create the *client_secret.json* file
   1. From the root Google Project page, click the credentials menu option
   2. Click the *create credentials* dropdown and select the **Service Account Key** option
   3. Select *New Service Account*, name your service account, select *project owner* as the role, leave *JSON* selected as the key type, then click *create*
   4. Copy the resultant file in the root directory of your repo directory as **client_secret.json*
6. Run ```bundle install``` in the terminal
7. Share the Exercise spreadsheet with your service account by copying the **client_email** value from your *client_secret.json* file into the Share input from the google sheet.
8. From the terminal, run:
```
rails db:create
rails db:migrate
rails db:seed
```
9. Run ```rails s``` to start the application
10. Navigate to http://localhost:3000



