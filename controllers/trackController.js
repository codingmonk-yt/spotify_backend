const { default: axios } = require("axios");
const catchAsync = require("../utils/catchAsync");

exports.getTrack = catchAsync(async (req, res, next) => {
  const { access_token } = req;
  const { id } = req.params;
  const { market } = req.query;
  try {
    const response = await axios.get(
      `https://api.spotify.com/v1/tracks/${id}?market=${market}`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    // Handle the response data
    res.json(response.data);
  } catch (error) {
    // Handle any errors
    console.error(error);
    res.status(500).json(error.response.data.error);
  }
});

exports.getSeveralTracks = catchAsync(async (req, res, next) => {
  const { access_token } = req;
  const { market, ids } = req.query;
  try {
    const response = await axios.get(
      `https://api.spotify.com/v1/tracks?market=${market}&ids=${ids}`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    // Handle the response data
    res.json(response.data);
  } catch (error) {
    // Handle any errors
    console.error(error);
    res.status(500).json(error.response.data.error);
  }
});

exports.getSavedTracks = catchAsync(async (req, res, next) => {
  const { access_token } = req;
  const { market, limit, offset } = req.query;
  try {
    const response = await axios.get(
      `https://api.spotify.com/v1/me/tracks?market=${market}&limit=${limit}&offset=${offset}`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    // Handle the response data
    res.json(response.data);
  } catch (error) {
    // Handle any errors
    console.error(error);
    res.status(500).json(error.response.data.error);
  }
});

exports.saveTracks = catchAsync(async (req, res, next) => {
  const { access_token } = req;
  const { ids } = req.query;
  const { ids: trackIds } = req.body;
  try {
    const response = await axios.put(
      `https://api.spotify.com/v1/me/tracks?ids=${ids}`,
      trackIds,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "application/json",
        },
      }
    );

    // Handle the response data
    res.json(response.data);
  } catch (error) {
    // Handle any errors
    console.error(error);
    res.status(500).json(error.response.data.error);
  }
});

exports.removeSavedTracks = catchAsync(async (req, res, next) => {
  const { access_token } = req;
  const { ids } = req.query;
  const { ids: trackIds } = req.body;
  try {
    const response = await axios.delete(
      `https://api.spotify.com/v1/me/tracks?ids=${ids}`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "application/json",
        },
        data: {
          ids: trackIds,
        },
      }
    );

    // Handle the response data
    res.json(response.data);
  } catch (error) {
    // Handle any errors
    console.error(error);
    res.status(500).json(error.response.data.error);
  }
});

exports.checkSavedTracks = catchAsync(async (req, res, next) => {
  const { access_token } = req;
  const { ids } = req.query;
  try {
    if (!ids) {
      return res.status(400).json({ error: "Missing track IDs" });
    }

    const response = await axios.get(
      `https://api.spotify.com/v1/me/tracks/contains?ids=${ids}`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    const contains = response.data;
    res.json(contains);
  } catch (error) {
    console.error(error);
    res.status(error.response.status || 500).json(error.response.data.error);
  }
});

exports.getRecommendations = catchAsync(async (req, res, next) => {
  const { access_token } = req;
  const { limit, market, seed_artists, seed_genres, seed_tracks } = req.query;
  try {
    const url = `https://api.spotify.com/v1/recommendations?limit=${limit}&market=${market}&seed_artists=${seed_artists}&seed_genres=${seed_genres}&seed_tracks=${seed_tracks}`;

    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    const recommendations = response.data;
    res.json(recommendations);
  } catch (error) {
    console.error(error);
    res.status(error.response.status || 500).json(error.response.data.error);
  }
});
