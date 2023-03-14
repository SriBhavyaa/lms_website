class OrganizationController < ApplicationController
    
     def index
         @organizations = Organization.all
            render json: @organizations
        end

    def show
        @organization = Organization.find(params[:id])
            render json: @organization
         end
         
    def create
         @organization = Organization.new(params_organization)
         if @organization.save
             render json: @organization, status: :created
        else
            render json: @organization.errors, status: :unprocessable_entity
        end
        end
        
        
   
        private
        def params_organization
            params.require(:organizations).permit(:organization_name)
        end
end