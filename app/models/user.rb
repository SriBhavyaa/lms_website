class User < ApplicationRecord
  has_secure_password

  validates_presence_of :email
  validates_uniqueness_of :email
  
  belongs_to :organization
  has_many :user_journeys
  has_many :journeys, through: :user_journeys
end
