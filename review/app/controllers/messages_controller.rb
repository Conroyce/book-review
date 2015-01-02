class MessagesController < ApplicationController
  def create 
    
    @book = Book.find(params[:book_id])
    @message = @book.messages.create(message_params)   

    redirect_to "books/#{@book.id}"
  end  

  def show
    @message = Message.find(params[:id])
  end   

  def edit
    @message = Message.find(params[:id])
  end
  
  def update
    @message = Message.update(message_params)
  end  

  def destroy
    @message = Message.delete(params[:id])
  end  

  private
  def message_params
    @book = Book.find(params[:book_id])
    params["message"]["name"] = current_user.name || "Guest"
    params["message"]["user_id"] = current_user.id || "Guest"
    params["message"]["title"] = params["message_title"]
    params["message"]["book_id"] = params["message_book_id"].keys[0]
    @message = params.require(:message).permit(:title,:review, :user_id, :book_id, :name)
  end  
end
