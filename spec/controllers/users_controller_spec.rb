require 'rails_helper'
RSpec.describe UsersController, type: :controller do

  # describe 'Check users actions with user support ' do
  #   before :each do
  #     @current_user = FactoryGirl.create(:support)
  #     sign_in :user, @current_user
  #   end

  #   describe 'GET #index' do
  #     it 'assign all users as users' do
  #       users = []
  #       users << @current_user
  #       users << FactoryGirl.create_list(:user, 3)
  #       get :index, {}
  #       expect(response).to redirect_to(root_path)
  #       expect(flash[:alert]).to have_content('You are not authorized to access this page')
  #     end
  #   end
  # end

  # describe 'Check users actions with user ' do
  #   before :each do
  #     @request.env['devise.mapping'] = Devise.mappings[:user]
  #     @current_user = FactoryGirl.create(:user)
  #     sign_in :user, @current_user
  #   end 

  #   describe 'GET #index' do
  #     it 'assign all users as users' do
  #       users = []
  #       users << @current_user
  #       users << FactoryGirl.create_list(:user, 3)
  #       get :index, {}
  #       expect(response).to redirect_to(root_path)
  #       expect(flash[:alert]).to have_content('You are not authorized to access this page')
  #     end
  #   end
  # end
end
