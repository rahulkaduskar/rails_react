class PostSerializer < ActiveModel::Serializer
  attributes :id, :title, :slug, :thumb_url, :created, :updated, :content

  def created
    object.created_at.strftime("%Y-%m-%d")
  end

  def updated
    object.created_at.strftime("%Y-%m-%d")
  end
end
