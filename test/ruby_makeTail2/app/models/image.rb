class Image < ApplicationRecord
    
    mount_uploaer :avatar, AvartarUploader
end
