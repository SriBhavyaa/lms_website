class CreateUsers < ActiveRecord::Migration[7.0]
  def change
    create_table :users do |t|
      t.string :fname
      t.string :lname
      t.string :email
      t.string :password_digest
      t.string :user_status
      t.string :useraccess
      t.references :organization, null: false, foreign_key: true

      t.timestamps
    end
  end
end
