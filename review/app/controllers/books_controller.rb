class BooksController < ApplicationController
  def index
    binding.pry
    @books = Book.all
    @book = Book.new
  end  

  def create
    

    @book = current_user.books.create(book_params)
    # redirect_to "/"
    render :json => @book  
  end  

  def show
    @book = Book.find_by(book_id: params[:id])
    @message = Message.new
  end  

  def edit
    @book = Book.find(params[:id])
  end  

  def update
    @book = Book.find(params[:id])
    @book.update(users_books_params)
    redirect_to "/books/#{params[:id]}"
  end 

  def destroy
    @book = Book.delete(params["id"])
    redirect_to "/books"
  end 

  private
  def book_params
    if current_user
      params["book"]["user_ids"] = [("#{session[:user_id].to_s}")]  #{params[:description].to_s}
      @book = params.require(:book).permit(:title, :book_id, user_ids:[])
    else   
      @book = params.require(:book).permit(:title ,:book_id)
    end  
  end 

  def users_books_params
    params["user_book"]["user_ids"] = [("#{session[:user_id].to_s}")]
    @book = params.require(:users_books).permit(:title, :book_id, user_ids:[])
  end 
end
