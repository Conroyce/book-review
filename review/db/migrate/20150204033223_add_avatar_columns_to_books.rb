class AddAvatarColumnsToBooks < ActiveRecord::Migration
  def self.up
    add_attachment :books, :avatar
  end  
  
  def self.down
    remove_attachment :books, :avatar
  end  
end
