class AddGithubIdCodeToGithubRepos < ActiveRecord::Migration[4.2][5.1]
  def change
    add_column :github_repos, :github_id_code, :integer
  end
end
