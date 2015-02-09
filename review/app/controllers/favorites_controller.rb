class FavoritesController < ApplicationController
  def index
    @favorites = Favorite.all
  end  

  def create
    bookId =params[:favorite][:book_id]

    if Book.where(:book_id => bookId).blank?
      @book = Book.create(book_params)  
    end 

    if Favorite.where(:book_id => bookId).blank?
      @favorite = Favorite.create(favorite_params);
    else
      @favorite = Favorite.find_by(book_id: bookId)      
    end  

    redirect_to "/users/#{@favorite.user_id}/messages"
  end  

  def show
    @favorites = Favorite.find(params[:id])
  end  

  def favorite_params
    params.require(:favorite).permit(:book_id,:user_id)
  end  

  def book_params
    if params[:book][:description].length > 255
      params[:book][:description] = params[:book][:description][0,252]+"..."
    end
    @book = params.require(:book).permit(:title, :book_id, :user_id, :rating, :ratingCount, :description, :link, :img)
  end  
end
