Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: 'auth', controllers: {
                    registrations: 'users/registrations'
                   }

  resource :user
  resources :consents

  root 'home#index'
  get '*path', to: 'home#index'
end
