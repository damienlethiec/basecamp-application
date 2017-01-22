Rails.application.routes.draw do
  root to: 'pages#home'
  get "pages/how_I_work", :as => 'how_I_work'
  resources :games, only: :new
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
