class AddEditorVersionToUsers < ActiveRecord::Migration[4.2][5.1]
  def change
    add_column :users, :editor_version, :string, default: "v1"
  end
end
