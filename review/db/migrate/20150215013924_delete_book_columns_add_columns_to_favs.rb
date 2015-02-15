class DeleteBookColumnsAddColumnsToFavs < ActiveRecord::Migration
  def change
    add_column :favorites, :title, :string
    add_column :favorites, :img, :string
    remove_column :books, :title, :string
    remove_column :books, :img, :string
    remove_column :books, :description, :string
    remove_column :books, :rating, :integer
    remove_column :books, :ratingCount, :integer
    remove_column :books, :link, :string
  end
end
