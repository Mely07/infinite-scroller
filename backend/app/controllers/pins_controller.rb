class PinsController < ApplicationController

    def index 
        render json: Pin.all.paginate(page: params[:page], per_page: 10)
    end
end