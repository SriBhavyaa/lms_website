class AddJourneyIdToStages < ActiveRecord::Migration[7.0]
  def change
    add_reference :stages, :journey, null: false, foreign_key: true
  end
end
