class Post < ApplicationRecord
    belongs_to :user

    validates :title, presence: true
    validates_length_of :content, :maximum => 250, :allow_blank => true
end
