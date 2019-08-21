

console.log('this is loaded');

exports.spotify = {
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET
}

exports.movies = {
    id: process.env.OMBD_API_KEY,
    secret: process.env.OMBD_SECCRET
}
