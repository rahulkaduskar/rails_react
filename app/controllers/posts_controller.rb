class PostsController < BaseController

  before_action :set_post, only: [:show, :update, :destroy]

  def index
    @posts = current_user.posts
                         .page(params[:page])
                         .per(params[:per_page] || 20)
    render json: @posts
  end

  def show
    render json: @post
  end

  def create
    @post = current_user.posts.new(post_params)
    if @post.save
      head :ok
    else
      head :unprocessable_entity
    end
  end

  def update
    if @post.update(post_params)
        head :ok
    else
      head :unprocessable_entity
    end
  end

  def destroy
    @post = current_user.posts.find(params[:id])
    @post.destroy
    render json: "ok" 
  end

private

  def post_params
    params.require(:post).permit(:title, :content)
  end

  def set_post
    @post = current_user.posts.find(params[:id])
  end

end
