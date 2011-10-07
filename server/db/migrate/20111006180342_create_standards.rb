class CreateStandards < ActiveRecord::Migration
  def change
    create_table :standards do |t|
      t.string :name
      t.text :description
      
      t.timestamps
    end
  end
end
