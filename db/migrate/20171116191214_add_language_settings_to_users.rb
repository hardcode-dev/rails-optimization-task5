class AddLanguageSettingsToUsers < ActiveRecord::Migration[4.2][5.1]
  def change
    add_column :users, :language_settings, :jsonb, null: false, default: {}
    add_index :users, :language_settings, using: :gin
  end
end
