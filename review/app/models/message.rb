class Message < ActiveRecord::Base
  validates :title, :review, presence: true
  belongs_to :user, :book
end
