class AddUniqueWebsiteUrlBooleanToPodcasts < ActiveRecord::Migration[4.2][5.1]
  def change
    add_column :podcasts, :unique_website_url?, :boolean, default: true
  end
end
