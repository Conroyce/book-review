class Book < ActiveRecord::Base
  validates :title, presence:true
  belongs_to :user
  has_many :user_books
end
