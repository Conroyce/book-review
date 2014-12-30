class AddBookIdToBooks < ActiveRecord::Migration
  def change
    add_column :books, :book_id, :string
    remove_column :books, :description, :string
  end
end
