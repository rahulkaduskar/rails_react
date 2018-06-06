
Rails.logger = Logger.new(STDOUT) if defined?(Rails)

# Class for adding default data in DB
class SeedData
  # this inserts the data that we need to store in DB
  def insert
    add_consents
  end

  def add_consents
    consent_file = Rails.root.join('db', 'consents.yml')
    consents = YAML.load_file(consent_file)['consents']
    consents.each do |consent|
      Consent.create!(name: consent['name'],
                      page_url: consent['page_url'],
                      description: consent['description'],
                      mandatory: consent['mandatory'])
    end
  end
end

Rails.logger.info("Initiating DB Seeding process
	               Started at #{Time.now} for #{Rails.env} environment")

seed = SeedData.new
seed.insert

Rails.logger.info("DB Seeding process completed at
				  #{Time.now} for #{Rails.env} environment.")
