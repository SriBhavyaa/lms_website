class CreateRoles < ActiveRecord::Migration[7.0]
  def change
    create_table :roles do |t|
      t.string :type
      t.references :User, null: false, foreign_key: true

      t.timestamps
    end
  end
end
