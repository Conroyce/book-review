class FavoritesController < ApplicationController
  def index
    @favorites = Favorite.all
  end  

  def create
    @favorite = Favorite.create(favorite_params);
    redirect_to "/users/#{@favorite.user_id}/messages"
  end  

  def show
    @favorites = Favorite.find(params[:id])
  end  

  def favorite_params
    params.require(:favorite).permit(:book_id,:user_id)
  end  
end
