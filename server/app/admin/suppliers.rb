ActiveAdmin.register Supplier do
  index do
    column :name
    default_actions
  end

  form do |f|
    f.inputs "Details" do
      f.input :name
    end
    f.inputs "Content" do
      f.input :description
    end
    f.buttons
  end
end
