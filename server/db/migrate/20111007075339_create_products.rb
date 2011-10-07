class CreateProducts < ActiveRecord::Migration
  def change
    create_table :products do |t|
      t.string :code
      t.string :name
      t.text :description
      t.references :supplier
      t.references :standard
      t.references :category
      t.timestamps
    end
  end
end
