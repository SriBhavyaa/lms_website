Rails.application.routes.draw do
  
  #resources :session, only: [:create]
  post '/post_user', to: 'user#create'
  post '/post_login_user', to: 'user#login'
  get '/login_user', to: 'user#index'
  get '/get_user', to: 'user#index'
  
  #post '/create', to: "session#create"
  #get '/logged_in', to: "session#logged_in"
  #delete 'logout', to: "session#logout"

  post '/post_org', to: 'organization#create'
  post '/post_role', to: 'role#create'
  post '/post_journey', to: 'journey#create'
  get '/get_journey', to: 'journey#index'
  get '/get_journeyid/:id', to: 'journey#show'
  post '/post_stage', to: 'journey#create_stages'
  
end
