class AddJobOpportunityIdToArticles < ActiveRecord::Migration[4.2][5.1]
  def change
    add_column :articles, :job_opportunity_id, :integer
  end
end
