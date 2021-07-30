class AddTaglineToOrganizations < ActiveRecord::Migration[4.2][5.1]
  def change
    add_column :organizations, :tag_line, :string
  end
end
