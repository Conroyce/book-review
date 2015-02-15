class CreateUserBooks < ActiveRecord::Migration
  def change
    # drop_table :user_books

    create_table :user_books do |t|
      t.belongs_to :user, index: true
      t.belongs_to :book, index: true

      t.timestamps 
    end   
  end
end
