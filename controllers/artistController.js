const { default: axios } = require("axios");
const catchAsync = require("../utils/catchAsync");

exports.getArtist = catchAsync(async (req, res, next) => {
  const { access_token } = req;
  const { artist_id } = req.params;
  try {
    const response = await axios.get(
      `https://api.spotify.com/v1/artists/${artist_id}`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    // Handle the response
    res.json(response.data);
  } catch (error) {
    // Handle any errors
    res.status(500).json(error.response.data.error);
  }
});

exports.getArtists = catchAsync(async (req, res, next) => {
  const { access_token } = req;
  const { ids } = req.params;
  try {
    const response = await axios.get("https://api.spotify.com/v1/artists", {
      params: {
        ids,
      },
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    // Handle the response
    res.json(response.data);
  } catch (error) {
    // Handle any errors
    res.status(500).json(error.response.data.error);
  }
});

exports.getAlbumsByArtist = catchAsync(async (req, res, next) => {
  const { access_token } = req;
  const { artist_id, limit, offset } = req.params;

  try {
    const response = await axios.get(
      `https://api.spotify.com/v1/artists/${artist_id}/albums`,
      {
        params: {
          limit,
          offset,
        },
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    // Handle the response
    res.json(response.data);
  } catch (error) {
    // Handle any errors
    res.status(500).json(error.response.data.error);
  }
});

exports.topTracksByArtist = catchAsync(async (req, res, next) => {
  const { access_token } = req;
  const { artist_id, market } = req.params;
  try {
    const response = await axios.get(
      `https://api.spotify.com/v1/artists/${artist_id}/top-tracks`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
        params: {
          market,
        },
      }
    );

    // Handle the response
    res.json(response.data);
  } catch (error) {
    // Handle any errors
    res.status(500).json(error.response.data.error);
  }
});

exports.getRelatedArtists = catchAsync(async (req, res, next) => {
  const { access_token } = req;
  const { artist_id } = req.params;

  try {
    const response = await axios.get(
      `https://api.spotify.com/v1/artists/${artist_id}/related-artists`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    // Handle the response
    res.json(response.data);
  } catch (error) {
    // Handle any errors
    res.status(500).json(error.response.data.error);
  }
});
