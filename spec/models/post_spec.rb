require 'rails_helper'


RSpec.describe Post, type: :model do
  before :each do
    @user = FactoryGirl.create(:user, consents: Consent.mandatory_consents)
    @post = FactoryGirl.build(:post)
    @post.user = @user
  end

  it 'should be valid with a name and content' do
    expect(@post).to be_valid
  end

  it 'should not be valid without a user' do
    @post.user = nil
    expect(@post).not_to be_valid
    expect(@post.errors[:user]).to include('must exist')
  end 

  it 'should not be valid without a title' do
    @post.title = nil
    expect(@post).not_to be_valid
    expect(@post.errors[:title]).to include("Title can't be blank")
  end 

  it 'should not be valid with content length greater than 255' do
    @post.content = Faker::String.random(300)
    expect(@post).not_to be_valid
    expect(@post.errors[:content]).to include("Post content is too long.")
  end 

end
