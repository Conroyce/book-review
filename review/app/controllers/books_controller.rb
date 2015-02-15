class BooksController < ApplicationController
  def index
    @books = Book.all
    @book = Book.new
  end  

  def create
    @findbook = Book.find_by(book_id: params[:book][:book_id])
    if @findbook.try(:title) && @findbook.user_ids.include?(current_user.try(:id))
      @book = @findbook
      render :json => @findbook
    elsif @findbook.try(:title)
      @book = @findbook
      @book.user_books.create(book_id: @findbook.id,user_id:current_user.try(:id)) 
      render :json => @findbook 
    else
      @book = Book.create(book_params)
      render :json => @book
    end     
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
    # if params[:book][:description].length > 255
    #   params[:book][:description] = params[:book][:description][0,252]+"..."
    # end  
    # if Book.find_by(book_id:params[:id]).try(:title)
    #   params[:title] = Book.find_by(book_id:params[:id]).title
    # else 
    #   params[:title] = params[:book][:title]  
    # end
    # params[:book_id] = params[:id] || params[:book][:book_id]
    if current_user
      # params["book"]["user_id"] = session[:user_id].to_s  #{params[:description].to_s}
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
