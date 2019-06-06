class GallerysController < ApplicationController
    def new
    end
    def create
        render plain: params[:gallery]
    end
end
