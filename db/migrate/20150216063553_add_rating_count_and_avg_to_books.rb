class AddRatingCountAndAvgToBooks < ActiveRecord::Migration
  def change
    add_column :books, :ratingCount, :integer
    add_column :books, :rating, :decimal, :precision => 3, :scale => 2
  end
end
