class MessagesController < ApplicationController
  def index
    @messages = Message.where(user_id: current_user.id)
    # @book_ids = {}
    # @messages.each do |x|
    #   if @book_ids[x.book_id]
    #     x[:book_title] = @book_ids[x.book_id]
    #   else
    #     @book = Book.find(x.book_id)
    #     @book_ids[x.book_id] = @book.title
    #     x[:book_title] = @book.title
    #   end 
    # end  
  
  end  

  def create 
    @book = Book.find(params[:book_id])
    @message = @book.messages.create(message_params)
    redirect_to "/books/#{@book.book_id}"
  end  

  def show
    @message = Message.find(params[:id])
    @book = Book.find(@message.book_id)
  end   

  def edit
    @message = Message.find(params[:id])
  end
  
  def update
    @message = Message.find(params[:id])
    @book = Book.find(@message.book_id)
    @message.update(title: message_params["title"],review: message_params["review"])
    redirect_to "/books/#{@book.book_id}"
  end  

  def destroy
    @message = Message.destroy(params[:id])
    @book = Book.find(@message.book_id)
    redirect_to "/books/#{@book.book_id}"
  end  

  private
  def message_params
    if current_user.try(:id)
      params["message"]["name"] = current_user.name
      params["message"]["user_id"] = current_user.id
    else
      params["message"]["name"] = "Guest"
      params["message"]["user_id"] = "Guest"
    end  
    params["message"]["title"] = params["message"]["title"] || params["title"] || params["message_title"]
    params["message"]["book_id"] = params["book_id"] || params["message_book_id"].keys[0] 
    @message = params.require(:message).permit(:title,:review, :user_id, :book_id, :name)
  end  
end
