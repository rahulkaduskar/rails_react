# Consent data controller
class ConsentsController < BaseController

  skip_before_action :authenticate_user!
  # GET /consents
  # GET /consents.json
  def index
    @consents = Consent.all
    render json: @consents
  end
end
