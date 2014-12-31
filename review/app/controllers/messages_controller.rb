class MessagesController < ApplicationController
  def create
    params["message"]["title"] = params["message_title"]
    params["message"]["book_id"] = params["message_book_id"].keys[0]
    @book = Book.find(params[:book_id])
    @message = @book.messages.create(message_params)
    params[:id] = params[:book_id]
    redirect_to "books/#{@book.id}"
  end  

  def show
    @message = Message.find(params[:id])

  end   

  private
  def message_params
    @message = params.require(:message).permit(:title,:review, :user_id, :book_id, :message)
  end  
end
