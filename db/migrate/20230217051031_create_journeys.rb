class CreateJourneys < ActiveRecord::Migration[7.0]
  def change
    create_table :journeys do |t|
      t.string :journey_name
      t.string :display_name
      t.text :overview_message
      t.text :complete_message
      t.string :journey_status

      t.timestamps
    end
  end
end
