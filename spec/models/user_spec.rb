require 'rails_helper'
require 'spec_helper'
require 'pry'

RSpec.describe User, type: :model do
  before :each do
    @user = FactoryGirl.build(:user)
    @user.consents = Consent.mandatory_consents
  end

  it 'should be valid with a name and email' do
    expect(@user).to be_valid
  end

  it 'should not be valid without a name' do
    @user.name = nil
    @user.consents = []
    expect(@user).not_to be_valid
    expect(@user.errors[:name]).to include('Name can\'t be blank')
  end

  it 'should not be valid without valid email' do
    @user.email = 'dfdsf'
    expect(@user).not_to be_valid
    expect(@user.errors[:email]).to include('Email is invalid')
  end

  it 'should not be valid without password & confirm password match' do
    @user.password = '123'
    expect(@user).not_to be_valid
  end

  it 'should not be valid without valid consents' do
    @user.user_consents = []
    @user.save
    expect(@user).not_to be_valid
    error_message = "You need to agree to #{Consent.mandatory_consents.collect(&:name).join(' & ')}"
    expect(@user.errors[:user_consents]).to include(error_message)
  end
end
