class DropSponsorships < ActiveRecord::Migration[4.2][5.1]
  def change
    drop_table :sponsorships
  end
end
