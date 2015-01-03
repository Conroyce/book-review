class AddBookTitleToMessages < ActiveRecord::Migration
  def change
    add_column :messages, :book_title, :string
  end
end
