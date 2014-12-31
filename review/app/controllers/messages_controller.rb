class MessagesController < ApplicationController
  def create
    @book = Book.find(params[:book_id])
    @message = @book.messages.create(message_params)
    params[:id] = params[:book_id]
    redirect_to book_url
  end  

  def show
    @message = Message.find(params[:id])
  end   

  private
  def message_params
    @message = params.require(:message).permit(:title,:review, :user_id, :book_id, :message, :message_title)
  end  
end
