class PostsController < BaseController

  def index
    @posts = Post.all.limit(20)
    render json: @posts
  end

  def show
    @post = Post.find(params[:id])
    render json: @post
  end

  def new
    @post = Post.new
  end

  def edit
  end

  def create
    @post = Post.new(post_params)
    @post.save
    render json: "ok"
  end

  def update
    respond_to do |format|
      if @post.update(post_params)
        format.html { redirect_to @post, notice: 'Post was successfully updated.' }
        format.json { render :show, status: :ok, location: @post }
      else
        format.html { render :edit }
        format.json { render json: @post.errors, status: :unprocessable_entity }
      end
    end
  end

  def destroy
    @post = Post.find(params[:id])
    @post.destroy
    render json: "ok"
  end

private

  def post_params
    params.require(:post).permit(:title, :slug, :content, :thumb_url)
  end
end
