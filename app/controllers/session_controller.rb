class SessionController < ApplicationController
include CurrentUserConcern
def create
    @user = User.find_by(email: params_user[:email])
    if @user && @user.authenticate(params_user[:password])
        session[:user_id] = @user.id
         #cookies[:role] = @user.user_access
         render json: {
            status: :created,
            logged_in: true,
            curr_user:@user
            }
        else
            render json: { error: 'Invalid email or password' }, status: :unprocessable_entity
         end
        end

    def logged_in
        if @current_user
            render json:{
                logged_in:true,
                user:@current_user
            }
        else
            render json: {
                logged_in: false
            }
    end
        
    end

    def logout
        reset_session
        render json:{status: 200, logged_out: true}
    end
end

def params_user
    params.require(:user).permit(:fname, :lname, :email, :password, :user_status, :organisation_id)
end