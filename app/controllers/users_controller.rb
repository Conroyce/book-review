class UsersController < ApplicationController
  def index
    if current_user
      
    else
      redirect_to "/users/new"
    end    
  end   

  def create
    @user = User.new(user_params)
    if @user.save
      flash[:notice] = "Welcome to the site!"
      redirect_to "/books"
    else
      flash[:alert] = "There was a problem creating your account. Please try again."  
      redirect_to :back
    end  
  end 

  def edit
    @user = User.find(params[:id]);
  end

  def update
    @user = User.find(params[:id]);
    @user.update(user_params)
    redirect_to "/users/#{@user[:id]}"
  end  

  private

  def user_params
    params.require(:user).permit(:name, :password, :password_confirmation)
  end

  def user_edit_params
    params.require(:user).permit()
  end  
  
end
