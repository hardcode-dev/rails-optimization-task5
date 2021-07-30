class AddMastodonUrlToUsers < ActiveRecord::Migration[4.2][5.1]
  def change
    add_column :users, :mastodon_url, :string
  end
end
