class CreatePosts < ActiveRecord::Migration[5.1]
  def change
    create_table :posts do |t|
      t.string :title
      t.string :slug
      t.text :content
      t.string :thumb_url
      t.timestamps
    end
  end
end
