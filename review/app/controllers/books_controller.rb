class BooksController < ApplicationController
  def index
    @books = Book.all
    @book = Book.new
  end  

  def create
    @book = Book.create(book_params)
    # redirect_to "/"
    render :json => @book  
  end  

  def show
    @book = Book.find(params[:id])
  end  

  def edit
    @book = Book.find(params[:id])
  end  

  def update
    @book = Book.find(params[:id])
    @book.update(book_params)
    redirect_to "/books/#{params[:id]}"
  end 

  def destroy
    @book = Book.delete(params["id"])
    redirect_to "/books"
  end 

  private
  def book_params
    if current_user
      params["book"]["user_id"] = "#{session[:user_id].to_s} #{params[:description].to_s}"
      @book = params.require(:book).permit(:title, :book_id, :user_id)
    else   
      @book = params.require(:book).permit(:title, :book_id)
    end  
  end  
end
