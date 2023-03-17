class CreateUserJourneys < ActiveRecord::Migration[7.0]
  def change
    create_table :user_journeys do |t|
      t.references :User, null: false, foreign_key: true
      t.references :Journey, null: false, foreign_key: true

      t.timestamps
    end
  end
end
