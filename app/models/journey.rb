class Journey < ApplicationRecord
    has_many :user_journeys
    has_many :users, through: :user_journeys
    has_many :stages
end
