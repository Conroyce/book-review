class AddMoreColumnsToUsersAndBooks < ActiveRecord::Migration
  def change
    add_column :users, :favorites, :integer
    add_column :books, :rating, :integer
    add_column :books, :ratingCount, :integer
    add_column :books, :description, :string
    add_column :books, :link, :string
  end
end
