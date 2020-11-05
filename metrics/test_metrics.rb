class TestMetrics < Influxer::Metrics

  set_series :test

  tags :user

  attributes :run_time_seconds

  validates :user, :run_time_seconds, presence: true
  validates :run_time_seconds, numericality: true
end
