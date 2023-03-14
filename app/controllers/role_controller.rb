class RoleController < ApplicationController
     
     def index
         @roles = Role.all
            render json: @roles
        end

    def show
        @role = Role.find(params[:id])
            render json: @role
         end
         
    def create
         @role = Role.new(params_role)
         if @role.save
             render json: @role, status: :created
        else
            render json: @role.errors, status: :unprocessable_entity
        end
        end
        
        
   
        private
        def params_role
            params.require(:roles).permit(:type, :user_id)
        end
end