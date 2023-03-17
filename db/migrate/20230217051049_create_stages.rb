class CreateStages < ActiveRecord::Migration[7.0]
  def change
    create_table :stages do |t|
      t.string :stage_name
      t.text :overview_message
      t.text :comletion_message
      t.references :Journey, null: false, foreign_key: true

      t.timestamps
    end
  end
end
