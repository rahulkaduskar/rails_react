# User class to store user data
class User < ApplicationRecord
  devise :database_authenticatable, :registerable,
          :recoverable, :rememberable, :trackable, :validatable

  include DeviseTokenAuth::Concerns::User

  validates :name, presence: true
  validate  :validate_consents_completeness

  has_many :user_consents, dependent: :destroy
  has_many :consents, through: :user_consents

  accepts_nested_attributes_for :user_consents

  def validate_consents_completeness
    return if self.id # we assume that already created user has all consents
    if Consent.mandatory_consents.length != self.user_consents.length
      errors.add(:user_consents, "You need to agree to #{Consent.mandatory_consents.collect(&:name).join(" & ")}")
    end
  end
end
