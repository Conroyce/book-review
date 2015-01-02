class BooksController < ApplicationController
  def index
    @books = Book.all
    @book = Book.new
  end  

  def create
    @findbook = Book.find_by(book_id: params[:book][:book_id])
    if @findbook.try(:title) && @findbook.user_ids.include?(current_user.id)
      @book = @findbook
      render :json => @findbook
    elsif @findbook.try(:title)
      @book = @findbook
      @book.user_books.create(book_id: @findbook.id,user_id:current_user.id) 
      render :json => @findbook 
    else
      @book = Book.create(book_params)
      render :json => @book
    end  
    # redirect_to "/"
     
  end  

  def show
    @book = Book.find_by(book_id: params[:id])
    if @book
    else
      @book = Book.create(book_params)
    end  
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
    @book = params.require(:user_books).permit(:title, :book_id, user_ids:[])
  end 
end
