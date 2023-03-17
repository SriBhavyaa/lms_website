class AddStageIdToActivities < ActiveRecord::Migration[6.1]
  def change
    add_reference :activities, :stage, foreign_key: true, null: false, index: true
  end
end