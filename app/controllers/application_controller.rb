class ApplicationController < ActionController::Base
  include DeviseTokenAuth::Concerns::SetUserByToken
  include ActionController::Serialization

  # protect_from_forgery with: :exception


end
