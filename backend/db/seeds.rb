puts 'Seeding Pins'
json_text = File.read(Rails.root.join('db', 'nyc_ttp_pins.json'))
json = JSON.parse(json_text)

json.each do |row|
    Pin.create! do |pin|
        pin.image_url = row['images']['236x']['url']
    end
end
puts 'Pins Seeded'