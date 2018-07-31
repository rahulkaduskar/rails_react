require 'rails_helper'

RSpec.describe PostsController, type: :controller do

  # This should return the minimal set of attributes required to create a valid
  # Post. As you add validations to Post, be sure to
  # adjust the attributes here as well.
  let(:valid_attributes) {
    { title: "Post 1",
      content: "Content 1"
    }
  }

  let(:invalid_attributes) {
    { title: '',
      content: ''
    }
  }

  before do
    @current_user = @user = FactoryGirl.create(:user, consents: Consent.mandatory_consents)
    @auth_headers = @current_user.create_new_auth_token
    request.headers.merge!(@auth_headers)
  end

  describe "GET #index" do
    it "returns a success response" do
      post = Post.create!(valid_attributes.merge!(user: @current_user))
      get :index, params: {}
      expect(response).to be_success
    end
  end

  describe "GET #show" do
    it "returns a success response" do
      post = Post.create!(valid_attributes.merge!(user: @current_user))
      post.user = @current_user
      get :show, params: {id: post.to_param}
      expect(response).to be_success
    end
  end


  describe "POST #create" do
    context "with valid params" do
      it "creates a new Post" do
        expect {
          post :create, params: {post: valid_attributes}
        }.to change(Post, :count).by(1)
      end

      it "creates the post and return success" do
        post :create, params: {post: valid_attributes}
        expect(response).to be_success
      end
    end

    context "with invalid params" do
      it "returns a success response (i.e. to display the 'new' template)" do
        post :create, params: {post: invalid_attributes}
        expect(response).to have_http_status(:unprocessable_entity) 
      end
    end
  end

  describe "PUT #update" do
    context "with valid params" do
      let(:new_attributes) {
        { title: "Post 11",
          content: "Content 11"
        }
      }

      it "updates the requested post" do
        post = Post.create! valid_attributes.merge!(user: @current_user)
        put :update, params: {id: post.id, post: new_attributes}
        post.reload
        skip("Add assertions for updated state")
      end

      it "update the post and return success" do
        post = Post.create! valid_attributes.merge!(user: @current_user)
        put :update, params: {id: post.id, post: valid_attributes}
        expect(response).to be_success
      end
    end

    context "with invalid params" do
      it "returns a success response (i.e. to display the 'edit' template)" do
        post = Post.create! valid_attributes.merge!(user: @current_user)
        put :update, params: {id: post.id, post: invalid_attributes}
        expect(response).to have_http_status(:unprocessable_entity) 
      end
    end
  end

  describe "DELETE #destroy" do
    it "destroys the requested post" do
      post = Post.create! valid_attributes.merge!(user: @current_user)
      expect {
        delete :destroy, params: {id: post.to_param}
      }.to change(Post, :count).by(-1)
    end

    it "deletes the post and return success" do
      post = Post.create! valid_attributes.merge!(user: @current_user)
      delete :destroy, params: {id: post.to_param}
      expect(response).to be_success
    end
  end

end
