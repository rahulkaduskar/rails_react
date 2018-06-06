require "test_helper"

class ConsentsControllerTest < ActionDispatch::IntegrationTest
  def consent
    @consent ||= consents :one
  end

  def test_index
    get consents_url
    assert_response :success
  end

  def test_new
    get new_consent_url
    assert_response :success
  end

  def test_create
    assert_difference "Consent.count" do
      post consents_url, params: { consent: {  } }
    end

    assert_redirected_to consent_path(Consent.last)
  end

  def test_show
    get consent_url(consent)
    assert_response :success
  end

  def test_edit
    get edit_consent_url(consent)
    assert_response :success
  end

  def test_update
    patch consent_url(consent), params: { consent: {  } }
    assert_redirected_to consent_path(consent)
  end

  def test_destroy
    assert_difference "Consent.count", -1  do
      delete consent_url(consent)
    end

    assert_redirected_to consents_path
  end
end
