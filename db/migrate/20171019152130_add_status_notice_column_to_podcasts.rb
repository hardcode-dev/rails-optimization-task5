class AddStatusNoticeColumnToPodcasts < ActiveRecord::Migration[4.2][5.1]
  def change
    add_column :podcasts, :status_notice, :text, default: ""
  end
end
