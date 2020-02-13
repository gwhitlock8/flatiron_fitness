Rails.application.routes.draw do
  resources :exercise_routines
  resources :routines
  resources :exercises
  resources :users

  root :to => 'home#index'

  post '/routines/add_exercise', to: 'routines#add_exercise'
  post '/routines/create', to: 'routines#create'


  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
