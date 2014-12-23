class BooksController < ApplicationController
  def index
    @books = Book.all
    @book = Book.new
  end  

  def create
    @book = Book.create(book_params)
    redirect_to "/books"
  end  

  def show
    @book = Book.find(params[:id])
  end  

  def edit
    @book = Book.find(params[:id])
  end  

  def update
    @book = Book.find(params[:id])
    @book = Book.update(book_params)
  end  

  private
  def book_params
    @book = params.require(:book).permit(:title, :description)
  end  
end
