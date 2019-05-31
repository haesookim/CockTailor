require 'test_helper'

class MakeyourownsControllerTest < ActionDispatch::IntegrationTest
  test "should get makeyourown" do
    get makeyourowns_makeyourown_url
    assert_response :success
  end

  test "should get recommendation" do
    get makeyourowns_recommendation_url
    assert_response :success
  end

  test "should get gallery" do
    get makeyourowns_gallery_url
    assert_response :success
  end

end
