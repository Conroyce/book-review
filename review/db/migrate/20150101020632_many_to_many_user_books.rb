class ManyToManyUserBooks < ActiveRecord::Migration
  def change
    remove_column :user_books, :user_id, :integer
    remove_column :user_books, :book_id, :integer
  end
end
