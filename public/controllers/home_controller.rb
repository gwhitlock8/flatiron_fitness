class HomeController < ApplicationController
    def index
        redirect_to :file => '../flatiron_fitness_frontend/app/index.html'
    end
end
