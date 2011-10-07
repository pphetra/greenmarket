ActiveAdmin.register Product do

  show do
    div :class => "panel" do
      h3 "Product Details"
      div :class => "panel_contents"  do
        div :class => "attributes_table standard" do
          table do
            tr do
              th "Code"
              td (simple_format product.code)
            end

            tr do
              th "Name"
              td (simple_format product.name)
            end

            tr do
              th "Description"
              td do
                simple_format product.description
              end
            end

            tr do
              th "Supplier"
              td simple_format product.supplier.name
            end

            tr do
              th "Standard"
              td simple_format product.standard.name
            end

            tr do 
              th "Category"
              td simple_format product.category.name
            end

            tr do
              th "Image"
              td do
                image_tag product.image.url
              end
            end
          end
        end
      end
    end

  end

  form do |f|
    f.inputs "Detail" do
      f.input :code
      f.input :name
      f.input :description
      f.input :supplier
      f.input :category
      f.input :standard
    end

    f.inputs "Image" do
      f.input :image, :as => :file
    end
    f.buttons
  end
end
