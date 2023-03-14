class User_JourneyController < ApplicationController
   
    def create
      user_journey = User_Journey.new(user_journey_params)
      if user_journey.save
        render json: user_journey, status: :created
      else
        render json: user_journey.errors, status: :unprocessable_entity
      end
    end
  
    private
  
    def params_user_journey
      params.require(:user_journey).permit(:user_id, :journey_id)
    end
  end
  