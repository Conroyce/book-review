class ModifyFavoritesModel < ActiveRecord::Migration
  def change
    add_column :favorites, :user_id, :integer
    remove_column :favorites, :title, :string
    remove_column :users, :favorites, :integer
  end
end
