class Gallery < ActiveRecord::Base
    mount_base64_uploader :image, ImageUploader
    def self.get_all
        Gallery.all
    end
    # def self.search(params)
    #
    #     "select * from Gallery
    #     LIKE '%params%'"
    # end

    def self.search(search)
      if search
        find(:all, :conditions => ['title LIKE ?', "%#{search}%"])
      else
        find(:all)
      end
    end
end
