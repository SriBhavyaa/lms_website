class StageController < ApplicationController
    
    def create
      journey = Journey.new(journey_params)
      if journey.save
        create_stages(journey, stages_params)
        render json: { message: 'Journey created successfully' }, status: :created
      else
        render json: { errors: journey.errors.full_messages }, status: :unprocessable_entity
      end
    end
  
    private
  
    def journey_params
      params.require(:journey).permit(:name, :description)
    end
  
    def stages_params
      params.require(:stages).map { |stage| stage.permit(:name, :description, activities: [:name, :activity_type]) }
    end
  
    def create_stages(journey, stages)
      stages.each do |stage_params|
        stage = journey.stages.new(stage_params.slice(:name, :description))
        if stage.save
          create_activities(stage, stage_params[:activities])
        else
          journey.destroy
          render json: { errors: stage.errors.full_messages }, status: :unprocessable_entity
        end
      end
    end
  
    def create_activities(stage, activities)
      activities.each do |activity_params|
        activity = stage.activities.new(activity_params)
        unless activity.save
          stage.destroy
          render json: { errors: activity.errors.full_messages }, status: :unprocessable_entity
        end
      end
    end
  end
  