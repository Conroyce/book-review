class BooksController < ApplicationController
  def index
    @books = Book.all
    @book = Book.new
  end  

  def create
    @book = Book.find_by(book_id: params[:book][:book_id]) || Book.create(book_params)
    render :json => @book     
  end  

  def show
    @book = Book.find_by(book_id: params[:id])
  end  

  def edit
    @book = Book.find(params[:id])
  end  

  def update
    binding.pry

    oldRating = params[:oldRating].to_f
    newRating = params[:newRating].to_f
    count = params[:count].to_f
    rating = ((oldRating*count)+newRating)/(count+1)
    rating = rating.round(2)

    @book = Book.find_by(book_id: params[:book_id])
    if @book.try(:ratingCount)
      @book.update(ratingCount: @book.ratingCount + 1)
    else  
      @book.update(ratingCount: count.to_i+1)
      @book.update(rating: rating);
    end  
    
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
