class ChangeBookIdToString < ActiveRecord::Migration
  def change
    remove_column :favorites, :book_id, :integer
    add_column :favorites, :book_id, :string
  end
end
