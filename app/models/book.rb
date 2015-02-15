class Book < ActiveRecord::Base
  has_many :user_books
  has_many :users, through: :user_books
  has_many :messages
end
