class PostSerializer < ActiveModel::Serializer
  attributes :id, :title, :created_at, :updated_at, :content


end
