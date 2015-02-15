class AddDecimalToRating < ActiveRecord::Migration
  def change
    change_column :books, :rating, :decimal, :precision => 3, :scale => 2
  end
end
