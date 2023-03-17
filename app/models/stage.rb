class Stage < ApplicationRecord
  belongs_to :journey
  has_many :stage_activities
  has_many :activities, through: :stage_activities, source: :activity
end