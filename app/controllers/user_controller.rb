class UserController < ApplicationController
    
     def index
         @users = User.all
            render json: @users
        end

    def show
        @user = User.find(params[:id])
            render json: @user
         end
         
    def create
         @user = User.create(params_user)
         if @user.save
             session[:user_id] =user.id
             render json: @user, status: :created
        else
            render json: @user.errors, status: :unprocessable_entity
        end
        end
        
        
    def login
         @user = User.find_by( email: params_user[:email])
         if @user && @user.authenticate(params_user[:password])
             render json: { email: @user.email} , status: :ok
        else
            render json: { error: 'Invalid email or password'} , status: :unprocessable_entity
        end
        end
       
        private
        def params_user
            params.require(:users).permit(:fname, :lname, :email, :password, :user_status, :useraccess, :organization_id)
        end
end