class Consent < ApplicationRecord

  scope :mandatory_consents, -> {
    where(mandatory: true)
  }
  
end
