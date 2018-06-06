require "test_helper"

describe Consent do
  let(:consent) { Consent.new }

  it "must be valid" do
    value(consent).must_be :valid?
  end
end
