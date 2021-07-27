class AddBufferProfileIdCodeToTags < ActiveRecord::Migration[4.2][5.1]
  def change
    add_column :tags, :buffer_profile_id_code, :string
  end
end
