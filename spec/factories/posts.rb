require 'faker'

FactoryGirl.define do
  factory :post do
    sequence(:title) { |n| "Post Title #{n}" }
    content Faker::String.random(5)
    # association :user, factory: :user
  end
end
