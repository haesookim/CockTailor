class GallerysController < ApplicationController
    def new
        @gallery = Gallery.new
    end
    def show
    end
    def create
        @gallery = Gallery.new(gallery_params)
        @gallery.save
        redirect_to action: "index"
    end

    private 
        def gallery_params
            :image
            params.require(:gallery).permit(:title, :body, :image)
            
        end
end
