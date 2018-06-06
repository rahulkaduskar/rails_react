class ConsentSerializer < ActiveModel::Serializer
  attributes :id, :name, :page_url, :description, :mandatory
end
