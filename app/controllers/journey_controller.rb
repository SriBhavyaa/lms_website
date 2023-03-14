class JourneyController < ApplicationController
    def index
      journeys = Journey.all
      render json: journeys
    end
  
    def show
      journey = Journey.find(params[:id])
      render json: journey
    end
  
    def create
      journey = Journey.new(journey_params)
      if journey.save
        stages_params.each do |stage_params|
          stage = journey.stages.new(stage_params.slice(:stage_name, :overview_message, :comletion_message))
          if stage.save
            create_activities(stage, stage_params[:activities])
          else
            journey.destroy
            render json: { errors: stage.errors.full_messages }, status: :unprocessable_entity
            return
          end
        end
        render json: { message: 'Journey created successfully' }, status: :created
      else
        render json: { errors: journey.errors.full_messages }, status: :unprocessable_entity
      end
    end
  
   
    
    def create_activities(stage, activities_params)
      activities_params.each do |activity_params|
        activity = stage.activities.new(activity_params.permit(:name, :activity_type))
        unless activity.save
          stage.destroy
          render json: { errors: activity.errors.full_messages }, status: :unprocessable_entity
          return
        end
      end
    end
  
    private

    def activity_params
      params.require(:activity).permit(:name, :activity_type)
    end
    def journey_params
        params.require(:journey).permit(:journey_name, :display_name, :overview_message, :complete_message, :journey_status)
      end
  
      def stages_params
        (params[:stages] || []).map do |stage|
          stage.permit(:stage_name, :overview_message, :comletion_message, activities: [:name, :activity_type])
        end
      end
      
  end
  