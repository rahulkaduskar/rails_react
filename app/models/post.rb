class Post < ApplicationRecord

  before_create :set_slug, :set_thumb

private

  def set_slug
    self.slug = self.title.parameterize
  end

  def set_thumb
    self.thumb_url = "https://unsplash.it/300/300"
  end
end
