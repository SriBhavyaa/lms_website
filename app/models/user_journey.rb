class UserJourney < ApplicationRecord
  belongs_to :User
  belongs_to :Journey
end
