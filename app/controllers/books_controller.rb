class BooksController < ApplicationController
  def index
    @books = Book.all
    @book = Book.new
  end  

  def create
    @book = Book.find_by(book_id: params[:book][:book_id]) || Book.create(book_params)     
  end  

  def show
    @book = Book.find_by(book_id: params[:id])
  end  

  def edit
    @book = Book.find(params[:id])
  end  

  def update
    @book = Book.find_by(book_id: params[:id])
    @book.update(rating: params[:book][:rating]);
    @book.update(ratingCount: @book.ratingCount + 1);
    # redirect_to action:"show", id: @book.id  #this is the issue! conflict between single page app and rails app
    redirect_to "/books/#{@book.id}"
  end 

  def destroy
    @book = Book.delete(params["id"])
    redirect_to "/books"
  end 

  private
  def book_params
    if current_user
      params[:user_id] = current_user.id.to_s
      @book = params.require(:book).permit(:book_id, :user_id)
    else   
      @book = params.require(:book).permit(:book_id)
    end  
  end 

  def book_edit_params
    @book = params.require(:book).permit(:rating)
  end 

end
