class GallerysController < ApplicationController
    def new
        @gallery = Gallery.new
    end
    ''
    def show

        if params[:id]
            @gallery = Gallery.find(params[:id])


        end
        end

    def index
        if params[:search]

            @galleries = Gallery.where('title LIKE ?','%'+params[:search]+'%').order('created_at DESC')
        else @galleries = Gallery.all.order('created_at DESC')
        end

    end
#params[:search]




    def create
        @gallery = Gallery.new(gallery_params)
        @gallery.save
        redirect_to action: "show", id: @gallery.id
    end

    private 
        def gallery_params
            :image
            params.require(:gallery).permit(:title, :body, :image)
            
        end
end


