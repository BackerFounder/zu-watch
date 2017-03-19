use Rack::Static,
  :urls => ["/assets"],
  :root => "public"

map '/' do
    run lambda { |env|
      [
        200,
        {
          'Content-Type'  => 'text/html',
          'Cache-Control' => 'public, max-age=86400'
        },
        File.open('public/index.html', File::RDONLY)
      ]
    }
end


map '/build.html' do
    run lambda { |env|
      [
        200,
        {
          'Content-Type'  => 'text/html',
          'Cache-Control' => 'public, max-age=86400'
        },
        File.open('public/build.html', File::RDONLY)
      ]
    }
end