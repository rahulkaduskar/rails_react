class CreateConsents < ActiveRecord::Migration[5.1]
  def change
    create_table :consents do |t|
      t.string :name
      t.text :description
      t.string :page_url
      t.boolean :mandatory
      t.timestamps
    end
  end
end
