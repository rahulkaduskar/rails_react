# User action controller
class UsersController < BaseController
  before_action :set_user, only: [:show, :edit, :update, :destroy]

  # GET /user/
  # GET /user.json
  def show
    render json: @user
  end

  # PATCH/PUT /user
  # PATCH/PUT /users.json
  def update
    if @user.update(user_params)
      render json: @user
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_user
    @user = current_user
  end

  # Never trust parameters from the scary internet, only allow the white list through.
  def user_params
    params.require(:user).permit(:name, :email, :password, :password_confirmation)
  end
end
