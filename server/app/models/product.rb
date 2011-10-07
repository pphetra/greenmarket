class Product < ActiveRecord::Base
    belongs_to :supplier
    belongs_to :category
    belongs_to :standard

    has_attached_file :image, :style => { :thumb => "100x100>" }
end
